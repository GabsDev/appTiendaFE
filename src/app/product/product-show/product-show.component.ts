import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CartService } from "src/app/share/cart.service";

import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-product-show",
  templateUrl: "./product-show.component.html",
  styleUrls: ["./product-show.component.scss"],
})
export class ProductShowComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  infoProducto: any;
  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    //Obtener el id del producto
    let id = +this.route.snapshot.paramMap.get("id");
    //Obtener el producto
    this.obtenerProducto(id);
  }
  obtenerProducto(id: any) {
    this.gService
      .get("product", id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
  }

  agregarProducto(id: number) {
    this.gService
      .get("product", id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.infoProducto = data;
        this.cartService.addToCart(this.infoProducto);
        this.notificacion.mensaje(
          "Orden",
          "Producto agregado a la orden",
          "success"
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
