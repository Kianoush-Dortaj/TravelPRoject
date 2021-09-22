import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './components/auth.component';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons';
import {ShareModule} from 'src/app/share/share.module';
import {CoreModule} from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './components/register/confirm/confirm.component';
import { ConfirmSuccessComponent } from './components/register/confirm/confirm-success/confirm-success.component';
import { ConfirmErrorComponent } from './components/register/confirm/confirm-error/confirm-error.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ConfirmComponent, ConfirmSuccessComponent, ConfirmErrorComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule,
    CoreModule,
    Angular2PromiseButtonModule.forRoot({
       // your custom config goes here
       spinnerTpl: '<span class="btn-spinner"></span>',
       // disable buttons when promise is pending
       disableBtn: true,
       // the class used to indicate a pending promise
       btnLoadingClass: 'is-loading',
       // only disable and show is-loading class for clicked button,
       // even when they share the same promise
       handleCurrentBtnOnly: false,
    }),
  ]
})
export class AuthModule { }
