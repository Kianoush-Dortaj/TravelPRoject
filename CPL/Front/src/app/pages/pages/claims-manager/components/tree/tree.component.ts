import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTree } from '@angular/material/tree';
import { TreeBuilder } from './utils/tree-builder';
import { of as observableOf, Observable, ReplaySubject } from 'rxjs';
import { ClaimsManagerAddComponent } from '../claims-manager-add/claims-manager-add.component';
import { ClaimsManagerService } from '../../services/claims-manager-service';
import { MatDialog } from '@angular/material/dialog';
import { ItemNode } from './models/ItemNode.model';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router, NavigationEnd, ParamMap } from '@angular/router';
import { NumberValueAccessor } from '@angular/forms';
import { ItemFlatNode } from '../editclaim-manager/tree/models/ItemFlatNode.model';
import { expand, filter, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RouterExtService } from 'src/app/core/services/route-exect-service';
import { BehavorSubject } from 'src/app/core/services/behavior-subject';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';
/** File node data with nested structure. */
export interface FileNode {
	id: number;
	name: string;
	parentId: number;
	children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
	id: number;
	title: string;
	parentId: number;
	isChilde: boolean;
	level: number;
	expandable: boolean;
}
@Component({
	selector: 'kt-role-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.css'],
	providers: [TreeBuilder]
})
export class TreeComponent implements OnInit, AfterViewInit, OnDestroy {

	@Output() selectedList = new EventEmitter<any>();

	ngAfterViewInit() {

	}
	readonly _destroy$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

	InitData;
	loading = true;
	treeControl: FlatTreeControl<ItemFlatNode>;
	openNode: number[] = [];
	treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
	dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;
	/** The selection for checklist */
	checklistSelection = new SelectionModel<ItemFlatNode>(true);
	defualtSelected: ItemFlatNode[];
	/** Map from flat node to nested node. This helps us finding the nested node to be modified */
	flatNodeMap = new Map<ItemFlatNode, ItemNode>();
	searchParam: any;
	tree;
	previousUrl: string;
	prevId: number;

	constructor(
		private database: TreeBuilder,
		private dialog: MatDialog,
		private previosRoute: RouterExtService,
		private router: Router,
		private cdRef: ChangeDetectorRef,
		private behavorSubject: BehavorSubject,
		private claimsManagerService: ClaimsManagerService,
		private activatedRoute: ActivatedRoute
	) {
		this.searchParam = {
			_search: true,
			dateTimeType: 1,
			page: 1,
			rows: 2
		};
		this.behavorSubject.listValue$.subscribe(x => {
			this.prevId = +x;
		})
		this.intialDataa();
		this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
			this._isExpandable, this._getChildren);
		this.treeControl = new FlatTreeControl<ItemFlatNode>(this._getLevel, this._isExpandable);
		console.log(this.treeControl)
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
		database.dataChange.subscribe(data => this.dataSource.data = data);
		this.setDefualtSelected();

	}
	ngOnInit(): void {

	}

	ngOnDestroy() {
		this._destroy$.next(true);
		this._destroy$.complete();
	}

	setDefualtSelected(): void {
		console.log(this.defualtSelected)
		for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
			for (let j = 0; j < this.defualtSelected.length; j++) {
				if (this.treeControl.dataNodes[i].actionId === this.defualtSelected[j].actionId) {
					this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
					this.treeControl.expand(this.treeControl.dataNodes[i]);
					break;
				}
			}
		}
	}

	transformer = (node: ItemNode, level: number) => {
		return new ItemFlatNode(!!node.children, node.actionId, node.name, level);
	}
	intialDataa(): any {
		this.searchParam.page = 1;
		this.searchParam.rows = 1000;
		this.loading = true;
		this.claimsManagerService.GetAll().subscribe(data => {
			this.InitData = data.result;
			 this.tree = [...data.result];
			 console.log(this.tree)
			let treeData: FileNode[] = [];
			let queue: FileNode[] = [];
			while (this.InitData.length > 0) {
				let data = this.InitData[0];
				let node = {
					id: data._id,
					name: data.name,
					parentId: data.parentId,
					children: []
				};
				queue[node.id] = node;
				if (!data.parentId)
					treeData.push(node);
				else {
					// find parent
					let parent = queue[data.parentId]
					// add to children
					parent.children.push(node);
				}
				this.InitData.splice(0, 1);
			}
			this.rolesToTree(treeData)
		})
	}
	rolesToTree(roles): void {
		const selections: ItemFlatNode[] = [];
		const controllers = [];
		roles.forEach(element => {
			const attrs = [];
			element['children'].forEach(attr => {
				const secAttrs = [];
				attr['children'].forEach(sec => {
					const treeAttrs = [];
					sec['children'].forEach(tree => {
						const treeAction = { name: tree['name'], parentId: tree['parentId'], actionId: tree['id'] };
						treeAttrs.push(treeAction);
					});
					const secAction = { name: sec['name'], parentId: sec['parentId'], actionId: sec['id'], children: treeAttrs };
					secAttrs.push(secAction);
				});
				const action = { name: attr['name'], parentId: attr['parentId'], actionId: attr['id'], children: secAttrs };
				attrs.push(action);
			});
			const controller = { name: element['name'], parentId: element['parentId'], actionId: element['id'], children: attrs };
			controllers.push(controller);
		});
		this.defualtSelected = selections;

		const data = [{ name: 'All', parentId: null, actionId: null, children: controllers }];
		this.database.dataChange.next(this.database.builTree(data, 0));
		this.loading = false;
		if (this.prevId > 0) {
			let itemd = this.treeControl.dataNodes.find(x => x.actionId == this.prevId.toString());
			console.log(itemd)
			this.OpenNodeWithActinoId(itemd);
		}
		if (this.openNode.length > 0) {
			this.openNode.forEach(element => {
				this.treeControl.expand(this.treeControl.dataNodes[element]);
			});
			this.treeControl.expand(this.treeControl.dataNodes[0]);
			this.openNode.splice(0, this.openNode.length)
		} else {
			this.treeControl.expand(this.treeControl.dataNodes[0]);
		}

		this.cdRef.detectChanges()
	}

	private _getLevel = (node: ItemFlatNode) => node.level;

	private _isExpandable = (node: ItemFlatNode) => node.expandable;

	private _getChildren = (node: ItemNode): Observable<ItemNode[]> => observableOf(node.children);

	hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;

	/** Whether all the descendants of the node are selected */
	descendantsAllSelected(node: ItemFlatNode): boolean {
		this.selectedList.emit(this.checklistSelection.selected);
		const descendants = this.treeControl.getDescendants(node);
		return descendants.every(child => this.checklistSelection.isSelected(child));
	}

	/** Whether part of the descendants are selected */
	descendantsPartiallySelected(node: ItemFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const result = descendants.some(child => this.checklistSelection.isSelected(child));
		return result && !this.descendantsAllSelected(node);
	}

	/** Toggle the to-do item selection. Select/deselect all the descendants node */
	todoItemSelectionToggle(node: ItemFlatNode): void {
		this.checklistSelection.toggle(node);
		const descendants = this.treeControl.getDescendants(node);
		this.checklistSelection.isSelected(node)
			? this.checklistSelection.select(...descendants)
			: this.checklistSelection.deselect(...descendants);
	}

	delete(id: number): void {
		const title = 'Post Delete';
		const itemName = `Post `;
		const service = this.claimsManagerService;

		const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
			data: { id, title, itemName, service, url: '/permission/Delete' },
			width: '440px'
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.intialDataa();
			}

		});
	}


	FindIndexWithParentId(nodel): number {
		return this.treeControl.dataNodes.indexOf(nodel);
	}

	OpenNodeWithActinoId(node): void {
		let cont = true;
		let item = this.tree.find(x => x.id === node.actionId);
		this.openNode.push(this.FindIndexWithParentId(node));
		if (item !== undefined) {
			while (cont) {
				if (item.parentId) {
					this.openNode.push
						(this.FindIndexWithParentId
							(this.treeControl.dataNodes.find(x => x.actionId === item.parentId)));
					item = this.tree.find(x => x.id === item.parentId);
				} else {
					console.log(item, this.treeControl.dataNodes)
					this.openNode.push
						(this.FindIndexWithParentId
							(this.treeControl.dataNodes.find(x => x.actionId === item.id)));
					cont = false;
				}
			}
		}
	}

	openAdd(id, par, title, nodel): void {

		let dialogRef;
		this.OpenNodeWithActinoId(nodel);

		console.log(id)
		dialogRef = this.dialog.open(ClaimsManagerAddComponent, {
			data: { id: id, isChilde: false, claimName: title }
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.intialDataa();
			}
		});
	}
}

