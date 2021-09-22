import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { SubscribeService } from './subscribe-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetSubscribeResolver implements Resolve<any>{

    constructor(private subscribeService: SubscribeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.subscribeService.GetItemById(id, '/Subscribe/GetById').pipe(
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
