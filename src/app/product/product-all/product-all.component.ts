import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GenericService } from "src/app/share/generic.service";

@Component({
  selector: "app-product-all",
  templateUrl: "./product-all.component.html",
  styleUrls: ["./product-all.component.scss"],
})
export class ProductAllComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService
  ) {}

  ngOnInit(): void {
    this.listaProductos();
  }
  listaProductos() {
    this.gService
      .list("product/all")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
