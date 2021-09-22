import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { CountryService } from './Country-service.service';

@Injectable({
    providedIn: 'root'
})

export class GetLanguageSelectResolve implements Resolve<any>{

    constructor(private countryService: CountryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.countryService.GetListItem('/admin/Language/GetAll').pipe(
            map(res => {
                if (res) {
                    return res.result
                }
                return null;
            })
        )
    }

}
