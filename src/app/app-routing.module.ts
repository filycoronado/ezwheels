import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/singup/dashboard/dashboard.component';
import { SingupComponent } from './components/singup/singup.component';


const routes: Routes = [
  { path: '', component: SingupComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'Dashboard', component: DashboardComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
