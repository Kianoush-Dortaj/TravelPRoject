
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { TravelTypeService } from './travel-type-service.service';

@Injectable({
    providedIn: 'root'
})

export class TravelTypeDataSource implements DataSource<any>
{
    public travelTypeSubject = new BehaviorSubject<any[]>([]);
    public travelType$ = this.travelTypeSubject.asObservable();

    private travelTypeLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.travelTypeLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private travelTypeService: TravelTypeService) {
        this.searchParam = {
            _search: true,
            dateTimeType: 1,
            page: 1,
            rows: 10,
            sidx: 'Id',
            sort: 'desc'
        };
    }

    loadCategories(
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
        this.travelTypeService.GetListItemWithSrachParams(this.searchParam, '/TravelType/GetAll/Paging')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.travelTypeLengthSource.next(news.result.count);
                this.travelTypeSubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.travelTypeSubject.asObservable();
    }

    disconnect(): void {
        this.travelTypeSubject.complete();
        this.loadingSubject.complete();
    }
}
