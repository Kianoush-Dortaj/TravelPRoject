import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigmrCodeComponent } from './components/configmr-code/configmr-code.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptService } from 'src/app/core/interceptors/intercept.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AuthComponent, LoginComponent, ConfigmrCodeComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    MatIconModule,
    SharedModule,
    CoreModule,
    Angular2PromiseButtonModule.forRoot(promiseButtonConfig),
    TranslateModule.forChild()
  ],
  providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
	],
})
export class AuthModule { }
