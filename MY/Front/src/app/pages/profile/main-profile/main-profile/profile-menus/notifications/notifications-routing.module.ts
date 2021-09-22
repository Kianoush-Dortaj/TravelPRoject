import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from './components/notifications.component';
import { GetAllNotificationsResolver } from './services/get-all-notification.resolver';

const routes: Routes = [
  { path: '', component: NotificationsComponent, resolve: { getAll: GetAllNotificationsResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
