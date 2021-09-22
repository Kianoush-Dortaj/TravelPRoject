import { Component, Inject, OnInit } from '@angular/core';
import { ChatService } from './../../services/chat-service.service';
import { GetAllFriendsList } from './../../models/get-all-friends-model';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import {SocketService} from './../../../../../../../../core/services/socket.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.scss']
})
export class ChatAppComponent implements OnInit {

  joinMesage: { user: any, message: string }[] = [];

  fiends: GetAllFriendsList[] = [];
  selectionChat: GetAllFriendsList;

  constructor(private chatService: ChatService,
    private socket:SocketService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig) {

  }

  ngOnInit(): void {
    this.FetchDate();
    this.socket.userIsTypeing()
      .subscribe(data => {
        let item = this.fiends.find(x => x.sednerId == data)
        if (data) {
          // item.istyping = true;
        }
      })
    this.socket.clearUnread()
      .subscribe(data => {
        let item = this.fiends.find(x => x.connectionId == data);
        item.unreadMessagesCount = 0;
      })
    this.socket.RefreshFriendList().subscribe(data => {
      let item = this.fiends.find(x => (x.reciverId == data.reciver && x.sednerId == data.sender) || (x.reciverId == data.sender && x.sednerId == data.reciver))
      item.lastMessage = data.message;
      item.sendDateLastMesage = data.sendDate;
      if (item.userId == data.reciver) {
        this.chatService.playReciveAudio();
        item.unreadMessagesCount++;
      }
    })
  }

  SetConnectionId(selectionChat) {
    this.selectionChat = selectionChat;
  }

  FetchDate(): void {
    this.chatService.GetAllFreinds().subscribe(data => {
      this.fiends = data.result;
      data.result.map((item) => {
        this.socket.Join({ connectionId: item.userId, userId: item.userId });
      })
    })
  }

  update(index, item) {
    return item;
  }
  sortBy(prop: string) {
    return this.fiends.sort((a, b) => new Date(b[prop]).getTime() - new Date(a[prop]).getTime());
  }

}
