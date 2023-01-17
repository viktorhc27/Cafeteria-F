import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cargar(cart: any) {
    const cartString = localStorage.getItem('pedido');
    if (cartString) {
      try {
        cart = JSON.parse(cartString);
        console.log(cart);

      } catch (e) {
        console.error(e);
      }
    }
  }
}
