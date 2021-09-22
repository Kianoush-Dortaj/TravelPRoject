import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainProfileRoutingModule } from './main-profile-routing.module';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { ShareModule } from 'src/app/share/share.module';
import { CoreModule } from 'src/app/core/core.module';
import { SendMessageComponent } from './main-profile/send-message/send-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainProfileComponent, SendMessageComponent],
  imports: [
    CommonModule,
    MainProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ShareModule
  ],
  exports: [MainProfileComponent]
})
export class MainProfileModule { }
