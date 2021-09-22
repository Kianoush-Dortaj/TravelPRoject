
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, take, map } from 'rxjs/operators';
import { IAppConfig, APP_CONFIG } from '../configs/app.config';
import { BrowserStorageService, AuthService, AuthTokenType, ValidationAuthTokenUser } from '../auth/services';
import { AlertService } from '../services/alert.servise';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	private delayBetweenRetriesMs = 1000;
	private numberOfRetries = 1;
	private authorizationHeader = 'Authorization';

	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private browserStorageService: BrowserStorageService,
		private validateToken: ValidationAuthTokenUser,
		private authService:AuthService,
		private alertService: AlertService,
		private router: Router,
		private http: HttpClient
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const accessToken = this.validateToken.getRawAuthToken(AuthTokenType.AccessToken);
		if (!accessToken) {
			// login page
			return next.handle(request);
		}

		request = request.clone({
			headers: request.headers.set(this.authorizationHeader, `Bearer ${accessToken}`)
		});

		return next.handle(request).pipe(
			catchError((error: any, caught: Observable<HttpEvent<any>>) => {
				if (error.status === 401) {
					this.router.navigate(['/auth/login']);
				}
				else if (error.status === 403) {
					this.router.navigate(['/forbidden']);
				} else if (error.status === 503) {
					this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
					console.log(error);
					this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
				} else if (error.status === 505) {
					this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
					console.log(error);
				}
				else if (error.status === 405) {
					this.alertService.error('', 'در سرور خطایی رخ داده است  . دوباره تلاش کنید');
					console.log(error);
				}
				return throwError(error);
			})
		);
	}

	handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

		const refreshTokenStatus = this.browserStorageService.getLocal('RefreshTokenStatus');
		if (refreshTokenStatus === true) {
			this.browserStorageService.setLocal('RefreshTokenStatus', false);
			this.authService.logout();
			return;
		}
		this.browserStorageService.setLocal('RefreshTokenStatus', true);

		// const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		const model = { refreshToken: this.validateToken.getRawAuthToken(AuthTokenType.RefreshToken) };
		const url = `${this.appConfig.apiEndpoint}/${this.appConfig.refreshTokenPath}`;

		return this.http
			.post(url, model)
			.pipe(
				mergeMap((result) => {
					this.browserStorageService.setLocal('RefreshTokenStatus', false);
					this.validateToken.setLoginSession(result);
					return this.hanldeRequest(request, next);
				})
			);
	}

	hanldeRequest(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
		const newRequest = this.getNewAuthRequest(request);
		if (newRequest) {
			return next.handle(newRequest);
		}
		this.router.navigate(['/login']);
	}

	getNewAuthRequest(request: HttpRequest<any>): HttpRequest<any> | null {
		const newStoredToken = this.validateToken.getRawAuthToken(AuthTokenType.AccessToken);
		const requestAccessTokenHeader = request.headers.get(this.authorizationHeader);
		if (!newStoredToken || !requestAccessTokenHeader) {
			return null;
		}
		const newAccessTokenHeader = `Bearer ${newStoredToken}`;

		if (requestAccessTokenHeader === newAccessTokenHeader) {
			return null;
		}
		return request.clone({ headers: request.headers.set(this.authorizationHeader, newAccessTokenHeader) });
	}
}
