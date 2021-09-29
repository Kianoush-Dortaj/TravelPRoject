import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelItemsRoutingModule } from './travel-items-routing.module';
import { TravelItemComponent } from './components/travel-item.component';
import { YouTravelListComponent } from './components/you-travel-list/you-travel-list.component';
import { ShareModule } from 'src/app/share/share.module';
import { ReqiveRequestListComponent } from './components/reqive-request-list/reqive-request-list.component';


@NgModule({
  declarations: [TravelItemComponent, YouTravelListComponent, ReqiveRequestListComponent],
  imports: [
    CommonModule,
    TravelItemsRoutingModule,
    ShareModule
  ],
  entryComponents: [YouTravelListComponent, ReqiveRequestListComponent]
})
export class TravelItemsModule { }
