import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { DiscountService } from './discount-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetDiscountResolver implements Resolve<any>{

    constructor(private discountService: DiscountService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.discountService.GetItemById(id, '/Discount/GetById').pipe(
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
