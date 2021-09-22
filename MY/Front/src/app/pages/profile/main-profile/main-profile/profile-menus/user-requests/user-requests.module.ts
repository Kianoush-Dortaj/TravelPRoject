import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRequestsRoutingModule } from './user-requests-routing.module';
import { UserRequestsComponent } from './components/user-requests.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [UserRequestsComponent],
  imports: [
    CommonModule,
    UserRequestsRoutingModule,
    ShareModule,
  ]
})
export class UserRequestsModule { }
