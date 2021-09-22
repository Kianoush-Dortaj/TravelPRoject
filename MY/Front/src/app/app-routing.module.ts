import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./../app/modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: '', loadChildren: () => import('./../app/pages/pages.module')
      .then(m => m.PagesModule)
  },
  {
    path: 'home', loadChildren: () => import('./../app/pages/pages.module')
      .then(m => m.PagesModule)
  },
  {
    path: 'profile', loadChildren: () => import('./../app/pages/profile/profile.module')
      .then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
