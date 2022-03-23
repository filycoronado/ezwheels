import { Component, OnInit } from '@angular/core';
import { car } from 'src/app/models/car';
import { Carservice } from 'src/app/service/Carservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(public restApi: Carservice) {
   }

  ngOnInit() {
    this.restApi.getAll().subscribe(
      (value: any) => {
        debugger;
        //localStorage.setItem("ezw_token", JSON.stringify(value.data.token)); //store colors
        //this.router.navigate(['/Dashboard']);
      }
    )
  }

}
