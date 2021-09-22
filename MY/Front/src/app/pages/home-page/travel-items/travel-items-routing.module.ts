import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelItemComponent } from './components/travel-item.component';
import { GetTravelItemsResolver } from './services/get-travel-items.resolver';
const routes: Routes = [
  { path: '', component: TravelItemComponent, resolve: { items: GetTravelItemsResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelItemsRoutingModule { }
