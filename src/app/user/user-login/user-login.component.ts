import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/share/authentication.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"],
})
export class UserLoginComponent implements OnInit {
  isCollapsed = true;
  focus;
  focus1;
  focus2;

  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  // Definir el formulario con su reglas de validación
  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }
  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
    let register = false;
    //Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
    });
    if (register) {
      this.notificacion.mensaje(
        "Usuario",
        "Registro satisfactorio! Especifique su credenciales para ingresar",
        "success"
      );
    }
  }
  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    try {
      this.makeSubmit = true;
      //Validación
      if (this.formulario.invalid) {
        return;
      }
      console.log(this.formulario.value);
      this.authService
        .loginUser(this.formulario.value)
        .subscribe((respuesta: any) => {
          (this.infoUsuario = respuesta), this.router.navigate(["/"]);
        });
    } catch (error) {
      this.notificacion.mensaje(
        "Usuario",
        "No se puede iniciar sesion! Verifique sus credenciales para ingresar",
        "error"
      );
    }
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };
}
