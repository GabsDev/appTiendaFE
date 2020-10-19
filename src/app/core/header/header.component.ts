import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  constructor(private router: Router) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("header-page");
  }
  irInicio() {
    // Redireccionar a la ruta raíz
    this.router.navigate(["/"]);
  }

  irAcercaDe() {
    // Redireccionar a la ruta raíz
    this.router.navigate(["/about-us"]);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("header-page");
  }
}
