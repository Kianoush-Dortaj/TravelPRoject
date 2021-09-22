import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchPlaceInterface } from './../models/search-place-model';

@Injectable({ providedIn: 'root' })
export class SearchPlaceService {

  item: SearchPlaceInterface[];

  constructor(private httpClient: HttpClient) { }

  SearchPlace(value: string): Observable<any> {

    return this.httpClient.get('https://photon.komoot.io/api/?q='+value)
      .pipe(map(res => {
        if (res) {
          this.item = res['features'].map(item => {
            return {
              country: item['properties']['country'],
              name: item['properties']['name']
            }
          })
          return this.item;
        }
      }))
  }

}
