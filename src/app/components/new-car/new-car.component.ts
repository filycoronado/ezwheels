import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { car } from 'src/app/models/car';
import { login } from 'src/app/models/login';
import { Carservice } from 'src/app/service/Carservice';
import { loginservice } from 'src/app/service/loginService';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.sass'],

})
export class NewCarComponent implements OnInit {

  private CarModel: car = new car();
  private idItem = null;
  public editMode = false;
  registerForm: FormGroup;
  submitted = false;



  constructor(private fb: FormBuilder, public restApi: Carservice, public router: Router, private activatedRoute: ActivatedRoute,) { }



  ngOnInit() {


    this.registerForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      vin: ['', Validators.required],
      type: ['', Validators.required],
      miles: ['', Validators.required],
      cost_value: ['', Validators.required],
      sell_value: ['', Validators.required],
      //username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      //password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      /// confirmPassword: ['', [Validators.required]],
    },
      {
        //  validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
    this.LoadDataIfParamExist();
  }

  LoadDataIfParamExist() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] > 0) {
        this.idItem = params['id'];
        this.restApi.getById(params['id']).subscribe(
          (value: any) => {
            this.editMode = true;
            this.CarModel = value.data;
            this.setDataForm();
          }
        )
      }
    });
  }


  create(dataObject: any) {
    this.restApi.create(dataObject).subscribe(
      (value: any) => {
        //localStorage.setItem("ezw_token", JSON.stringify(value.data.token)); //store colors
        this.router.navigate(['/Dashboard']);
      }
    )
  }

  update(dataObject: any) {
    this.restApi.update(this.idItem, dataObject).subscribe(
      (value: any) => {
        this.router.navigate(['/Dashboard']);
      }
    )
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  setDataForm() {
    this.registerForm.get('make').setValue(this.CarModel.make);
    this.registerForm.get('model').setValue(this.CarModel.model);
    this.registerForm.get('year').setValue(this.CarModel.year);
    this.registerForm.get('vin').setValue(this.CarModel.vin);
    this.registerForm.get('type').setValue(this.CarModel.type);
    this.registerForm.get('miles').setValue(this.CarModel.miles);
    this.registerForm.get('cost_value').setValue(this.CarModel.cost);
    this.registerForm.get('sell_value').setValue(this.CarModel.sell);
  }
  getdataform() {
    this.CarModel.make = this.registerForm.get('make').value;
    this.CarModel.model = this.registerForm.get('model').value;
    this.CarModel.year = this.registerForm.get('year').value;
    this.CarModel.vin = this.registerForm.get('vin').value;
    this.CarModel.type = this.registerForm.get('type').value;
    this.CarModel.miles = this.registerForm.get('miles').value;
    this.CarModel.cost = this.registerForm.get('cost_value').value;
    this.CarModel.sell = this.registerForm.get('sell_value').value;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.getdataform();
      if (this.editMode == false) {
        this.create(this.CarModel);
      } else {
        this.update(this.CarModel);
      }

    }
  }

}
