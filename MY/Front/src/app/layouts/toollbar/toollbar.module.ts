import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToollbarComponent } from './toollbar/toollbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToollbarRoutingModule} from './toollbar-routing.module';


@NgModule({
  declarations: [ToollbarComponent],
  imports: [
    CommonModule,
    ToollbarRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[ToollbarComponent]
})
export class ToollbarModule { }
