

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account-service.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GetAccountSettingResolver implements Resolve<any> {

  constructor(private accountService: AccountService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
   return this.accountService.GetAccountService()
      .pipe(
        map(res => {
          if (res.success) {
            console.log("GetAccountSettingResolver -> constructor -> res.result", res.result)
            return res.result
          }
          return null;
        })
      )
  }
}
