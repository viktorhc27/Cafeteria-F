import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  api: string = "http://localhost:3000/"
  constructor(private http: HttpClient) { }


  buscarPedidos(buy_order: string): Observable<any> {
    return this.http.post(this.api + "pedidos/buscar", { buy_order })
  }

}
