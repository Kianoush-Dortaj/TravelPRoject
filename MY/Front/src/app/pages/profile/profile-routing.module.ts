import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./main-profile/main-profile.module')
      .then(m => m.MainProfileModule)
  },
  {
    path: ':id', loadChildren: () => import('./main-profile/main-profile.module')
      .then(m => m.MainProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
