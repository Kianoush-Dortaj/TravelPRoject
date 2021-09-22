import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RolesListComponent, RolesAddComponent, RolesEditComponent } from './components';
import { RoleResolverService } from './services';
import { AddClaimResolver } from '../claims-manager/services/add-claim-resolver';
import { AuthGuardPermission } from 'src/app/core/auth/services/models/auth-guard-permission';
import { EditResolver } from '../claims-manager/services/edit-claim-resolver';


const routes: Routes = [
	{
		path: '', component: RolesComponent
		, data: {
			// permission: {
			// 	permittedRoles: [':RolesManager:GetAll'],
			// 	deniedRoles: null
			// } as AuthGuardPermission,
			breadcrumb: 'LIST',
			formName: 'ROLES'
		}
	},
	{
		path: 'list', component: RolesListComponent
		, data: {
			// permission: {
			// 	permittedRoles: [':RolesManager:GetAll'],
			// 	deniedRoles: null
			// } as AuthGuardPermission,
			breadcrumb: 'LIST',
			formName: 'ROLES'
		}
	},
	{
		path: 'add', component: RolesAddComponent, data: {
			// permission: {
			// 	permittedRoles: [':RolesManager:AddRole'],
			// 	deniedRoles: null
			// } as AuthGuardPermission,
			breadcrumb: 'ADD',
			formName: 'ROLES'
		}
		, resolve: { rolesClaims: AddClaimResolver }
	},
	{
		path: ':id/edit', component: RolesEditComponent
		, data: {
			// permission: {
			// 	permittedRoles: [':RolesManager:EditRole'],
			// 	deniedRoles: null
			// } as AuthGuardPermission,
			breadcrumb: 'EDIT',
			formName: 'ROLES'
		},
		resolve: { role: RoleResolverService,rolesClaims: EditResolver }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RolesRoutingModule { }
