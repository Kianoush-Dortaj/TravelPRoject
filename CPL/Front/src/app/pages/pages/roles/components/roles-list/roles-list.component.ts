import { Component, OnInit, ViewChild, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { RoleDataSource, RoleService } from '../../services';
import { TableFilterRules } from 'src/app/core/models/table-filter';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';
import { IAppConfig, APP_CONFIG } from 'src/app/core/configs/app.config';

@Component({
	selector: 'kt-roles-list',
	templateUrl: './roles-list.component.html',
	styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit, AfterViewInit, OnDestroy {

	subscription: Subscription;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	dataSource: RoleDataSource;
	loadingTable = true;
	unsubscribeAll$: Subject<any>;
	submitSubscription: Subscription;

	length: number;
	pageSize: number;
	pageSizeOptions: number[];
	filters: TableFilterRules[];
	isLoadingResults = true;

	displayedColumns: string[] = [
		'name',
		'actions'
	];

	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private roleService: RoleService,
		private router: Router,
		public dialog: MatDialog
	) {
		this.filters = new Array<TableFilterRules>();
	}

	/*******************************************************************
	  Lifecycle Hook
	 *******************************************************************/

	ngOnInit(): void {
		this.unsubscribeAll$ = new Subject();
		this.pageSize = this.appConfig.tablePageSize;
		this.pageSizeOptions = this.appConfig.tablePageSizeOptions;
		this.dataSourceInit();
	}

	ngAfterViewInit(): void {
		this.initPaginator();
	}

	ngOnDestroy(): void {
		this.unsubscribeAll$.next();
		this.unsubscribeAll$.unsubscribe();
	}

	/******************************************************
	  PUBLIC
	*******************************************************/

	dataSourceInit(): void {
		this.dataSource = new RoleDataSource(this.roleService);
		this.dataSource.loadRoles(1, this.pageSize, this.filters);
	}

	private loadDataSource(): void {
		this.dataSource.loadRoles(
			this.paginator.pageIndex + 1,
			this.paginator.pageSize,
			this.filters
		);
	}



	initPaginator(): void {
		this.paginator.page.pipe(tap(() => this.loadDataSource())).subscribe();
	}

	edit(role): void {
		this.router.navigate(['/gift/giftCodeEdit/', role.Id]);
	}

	/******************************************************
	   Actions
	  *******************************************************/

	delete(id: number): void {

		const title = 'Gift Code Delete';
		const itemName = `Gift Code`;
		const service = this.roleService;

		const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
			data: { id, title, itemName, service , url: '/role/delete/'},
			width: '440px'
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.loadDataSource();
			}

		});
		
	}

}
