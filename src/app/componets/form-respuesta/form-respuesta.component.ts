import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebpayResponse } from 'src/app/interfaces/webpay_response';
import { WebpayRespuesta } from 'src/app/interfaces/webpay_respuesta';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { WebpayService } from 'src/app/services/webpay/webpay.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-form-respuesta',
  templateUrl: './form-respuesta.component.html',
  styleUrls: ['./form-respuesta.component.scss'],
  providers: [WebpayService, PedidosService]
})
export class FormRespuestaComponent implements OnInit {

  webpayRes!: WebpayRespuesta
  pedido: any;
  modelo!: WebpayResponse
  total: number = 0
  constructor(
    private route: ActivatedRoute,
    private _services: WebpayService,
    private _pedidos: PedidosService
  ) { }

  ngOnInit(): void {
    localStorage.setItem('pedido', "[]");
    let params: any = this.route.snapshot.queryParams
    this.modelo = { token_ws: params.token_ws }
    this.verEstado(this.modelo)


  }
  buscarPedido(buy_order: string) {
    this._pedidos.buscarPedidos(buy_order).subscribe(result => {

      this.pedido = result.pedido

      /* this.generatePdf(this.pedido) */


    })

  }
  verEstado(modelo: WebpayResponse) {
    this._services.webpayVerEstado(modelo).subscribe(
      {
        next: data => {
          this.webpayRes = data;
          this.buscarPedido(this.webpayRes.buy_order)

        },
        error: error => {
        }
      }
    )
  }


  generatePdf(pedido: any) {
    /* console.log(pedido.productos[0]); */

    let now = new Date();
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(20, 20, 'Ticket de venta');
    pdf.setFontSize(14);
    pdf.text(20, 30, 'Nombre del cliente: ' + pedido.cliente);
    pdf.text(20, 40, 'Fecha de compra: ' + now.getTime());
    pdf.text(20, 50, 'Artículos:');
    let y = 60;
    for (const item of pedido.productos[0]) {
      console.log(item.detalles_pedidos.cantidad);

      pdf.text(30, y, item.nombre + ' x ' + item.detalles_pedidos.cantidad + ' @ ' + item.precio);
      y += 10;
      this.total = this.total + item.detalles_pedidos.precio_total
    }


    pdf.text(20, y, 'Total: ' + this.total);
    pdf.save('Ticket_de_compra.pdf');
  }

}
