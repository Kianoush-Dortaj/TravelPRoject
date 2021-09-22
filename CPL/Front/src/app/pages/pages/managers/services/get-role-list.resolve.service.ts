import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ManagersService } from '.';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class GetRolesResolver implements Resolve<any>{

    constructor(private userGroupsManagerService: ManagersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.userGroupsManagerService.GetRoles().pipe(
            map(res => {
                if (res) {
                    return res.result.data
                }
                return null;
            })
        )
    }

}
