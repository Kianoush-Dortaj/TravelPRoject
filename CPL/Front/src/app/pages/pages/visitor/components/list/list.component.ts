import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { TableFilterRules } from 'src/app/core/models/table-filter';
import { MatSort, Sort } from '@angular/material/sort';
import { GetAllManagerModel } from '../../models';
import { IAppConfig, APP_CONFIG } from 'src/app/core/configs/app.config';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';
import { VisitorDataSource } from '../../services/visitor-datasource.service';
import { VisitorService } from '../../services/visitor-service.service';

@Component({
  selector: 'vex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay = ['avatar','displayName' ,'userName','visitorCode','isActive', 'actions'];
  dataSource: VisitorDataSource;
  filters: TableFilterRules[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageSize: number;
  pageSizeOptions: number[];
  url:string="/admin/manager/GetManagerImage/";
  sortedData: GetAllManagerModel[] = [];
  seedData: GetAllManagerModel[] = [];

  constructor(
    private managerService: VisitorService
    , @Inject(APP_CONFIG) private appConfig: IAppConfig
    , public dialog: MatDialog) {

    this.filters = new Array<TableFilterRules>();
    let q = {} as TableFilterRules;
    q.field = 'isDelete';
    q.op = 'eq';
    q.data = 'false';
    this.filters.push(q);
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  ngOnInit(): void {
    this.pageSize = this.appConfig.tablePageSize;
    this.pageSizeOptions = this.appConfig.tablePageSizeOptions;
    this.dataSourceInit();
    this.initPaginator();
    this.applyFilter();
  }
  private loadDataSource(): void {
    this.dataSource.loadVisitors(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.filters
    );
  }
  dataSourceInit(): void {
    this.dataSource = new VisitorDataSource(this.managerService);
    this.dataSource.loadVisitors(1, this.pageSize, this.filters);
  }
  CheckBoolean(value): boolean {
    if (typeof (value) === 'boolean')
      return true;
    return false;
  }
  showDetails(row): void {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  initPaginator(): void {
    this.paginator.page.pipe(tap(() => this.loadDataSource())).subscribe();
  }

  applyFilter(): void {
    this.paginator.pageIndex = 0;
    this.managerService.filter$
      .pipe()
      .subscribe(filters => {
        this.filters = filters;
        this.paginator.pageIndex = 0;
        this.loadDataSource();
      });
  }

  delete(id: number): void {
    const title = 'Post Delete';
    const itemName = `Post `;
    const service = this.managerService;

    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      data: { id, title, itemName, service, url: '/admin/manager/delete' },
      width: '440px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadDataSource();
      }
    });
  }

  sortData(sort: Sort) {

    this.dataSource.visitors$.subscribe(x => {
      this.seedData = x
    })
    const data = this.seedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName': return compare(a.userName, b.userName, isAsc);
        case 'active': return compare(a.isActive, b.isActive, isAsc);
        case 'lastLoggedIn': return compare(a.lastLoggedIn, b.lastLoggedIn, isAsc);
        default: return 0;
      }
    });
    this.dataSource.visitorsSubject.next(data);
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

