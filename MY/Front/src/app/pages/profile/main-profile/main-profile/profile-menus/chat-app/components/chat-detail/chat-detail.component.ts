import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GetAllFriendsList } from '../../models/get-all-friends-model';
import { ChatService } from '../../services/chat-service.service';
import { SendMessageModel } from './../../models/send-message-detail-model';
import { MessageModel } from './../../models/messages-model';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { SocketService } from 'src/app/core/services/socket.service';


@Component({
  selector: 'chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() info: GetAllFriendsList;

  joinMesage: string;
  sendMessageModel = {} as SendMessageModel;

  messages: MessageModel[] = [];
  userIsTyping: string = null;
  showLoadding = false;
  page: number = 0;

  constructor(private chatService: ChatService,
    private cdRef: ChangeDetectorRef,
    private socket:SocketService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig) { }

  ngOnChanges(): void {
    if (this.info) {
      this.paging();

      this.FetchMessage(this.info.connectionId);
      this.socket.userIsTypeing()
        .subscribe(data => {
          this.userIsTyping = data;
        })
      this.socket.ReciveMessage()
        .subscribe(data => {
          if (data.sender == this.info.sednerId) {
            this.chatService.playReciveAudio();
          }
          this.messages.push(data)
        })
    }
  }

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
    this.FetchMessage(this.info.connectionId);

  }


  sendMessage(message): void {

    this.sendMessageModel.connectinoId = this.info.connectionId;
    this.sendMessageModel.message = message;
    this.sendMessageModel.sender = this.info.userId;
    this.sendMessageModel.reciver = this.info.userId === this.info.sednerId ? this.info.reciverId : this.info.sednerId;
    this.sendMessageModel.userId = this.info.userId;
    this.socket.sendMessage(this.sendMessageModel);
    this.chatService.playSendAudio();

  }

  userTyping(): void {
    this.socket.typing({ connectinoId: this.info.reciverId, userId: this.info.userId });
  }

  stopTyping() {

    setTimeout(() => {
      this.socket.stopTyping({ connectinoId: this.info.reciverId, userId: this.info.userId })
    }, 1000);
  }

  FetchMessage(connectionId): void {
    this.page += 1;
    this.showLoadding = true;
    this.chatService.GetAllMessageByConnectionId(connectionId, this.page).subscribe(data => {
      this.messages = data.result;
      this.showLoadding = false;
    })
  }

  paging() {
    this.showLoadding = true;
    this.chatService.pagingsubject$.subscribe(data => {
      this.chatService.GetAllMessageByConnectionId(this.info.connectionId, data).subscribe(data => {
        let items = data.result.sort((a, b) => (a.sendDate < b.sendDate ? -1 : 1));
        this.messages.unshift(...items);
        this.showLoadding = false;
        this.cdRef.detectChanges();
      })
    })
  }

}
