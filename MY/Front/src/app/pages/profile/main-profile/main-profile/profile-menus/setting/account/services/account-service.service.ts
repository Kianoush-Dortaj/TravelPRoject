import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ServerResponse } from './../../../../../../../../core/models/server-response';
import { APP_CONFIG, IAppConfig } from './../../../../../../../../core/config/app.config';

@Injectable({ providedIn: 'root' })

export class AccountService {

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

  GetAccountService(): Observable<ServerResponse<any>> {

    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/profile/GetAccountSetting');
  }

  SetAccountService(id: string,item): Observable<ServerResponse<any>> {

    return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + '/profile/SetAccountSetting/' + id,item);
  }

}
