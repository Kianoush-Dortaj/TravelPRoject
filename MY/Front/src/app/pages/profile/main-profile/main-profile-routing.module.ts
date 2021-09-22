import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainProfileComponent } from './main-profile/main-profile.component';
import { GetUserInfoResolver } from './services/get-info.resolver';
import { TravelTypeSelectResolver } from './services/get-traveltype-list.resolver';
import { TravelResidentSelectResolver } from './services/get-travelResident-list.resolver';


const routes: Routes = [
  {
    path: '', component: MainProfileComponent,
    children: [
      {
        path: 'menu', loadChildren: () => import('./main-profile/profile-menus/profile-menus.module')
          .then(m => m.ProfileMenusModule)
      }
    ],
    resolve: {
      info: GetUserInfoResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainProfileRoutingModule { }
