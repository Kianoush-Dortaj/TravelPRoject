import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRequestComponent } from './components/add-request/add-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRequestRoutingModule } from './add-request-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [AddRequestComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    ShareModule,
    AddRequestRoutingModule
  ]
})
export class AddRequestModule { }
