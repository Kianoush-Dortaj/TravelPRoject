import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GetManagerModel } from '../models';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { VisitorService } from './visitor-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetVisitorResolver implements Resolve<GetManagerModel>{

    constructor(private userGroupsManagerService: VisitorService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const id = route.paramMap.get('id');

        const a = this.userGroupsManagerService.GetItemById(id, '/admin/Visitor/GetAccountInformation').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const b = this.userGroupsManagerService.GetItemById(id, '/admin/Visitor/GetPersonalInformation').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )

        const c = this.userGroupsManagerService.GetListItem('/admin/role/GetAll').pipe(
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
