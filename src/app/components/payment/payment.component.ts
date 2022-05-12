import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { car } from 'src/app/models/car';
import { Carservices } from 'src/app/models/carservices';
import { customer } from 'src/app/models/customer';
import { customer_sell } from 'src/app/models/customer_sell';
import { sell } from 'src/app/models/sell';
import { services } from 'src/app/models/services';
import { Carservice } from 'src/app/service/Carservice';
import { CarServicesservice } from 'src/app/service/CarservicesServices';
import { Customerservice } from 'src/app/service/customerservice';
import { servicesservice } from 'src/app/service/ServicesService';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public customer_sell: customer_sell = new customer_sell();
  public customer: customer = new customer();
  public sell: sell = new sell();
  public CarModel: car = new car();
  public services: services[];
  public Carservices: Carservices[];
  public Car_service: Carservices = new Carservices();
  private idItem = null;
  public editMode = false;
  registerForm: FormGroup;
  submitted = false;
  flagDataSaved = false;
  public costwithservices = 0;


  constructor(private fb: FormBuilder, public customerservice: Customerservice, public carservices: CarServicesservice, public apiservices: servicesservice, public restApi: Carservice, public router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {



    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      cost: ['', Validators.required],
      downpayment: ['', Validators.required],
      sell: ['', Validators.required],
      //username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      //password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      /// confirmPassword: ['', [Validators.required]],
    },
      {
        //  validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );

    this.LoadDataIfParamExist();
    this.apiservices.getAll().subscribe(
      (value: any) => {

        this.services = value.data;

      }
    )


  }

  CreateCarService() {
    this.carservices.createmodel(this.Car_service).subscribe(
      (value: any) => {
        window.location.reload();
      }
    )
  }



  get registerFormControl() {
    return this.registerForm.controls;
  }

  LoadDataIfParamExist() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] > 0) {
        this.idItem = params['id'];
        this.restApi.getById(params['id']).subscribe(
          (value: any) => {
            this.editMode = true;
            this.CarModel = value.data;
            this.costwithservices += this.CarModel.cost;
            this.registerForm.get('cost').setValue(this.costwithservices);

            this.carservices.getById(this.idItem).subscribe(
              (value: any) => {
                this.Carservices = value.data;


                var aux = this.costwithservices;
                var y: number = +aux;
                this.Carservices.forEach(element => {
                  let aux2 = element.cost;
                  let y2: number = +aux2;
                  y += y2;
                });
                this.costwithservices = y;
                this.registerForm.get('cost').setValue(y);

              }
            )

          }
        )
      }
    });
  }


  getStatus(status: any) {

    if (status == 1) {
      return "Yes"
    }
    return "No";
  }

  getdataform() {





    this.customer.name = this.registerForm.get('name').value;
    this.customer.middle_name = this.registerForm.get('middle_name').value;
    this.customer.last_name = this.registerForm.get('last_name').value;
    this.customer.phone = this.registerForm.get('phone').value;
    this.customer.addres = this.registerForm.get('address').value;

    this.sell.cost = this.registerForm.get('cost').value;
    this.sell.downpayment = this.registerForm.get('downpayment').value;
    this.sell.sell = this.registerForm.get('sell').value;
    this.sell.services = this.costwithservices - this.CarModel.cost;
    this.sell.id_car = this.idItem;

    this.customer_sell.customer = this.customer;
    this.customer_sell.sell = this.sell;

  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.getdataform();
      this.flagDataSaved = true;
    }
  }
  onCancel() {
    this.flagDataSaved = false;
  }

  onComplete() {
    //requesthere

    this.customerservice.createmodel(this.customer_sell).subscribe(
      (value: any) => {
        if (value.status === 201) {
          alert("Transaction Complete");
          this.router.navigate(['/Dashboard']);
        }

      }
    )
  }
}
