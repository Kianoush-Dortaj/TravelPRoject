import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ManagersService } from '.';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class GetUserAccessListResolver implements Resolve<any>{

    constructor(private managerService: ManagersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const id = route.paramMap.get('id');

        return this.managerService.GetItemById(id, '/Manager/Access').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )
    }

}