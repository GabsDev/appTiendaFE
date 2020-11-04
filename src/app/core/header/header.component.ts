import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/share/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  currentUser: any;
  isAutenticated: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("header-page");

    //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));

    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  irInicio() {
    // Redireccionar a la ruta raíz
    this.router.navigate(["/"]);
  }

  irAcercaDe() {
    // Redireccionar a la ruta raíz
    this.router.navigate(["/home/about-us"]);
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("header-page");
  }
}
