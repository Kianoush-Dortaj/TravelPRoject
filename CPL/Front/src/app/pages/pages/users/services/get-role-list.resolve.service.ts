import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from './users-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetRolesResolver implements Resolve<any>{

    constructor(private userGroupsManagerService: UsersService) { }

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
