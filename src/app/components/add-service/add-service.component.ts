import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { car } from 'src/app/models/car';
import { Carservices } from 'src/app/models/carservices';
import { services } from 'src/app/models/services';
import { Carservice } from 'src/app/service/Carservice';
import { CarServicesservice } from 'src/app/service/CarservicesServices';
import { servicesservice } from 'src/app/service/ServicesService';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  public CarModel: car = new car();
  public services: services[];
  public Carservices: Carservices[];
  public Car_service: Carservices = new Carservices();
  private idItem = null;
  public editMode = false;
  registerForm: FormGroup;
  submitted = false;



  constructor(private fb: FormBuilder, public carservices: CarServicesservice, public apiservices: servicesservice, public restApi: Carservice, public router: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.LoadDataIfParamExist();
    this.registerForm = this.fb.group({
      service: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],


      //username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      //password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      /// confirmPassword: ['', [Validators.required]],
    },
      {
        //  validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
    this.apiservices.getAll().subscribe(
      (value: any) => {

        this.services = value.data;
      }
    )
    this.carservices.getById(this.idItem).subscribe(
      (value: any) => {
        this.Carservices = value.data;
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
    this.Car_service.id_car = this.idItem;
    this.Car_service.in_date =  new Date().toDateString();
    this.Car_service.id_service = this.registerForm.get('service').value;
    this.Car_service.description = this.registerForm.get('description').value;
    this.Car_service.cost = this.registerForm.get('cost').value;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.getdataform();
      this.CreateCarService();
    }
  }

}
