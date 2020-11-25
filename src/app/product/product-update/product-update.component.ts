import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthenticationService } from "src/app/share/authentication.service";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.scss"],
})
export class ProductUpdateComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAutenticated: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.listaProductos();
  }

  ngOnInit(): void {}
  listaProductos() {
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

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
  actualizarProducto(id: number) {
    this.router.navigate(["/product/update/form/", id], {
      relativeTo: this.route,
    });
  }
  crearProducto() {
    this.router.navigate(["/product/create"], {
      relativeTo: this.route,
    });
  }
}
