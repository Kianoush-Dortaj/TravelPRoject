import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { promiseButtonConfig } from 'src/app/core/configs/promise-botton.config';
import { CoreModule } from 'src/app/core/core.module';
import { ChangePasswordComponent } from './components/edit/change-password/change-password.component';
import { ChangeRoleComponent } from './components/edit/change-role/change-role.component';
import { ChangePersonalInfoComponent } from './components/edit/change-personal-info/change-personal-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ChangeAccountInfoComponent } from './components/edit/change-account-info/change-account-info.component';
import { AddComponent, EditComponent, ListComponent, FitlerComponent } from './components';
import { VisitorRoutingModule } from './visitor-routing.module';


@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent, FitlerComponent, ChangePasswordComponent, ChangeRoleComponent, ChangePersonalInfoComponent, ChangeAccountInfoComponent],
  imports: [
    CommonModule,
    VisitorRoutingModule,
    MaterialFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    SecondaryToolbarModule,
    TranslateModule.forChild(),
    SharedModule,
    CoreModule,
    BreadcrumbsModule,
    Angular2PromiseButtonModule.forRoot(promiseButtonConfig)
  ],
  providers:[DatePipe]
})
export class VisitorModule { }
