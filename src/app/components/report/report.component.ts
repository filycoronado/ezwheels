import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { car } from 'src/app/models/car';
import { login } from 'src/app/models/login';
import { params } from 'src/app/models/params';
import { Carservice } from 'src/app/service/Carservice';
import { Customerservice } from 'src/app/service/customerservice';
import { loginservice } from 'src/app/service/loginService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {


  public params: params = new params();
  registerForm: FormGroup;
  submitted = false;
  public list: any[] = [];
  public profit: any;

  constructor(private fb: FormBuilder, public apicustomer: Customerservice, public restApi: Carservice, public router: Router, private activatedRoute: ActivatedRoute,) { }



  ngOnInit() {


    this.registerForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      //username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      //password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      /// confirmPassword: ['', [Validators.required]],
    },
      {
        //  validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );

  }



  get registerFormControl() {
    return this.registerForm.controls;
  }

  getdataform() {
    this.params.start_date = this.registerForm.get('start_date').value;
    this.params.end_date = this.registerForm.get('end_date').value;
  }
onPrint(){
  window.print();
}
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.getdataform();
      this.apicustomer.getSales(this.params).subscribe(
        (value: any) => {
          this.list = value.data;
          this.profit = value.profit;
        }
      )
    }
  }
}
