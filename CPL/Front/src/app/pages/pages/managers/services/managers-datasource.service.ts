
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { GetAllManagerModel } from '../models';
import { ManagersService } from './managers-service.service';

@Injectable({
    providedIn: 'root'
})

export class ManagersDataSource implements DataSource<any>
{
    public managersSubject = new BehaviorSubject<any[]>([]);
    public managers$ = this.managersSubject.asObservable();

    private managersLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.managersLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private managersService: ManagersService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadManagers(
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
        this.managersService.GetListItemWithSrachParams(this.searchParam,'/Manager/GetAll')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse< TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.managersLengthSource.next(news.result.count);
                this.managersSubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.managersSubject.asObservable();
    }

    disconnect(): void {
        this.managersSubject.complete();
        this.loadingSubject.complete();
    }
}
