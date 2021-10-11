import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRequestService } from './user-requests.service';

@Injectable({ providedIn: 'root' })

export class GetAllUserRequestResolver implements Resolve<any> {

  constructor(private userRequets: UserRequestService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

   return this.userRequets.GetAllUserRequest()
      .pipe(
        map(res => {
          if (res) {
            return res.result.data.map(data => {
              return {
                travelType: data.travelTypeId,
                travelResidence: data.travelesidenceId,
                userId: data.userId,
                startDate: data.startDate,
                endDate: data.endDate,
                country: data.country,
                lookingfor: data.lookingfor,
                description: data.description,
                mustConfirm: data.mustConfirm,
                reqId: data.reqId,
                owner: data.owner,
                status: data.status,
                city: data.city,
                id: data.id,
                requestId: data.id,
                displayName: data.firstName + ' ' + data.lastName,
                travelTypeName: data.travelTypeName,
                travelTypeIcon: data.travelTypeIcon,
                travelResidentName: data.travelResidentName,
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
