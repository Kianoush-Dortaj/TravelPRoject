import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { TranslateModule } from '@ngx-translate/core';
import { A11yModule } from '@angular/cdk/a11y';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesAddComponent } from './components/roles-add/roles-add.component';
import { RolesEditComponent } from './components/roles-edit/roles-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { CoreModule } from 'src/app/core/core.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [RolesComponent, RolesListComponent, RolesAddComponent, RolesEditComponent],
  imports: [
	CommonModule,
	CoreModule,
	RolesRoutingModule,
	ReactiveFormsModule,
	FormsModule,
	SecondaryToolbarModule,
    BreadcrumbsModule,
	DpDatePickerModule,
	TranslateModule.forChild(),
	Angular2PromiseButtonModule.forRoot(promiseButtonConfig),
	A11yModule,
   SharedModule
  ]
})
export class RolesModule { }
