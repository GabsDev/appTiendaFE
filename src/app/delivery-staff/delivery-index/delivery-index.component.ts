import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthenticationService } from "src/app/share/authentication.service";
import { GenericService } from "src/app/share/generic.service";
import { NotificacionService } from "src/app/share/notificacion.service";

@Component({
  selector: "app-delivery-index",
  templateUrl: "./delivery-index.component.html",
  styleUrls: ["./delivery-index.component.scss"],
})
export class DeliveryIndexComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isAutenticated: boolean;
  constructor(
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.listaStaffDelivery();
  }

  ngOnInit(): void {}
  listaStaffDelivery() {
    //Subscripción al booleano que indica si esta autenticado
    this.authService.isAuthenticated.subscribe(
      (valor) => (this.isAutenticated = valor)
    );

    /*
    Utilizar el servicios genérico para listar los videojuegos
    * Acción list indicando la ruta, recordando que indica únicamente lo que falta después de 'http://127.0.0.1:8000/api/v1/
    * takeUntil cerrar la subscripción, cuando se destruye el componente
    * Subscripción a la solicitud
    * Opcional console.log solo si es necesario verificar los datos en tiempo de desarrollo
    * this.datos guardar la información en una variable, está se utilizará en el HTML para su respectiva presentación
    * capturar los errores y presentar una notificación
    * */
    this.gService
      .list("product/staff/delivery")
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
