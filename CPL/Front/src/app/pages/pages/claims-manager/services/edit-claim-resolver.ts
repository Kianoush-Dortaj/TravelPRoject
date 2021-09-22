import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ClaimsManagerService } from './claims-manager-service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class EditResolver implements Resolve<any>
{

    constructor(private claimService: ClaimsManagerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'];

        return this.claimService.GetAllPermissionsByRoleId(id).pipe(
            map(model => {
                if (model) {
                    return model.result;
                }
            })
        )
    }
}