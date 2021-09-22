import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ClaimsManagerService } from './claims-manager-service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ClaimManagerList, Childes } from '../components/claims-manager-add/claims-manager-add.component';
import { TableSearch } from 'src/app/core/models/table-filter';

@Injectable({
  providedIn: 'root'
})

export class AddClaimResolver implements Resolve<any> {

  searchParam: TableSearch;
  claims: ClaimManagerList[] = [];

  constructor(
    private claimsManagerService: ClaimsManagerService,
    private router: Router) {
    this.searchParam = {
      _search: true,
      dateTimeType: 1,
      page: 1,
      rows: 2
    };
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.claimsManagerService.GetAll().pipe(
      map(data => {
        if (data) {
          return data['data'];
        }
      })
    )
  }
}
