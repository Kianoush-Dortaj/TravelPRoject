
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from '../../../core/config/app.config';
import { ServerResponse } from '../../../core/models/server-response';
import { RegisterModel } from './../models/register-model';
import { LoginModel } from './../models/login-model';
import { LoginResult } from './../models/login-result';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


  register(item: RegisterModel): Observable<ServerResponse<string>> {
    return this.httpClient.post<ServerResponse<string>>(this.appConfig.apiEndpoint + '/auth/register', item)
  }

  login(item: LoginModel): Observable<ServerResponse<LoginResult>> {
    return this.httpClient.post<ServerResponse<LoginResult>>(this.appConfig.apiEndpoint + '/auth/login', item)
  }

  isAuthntication(): boolean {
    let accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      return true;
    }
    return false;
  }

  confirmCode(hash: string, email: string): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/auth/confirm-email/' + email + '/' + hash);
  }



}
