import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription, timer, BehaviorSubject } from 'rxjs';

import { map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BrowserStorageService } from './browser-storage.Service';
import { ToastrService } from 'ngx-toastr';
import { isFunction } from 'util';
import { ValidationAuthTokenUser } from './validate-auth-token';
import { AlertService } from '../../services/alert.servise';
import { APP_CONFIG, IAppConfig } from '../../configs/app.config';
import { Credentials } from './models/credentials';
import { LoginModel } from './models/login-model';
import { SendTokenValue } from '../../models/send-refreshToken-value';
import { User } from './models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private authService: ValidationAuthTokenUser,
        private alertService: AlertService,
        private router: Router,
        private browserStorageService: BrowserStorageService,
        @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


    // method for reftreshToken

    // Authentication/Authorization

    login(credentials: Credentials): Observable<boolean> {
        this.authService.deleteAuthTokens();
        return this.http
            .post<User>(this.appConfig.apiEndpoint + '/auth/login', {
                userName: credentials.username,
                password: credentials.password
            })
            .pipe(
                map((response: any) => {

                    let res: LoginModel;

                    if (!response) {
                        this.authService.authStatusSource.next(false);
                        return false;
                    }
                    this.SetToken(response);
                    return true;
                })
            );
    }

    private SetToken(response: any) {

        this.alertService.success('', response.message)

        this.authService.setLoginSession(response);
        this.authService.scheduleRefreshToken();
        this.authService.authStatusSource.next(true);
        // set user permission in local storage
        // this.getUserInformation().subscribe(response => {
        //     if (response.success === true) {
        //         this.browserStorageService.setUserInformation(response.result.claims);
        //         this.authService.setDisplayName(response['result']['displayName']);
        //     }
        // });

    }

    getUserInformation(): Observable<any> {
        return this.http.get(
            this.appConfig.apiEndpoint + '/UsersManager/UserInformation'
        );
    }

    logout(): void {
        let model = {} as SendTokenValue;
        //  model.value = this.browserStorageService.getLocal('RefreshToken');
        //  this.logOut(model).subscribe(x => {
        //  });
        this.authService.deleteAuthTokens();
        this.authService.authStatusSource.next(false);
        this.router.navigate(['/auth/login/']);
    }

    logOut(item: SendTokenValue): Observable<boolean> {
        localStorage.removeItem('displayName');
        return this.http.post<boolean>(this.appConfig.apiEndpoint + '/Account/Logout', item).pipe(
            map(res => {
                if (res) {
                    return res;
                }
            })
        );
    }

    sendConfirmCodeRequest(item): Observable<any> {
        return this.http.post<any>(this.appConfig.apiEndpoint + '/account/TwoFactor/Verify', item).pipe(
            map(res => {
                if (res['success']) {
                    this.SetToken(res);
                    return true;
                } else {
                    this.alertService.error('', res['message']);
                    return false;
                }
            })
        );
    }
}

export enum AuthTokenType {
    AccessToken,
    RefreshToken
}
