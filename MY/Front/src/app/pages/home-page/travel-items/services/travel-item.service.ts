
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


  GetAllTravelItems(): Observable<ServerResponse<TravelItemModel[]>> {
    return this.httpClient.get<ServerResponse<TravelItemModel[]>>(this.appConfig.apiEndpoint + '/request/GetAll')
  }

  SendRequest(item): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/addRequest',item);
  }

  ConfirmRequest(requestId): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/ConfirmRequest',
      { requestId: requestId});
  }

  RejectRequest(requestId): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/RejectRequest',  { requestId: requestId});
  }

  DeleteRequest(id): Observable<ServerResponse<any>> {
    return this.httpClient.delete<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/cancelRequest/' + id);
  }

  GetAllUserTravelREquest(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/request/GetAllUserTravelRequest');
  }




}
