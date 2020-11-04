import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthenticationService } from "src/app/share/authentication.service";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.scss"],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;

  //Autenticacion
  usuario: any;
  roles: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ["", [Validators.required]],
      idCard: ["", [Validators.required]],
      telephone: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      rol_id: ["", [Validators.required]],
    });
    this.getRoles();
  }

  submitForm() {
    this.makeSubmit = true;
    console.log(this.formCreate.value);
    this.authService
      .createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.usuario = respuesta;
        this.router.navigate(["/"], {
          queryParams: { register: "true" },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
  }
  getRoles() {
    this.gService
      .list("product/rol")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.roles = data;
      });
  }
  public errorHandling = (control: string, error: string) => {
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("user-create");
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("user-create");
  }
}
