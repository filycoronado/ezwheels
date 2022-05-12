import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReportComponent } from './components/report/report.component';
import { SingupComponent } from './components/singup/singup.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'AddCar', component: NewCarComponent },
  { path: 'AddCar/:id', component: NewCarComponent },
  { path: 'AddService/:id', component: AddServiceComponent },
  { path: 'MakePayment/:id', component: PaymentComponent },
  { path: 'Report', component: ReportComponent },
];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: true }),],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
