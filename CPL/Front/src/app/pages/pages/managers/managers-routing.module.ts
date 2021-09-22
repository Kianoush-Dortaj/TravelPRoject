import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent, AddComponent, EditComponent } from './components';
import { GetManagerResolver } from './services';
import { GetRolesResolver } from './services/get-role-list.resolve.service';
import { GetUserAccessListResolver } from './services/get-user-accessList.service';


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
    }, resolve: { data: GetManagerResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagersRoutingModule { }
