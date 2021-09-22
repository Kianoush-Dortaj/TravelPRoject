
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from './../../../../../../../core/config/app.config';
import { ServerResponse } from './../../../../../../../core/models/server-response';

@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

  GetAllUserTravelRequest(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/GetAllByUserId')
  }

  GetAllMyTravelRequest(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/GetAllMyRequest')
  }

  GetAllReciveTravelRequest(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/GetAllReciveRequest')
  }


  ConfirmRequest(requestId): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/ConfirmRequestById',
      { requestId: requestId});
  }

  RejectRequest(requestId): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/RejectRequestById',  { requestId: requestId});
  }

}
