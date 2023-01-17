import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebpayRequest } from 'src/app/interfaces/webpay_request';
import { WebpayResponse } from 'src/app/interfaces/webpay_response';
import { Carrito } from 'src/app/interfaces/carrito';
@Injectable({
  providedIn: 'root'
})
export class WebpayService {

  api: string = "http://localhost:3000/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }



  webpayCrearOrden(modelo: WebpayRequest, productos: Carrito): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.api + "webpay/crearOrden", {modelo: modelo, productos: productos}, { headers: headers })
  }

  webpayRespuesta(modelo: WebpayResponse): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.api + "webpay/respuesta", modelo, { headers: headers })
  }

  webpayVerEstado(modelo: WebpayResponse): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.api + "webpay/verEstado", modelo, { headers: headers })
  }
}
