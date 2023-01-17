import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componets/header/header.component';
import { MenuComponent } from './componets/menu/menu.component';
import { CartComponent } from './componets/cart/cart.component';
import { ExtraComponent } from './componets/extra/extra.component';
//consultas https
import { HttpClientModule } from '@angular/common/http';
//formularios
/* import { FormsModule, ReactiveFormsModule } from '@angular/forms'; */
import { ModalComponent } from './componets/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './componets/form/form.component';
import { FormRespuestaComponent } from './componets/form-respuesta/form-respuesta.component';
import { CurrencyChilePipe } from 'src/app/pipes/currency.pipe';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { PdfComponent } from './componets/pdf/pdf.component';


registerLocaleData(localeEsCl);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    CartComponent,
    ExtraComponent,
    ModalComponent,
    FormComponent,
    FormRespuestaComponent,
    CurrencyChilePipe,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
/*     FormsModule,
    ReactiveFormsModule, */
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
