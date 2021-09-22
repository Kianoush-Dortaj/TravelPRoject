

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from './../../../../../../../core/config/app.config';
import { ServerResponse } from './../../../../../../../core/models/server-response';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private headers: HttpHeaders;

  private pagingSubject = new Subject<number>();
  public pagingsubject$ = this.pagingSubject.asObservable();

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

  GetAllNotification(page): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/notification/GetAll/'+page);
  }

  ScrollPaging(value) {
    this.pagingSubject.next(value);
  }

}
