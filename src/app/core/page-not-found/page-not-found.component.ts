import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import noUiSlider from "nouislider";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"],
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  constructor(private router: Router) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }

  irInicio() {
    // Redireccionar a la ruta raíz
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("page-not-found");
  }
}
