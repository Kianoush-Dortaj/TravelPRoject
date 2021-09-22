
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { ServerResponse } from 'src/app/core/models/server-response';
import { MessageModel } from '../models/messages-model';


@Injectable({ providedIn: 'root' })

export class ChatService {

  private pagingSubject = new Subject<number>();
    public pagingsubject$ = this.pagingSubject.asObservable();

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

  paging(value) {
    this.pagingSubject.next(value);
  }


  playSendAudio() {
    let audio = new Audio();
    audio.src = './../../../../../../../../assets/audio/iphone_send_sms.mp3';
    audio.load();
    audio.play();
  }

  playReciveAudio() {
    let audio = new Audio();
    audio.src = './../../../../../../../../assets/audio/iphone_receive_sms.mp3';
    audio.load();
    audio.play();
  }


  GetAllFreinds(): Observable<ServerResponse<any>> {
    return this.http.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/chat/GetAllFriendsList')
  }

  GetAllMessageByConnectionId(connectionId,paging): Observable<ServerResponse<any>> {
    return this.http.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/chat/GetAllMessageByConnectionId/' + connectionId + '/'+paging)
  }



}
