
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { DiscountService } from './discount-service.service';

@Injectable({
    providedIn: 'root'
})

export class DiscountDataSource implements DataSource<any>
{
    public discountSubject = new BehaviorSubject<any[]>([]);
    public discount$ = this.discountSubject.asObservable();

    private discountLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.discountLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private discountService: DiscountService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadDiscounts(
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
        this.discountService.GetListItemWithSrachParams(this.searchParam,'/Discount/GetAll/Paging')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.discountLengthSource.next(news.result.count);
                this.discountSubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.discountSubject.asObservable();
    }

    disconnect(): void {
        this.discountSubject.complete();
        this.loadingSubject.complete();
    }
}
