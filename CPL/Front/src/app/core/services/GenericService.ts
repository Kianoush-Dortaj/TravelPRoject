import { HttpHeaders, HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TableFilter, TableSearch, TableFilterRules } from '../models/table-filter';
import { TablePagingIndex, ServerResponse } from '../models';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.servise';
import { APP_CONFIG, IAppConfig } from '../configs/app.config';

// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
// };

@Injectable({
    providedIn: 'root'
})
export class GenericServic<TAddModel, TEditModel, TGetAllModel, TGetItem> {

    public headers: HttpHeaders;
    private filterSource = new Subject<TableFilterRules[]>();
    public filter$ = this.filterSource.asObservable();

    constructor(public httpClient: HttpClient, @Inject(APP_CONFIG) public appConfig: IAppConfig, public alertService: AlertService) { }

    // Create a Geberic Service with Generic Model for Create Object in Database
    public Create(item: TAddModel, url: string): Observable<ServerResponse<TAddModel>> {
        return this.httpClient.post<ServerResponse<TAddModel>>(this.appConfig.apiEndpoint + `${url}`, item).pipe(
            map(res => {
                if (res.success) {
                    this.alertService.success('', res.message)
                    return res;
                } else {
                    this.alertService.error('', res.message)
                    return res;
                }
            })
        )
    }

    CreateWithFile(item: any, url: string): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint + url}`;
        const formData: FormData = new FormData();
        for (const key in item) {
            if (item.hasOwnProperty(key)) {

                if (item[key] instanceof File) {
                    formData.append(key, item[key], item[key].name);
                } else {
                    formData.append(key, item[key]);
                }
            }
        }
        return this.httpClient
            .post(Url, formData, {
                headers: this.headers,
                reportProgress: true,
                observe: 'events'
            })
            .pipe(map(response => response || {} as HttpEvent<any>));
    }


    UpdateWithFile(item: any, id: number, url: string): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint + url}/${id}`;
        const formData: FormData = new FormData();
        for (const key in item) {
            if (item.hasOwnProperty(key)) {

                if (item[key] instanceof File) {
                    formData.append(key, item[key], item[key].name);
                } else {
                    formData.append(key, item[key]);
                }
            }
        }
        return this.httpClient
            .put(Url, formData, {
                headers: this.headers,
                reportProgress: true,
                observe: 'events'
            })
            .pipe(map(response => response || {} as HttpEvent<any>));
    }
    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItemWithSrachParams(searchParams: TableSearch, url: string): Observable<ServerResponse<TablePagingIndex<TGetAllModel>>> {
        return this.httpClient.get<ServerResponse<TablePagingIndex<TGetAllModel>>>(this.appConfig.apiEndpoint + `${url}`).pipe(
            map(
                reposnse =>
                    reposnse || ({} as ServerResponse<TablePagingIndex<TGetAllModel>>)
            )
        );
    }

    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItem(url: string): Observable<ServerResponse<TGetItem[]>> {
        return this.httpClient.get<ServerResponse<TGetItem[]>>(this.appConfig.apiEndpoint + `${url}`);
    }


    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItemById( url: string,id: string): Observable<ServerResponse<TGetItem[]>> {
        return this.httpClient.get<ServerResponse<TGetItem[]>>(this.appConfig.apiEndpoint + `${url}/${id}`);
    }

    // Create a Geberic Service with Generic Model for Get All Object
    public GetListItemPageing(url: string): Observable<ServerResponse<TablePagingIndex<TGetItem[]>>> {
        return this.httpClient.get<ServerResponse<TablePagingIndex<TGetItem[]>>>(this.appConfig.apiEndpoint + `${url}`);
    }

    // Create a Geberic Service with Generic Model for Get Object From Database with Id
    public GetItemById(id: string, url: string): Observable<ServerResponse<TGetItem>> {
        return this.httpClient.get<ServerResponse<TGetItem>>(this.appConfig.apiEndpoint + `${url}/${id}`);
    }

    // Create a Geberic Service with Generic Model for Update Object
    public Update(item: TEditModel, url: string): Observable<ServerResponse<TEditModel>> {
        return this.httpClient.put<ServerResponse<TEditModel>>(this.appConfig.apiEndpoint + `${url}`, item);
    }

    updateFilter(filters: TableFilterRules[]): void {
        this.filterSource.next(filters);
    }
    updateFilters(): void {
        this.filterSource.next();
    }
    // Create a Geberic Service with Generic Model for Delete Object
    public Delete(item: number, url: string): Observable<ServerResponse<TAddModel>> {
        return this.httpClient.delete<ServerResponse<TAddModel>>(this.appConfig.apiEndpoint + `${url}/${item}`);
    }

}
