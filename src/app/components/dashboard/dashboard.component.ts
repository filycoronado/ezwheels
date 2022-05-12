import { Component, OnInit } from '@angular/core';
import { car } from 'src/app/models/car';
import { Carservice } from 'src/app/service/Carservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public cars: car[];
  constructor(public restApi: Carservice) {
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  getFile() {
    let BR = (<HTMLInputElement>document.getElementById('files')).files[0];
    this.getBase64(BR).then(
      data => {
        console.log(data)
        this.restApi.Loadcars(data).subscribe(
          (value: any) => {
            alert(value.message);
            window.location.reload();
          }
        )
      }


    );
  }
  onUpload() {
    this.getFile();

  }



  getStatus(status: any) {

    if (status == 1) {
      return "Yes"
    }
    return "No";
  }
  ngOnInit() {
    this.restApi.getAll().subscribe(
      (value: any) => {
        this.cars = value.data;
        //localStorage.setItem("ezw_token", JSON.stringify(value.data.token)); //store colors
        //this.router.navigate(['/Dashboard']);
      }
    )
  }

}
