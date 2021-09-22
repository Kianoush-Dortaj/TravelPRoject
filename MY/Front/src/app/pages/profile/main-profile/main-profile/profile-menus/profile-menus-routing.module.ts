import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'request', loadChildren: () => import('./add-request/add-request.module')
      .then(m => m.AddRequestModule),
  },
  {
    path: 'chats', loadChildren: () => import('./chat-app/chat-app.module')
      .then(m => m.ChatAppModule),
  },
  {
    path: 'gallery', loadChildren: () => import('./gallery/gallery.module')
      .then(m => m.GalleryCModule),
  },
  {
    path: 'setting', loadChildren: () => import('./setting/setting.module')
      .then(m => m.SettingModule),
  },
  {
    path: 'user-requests', loadChildren: () => import('./user-requests/user-requests.module')
      .then(m => m.UserRequestsModule),
  },
  {
    path: 'notifications', loadChildren: () => import('./notifications/notifications.module')
      .then(m => m.NotificationsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileMenusRoutingModule { }
