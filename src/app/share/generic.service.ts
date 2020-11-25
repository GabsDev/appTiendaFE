import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GenericService {
  currentUser: any;
  headers_formdata = new HttpHeaders();

  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string = environment.apiURL;

  //Inyectar cliente HTTP para las solicitudes al API
  // Personalización de errores
  //Servicio de autentificación
  constructor(private http: HttpClient) {
    // Headers FormData
    this.headers_formdata = new HttpHeaders();
    this.headers_formdata = this.headers_formdata.append(
      "processData",
      "false"
    );
    this.headers_formdata = this.headers_formdata.append(
      "Content-Type",
      "multipart/form-data"
    );
    this.headers_formdata = this.headers_formdata.append(
      "Access-Control-Allow-Origin",
      "*"
    );
  }
  // Listar
  list(endopoint: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + endopoint);
  }
  // Obtener
  get(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http.get<any | any[]>(this.urlAPI + endopoint + `/${filtro}`);
  }
  // crear
  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate);
  }
  // actualizar
  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.patch<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.id}`,
      objUpdate
    );
  }

  //Métodos Gestión FormData
  //FormData crear
  create_formdata(
    endopoint: string,
    objCreate: FormData | any
  ): Observable<any | any[]> {
    if (this.currentUser != null) {
      objCreate.append("user_id", this.currentUser.user.id);
    }
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate, {
      headers: this.headers_formdata,
    });
  }
  //FormData actualizar
  update_formdata(
    endopoint: string,
    objUpdate: FormData | any
  ): Observable<any | any[]> {
    return this.http.patch<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.get("id")}`,
      objUpdate,
      {
        headers: this.headers_formdata,
      }
    );
  }
  //Crear formData con la información del formulario
  toFormData<T>(formValue: T) {
    var formData = new FormData();
    for (let key of Object.keys(formValue)) {
      let value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
