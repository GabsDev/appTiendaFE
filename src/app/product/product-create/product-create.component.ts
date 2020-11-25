import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  producto: any;
  productTypes: any;
  imageURL: string;
  featuresList: any;
  error: any;
  makeSubmit: boolean = false;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
      enable: ["", [Validators.required]],
      image: ["", [Validators.required]],
      productType_id: ["", [Validators.required]],
    });
    this.getProductTypes();
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
    return this.gService.list("product/features").subscribe(
      (respuesta: any) => {
        (this.featuresList = respuesta), this.checkboxfeatures();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  get features(): FormArray {
    return this.formCreate.get("product/features") as FormArray;
  }
  get feature_id(): FormArray {
    return this.formCreate.get("product/feature_id") as FormArray;
  }
  private checkboxfeatures() {
    this.featuresList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.features as FormArray).push(control);
    });
  }
  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.feature_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.feature_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.feature_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();

    formData = this.gService.toFormData(this.formCreate.value);
    console.log(formData);
    formData.append("_method", "POST");
    this.gService
      .create_formdata("product/create", formData)
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.producto = respuesta;
        this.router.navigate(["/product/all"], {
          queryParams: { register: "true" },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(["/product/all"]);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
