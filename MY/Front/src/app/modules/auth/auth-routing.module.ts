import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth.component';
import { ConfirmSuccessComponent } from './components/register/confirm/confirm-success/confirm-success.component';
import { ConfirmComponent } from './components/register/confirm/confirm.component';

const routes: Routes = [
  {path:'',component:AuthComponent},
  {path:'confirm/:email/:hash',component:ConfirmComponent},
  {path:'confirm-success',component:ConfirmSuccessComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
