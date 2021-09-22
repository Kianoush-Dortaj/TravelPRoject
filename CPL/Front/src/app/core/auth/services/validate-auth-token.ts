import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BrowserStorageService } from '.';
import { timer, Subscription, BehaviorSubject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { APP_CONFIG, IAppConfig } from '../../configs/app.config';

@Injectable({
    providedIn: 'root'
})
export class ValidationAuthTokenUser {

    rememberMeToken = 'rememberMe_token';
    authStatusSource = new BehaviorSubject<boolean>(false);
    authStatus$ = this.authStatusSource.asObservable();
    refreshTokenSubscription: Subscription;

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private browserStorageService: BrowserStorageService,
        private router: Router,
        @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

    /// Move to Other Class
    isLoggedIn(): boolean {
        const accessToken = this.getRawAuthToken(AuthTokenType.AccessToken);
        const refreshToken = this.getRawAuthToken(AuthTokenType.RefreshToken);
        const hasTokens =
            !this.isEmptyString(accessToken) &&
            !this.isEmptyString(refreshToken);
        return hasTokens;
    }

    isAccessTokenExpired(): boolean {
        const expirationDateUtc = this.getAccessTokenExpirationDateUtc();
        if (!expirationDateUtc) {
            return true;
        }
        return !(expirationDateUtc.valueOf() > new Date().valueOf());
    }

    private isEmptyString(value: string): boolean {
        return !value || 0 === value.length;
    }

    rememberMe(): boolean {
        return (
            this.browserStorageService.getLocal(this.rememberMeToken) === true
        );
    }

    getRawAuthToken(tokenType: AuthTokenType): string {
        return this.browserStorageService.getLocal(
            AuthTokenType[tokenType]
        );
    }

    deleteAuthTokens(): void {

        this.browserStorageService.removeLocal(
            AuthTokenType[AuthTokenType.AccessToken]
        );
        this.browserStorageService.removeLocal(
            AuthTokenType[AuthTokenType.RefreshToken]
        );
        this.browserStorageService.removeLocal(this.rememberMeToken);
    }

    setLoginSession(response: any): void {
        this.setToken(
            AuthTokenType.AccessToken,
            response['result']
        );
        this.setToken(
            AuthTokenType.RefreshToken,
            response['result']
        );
    }

    private setToken(tokenType: AuthTokenType, tokenValue: string): void {

        console.log('token', tokenValue)
        this.browserStorageService.setLocal(
            AuthTokenType[tokenType],
            tokenValue
        );
    }

    setDisplayName(value: string): void {
        this.browserStorageService.setLocal('displayName', value);
    }
    getDisplayName(): string {
        return 'Kianoush';
    }

    getAccessTokenExpirationDateUtc(): Date {
        const exp = new Date();
        exp.setDate(exp.getDate() + 1);
        return exp;
    }

    scheduleRefreshToken(): void {
        if (!this.isLoggedIn()) {
            return;
        }

        this.unscheduleRefreshToken();

        const expiresAtUtc = this.getAccessTokenExpirationDateUtc().valueOf();
        const nowUtc = new Date().valueOf();
        const initialDelay = Math.max(1, expiresAtUtc - nowUtc);
        // const initialDelay = 3600000 ;
        console.log('Initial scheduleRefreshToken Delay(ms)', initialDelay);
        const timerSource$ = timer(initialDelay);
        this.refreshTokenSubscription = timerSource$.subscribe(() => {
            this.refreshToken();
        });
    }

    unscheduleRefreshToken(): void {
        if (this.refreshTokenSubscription) {
            this.refreshTokenSubscription.unsubscribe();
        }
    }

    refreshToken(): Subscription {
        // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const model = { refreshToken: this.getRawAuthToken(AuthTokenType.RefreshToken) };
        return this.http
            .post(`${this.appConfig.apiEndpoint}/${this.appConfig.refreshTokenPath}`, model)
            .pipe(finalize(() => {
                this.scheduleRefreshToken();
            })).pipe(map(response => response || {}))
            .subscribe(result => {
                this.setLoginSession(result);
            });
    }

    isAuthUserInRole(requiredPermission: string): boolean {
        const permissions = this.browserStorageService.getUserInformation();
        let hasPermission = false;
        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i] === requiredPermission) {
                hasPermission = true;
                break;
            }
        }
        return hasPermission;
    }
}

export enum AuthTokenType {
    AccessToken,
    RefreshToken
}
