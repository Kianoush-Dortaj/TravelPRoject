import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { SocketService } from 'src/app/core/services/socket.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MainProfileService } from 'src/app/pages/profile/main-profile/services/main-profile.service';
import { NotificationModel } from '../models/notification-model';

@Component({
  selector: 'toollbar',
  templateUrl: './toollbar.component.html',
  styleUrls: ['./toollbar.component.scss']
})
export class ToollbarComponent implements OnInit {

  notifications: NotificationModel[] = [];
  notificationtype = ['Accept Request ', 'Reject Request', 'Recive Request ', 'Recive Message', 'Change Travel Norification'];
  notificationRoute = ['/profile/menu/user-requests', '/profile/menu/chats', '/profile/menu/user-requests']


  constructor(public authService: AuthService,
    private socket: SocketService,
    private router: Router,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private managerService: MainProfileService) { }

  ngOnInit(): void {
    if (this.authService.isAuthntication()) {
      this.managerService.GetProfileInformation()
        .subscribe(data => {
          this.socket.Join(data.result.id);
        })
      this.managerService.GetAllUnreadNotifications()
        .subscribe(data => {
          this.notifications = data.result.data;
        })
      this.socket.NotificationList()
        .subscribe(data => {
          this.notifications.push({ id: data.id, notificationType: data.notificationType, senderId: data.senderId, senderName: data.senderName })
          this.managerService.playReciveNotificationAudio();
        })
    }
  }

  logOut(): void {
    window.localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  openNotificationList() {
    var x = document.getElementById("notifList");
    if (x.style.display === "none" || !x.style.display) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

}
