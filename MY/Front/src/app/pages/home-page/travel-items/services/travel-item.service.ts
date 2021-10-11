
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../../../core/config/app.config';
import { ServerResponse } from '../../../../core/models/server-response';
import { TravelItemModel } from './../models/travel-item-model';

@Injectable({ providedIn: 'root' })

export class TravelItemsService {

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


  GetAllTravelItems(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/GetAll')
  }

  GetAllReciveRequest(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/GetAllUserRequest')
  }

  SendRequest(item): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/Create', item);
  }

  ConfirmRequest(requestId, status): Observable<ServerResponse<any>> {
    return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/ConfirmRequest',
      { requestId: requestId, status: status });
  }

  RejectRequest(requestId , status): Observable<ServerResponse<any>> {
    return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/RejectRequest',
     { requestId: requestId , status: status  });
  }

  DeleteRequest(requestId: string): Observable<ServerResponse<any>> {
    return this.httpClient.delete<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/Delete/' + requestId);
  }

  GetAllUserTravelREquest(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/GetAllByUserId');
  }




}
