import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { GetTravelTypeResolver } from '../travel-type/services';

const routes: Routes = [
  {
    path: '', component: ListComponent, data: {
      breadcrumb: 'LIST',
      formName: 'SIGNALS'
    }
  },
  {
    path: 'list', component: ListComponent, data: {
      breadcrumb: 'LIST',
      formName: 'SIGNALS'
    }
  },
  {
    path: 'add', component: AddComponent, data: {
      breadcrumb: 'ADD',
      formName: 'SIGNALS'
    }
  },
  {
    path: ':id/edit', component: EditComponent, data: {
      breadcrumb: 'EDIT',
      formName: 'SIGNALS'
    },
    resolve: { data: GetTravelTypeResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelTyResidenceRoutingModule { }
