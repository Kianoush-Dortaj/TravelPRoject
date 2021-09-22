
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class GetAllNotificationsResolver implements Resolve<any> {

  constructor(private notificationservice: NotificationService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.notificationservice.GetAllNotification(1)
      .pipe(
        map(data => {
          if (data.success) {
            return data.result;
          }
          return null;
        })
      )
  }
}
