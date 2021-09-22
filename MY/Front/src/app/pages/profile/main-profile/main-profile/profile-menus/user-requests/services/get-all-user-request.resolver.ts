import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRequestService } from './user-requests.service';

@Injectable({ providedIn: 'root' })

export class GetAllUserRequestResolver implements Resolve<any> {

  constructor(private userRequets: UserRequestService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

   return this.userRequets.GetAllUserTravelRequest()
      .pipe(
        map(res => {
          if (res) {
            return res.result.data.map(data => {
              return {
                userId: data.userId,
                startDate: data.startDate,
                endDate: data.endDate,
                country: data.country,
                city: data.city,
                id: data.id,
                displayName: data.displayName,
                travelType: data.travelTypeName,
                travelTypeIcon: data.travelTypeIcon,
                travelResident: data.travelResident,
                status: data.status,
                mustConfirm: data.mustConfirm,
                owner: data.owner,
                travelResidentIcon: data.travelResidentIcon,
                budget: data.budget,
                diffDate: (startDate, endDate) => {
                  var date1 = new Date(startDate);
                  var date2 = new Date(endDate);
                  var Difference_In_Time = date2.getTime() - date1.getTime();
                  return Difference_In_Time / (1000 * 3600 * 24);
                }
              }
            });
          }
          return null;
        })
      )
  }
}
