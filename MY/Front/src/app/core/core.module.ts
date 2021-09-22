import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './interceptor/intercept.service';
import { APP_CONFIG, AppConfig } from './config/app.config';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { createDateProvider, getDateFormat } from './services/date-adapte-creator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    { provide: DateAdapter, useFactory: createDateProvider, deps: [MAT_DATE_LOCALE] },
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    },
  ]
})
export class CoreModule { }
