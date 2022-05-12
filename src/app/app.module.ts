import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingupComponent } from './components/singup/singup.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './service/AuthInterceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReportComponent } from './components/report/report.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) ={};


@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    DashboardComponent,
    NewCarComponent,
    AddServiceComponent,
    PaymentComponent,
    ReportComponent,

  ],
  imports: [

    BrowserModule,
    NgxMaskModule.forRoot(options),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AppRoutingModule,



  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
