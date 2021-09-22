import { Injectable, Inject } from '@angular/core';
import { GenericServic } from 'src/app/core/services/GenericService';
import { Observable, Subject } from 'rxjs';
import { FileManagerConfig } from '../models/file-manager-config';
import { HttpHeaders, HttpClient, HttpEvent } from '@angular/common/http';
import { TableFilterRules } from 'src/app/core/models/table-filter';
import { AlertService } from 'src/app/core/services';
import { IAppConfig, APP_CONFIG } from 'src/app/core/configs/app.config';
import { map } from 'rxjs/operators';
import { ServerResponse } from 'src/app/core/models';

@Injectable({
    providedIn: 'root'
})


export class FileManagerService {

    public headers: HttpHeaders;
    private filterSource = new Subject<TableFilterRules[]>();
    public filter$ = this.filterSource.asObservable();

    constructor(public httpClient: HttpClient,
        private fileManager: FileManagerConfig,
        @Inject(APP_CONFIG) public appConfig: IAppConfig,
        public alertService: AlertService) { }

    CreateWithFile(item: any): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint + this.fileManager.addUrl}`;
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
    updateFilters(): void {
        this.filterSource.next();
    }

    // Create a Geberic Service with Generic Model for Delete Object
    public Delete(item: number, url: string): Observable<ServerResponse<any>> {
        return this.httpClient.delete<ServerResponse<any>>(this.appConfig.apiEndpoint + `${url}/${item}`);
    }

    // Create a Geberic Service with Generic Model for Delete Object
    public Update(item: String, url: string): Observable<ServerResponse<any>> {
        return this.httpClient.put<ServerResponse<any>>(this.appConfig.apiEndpoint + `${url}/${item}`,null);
    }

    UpdateWithFile(item: any, id: number): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint + this.fileManager.updateUrl}/${id}`;
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
    public GetListItemById(id: string): Observable<ServerResponse<any>> {
        return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + `${this.fileManager.getItemUrl}/${id}`);
    }

    GetAllFiles(parentId): Observable<any> {
        return this.httpClient.get<any>(this.appConfig.apiEndpoint + this.fileManager.url + parentId);
    }

}