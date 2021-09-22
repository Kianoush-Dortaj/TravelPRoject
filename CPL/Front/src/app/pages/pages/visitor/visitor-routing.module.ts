import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent, AddComponent, EditComponent } from './components';
import { GetRolesResolver } from './services/get-role-list.resolve.service';
import { GetVisitorResolver } from './services';


const routes: Routes = [
  {
    path: '', component: ListComponent, data: {
      breadcrumb: 'LIST',
      formName: 'MANAGERS'
    }
  },
  {
    path: 'list', component: ListComponent, data: {
      breadcrumb: 'LIST',
      formName: 'MANAGERS'
    }
  },
  {
    path: 'add', component: AddComponent, data: {
      breadcrumb: 'ADD',
      formName: 'MANAGERS'
    }
  },
  {
    path: ':id/edit', component: EditComponent, data: {
      breadcrumb: 'EDIT',
      formName: 'MANAGERS'
    }, resolve: { data: GetVisitorResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
