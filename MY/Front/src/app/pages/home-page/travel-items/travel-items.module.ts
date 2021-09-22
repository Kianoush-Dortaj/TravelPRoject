import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelItemsRoutingModule } from './travel-items-routing.module';
import { TravelItemComponent } from './components/travel-item.component';
import { YouTravelListComponent } from './components/you-travel-list/you-travel-list.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [TravelItemComponent, YouTravelListComponent],
  imports: [
    CommonModule,
    TravelItemsRoutingModule,
    ShareModule
  ],
  entryComponents:[YouTravelListComponent]
})
export class TravelItemsModule { }
