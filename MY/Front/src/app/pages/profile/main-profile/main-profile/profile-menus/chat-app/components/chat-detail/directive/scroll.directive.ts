import { Directive, HostListener, Input } from "@angular/core";
// import { SocketService } from 'src/app/core/services/socket.service';
import { ChatService } from '../../../services/chat-service.service';

@Directive({
  selector: "[appScroll]"
})
export class ScrollDirective {
  pagingNumber = 2;

  constructor(private chatService: ChatService,
    //  private socket: SocketService
     ) { }

  @Input() connectionId;
  @Input() userId;

  @HostListener("scroll", ["$event.target"])
  onScroll(elem) {
    if (elem.scrollTop == 0) {
      this.chatService.paging(this.pagingNumber++)
    }
    if (elem.scrollTop + elem.clientHeight >= elem.scrollHeight) {
      // this.socket.seen({ connectionId: this.connectionId, reciver: this.userId })
    }
  }

}
