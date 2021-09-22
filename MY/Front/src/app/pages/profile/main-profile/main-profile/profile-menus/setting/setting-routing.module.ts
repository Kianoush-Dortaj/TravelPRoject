import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './components/setting.component';

const routes: Routes = [
  { path: '', component: SettingComponent,children:[
    {
      path: 'account', loadChildren: () => import('./account/account.module')
        .then(m => m.AccountModule)
    }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
