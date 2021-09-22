import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { TravelTypeService } from './travel-type-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetTravelTypeResolver implements Resolve<any>{

    constructor(private travelTypeService: TravelTypeService) { }

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
