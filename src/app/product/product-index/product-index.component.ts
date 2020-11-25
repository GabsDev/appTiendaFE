import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-product-index",
  templateUrl: "./product-index.component.html",
  styleUrls: ["./product-index.component.scss"],
})
export class ProductIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.listaProductos();
  }

  ngOnInit(): void {}
  listaProductos() {
    /*
    Utilizar el servicios genérico para listar los productos
    * Acción list indicando la ruta, recordando que indica únicamente lo que falta después de 'http://127.0.0.1:8000/api/v1/
    * takeUntil cerrar la subscripción, cuando se destruye el componente
    * Subscripción a la solicitud
    * Opcional console.log solo si es necesario verificar los datos en tiempo de desarrollo
    * this.datos guardar la información en una variable, está se utilizará en el HTML para su respectiva presentación
    * capturar los errores y presentar una notificación
    * */
    this.gService
      .list("product/")
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
