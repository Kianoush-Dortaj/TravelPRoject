
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { SubscribeService } from './subscribe-service.service';

@Injectable({
    providedIn: 'root'
})

export class SubscribeDataSource implements DataSource<any>
{
    public subscribeSubject = new BehaviorSubject<any[]>([]);
    public subscribe$ = this.subscribeSubject.asObservable();

    private subscribeLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.subscribeLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private subscribeService: SubscribeService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadSubscribes(
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
        this.subscribeService.GetListItemWithSrachParams(this.searchParam,'/Subscribe/GetAll/Paging')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news: ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.subscribeLengthSource.next(news.result.count);
                this.subscribeSubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.subscribeSubject.asObservable();
    }

    disconnect(): void {
        this.subscribeSubject.complete();
        this.loadingSubject.complete();
    }
}
