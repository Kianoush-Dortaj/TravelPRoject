import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from './users-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetUserAccessListResolver implements Resolve<any>{

    constructor(private userService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const id = route.paramMap.get('id');

        return this.userService.GetItemById(id, '/user/Access').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )
    }

}