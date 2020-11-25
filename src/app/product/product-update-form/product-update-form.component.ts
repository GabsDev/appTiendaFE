import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-product-update-form",
  templateUrl: "./product-update-form.component.html",
  styleUrls: ["./product-update-form.component.scss"],
})
export class ProductUpdateFormComponent implements OnInit {
  product: any;
  productTypes: any;
  imageURL: string;
  featuresList: any;
  formUpdate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  makeSubmit: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    //Desde el constructor obtener el identificar de la ruta
    const id = +this.route.snapshot.paramMap.get("id");
    console.log(id);
    this.getProducto(id);
  }
  getProducto(id: number) {
    this.gService.get("product", id).subscribe((respuesta: any) => {
      this.product = respuesta;
      console.log(this.product);
      //Obtenida la información del product
      //se construye el formulario
      this.reactiveForm();
    });
  }
  reactiveForm() {
    //this.getFeatures();

    //Si hay información del product
    if (this.product) {
      //Cargar la información del product
      //en los controles que conforman el formulario
      this.formUpdate = this.fb.group({
        id: [this.product.id, [Validators.required]],
        name: [this.product.name, [Validators.required]],
        description: [this.product.description, [Validators.required]],
        price: [this.product.price, [Validators.required]],
        enable: [this.product.enable, [Validators.required]],
        image: [this.product.image, [Validators.required]],
        productType_id: [this.product.productType_id, [Validators.required]],
        features: this.fb.array([]),
        feature_id: this.fb.array([]),
      });
      this.getProductTypes();
    }
  }
  ngOnInit(): void {}

  getProductTypes() {
    this.gService
      .list("product/productType")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.productTypes = data;
      });
  }

  getFeatures() {
    return this.gService
      .list("product/features")
      .subscribe((respuesta: any) => {
        (this.featuresList = respuesta), this.checkboxfeatures();
      });
  }
  get features(): FormArray {
    return this.formUpdate.get("features") as FormArray;
  }
  get feature_id(): FormArray {
    return this.formUpdate.get("feature_id") as FormArray;
  }
  private checkboxfeatures() {
    //Recorrer la lista de features y especificar si esta seleccionado
    this.featuresList.forEach((o) => {
      let selected = false;
      if (this.product.features.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.features as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.feature_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.feature_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.feature_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.feature_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();
    formData = this.gService.toFormData(this.formUpdate.value);
    formData.append("_method", "PATCH");
    this.gService
      .update_formdata("product/update", formData)
      .subscribe((respuesta: any) => {
        this.product = respuesta;
        this.router.navigate(["/product/all"], {
          queryParams: { update: "true" },
        });
      });
  }
  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(["/product/update"]);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };
}
