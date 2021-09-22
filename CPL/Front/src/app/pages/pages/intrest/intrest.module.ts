import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntrestRoutingModule } from './intrest-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntrestComponent } from './components/attribute-category/attribute-category.component';


@NgModule({
  declarations: [IntrestComponent],
  imports: [
    CommonModule,
    IntrestRoutingModule,
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
export class IntrestModule { }
