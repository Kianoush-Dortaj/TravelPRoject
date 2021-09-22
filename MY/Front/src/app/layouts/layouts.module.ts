import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import {ToollbarModule} from './../layouts/toollbar/toollbar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToollbarModule,
    LayoutsRoutingModule
  ]
})
export class LayoutsModule { }
