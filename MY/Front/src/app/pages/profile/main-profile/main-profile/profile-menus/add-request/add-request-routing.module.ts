import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelResidentSelectResolver } from '../../../services/get-travelResident-list.resolver';
import { TravelTypeSelectResolver } from '../../../services/get-traveltype-list.resolver';
import { GetAllTravelRequestByUserIdResolver } from './services/get-all-travel-reqesut.resolver';
import { AddRequestComponent } from './components/add-request/add-request.component';

const routes: Routes = [
  {
    path: '', component: AddRequestComponent,
    resolve: {
      travelType: TravelTypeSelectResolver,
      travelResident: TravelResidentSelectResolver,
      travelRequests: GetAllTravelRequestByUserIdResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRequestRoutingModule { }
