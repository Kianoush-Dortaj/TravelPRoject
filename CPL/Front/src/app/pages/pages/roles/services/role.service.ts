import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RoleList } from '../models';
import { RoleEdit } from '../models/role-edit';
import { IAppConfig, APP_CONFIG } from 'src/app/core/configs/app.config';
import { TableSearch } from 'src/app/core/models/table-filter';
import { ServerResponse, TablePagingIndex } from 'src/app/core/models';

@Injectable({
	providedIn: 'root'
})

export class RoleService {

	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private http: HttpClient) {
	}

	getAll(searchParam?: TableSearch): Observable<ServerResponse<TablePagingIndex<any>>> {
		const Url = `${this.appConfig.apiEndpoint + '/role/GetAll/Paging'}`;
		return this.http
			.get<ServerResponse<TablePagingIndex<any>>>(
				Url
			);
	}

	Delete(Id: number): Observable<any> {
		const Url = `${this.appConfig.apiEndpoint + '/role/delete/' + Id}`;
		return this.http.delete(Url);
	}

	edit(role: RoleEdit): Observable<any> {
		const Url = `${this.appConfig.apiEndpoint + '/role/update'}`;
		return this.http.put(Url, role);
	}

	add(role: RoleList): Observable<any> {
		const Url = `${this.appConfig.apiEndpoint + '/role/create'}`;
		return this.http.post(Url, role);
	}

	getRoleDetials(id: string): Observable<ServerResponse<any>> {
		const Url = `${this.appConfig.apiEndpoint}/role/GetById/${id}`;
		return this.http.get<ServerResponse<any>>(Url);
	}
}
