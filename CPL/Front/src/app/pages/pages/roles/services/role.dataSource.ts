import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RoleList } from '../models';
import { RoleService } from './role.service';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { ServerResponse, TablePagingIndex } from 'src/app/core/models';

@Injectable({
	providedIn: 'root'
  })
  
export class RoleDataSource implements DataSource<RoleList> {
	
	private roleSubject = new BehaviorSubject<RoleList[]>([]);
	private rolesLengthSource = new BehaviorSubject<number>(0);
	public length$ = this.rolesLengthSource.asObservable();
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();
	private searchParam: TableSearch;

	constructor(private roleService: RoleService) {
		this.searchParam = {
			_search: true,
			dateTimeType: 1,
			page: 1,
			rows: 2
		};
	}

	loadRoles(
		pageIndex: number,
		pageSize: number,
		filters: TableFilterRules[]
	): void {
		this.loadingSubject.next(true);

		// add filters
		if (filters.length > 0) {
			this.searchParam.filters =filters;
		} else {
			this.searchParam.filters = undefined;
		}

		// paging
		this.searchParam.page = pageIndex;
		this.searchParam.rows = pageSize;

		// stringyfily filter
		const param: any = this.searchParam;
		param.filters = JSON.stringify(this.searchParam.filters);
		this.roleService
			.getAll(this.searchParam)
			.pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((role:ServerResponse<TablePagingIndex<any>>) => {
				const data = role.result.data;
				console.log(data)
				this.rolesLengthSource.next(role.result.count);
				this.roleSubject.next(data);
			});
	}

	connect(): Observable<RoleList[]> {
		return this.roleSubject.asObservable();
	}

	disconnect(): void {
		this.roleSubject.complete();
		this.loadingSubject.complete();
	}
}
