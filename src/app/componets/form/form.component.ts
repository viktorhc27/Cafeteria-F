import { Component, OnInit } from '@angular/core';
import { Carrito } from 'src/app/interfaces/carrito';
import { WebpayRequest } from 'src/app/interfaces/webpay_request';

import { WebpayService } from 'src/app/services/webpay/webpay.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [WebpayService]
})
export class FormComponent implements OnInit {
  cart: Array<any> = [];
  token!: string;
  url!: string
  modelo: WebpayRequest = { amount: 0 }
  producto: Array<Carrito> = []

  constructor(
    private webpayService: WebpayService
  ) {

  }

  ngOnInit(): void {
    this.cargar()
    console.log(this.modelo);

    this.producto = JSON.parse(localStorage.getItem('pedido') as string)

    this.hacerPeticion(this.modelo, this.producto)


  }


  hacerPeticion(modelo: WebpayRequest, producto: any) {
    this.webpayService.webpayCrearOrden(modelo, producto).subscribe(data => {
      this.token = data.token;
      this.url = data.url;

    })

  }



  cargar() {

    const cartString = localStorage.getItem('pedido');
    if (cartString) {
      try {
        this.cart = JSON.parse(cartString);


        this.cart.forEach(e => {
          this.modelo.amount = this.modelo.amount + e.total
        })

      } catch (e) {
        console.error(e);
      }
    }
  }



}
