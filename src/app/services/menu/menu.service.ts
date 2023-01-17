import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/componets/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  base: string = "http://localhost:3000/"
  controller: string = 'productos/';

  constructor(private http: HttpClient) { }


  list(): Observable<any> {
    return this.http.get(this.base + this.controller + "index")
  }
  add(data: any, cart: any): Observable<any> {
    return this.http.post(this.base + this.controller + "add-cart", { product: data, cart: cart })
  }

  buscar_productos(id: number): Observable<any> {
    return this.http.post(this.base + this.controller + "buscar", { id })
  }
}
