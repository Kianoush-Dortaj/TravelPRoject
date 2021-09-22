// import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services';
import { ResponseError } from '../models/reponse-error';
import { AlertService } from '../services';

@Injectable()
export class HttpInterceptorServise implements HttpInterceptor {
	constructor(private alertService: AlertService, private authService: AuthService) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			map(res => {
				if (res['body']) {
					if (res['body']['success'] !== undefined) {
						if (res['body']['success'] === false) {

							if (res['body']['message']) {
								if (typeof (res['body']['message']) == 'string') {
									this.alertService.error('', res['body']['message']);

								} else {
									res['body']['message'].forEach(element => {
										this.alertService.error('', element);
									});
								}
							}
							const error = new ResponseError();
							error.data = res['body'];
							return res;
						}
					}
				}
				return res;
			})
		);
	}
}
