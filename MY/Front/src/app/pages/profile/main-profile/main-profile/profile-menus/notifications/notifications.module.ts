import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './components/notifications.component';
import { ShareModule } from 'src/app/share/share.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    ShareModule,
    CoreModule
  ]
})
export class NotificationsModule { }
