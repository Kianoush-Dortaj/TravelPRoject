
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { CountryService } from './Country-service.service';

@Injectable({
    providedIn: 'root'
})

export class CountryDataSource implements DataSource<any>
{
    public CountrySubject = new BehaviorSubject<any[]>([]);
    public Country$ = this.CountrySubject.asObservable();

    private CountryLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.CountryLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private CountryService: CountryService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadCoutries(
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
        this.CountryService.GetListItemWithSrachParams(this.searchParam,'/admin/Country/GetAllPaging')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.CountryLengthSource.next(news.result.count);
                this.CountrySubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.CountrySubject.asObservable();
    }

    disconnect(): void {
        this.CountrySubject.complete();
        this.loadingSubject.complete();
    }
}
