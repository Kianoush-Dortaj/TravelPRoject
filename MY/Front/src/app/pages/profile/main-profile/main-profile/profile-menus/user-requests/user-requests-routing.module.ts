import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetAllUserRequestResolver } from './services/get-all-user-request.resolver';
import { UserRequestsComponent } from './components/user-requests.component';

const routes: Routes = [
  { path: '', component: UserRequestsComponent, resolve: { requests: GetAllUserRequestResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRequestsRoutingModule { }
