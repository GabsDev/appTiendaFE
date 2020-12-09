import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ItemCart, CartService } from "src/app/share/cart.service";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-order-create",
  templateUrl: "./order-create.component.html",
  styleUrls: ["./order-create.component.scss"],
})
export class OrderCreateComponent implements OnInit {
  items: ItemCart[] = [];
  total = 0;
  fecha = new Date();
  qtyItems = 0;
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();

    this.cartService.countItems.subscribe((value) => {
      this.qtyItems = value;
    });
  }
  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje("Orden", "Cantidad actualizada", "success");
  }
  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total = this.cartService.getTotal();
    this.noti.mensaje("Orden", "Producto eliminado de la orden", "warning");
  }
  ordenar() {
    if (this.qtyItems > 0) {
      let detalles = { detalles: this.cartService.getItems() };
      this.gService
        .create("product/order", detalles)
        .subscribe((respuesta: any) => {
          this.noti.mensaje(
            "Orden",
            "Orden registrada satisfactoriamente",
            "sucess"
          );
          this.cartService.deleteCart();
          this.items = this.cartService.getItems();
          console.log(this.items);
          this.total = this.cartService.getTotal();
        });
    } else {
      this.noti.mensaje("Orden", "Agregue productos a la orden", "warning");
    }
  }
}
