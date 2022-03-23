import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/models/login';
import { loginservice } from 'src/app/service/loginService';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.sass'],
  providers: [loginservice]

})
export class SingupComponent implements OnInit {
  private loginModel: login = new login();
  registerForm: FormGroup;
  submitted = false;



  constructor(private fb: FormBuilder, public restApi: loginservice<login>, public router: Router) { }



  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      //username: ['', [Validators.required], this.customValidator.userNameValidator.bind(this.customValidator)],
      //password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      /// confirmPassword: ['', [Validators.required]],
    },
      {
        //  validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  login(dataEmployee: any) {
    this.restApi.login(dataEmployee).subscribe(
      (value:any) => {
        localStorage.setItem("ezw_token", JSON.stringify(value.data.token)); //store colors
        this.router.navigate(['/Dashboard']);
      }
    )
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
  getdataform() {
    this.loginModel.username = this.registerForm.get('username').value;
    this.loginModel.password = this.registerForm.get('password').value;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.getdataform();
      this.login(this.loginModel);

    }
  }

}
