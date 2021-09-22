import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GetManagerModel } from '../models';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { UsersService } from './users-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetUserResolver implements Resolve<GetManagerModel>{

    constructor(private userGroupsManagerService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.userGroupsManagerService.GetItemById(id, '/admin/user/accountInformation').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const b = this.userGroupsManagerService.GetItemById(id, '/admin/user/personalInformation').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const c = this.userGroupsManagerService.GetListItem('/admin/role/GetRoleSelected').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const join = forkJoin(a, b, c)
            .pipe(map(res => {
                return {
                    accountIfno: res[0],
                    personalInfo: res[1],
                    roles: res[2]
                };
            }));

        return join;
    }

}
