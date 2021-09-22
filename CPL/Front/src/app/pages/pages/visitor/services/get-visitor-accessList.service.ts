import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { VisitorService } from './visitor-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetVisitorAccessListResolver implements Resolve<any>{

    constructor(private userService: VisitorService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const id = route.paramMap.get('id');

        return this.userService.GetItemById(id, '/Visitor/Access').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )
    }

}