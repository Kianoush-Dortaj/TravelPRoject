// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../alert/alert-service';
import { Router } from '@angular/router';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  private authorizationHeader = 'Authorization';

  constructor(private alertService: AlertService,
    private router: Router) { }
  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


   let accessToken= window.localStorage.getItem('access_token');

    request = request.clone({
			headers: request.headers.set(this.authorizationHeader, `Bearer ${accessToken}`)
		});

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {

          }
        },
        error => {
          if (error.status === 401) {
            this.router.navigate(['/auth']);
          }
          else if (error.status === 400) {
            this.alertService.ErrorToast(error.error.message)
          }
          else if (error.status === 403) {
            // this.router.navigate(['/forbidden']);
          }
        }
      )
    );
  }
}
