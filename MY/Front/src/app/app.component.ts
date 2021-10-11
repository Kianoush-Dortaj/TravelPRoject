import { Component } from '@angular/core';
import { WebsocketService } from './core/services/websocket.service';
import { AuthService } from './modules/auth/services/auth.service';
import utilService from './core/services/util-service';
import listen  from './core/services/listen-chanel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentTimeFRLocale: string;

  constructor(
    public authService: AuthService,
    private websocketService: WebsocketService) {
      listen.Inital();

  }

  ngOnInit(): void {

    if (this.authService.isAuthntication()) {
      this.websocketService.createObservableSocket("ws://localhost:3256")
        .subscribe((data) => {

          const dataMsg = JSON.parse(data.data);
          utilService.playAudio();

          listen.listen(dataMsg.type);
        },
          (error) => {
            console.log(error)
          },
          () => {
            console.log("the observable stream is complete")
          });

    }

  }
}
