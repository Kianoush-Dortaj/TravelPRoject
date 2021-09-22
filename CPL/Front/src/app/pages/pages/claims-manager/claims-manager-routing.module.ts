import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimsManagerListComponent } from './components/claims-manager-list/claims-manager-list.component';
import { ClaimsManagerAddComponent } from './components/claims-manager-add/claims-manager-add.component';
import { AddClaimResolver } from './services/add-claim-resolver';
import { EditclaimManagerComponent } from './components/editclaim-manager/editclaim-manager.component';
import { EditResolver } from './services/edit-claim-resolver';


const routes: Routes = [
  {
    path: 'list', component: ClaimsManagerListComponent,
    data: {
      // permission: {
      //   permittedRoles: [':News:GetAllForManager'],
      //   deniedRoles: null
      // } as AuthGuardPermission,
      breadcrumb: 'LIST',
      formName: 'CLAIMS_MAANGER'
    }
    , resolve: { rolesClaims: AddClaimResolver }
  },
  {
    path: 'add', component: ClaimsManagerAddComponent,
    data: {
      // permission: {
      //   permittedRoles: [':News:GetAllForManager'],
      //   deniedRoles: null
      // } as AuthGuardPermission,
      breadcrumb: 'ADD'
    }
  },
  {
    path: ':id/edit', component: EditclaimManagerComponent, data: {
      // permission: {
      //   permittedRoles: [':News:GetAllForManager'],
      //   deniedRoles: null
      // } as AuthGuardPermission,
      breadcrumb: 'EDIT',
      formName: 'CLAIMS_MAANGER'
    }, resolve: { data: EditResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimsManagerRoutingModule { }
