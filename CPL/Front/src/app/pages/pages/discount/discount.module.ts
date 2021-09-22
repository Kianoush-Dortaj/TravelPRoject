import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { FilterComponent } from './components/list/filter/filter.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { DiscountRoutingModule } from './discount-routing.module';


@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, FilterComponent],
  imports: [
    CommonModule,
    DiscountRoutingModule,
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
export class DiscountModule { }
