import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WebpayRequest } from 'src/app/interfaces/webpay_request';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  clientName = "Juan"
  purchaseDate = "25/01/2023"
  cart: Array<any> = [];
  total = 1000
  modelo: WebpayRequest = { amount: 0 }
  constructor() {
    this.generatePdf();
  }
  ngOnInit(): void {
  }

  generatePdf() {
    this.cargar()
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(20, 20, 'Boleta Electrónica');
    pdf.setFontSize(14);
    pdf.text(20, 30, 'Nombre del cliente: ' + this.clientName);
    pdf.text(20, 40, 'Fecha de compra: ' + this.purchaseDate);
    pdf.text(20, 50, 'Artículos:');
    let y = 60;
    for (const item of this.cart) {
      pdf.text(30, y, item.nombre + ' x ' + item.cant + ' @ ' + item.precio);
      y += 10;
    }
    pdf.text(20, y, 'Total: ' + this.modelo.amount);
    pdf.save('Ticket_de_compra.pdf');
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
