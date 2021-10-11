import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MainProfileService } from 'src/app/pages/profile/main-profile/services/main-profile.service';
import { NotificationModel } from '../models/notification-model';
import { WebsocketService } from './../../../core/services/websocket.service';
import { InitialWebsocket } from './../../../core/models/websocket/initial';
import { WebsocketType } from 'src/app/core/models/websocket/websocket-type';
import listen  from 'src/app/core/services/listen-chanel';
import { Observable } from 'src/app/core/services/Pattern/Observer/Observable';
import { RequestClient } from 'src/app/core/services/Pattern/Observer/RequestClient';
import { IObserver } from 'src/app/core/services/Pattern/Observer/IObserver';

@Component({
  selector: 'toollbar',
  templateUrl: './toollbar.component.html',
  styleUrls: ['./toollbar.component.scss']
})
export class ToollbarComponent implements OnInit {

  notifications: NotificationModel[] = [];
  notificationtype = ['Accept Request ', 'Reject Request', 'Recive Request ', 'Recive Message', 'Change Travel Norification'];
  notificationRoute = ['/profile/menu/user-requests', '/profile/menu/chats', '/profile/menu/user-requests']

  requestClient: RequestClient;
  observable: IObserver;

  constructor(
    public authService: AuthService,
    private websocketService: WebsocketService,
    private router: Router,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private managerService: MainProfileService) {


    this.requestClient = new RequestClient();
    this.observable = listen.Attach<RequestClient>(this.requestClient);

  }

  ngOnInit(): void {

    if (this.authService.isAuthntication()) {

      this.managerService.GetProfileInformation()
        .subscribe(data => {

          this.websocketService.sendMessage<InitialWebsocket>({
            type: WebsocketType.Initial,
            userId: data.result.data.id
          });

        });

      this.managerService.GetAllUnreadNotifications()
        .subscribe(data => {
          this.notifications = data.result.data;
        });

    }
    console.log('XXXXXX', this.requestClient.);
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
