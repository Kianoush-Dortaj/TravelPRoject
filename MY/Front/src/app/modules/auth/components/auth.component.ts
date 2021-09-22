import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert-service';
import { AuthService } from './../services/auth.service';
import { RegisterModel } from './../models/register-model';
import { LoginModel } from './../models/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  registerFG: FormGroup;
  loginFG: FormGroup;

  constructor(private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.InitialForm();
    this.InitialFormLogin();


    this.alertService.Error("Salam");
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  InitialForm(): void {
    this.registerFG = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      family: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  InitialFormLogin(): void {
    this.loginFG = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  get f() {
    return this.registerFG.controls;
  }
  onSubmit(): void {
    let registerModel: RegisterModel;
    registerModel = this.registerFG.value;
    this.authService.register(registerModel).subscribe(data => {
      if (data.success) {
        this.alertService.SuccessToast(data.message);
      }
    })
  }

  onSubmitLogin(): void {
    let loginModel: LoginModel;
    loginModel = this.loginFG.value;
    this.authService.login(loginModel).subscribe(data => {
      if (data.success) {
        window.localStorage.setItem('access_token', data.result.token);
        window.localStorage.setItem('displayName', data.result.userInfo.displayName);

        this.router.navigate(['/'])
      }
    })
  }


}
