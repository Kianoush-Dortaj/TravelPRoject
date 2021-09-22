import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account.component';
import { GetAccountSettingResolver } from './services/get-account-service.resolver';

const routes: Routes = [
  { path: '', component: AccountComponent, resolve: { info: GetAccountSettingResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
