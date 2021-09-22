import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { MainProfileService } from './main-profile.service';

@Injectable({
  providedIn: 'root'
})

export class GetUserInfoResolver implements Resolve<any>{

  constructor(private managerService: MainProfileService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let info: any;
    const id =route.paramMap.get('id');
    if (!id) {
      info = this.managerService.GetProfileInformation().pipe(
        map(res => {
          if (res) {
            return res.result
          }
          return null;
        })
      )
    } else {
      info = this.managerService.GetOtherProfileInformation(id).pipe(
        map(res => {
          if (res) {
            return res.result
          }
          return null;
        })
      )
    }
    return info;
  }

}
