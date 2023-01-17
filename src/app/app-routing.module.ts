import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraComponent } from './componets/extra/extra.component';
import { FormRespuestaComponent } from './componets/form-respuesta/form-respuesta.component';
import { FormComponent } from './componets/form/form.component';
import { MenuComponent } from './componets/menu/menu.component';
import { PdfComponent } from './componets/pdf/pdf.component';

const routes: Routes = [
  {
    path: 'menu', component: MenuComponent

  },
  { path: 'menu/extra', component: ExtraComponent },
  { path: 'pagar', component: FormComponent },
  { path: 'webpay_respuesta', component: FormRespuestaComponent },
  { path: 'pdf', component: PdfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
