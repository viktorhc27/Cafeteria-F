import { Component, OnInit, Input, Output } from '@angular/core';
import { Carrito } from 'src/app/interfaces/carrito';
import { CanActivate, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';

import { EventEmitter } from 'stream';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() cart: Array<any> = [];
  total: number = 0
  datos: Array<Carrito> = [];
  nombre!: string
  dato!: Carrito
  constructor(
    private _productos: MenuService,
    private router: Router) { }


  ngOnInit() {

    this.cargar();
    window.addEventListener('storage', () => {
      this.cargar();

    });

  }
  pasarCaja() {
    this.router.navigate(['/pagar'])
  }

  cargar() {

    const cartString = localStorage.getItem('pedido');
    if (cartString) {
      try {
        this.cart = JSON.parse(cartString);

        /* CAMBIAR ESTO A QUE SE GUARDE DIRECTAMENTE CON LA IFNORMACION ESTA MALE STO SE RECARGA MUCHO Y SE DESRODENA */
        this.cart.forEach(e => {
          this.dato = {
            id: e.id,
            nombre: e.nombre,
            precio: e.precio,
            cantidad: e.cant,
            extra: e.extra,
            total: e.total

          }
          this.total = this.total + e.total
          this.datos.push(this.dato)
        })



      } catch (e) {
        console.error(e);
      }
    }
  }


}
