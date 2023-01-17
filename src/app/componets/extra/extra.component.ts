import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ExtraService } from 'src/app/services/extra/extra.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Cart } from '../menu/menu.component';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartComponent } from '../cart/cart.component';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss'],
  providers: [ExtraService, MenuService, CartService]
})
export class ExtraComponent implements OnInit {
  @ViewChild('carrito') carro: CartComponent | undefined;
 
  form: UntypedFormGroup
  prod: Array<any> = []
  producto: any
  extras: Array<any> = []
  cart: Array<Pedido> = []
  carrito: Array<any> = []


  pedidos: Array<Pedido> = []

  constructor(
    private _service: ExtraService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private menuService: MenuService,
    private cartService: CartService,
    private _router: Router,
    private _route: ActivatedRoute

  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargar();
    this._service.list().subscribe((res: any) => {
      res.data.forEach((r: any) => {
        this.extras.push(r);
      })
    })
    this.producto = JSON.parse(localStorage.getItem('temporal') as string)
  }


  cargar() {
    const cartString = localStorage.getItem('pedido');
    if (cartString) {
      try {
        this.carrito = JSON.parse(cartString);
        /*  console.log(this.carrito); */

      } catch (e) {
        console.error(e);
      }
    }
  }
  /*  open(content: any) {
     this.modalService.open(content);
   }
 
   close(content: any) {
     this.modalService.dismissAll(content);
   }
 
   nombre(content: any) {
     console.log(this.form.value);
     this.modalService.dismissAll(content);
   }
   add_extras(e: any, content: any) {
     this.modalService.open(content);
     
     this.add(this.producto, e)
 
   } */

  //agrega al carrito de pedidos
  add(e: any) {
    let p = this.producto
    const cartString = localStorage.getItem('pedido');


    if (cartString) {
      try {
        this.cart = JSON.parse(cartString);


      } catch (e) {
        console.error(e);
      }
    }
    this.pedidos = [
      { id: p.id, nombre: p.nombre, cant: p.cant, extra: e.id, precio_ud: p.precio }
    ];
    localStorage.setItem('temporal', JSON.stringify(p))
    //envia la peticion al backend y retorna con un array
    this.menuService.add(this.pedidos, this.cart).subscribe(res => {
      //alamcena el array retornado en el localstorage
      localStorage.setItem('pedido', JSON.stringify(res.cart));

      this.cart = JSON.parse(localStorage.getItem('pedido') as string);
     


    })

    this.pedidos = [
    ];



    Swal.fire(
      'Cafeteria',
      'Agregado Correctamente',
      'success'
    )
    this._router.navigate(['/menu', { recargar: 1 }])

  }
}
export class Pedido {
  constructor(
    public id: number,
    public nombre: string,
    public precio_ud: number,
    public cant: number,
    public extra: number,
  ) { }
}
