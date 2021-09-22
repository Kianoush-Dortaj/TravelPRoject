import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntrestComponent } from './components/attribute-category/attribute-category.component';
import { GetAllIntrestResolver } from './services/get-interst.resolver';


const routes: Routes = [
  { path: '', component: IntrestComponent,resolve:{data:GetAllIntrestResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntrestRoutingModule { }
