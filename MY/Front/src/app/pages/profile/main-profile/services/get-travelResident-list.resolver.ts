

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainProfileService } from './main-profile.service';

@Injectable({ providedIn: 'root' })

export class TravelResidentSelectResolver implements Resolve<any> {

  constructor(private mainProfileService: MainProfileService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

    return this.mainProfileService.GetTravelResidentService()
      .pipe(
        map(data => {
          return data.result.data;
        }))

  }
}
