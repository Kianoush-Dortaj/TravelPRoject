import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TravelItemsService } from './travel-item.service';

@Injectable({ providedIn: 'root' })
export class GetTravelItemsResolver implements Resolve<any> {

  constructor(private travelItemService: TravelItemsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.travelItemService.GetAllTravelItems()
      .pipe(
        map(res => {
          if (res.success) {
            return res.result.map(data => {
              return {
                userId: data.userId,
                startDate: data.startDate,
                endDate: data.endDate,
                country: data.country,
                city: data.city,
                id: data.id,
                requestId: data.requestId,
                displayName: data.displayName,
                travelType: data.travelType,
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
        })
      )
  }
}
