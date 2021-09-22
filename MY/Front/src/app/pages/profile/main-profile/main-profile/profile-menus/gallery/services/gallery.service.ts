

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from './../../../../../../../core/config/app.config';
import { ServerResponse } from './../../../../../../../core/models/server-response';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GalleryService {

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
    @Inject(APP_CONFIG) private appConfig: IAppConfig) { }


  addGallery(item): Observable<any> {
    const Url = `${this.appConfig.apiEndpoint}/gallery/AddGallery`;
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

  editGallery(item): Observable<any> {
    const Url = `${this.appConfig.apiEndpoint}/gallery/EditGallery`;
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


  GetAllGallery(): Observable<ServerResponse<any>> {
    return this.httpClient.get<ServerResponse<any>>(this.appConfig.apiEndpoint + '/gallery/GetAllGallery');
  }


}
