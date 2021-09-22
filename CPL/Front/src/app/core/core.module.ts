import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { APP_CONFIG, AppConfig } from './configs/app.config';
import { BrowserStorageService, AuthGuard } from './auth/services';
import { AlertService } from './services/alert.servise';
import { RouterExtService } from './services/route-exect-service';
import { HttpInterceptorServise } from './interceptors/httpinterceptor.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './services/custom-mat-paginator-config';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { createDateProvider, getDateFormat } from './services/date-adapte-creator';
import { PERSIAN_DATE_FORMATS } from './services/material.persian-date.adapter';



@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		MaterialFileInputModule,
		TranslateModule.forChild()
	],
	providers: [
		// { provide: ErrorHandler, useClass: AppErrorHandler },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{ provide: DateAdapter, useFactory: createDateProvider, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useFactory: getDateFormat },
		{
			provide: MatPaginatorIntl,
			useClass: CustomMatPaginatorIntl
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorServise,
			multi: true
		},
		{
			provide: APP_CONFIG,
			useValue: AppConfig
		},
		BrowserStorageService, AlertService, AuthGuard, RouterExtService
	]
})
export class CoreModule {
	// constructor(@Optional() @SkipSelf() core: CoreModule) {
	//   if (core) {
	//     throw new Error("CoreModule should be imported ONLY in AppModule.");
	//   }
	// }
}
