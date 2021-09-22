import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { IntrestService } from './interst.service';

@Injectable({
    providedIn: 'root'
})

export class GetAllIntrestResolver implements Resolve<any>{

    constructor(private userGroupsManagerService: IntrestService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const a = this.userGroupsManagerService.GetListItem('/Intrest/GetAll').pipe(
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
