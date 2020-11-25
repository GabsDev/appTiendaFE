import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-delivery-update",
  templateUrl: "./delivery-update.component.html",
  styleUrls: ["./delivery-update.component.scss"],
})
export class DeliveryUpdateComponent implements OnInit {
  personalEntrega: any;
  vehicles: any;
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
    this.getStaff(id);
  }
  getStaff(id: number) {
    this.gService
      .get("product/staff/delivery", id)
      .subscribe((respuesta: any) => {
        this.personalEntrega = respuesta;
        console.log(this.personalEntrega);
        //Obtenida la información del personalEntrega
        //se construye el formulario
        this.reactiveForm();
      });
  }
  reactiveForm() {
    //this.getFeatures();

    //Si hay información del personalEntrega
    if (this.personalEntrega) {
      //Cargar la información del personalEntrega
      //en los controles que conforman el formulario
      this.formUpdate = this.fb.group({
        id: [this.personalEntrega.id, [Validators.required]],
        fullName: [this.personalEntrega.fullName, [Validators.required]],
        idCard: [this.personalEntrega.idCard, [Validators.required]],
        telephone: [this.personalEntrega.telephone, [Validators.required]],
        email: [this.personalEntrega.email, [Validators.required]],
        enable: [this.personalEntrega.enable, [Validators.required]],
        vehicle_id: [this.personalEntrega.vehicle_id, [Validators.required]],
      });
      this.getVehicles();
    }
  }
  ngOnInit(): void {}

  getVehicles() {
    this.gService
      .list("product/vehicle")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.vehicles = data;
      });
  }

  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();
    formData = this.gService.toFormData(this.formUpdate.value);
    formData.append("_method", "PATCH");
    this.gService
      .update_formdata("product/staff/delivery/update", formData)
      .subscribe((respuesta: any) => {
        this.personalEntrega = respuesta;
        this.router.navigate(["/staff/delivery"], {
          queryParams: { update: "true" },
        });
      });
  }
  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(["/product/staff/delivery/"]);
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formUpdate.controls[control].hasError(error) &&
      this.formUpdate.controls[control].invalid &&
      (this.makeSubmit || this.formUpdate.controls[control].touched)
    );
  };

  actualizarStaff(id: number) {
    this.router.navigate(["/product/staff/delivery/update", id], {
      relativeTo: this.route,
    });
  }
  crearStaff() {
    this.router.navigate(["/product/staff/delivery/create"], {
      relativeTo: this.route,
    });
  }
}
