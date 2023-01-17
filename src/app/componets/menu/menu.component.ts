import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {

  productos: Array<Producto> = [];
  pedidos: Array<any> = []
  cart: Array<Cart> = []

  constructor(
    private _service: MenuService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this._service.list().subscribe(res => {
      res.data.forEach((r: any) => {
        this.productos.push(r);
      })

    })
    if (!JSON.parse(localStorage.getItem('pedido') as string)) {

      localStorage.setItem('pedido', "[]");
    }

    this.cart = JSON.parse(localStorage.getItem('pedido') as string);
  }

  temporal(p: any) {
    this.pedidos.push(p);
    /* console.log(p); */
    const updatedItems = this.pedidos.map(item => {
      return {
        ...item,
        cant: 1
      };
    });

    localStorage.setItem('temporal', JSON.stringify(updatedItems[0]))

    this.router.navigate(['menu/extra']);

   /*  console.log(updatedItems); */
  }

  //agrega al carrito de pedidos
  add(p: any) {
    //guarda el producto seleccionado en el array pedidos
    this.pedidos.push(p);
    localStorage.setItem('temporal', JSON.stringify(p))
  }
  
}

export class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public precio: number,
    public tipo: string,
    public cant: number
  ) {

  }
}


export class Cart {
  constructor(
    public id: number,
    public nombre: string,
    /*    public img: string, */
    public cant: number,
    public precio: number,
    public total: number
  ) { }
}
