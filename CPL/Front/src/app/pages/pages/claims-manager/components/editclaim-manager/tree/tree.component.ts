import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeBuilder } from './utils/tree-builder';
import { ItemNode } from './models/ItemNode.model';
import { ItemFlatNode } from './models/ItemFlatNode.model';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClaimsManagerService } from '../../../services/claims-manager-service';
import { ClaimManagerList } from '../../claims-manager-add/claims-manager-add.component';
import { AlertService } from 'src/app/core/services';

@Component({
	selector: 'kt-role-tree-tree',
	templateUrl: './tree.component.html',
	styleUrls: ['./tree.component.css'],
	providers: [TreeBuilder]
})
export class TreeEditComponent {

	@Output() selectedList = new EventEmitter<any>();

	treeControl: FlatTreeControl<ItemFlatNode>;
	treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
	dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;
	/** The selection for checklist */
	checklistSelection = new SelectionModel<ItemFlatNode>(true);
	defualtSelected: ItemFlatNode[];
	/** Map from flat node to nested node. This helps us finding the nested node to be modified */
	flatNodeMap = new Map<ItemFlatNode, ItemNode>();
	roles: ClaimManagerList[] = [];
	constructor(
		private database: TreeBuilder,
		private claimService: ClaimsManagerService,
		private alertService: AlertService,
		private dialog: MatDialog,
		private activatedRoute: ActivatedRoute
	) {
		this.InitialTree();
		this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
			this._isExpandable, this._getChildren);
		this.treeControl = new FlatTreeControl<ItemFlatNode>(this._getLevel, this._isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
		database.dataChange.subscribe(data => this.dataSource.data = data);
		this.setDefualtSelected();

	}

	private InitialTree() {
		this.roles = this.activatedRoute.snapshot.data['model']['result'];
		this.rolesToTree(this.roles);
	}

	setDefualtSelected(): void {
		for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
			for (let j = 0; j < this.defualtSelected.length; j++) {
				if (this.treeControl.dataNodes[i].actionId === this.defualtSelected[j].actionId) {
					this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
					this.treeControl.expand(this.treeControl.dataNodes[i]);
					break;
				}
			}
			// this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
			// this.treeControl.expand(this.treeControl.dataNodes[i])
		}
	}

	transformer = (node: ItemNode, level: number) => {
		return new ItemFlatNode(!!node.children, node.actionId, node.name, level);
	}

	
	rolesToTree(roles): void {
		console.log(roles)
		const selections: ItemFlatNode[] = [];
		const controllers = [];

		roles['controllerActions'].forEach(element => {
			const attrs = [];
			if (element['attributes'] !== undefined) {
				element['attributes'].forEach(attr => {
					const action = { name: attr['actionName'], actionId: attr['actionId'] };
					attrs.push(action);
					if (attr['selected'] === true) {
						const a = new ItemFlatNode(false, attr['actionId'], attr['actionName'], 2);
						selections.push(a);
					}
				});
			}
			const controller = { name: element['controller'], actionId: 'aef', children: attrs };
			controllers.push(controller);
		});

		// this.checklistSelection = new SelectionModel<ItemFlatNode>(true, selections);
		this.defualtSelected = selections;

		const data = [{ name: 'All', actionId: 'sds', children: controllers }];
		this.database.dataChange.next(this.database.builTree(data, 0));
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

	// openAdd(id): void {
	// 	if (typeof (id) === 'string') {
	// 		this.dialog.open(ClaimsManagerAddComponent, {
	// 			data: { id: null, isChilde: false, claimName: 'Main' }
	// 		});
	// 	}
	// 	{
	// 		let item = this.roles.find(x => x.id === id);
	// 		this.dialog.open(ClaimsManagerAddComponent, {
	// 			data: { id: item.id, isChilde: item.isChilde, claimName: item.title }
	// 		});
	// 	}
	// }

	// deleteNode(id: number): void {
	// 	this.claimService.delete(id).subscribe(x => {
	// 		if (x['success']) {
	// 			this.alertService.success('', x['message']);
	// 		} else {
	// 			this.alertService.error('', x['message']);
	// 		}
	// 	})
	// }
}

