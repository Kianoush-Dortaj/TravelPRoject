import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { ClaimsManagerService } from './claims-manager-service';
import { catchError, finalize } from 'rxjs/operators';
import { ClaimsManagerList } from '../models/claims-manager-list';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { TablePagingIndex } from 'src/app/core/models';

@Injectable({
    providedIn: 'root'
})
export class ClaimsManagerDataSource implements DataSource<ClaimsManagerList>{
	private claimsManagerSubject = new BehaviorSubject<ClaimsManagerList[]>([]);
	private claimsManagersLengthSource = new BehaviorSubject<number>(0);
	public length$ = this.claimsManagersLengthSource.asObservable();
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();
	private searchParam: TableSearch;

	constructor(private claimsManagerService: ClaimsManagerService) {
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
			this.searchParam.filters = filters
		} else {
			this.searchParam.filters = undefined;
		}

		// paging
		this.searchParam.page = pageIndex;
		this.searchParam.rows = pageSize;

		// stringyfily filter
		const param: any = this.searchParam;
		param.filters = JSON.stringify(this.searchParam.filters);
		this.claimsManagerService
			.getAll(this.searchParam)
			.pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe((claimsManager: TablePagingIndex<ClaimsManagerList>) => {
				const data = claimsManager['result'];
				this.claimsManagersLengthSource.next(claimsManager.count);
				this.claimsManagerSubject.next(data);
			});
	}

	connect(): Observable<ClaimsManagerList[]> {
		return this.claimsManagerSubject.asObservable();
	}

	disconnect(): void {
		this.claimsManagerSubject.complete();
		this.loadingSubject.complete();
	}
}
