
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { VisitorService } from './visitor-service.service';

@Injectable({
    providedIn: 'root'
})

export class VisitorDataSource implements DataSource<any>
{
    public visitorsSubject = new BehaviorSubject<any[]>([]);
    public visitors$ = this.visitorsSubject.asObservable();

    private visitorsLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.visitorsLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private userService: VisitorService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadVisitors(
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
        this.userService.GetListItemWithSrachParams(this.searchParam,'/admin/Visitor/getAll')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.visitorsLengthSource.next(news.result.count);
                this.visitorsSubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.visitorsSubject.asObservable();
    }

    disconnect(): void {
        this.visitorsSubject.complete();
        this.loadingSubject.complete();
    }
}
