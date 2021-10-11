

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from './../../../../core/config/app.config';
import { ServerResponse } from './../../../../core/models/server-response';
import {NotificationModel} from './../../../../layouts/toollbar/models/notification-model';
import { Observable } from 'rxjs';
import { GetProfileInfoModel } from '../models/get-information-model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MainProfileService {

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


  GetProfileInformation(): Observable<any> {
    return this.httpClient.get<any>(this.appConfig.apiEndpoint + '/profile/GetProfileInfo')
  }

  GetOtherProfileInformation(id): Observable<ServerResponse<GetProfileInfoModel>> {
    return this.httpClient.get<ServerResponse<GetProfileInfoModel>>(this.appConfig.apiEndpoint + '/profile/Information/' + id)
  }

  GetAllUnreadNotifications(): Observable<any> {
    return this.httpClient.get<any>(this.appConfig.apiEndpoint + '/notification/GetAllUnread')
  }

  playReciveNotificationAudio() {
    let audio = new Audio();
    audio.src = './../../../../../assets/audio/goes-without-saying-608.mp3';
    audio.load();
    audio.play();
  }


  UploadBanner(item: File): Observable<any> {
    const Url = `${this.appConfig.apiEndpoint}/profile/UploadPoster`;
    const formData: FormData = new FormData();
    formData.append('poster', item, item.name);
    return this.httpClient
      .post(Url, formData, { headers: this.headers })
      .pipe(map(response => response || {} as HttpEvent<any>));
  }

  SendMessage(item): Observable<ServerResponse<any>> {
    const Url = `${this.appConfig.apiEndpoint}/chat/sendFriendRequest`;
    return this.httpClient
      .post<ServerResponse<any>>(Url, item);
  }

  GetTravelTypeService(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelType/select');
  }

  GetTravelResidentService(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelResidence/select');
  }


  UploadAvatar(item: File): Observable<any> {
    const Url = `${this.appConfig.apiEndpoint}/profile/UploadAvatar`;
    const formData: FormData = new FormData();
    formData.append('avatar', item, item.name)
    return this.httpClient
      .post(Url, formData, { headers: this.headers })
      .pipe(map(response => response || {} as HttpEvent<any>));
  }
}
