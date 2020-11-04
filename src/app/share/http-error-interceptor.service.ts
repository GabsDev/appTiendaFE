import {
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { NotificacionService } from './notificacion.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService,
    private noti: NotificacionService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //Obtener token
    let token = null;
    if (this.auth.currentUserValue != null) {
      token = this.auth.currentUserValue.token;
    }
    //Agregar headers a la solicitud
    if (token) {
      //Header con el token
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    //Capturar el error
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let status: number = null;
        let message: string = null;
        let changeError: boolean = false;
        // console.log(err);
        switch (err.status) {
          case 400:
            message = 'Solicitud incorrecta';
            changeError = true;
            break;
          case 401:
            message = 'No autorizado';
            changeError = true;
            break;
          case 403:
            message = 'Recurso no encontrado';
            changeError = true;
            break;
          case 422:
            message = 'Se ha presentado un error';
            changeError = true;
            break;
        }
        //Mensajes personalizados estado 422
        if (err.error != null && err.status == 422) {
          if (err.error.message) {
            message = err.error.message || '';
          } else {
            //Recorrer errores de validación
            if (err.error != null && Object.keys(err.error).length) {
              message = '';
              for (let property in err.error) {
                message += err.error[property] + ' <br/>';
              }
            }
          }
        }
        //Cambio del HttpErrorResponse
        if (changeError)
          err = new HttpErrorResponse({
            error: err.error,
            status: status || err.status,
            statusText: message || err.statusText,
          });
        //Notificación del error
        this.noti.mensaje('Error', err.statusText, 'warning');
        return throwError(err);
      })
    );
  }
}
