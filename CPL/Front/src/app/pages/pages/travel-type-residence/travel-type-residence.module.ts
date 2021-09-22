import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FiltersComponent } from './components/list/filters/filters.component';
import { TravelTyResidenceRoutingModule } from './travel-type-residence-routing.module';

@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent, FiltersComponent],
  imports: [
    CommonModule,
    TravelTyResidenceRoutingModule,
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
export class TravelTyResidencepeModule { }
