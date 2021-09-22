
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { UsersService } from './users-service.service';

@Injectable({
    providedIn: 'root'
})

export class UserDataSource implements DataSource<any>
{
    public usersSubject = new BehaviorSubject<any[]>([]);
    public users$ = this.usersSubject.asObservable();

    private usersLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.usersLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private userService: UsersService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadUsers(
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
        console.log(this.searchParam)
        this.userService.GetListItemWithSrachParams(this.searchParam,'/admin/user/getAll')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.usersLengthSource.next(news.result.count);
                this.usersSubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }
}
