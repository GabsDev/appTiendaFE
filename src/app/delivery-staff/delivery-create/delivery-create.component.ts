import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-delivery-create",
  templateUrl: "./delivery-create.component.html",
  styleUrls: ["./delivery-create.component.scss"],
})
export class DeliveryCreateComponent implements OnInit {
  personalEntrega: any;
  vehicles: any;
  imageURL: string;
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
      fullName: ["", [Validators.required]],
      idCard: ["", [Validators.required]],
      telephone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      enable: ["", [Validators.required]],
      vehicle_id: ["", [Validators.required]],
    });
    this.getVehiculos();
  }
  ngOnInit(): void {}

  getVehiculos() {
    this.gService
      .list("product/vehicle")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.vehicles = data;
        console.log(data);
      });
  }

  submitForm() {
    this.makeSubmit = true;

    let formData = new FormData();

    formData = this.gService.toFormData(this.formCreate.value);
    console.log(formData);
    formData.append("_method", "POST");
    this.gService
      .create_formdata("product/staff/delivery/create", formData)
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.personalEntrega = respuesta;
        this.router.navigate(["/staff/delivery"], {
          queryParams: { register: "true" },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(["/staff/delivery"]);
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}
