import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsManagerRoutingModule } from './claims-manager-routing.module';
import { ClaimsManagerListComponent } from './components/claims-manager-list/claims-manager-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { ClaimsManagerAddComponent } from './components/claims-manager-add/claims-manager-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { A11yModule } from '@angular/cdk/a11y';
import { TreeComponent } from './components/tree/tree.component';
import { EditclaimManagerComponent } from './components/editclaim-manager/editclaim-manager.component';
import { TreeEditComponent } from './components/editclaim-manager/tree/tree.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { ClaimsManagerComponent } from './components/claims-manager/claims-manager.component';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [ClaimsManagerComponent,ClaimsManagerListComponent, ClaimsManagerListComponent, EditclaimManagerComponent, ClaimsManagerAddComponent,TreeEditComponent ,TreeComponent],
  imports: [
    CommonModule,
    ClaimsManagerRoutingModule,
    CoreModule,
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
export class ClaimsManagerModule { }
