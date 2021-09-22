import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClaimsManagerList } from '../models/claims-manager-list';
import { TableFilterRules, TableSearch } from 'src/app/core/models/table-filter';
import { APP_CONFIG, IAppConfig } from 'src/app/core/configs/app.config';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';

@Injectable({
    providedIn: 'root'
})

export class ClaimsManagerService {

    private filterSource = new Subject<TableFilterRules[]>();
    public filter$ = this.filterSource.asObservable();
    private searchParam: TableSearch;

    constructor(private httpClient: HttpClient, @Inject(APP_CONFIG) private appConfig: IAppConfig) { }

    getAll(searchParam?: TableSearch): Observable<TablePagingIndex<ClaimsManagerList>> {
        const Url = `${this.appConfig.apiEndpoint + '/RolesManager/ClaimGroup/Filter'}`;
        if (!searchParam) {
            searchParam = this.appConfig.defaultSearchParam;
        }

        return this.httpClient
            .post<TablePagingIndex<any>>(
                Url, searchParam
            )
            .pipe(
                map(
                    response =>
                        response['result'] || ({} as TablePagingIndex<any>)
                )
            );
    }


    GetAll(): Observable<ServerResponse<ClaimsManagerList[]>> {
        const Url = `${this.appConfig.apiEndpoint + '/permission/GetAll'}`;

        return this.httpClient
            .get<ServerResponse<ClaimsManagerList[]>>(
                Url
            );
    }

    getControllerAction(): Observable<any> {
        return this.httpClient.get(this.appConfig.apiEndpoint + '/RolesManager/GetControllerAction');
    }

    addClaim(item): Observable<any> {
        return this.httpClient.post<any>(this.appConfig.apiEndpoint + '/permission/create', item);
    }

    Delete (id): Observable<any> {
        return this.httpClient.delete(this.appConfig.apiEndpoint + '/permission/Delete/' + id)
    }
    getOne(id: number): Observable<ServerResponse<any>> {
        return this.httpClient.get<any>(this.appConfig.apiEndpoint + '/permission/GetById/' + id);
    }

    GetAllPermissionsByRoleId(id: number): Observable<ServerResponse<any>> {
        return this.httpClient.get<any>(this.appConfig.apiEndpoint + '/role/RolePermission/' + id);
    }

    update(id, item): Observable<any> {
        return this.httpClient.put<any>(this.appConfig.apiEndpoint + '/permission/update' , item)
    }


    updateFilter(filters: TableFilterRules[]): void {
        this.filterSource.next(filters);
    }
}
