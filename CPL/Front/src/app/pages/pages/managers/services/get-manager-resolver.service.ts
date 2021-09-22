import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GetManagerModel } from '../models';
import { ManagersService } from './managers-service.service';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GetManagerResolver implements Resolve<GetManagerModel>{

    constructor(private userGroupsManagerService: ManagersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.userGroupsManagerService.GetItemById(id, '/Manager/GetAccountInformation').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const b = this.userGroupsManagerService.GetItemById(id, '/Manager/GetPersonalInformation').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const c = this.userGroupsManagerService.GetListItem('/role/GetAll/Select').pipe(
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
