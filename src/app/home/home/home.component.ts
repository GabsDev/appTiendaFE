import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import noUiSlider from "nouislider";
import { AuthenticationService } from "src/app/share/authentication.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  isAutenticated: boolean;
  currentUser: any;
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
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
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
    this.makeSubmit = true;
    //Validación
    if (this.formulario.invalid) {
      return;
    }
    //console.log(this.formulario.value);
    this.authService
      .loginUser(this.formulario.value)
      .subscribe((respuesta: any) => {
        (this.infoUsuario = respuesta), this.router.navigate(["/"]);
      });
    var refModal = document.getElementById("myModal2");
    refModal.style.display = "none";
  }

  /* Manejar errores de formulario en Angular */

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
}
