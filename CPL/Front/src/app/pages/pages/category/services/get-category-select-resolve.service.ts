import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { CategoryService } from './category-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetCategorySelectResolve implements Resolve<any>{

    constructor(private userGroupsManagerService: CategoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.userGroupsManagerService.GetListItem('/Category/GetAll/Select').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const join = forkJoin(a)
            .pipe(map(res => {
                return {
                    accountIfno: res
                };
            }));

        return join;
    }

}
