import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { APP_CONFIG, IAppConfig } from 'src/app/core/configs/app.config';
import { AlertService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})


export class ImageService {
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient,
        @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


    GetImage(url, id): Observable<any> {
        return this.httpClient
            .get(this.appConfig.apiEndpoint+ url + id, { responseType: 'blob' })
            .pipe(
                map(res => {
                    if (res) {
                        return res;
                    }
                    return null;
                })
            )
    }



}