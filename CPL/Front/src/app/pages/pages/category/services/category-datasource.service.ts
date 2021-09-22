
import { DataSource } from '@angular/cdk/table';
import { Injectable } from '@angular/core';
import { TableSearch, TableFilterRules } from 'src/app/core/models/table-filter';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TablePagingIndex, ServerResponse } from 'src/app/core/models';
import { CategoryService } from './category-service.service';

@Injectable({
    providedIn: 'root'
})

export class CategoryDataSource implements DataSource<any>
{
    public categorySubject = new BehaviorSubject<any[]>([]);
    public category$ = this.categorySubject.asObservable();

    private categoryLengthSource = new BehaviorSubject<number>(0);
    public length$ = this.categoryLengthSource.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    id: number;
    private searchParam: TableSearch;

    constructor(private categoryService: CategoryService) {
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
        this.categoryService.GetListItemWithSrachParams(this.searchParam, '/Category/GetAll/Paging')
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((news:ServerResponse<TablePagingIndex<any>>) => {
                const data = news.result.data;
                this.categoryLengthSource.next(news.result.count);
                this.categorySubject.next(data);
            });
    }

    connect(): Observable<any[]> {
        return this.categorySubject.asObservable();
    }

    disconnect(): void {
        this.categorySubject.complete();
        this.loadingSubject.complete();
    }
}
