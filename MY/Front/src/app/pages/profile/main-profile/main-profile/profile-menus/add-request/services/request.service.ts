

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from './../../../../../../../core/config/app.config';
import { ServerResponse } from './../../../../../../../core/models/server-response';
import {TravelRequestUpdateModel} from './../models/TravelRequestUpdateModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RequestService {

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

  GetTravelTypeService(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelType/select');
  }

  GetTravelResidentService(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelResident/select');
  }

  CreateRequest(item): Observable<ServerResponse<any>> {
    return this.httpClient.post<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/Create', item);
  }

  UpdateRequest(item: TravelRequestUpdateModel, id: string): Observable<ServerResponse<any>> {
    return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/Update/' + id, item);
  }

  GetAllTravelRequestByUserId(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/GetAllByUserId');
  }

  DeleteRequest(id): Observable<ServerResponse<any>> {
    return this.httpClient.delete<ServerResponse<any>>(this.appConfig.apiEndpoint + '/travelRequest/Delete/' + id);
  }

}
