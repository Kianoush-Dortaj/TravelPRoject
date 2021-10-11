
// import { HttpClient } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import * as io from 'socket.io-client';
// import { NotificationModel } from 'src/app/layouts/toollbar/models/notification-model';
// import { AuthService } from 'src/app/modules/auth/services/auth.service';
// import { APP_CONFIG, IAppConfig } from './../config/app.config';
// import { ServerResponse } from './../models/server-response';


// @Injectable({ providedIn: 'root' })

// export class SocketService {

//   private pagingSubject = new Subject<number>();
//   public pagingsubject$ = this.pagingSubject.asObservable();

//   constructor(private http: HttpClient, private authService: AuthService, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

//   private socket = io('http://localhost:3000', { query: { token: window.localStorage.getItem('access_token') } })


//   Join(data) {
//     this.socket.emit('join', { userId: data })
//   }

//   SendNotification(data) {
//     this.socket.emit('send Notificaiton', data)
//   }
//   sendMessage(data) {
//     this.socket.emit('send private message', data)
//   }

//   typing(data) {
//     this.socket.emit('user typing', data)
//   }

//   stopTyping(data) {
//     this.socket.emit('stop typing', data)
//   }

//   seen(data) {
//     this.socket.emit('seen', data)
//   }

//   sendChangeTravelStatus(data) {
//     this.socket.emit('change travel Status', data)
//   }


//   userIsTypeing(): Observable<any> {
//     let observer = new Observable<any>(observer => {
//       this.socket.on('typing', (data) => {
//         observer.next(data);
//       })
//       return () => { this.socket.disconnect(); }
//     })
//     return observer;
//   }

//   clearUnread(): Observable<any> {
//     let observer = new Observable<any>(observer => {
//       this.socket.on('clear unread', (data) => {
//         observer.next(data);
//       })
//       return () => { this.socket.disconnect(); }
//     })
//     return observer;
//   }

//   changeTravelStatus(): Observable<any> {
//     let observer = new Observable<any>(observer => {
//       this.socket.on('changeStatus', (data) => {
//         observer.next(data);
//       })
//       return () => { this.socket.disconnect(); }
//     })
//     return observer;
//   }

//   ReciveMessage() {

//     let observer = new Observable<any>(observer => {
//       this.socket.on('refresh messages', (data) => {
//         observer.next(data);
//       });
//       return () => { this.socket.disconnect(); }
//     })
//     return observer;
//   }

//   RefreshFriendList() {
//     let observer = new Observable<any>(observer => {
//       this.socket.on('refresh friends', (data) => {
//         observer.next(data);
//       });
//       return () => { this.socket.disconnect(); }
//     })
//     return observer;
//   }

//   NotificationList() {
//     let observer = new Observable<NotificationModel>(observer => {
//       this.socket.on('notification', (data) => {
//         observer.next(data);
//       });
//       return () => { this.socket.disconnect(); }
//     })
//     return observer;
//   }


// }
