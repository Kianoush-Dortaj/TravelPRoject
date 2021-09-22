import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { TableFilterRules } from 'src/app/core/models/table-filter';
import { MatSort, Sort } from '@angular/material/sort';
import { APP_CONFIG, IAppConfig } from 'src/app/core/configs/app.config';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';
import { SubscribeDataSource } from '../../services/subscribe-datasource.service';
import { SubscribeService } from '../../services/subscribe-service.service';

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
  columnsToDisplay = ['more', 'name', 'price', 'actions'];
  dataSource: SubscribeDataSource;
  filters: TableFilterRules[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageSize: number;
  pageSizeOptions: number[];
  url: string = "/admin/manager/GetManagerImage/";
  sortedData: any;
  seedData: any;

  constructor(
    private managerService: SubscribeService
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
    this.dataSource.loadSubscribes(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.filters
    );
  }
  dataSourceInit(): void {
    this.dataSource = new SubscribeDataSource(this.managerService);
    this.dataSource.loadSubscribes(1, this.pageSize, this.filters);
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
      data: { id, title, itemName, service, url: '/Subscribe/Delete' },
      width: '440px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loadDataSource();
      }
    });
  }

  sortData(sort: Sort) {

    this.dataSource.subscribe$.subscribe(x => {
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
    this.dataSource.subscribeSubject.next(data);
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

