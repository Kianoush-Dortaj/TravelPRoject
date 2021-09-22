import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { CoreModule } from 'src/app/core/core.module';
import { AccountOptionComponent } from './setting/account-option/components/account-option.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemSettingComponent } from './setting/system-setting/components/system-setting.component';
import { RegisterSettingComponent } from './setting/register-setting/components/register-setting.component';


@NgModule({
  declarations: [SettingComponent, AccountOptionComponent, SystemSettingComponent, RegisterSettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    SecondaryToolbarModule,
    TranslateModule.forChild(),
    SharedModule,
    CoreModule,
    BreadcrumbsModule,
    Angular2PromiseButtonModule.forRoot(promiseButtonConfig)
  ]
})
export class SettingModule { }
