import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { TravelTypeResidenceService } from './travel-type-residence-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetTravelTyResidenceResolver implements Resolve<any>{

    constructor(private travelTypeService: TravelTypeResidenceService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.travelTypeService.GetItemById(id, '/TravelResidence/GetById').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        return a;
    }

}
