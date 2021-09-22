import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { GetCategorySelectResolve, GetCategoryResolver } from './services';
import { GetAttributeCategoryIdResolver } from './services/get-atribute-by-categoryId-revolve.service';
import { AttributeCategoryComponent } from './components/attribute-category/attribute-category.component';


const routes: Routes = [
  {
    path: '', component: ListComponent, data: {
      breadcrumb: 'LIST',
      formName: 'SIGNALS'
    }
  },
  {
    path: 'list', component: ListComponent, data: {
      breadcrumb: 'LIST',
      formName: 'SIGNALS'
    }
  },
  {
    path: 'add', component: AddComponent, data: {
      breadcrumb: 'ADD',
      formName: 'SIGNALS'
    },
    resolve: { category: GetCategorySelectResolve }
  },
  {
    path: ':id/edit', component: EditComponent, data: {
      breadcrumb: 'EDIT',
      formName: 'SIGNALS'
    },
    resolve: { data: GetCategoryResolver, category: GetCategorySelectResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
