import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryToolbarComponent } from './secondary-toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { ContainerModule } from '../../directives/container/container.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SecondaryToolbarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconModule,
    RouterModule,
    MatButtonModule,
    TranslateModule.forChild(),
    MatIconModule,
    BreadcrumbsModule,
    ContainerModule
  ],
  exports: [SecondaryToolbarComponent]
})
export class SecondaryToolbarModule {
}

