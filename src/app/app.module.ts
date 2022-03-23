import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { SingupComponent } from './components/singup/singup.component';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardComponent } from './components/singup/dashboard/dashboard.component';
import { AuthInterceptor } from './service/AuthInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    DashboardComponent,


  ],
  imports: [
    BrowserModule,
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
