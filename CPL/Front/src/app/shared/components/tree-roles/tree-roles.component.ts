import { OnInit, Output, EventEmitter, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TreeBuilder } from 'src/app/pages/pages/claims-manager/components/tree/utils/tree-builder';
import { ItemFlatNode } from 'src/app/pages/pages/claims-manager/components/editclaim-manager/tree/models/ItemFlatNode.model';
import { ItemNode } from 'src/app/pages/pages/claims-manager/components/tree/models/ItemNode.model';
import { ClaimsManagerService } from 'src/app/pages/pages/claims-manager/services/claims-manager-service';
import { DeleteEntityDialogComponent } from '../delete-entity-dialog/delete-entity-dialog.component';
import { ClaimsManagerAddComponent } from 'src/app/pages/pages/claims-manager/components/claims-manager-add/claims-manager-add.component';
export interface FileNode {
  id: number;
  name: string;
  parentId: number;
  selected: boolean;
  isChilde: boolean;
  children?: FileNode[];
}

/** Flat node with expandable and level information */
export interface TreeNode {
  id: number;
  title: string;
  parentId: number;
  selected: boolean;
  isChilde: boolean;
  level: number;
  expandable: boolean;
}
@Component({
  selector: 'ktt-role-tree',
  templateUrl: './tree-roles.component.html',
  styleUrls: ['./tree-roles.component.scss'],
  providers: [TreeBuilder]
})
export class TreeRolesComponent implements OnInit, AfterViewInit {
  @Output() selectedList = new EventEmitter<any>();
  @Output() sendagin = new EventEmitter<boolean>();
  @Input() checkAble = true;
  @Input() data: any;

  InitData = [];
  treeControl: FlatTreeControl<ItemFlatNode>;
  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;
  dataChange = new BehaviorSubject<ItemNode[]>([]);

  //get data(): ItemNode[] { return this.dataChange.value; }
  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemFlatNode>(true);
  defualtSelected: ItemFlatNode[];
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();
  searchParam: any;
  loading = false;

  constructor(
    private database: TreeBuilder,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private claimsManagerService: ClaimsManagerService
  ) {

    this.searchParam = {
      _search: true,
      dateTimeType: 1,
      page: 1,
      rows: 2
    };
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<ItemFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe(data => this.dataSource.data = data);
  }
  ngAfterViewInit(): void {


    this.treeControl.expand(this.treeControl.dataNodes[1]);
  }
  ngOnInit(): void {
    this.intialDataa();

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
    }
  }

  transformer = (node: ItemNode, level: number) => {
    return new ItemFlatNode(!!node.children, node.actionId, node.name, level);
  }

  intialDataa(): any {
    this.searchParam.page = 1;
    this.searchParam.rows = 1000;
    this.loading = true;
    if (this.data === undefined || this.data === []) {
      this.claimsManagerService.getAll(this.searchParam).subscribe(data => {
        this.ConvertToMultiLevel(data['records']);
      })
    } else {
      this.ConvertToMultiLevel(this.data);
    }
  }

  private ConvertToMultiLevel(data: any) {
    this.InitData = data;
    console.log("TreeRolesComponent -> ConvertToMultiLevel -> InitData", this.InitData)
    let treeData: FileNode[] = [];
    let queue: FileNode[] = [];
    while (this.InitData.length > 0) {
      let data = this.InitData[0];

      let node = {
        id: data.id,
        name: data.name,
        parentId: data.parentId,
        selected: data.selected,
        isChilde: data.isChilde,
        children: []
      };
      queue[node.id] = node;
      if (!data.parentId)
        treeData.push(node);
      else {
        // find parent
        let parent = queue[data.parentId];
        // add to children
        parent.children.push(node);
      }
      this.InitData.splice(0, 1);
    }
    this.rolesToTree(treeData);
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
            const treeAction = { name: tree['name'], actionId: tree['id'] };
            treeAttrs.push(treeAction);
            if (tree['selected'] === true) {
              const a = new ItemFlatNode(false, tree['id'], tree['name'], 3);
              selections.push(a);
            }
          })
          const secAction = { name: sec['name'], actionId: sec['id'], children: treeAttrs };
          secAttrs.push(secAction);
          if (sec['selected'] === true) {
            console.log('dara=>', sec)
            const a = new ItemFlatNode(false, sec['id'], sec['name'], 3);
            selections.push(a);
          }
        });
        if (attr['selected'] === true) {
          console.log('dara=>', attr)
          const a = new ItemFlatNode(false, attr['id'], attr['name'], 1);
          selections.push(a);
        }
        const actionss = { name: attr['name'], actionId: attr['id'], children: secAttrs };
        attrs.push(actionss);
      });
      const controller = { name: element['name'], actionId: element['id'], children: attrs };
      controllers.push(controller);
    });
    //   this.checklistSelection = new SelectionModel<ItemFlatNode>(true, selections);
    this.defualtSelected = selections;
    const data = [{ name: 'All', actionId: 'sds', children: controllers }];
    this.database.dataChange.next(this.database.builTree(controllers, 0));
    this.loading = false;
    this.setDefualtSelected();

    this.cdRef.detectChanges();
  }

  private _getLevel = (node: ItemFlatNode) => node.level;

  private _isExpandable = (node: ItemFlatNode) => node.expandable;

  private _getChildren = (node: ItemNode): Observable<ItemNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;
  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: ItemFlatNode): boolean {
    this.selectedList.emit(this.checklistSelection.selected);
    const descendants = this.treeControl.getDescendants(node);
    return (this.checklistSelection.isSelected(node) && descendants.length == 0) || (descendants.length > 0 && descendants.every(child => this.checklistSelection.isSelected(child)));
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
  builTree(obj: any, level: number): ItemNode[] {
    return Object.keys(obj).reduce<ItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ItemNode(value.actionId, value.name);
      if (value != null) {
        if (typeof value === 'object') {
          if (value.children !== undefined) {
            node.children = this.builTree(value.children, level + 1);
          }

        }
      }

      return accumulator.concat(node);
    }, []);
  }
  delete(id: number): void {
    const title = 'Post Delete';
    const itemName = `Post `;
    const service = this.claimsManagerService;

    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      data: { id, title, itemName, service },
      width: '440px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.sendagin.emit(true);
      }

    });
  }



  openAdd(id, title): void {
    console.log(id, title)
    let dialogRef;
    if (typeof (id) === 'string') {
      dialogRef = this.dialog.open(ClaimsManagerAddComponent, {
        data: { id: null, isChilde: false, claimName: 'Main' }
      });
    } else {
      dialogRef = this.dialog.open(ClaimsManagerAddComponent, {
        data: { id: id, isChilde: false, claimName: title }
      });
    }

    dialogRef.afterClosed().subscribe(() => {

      this.sendagin.emit(true);
      this.intialDataa();
      this.cdRef.detectChanges()
    })
  }
  deselect(nodel): void {

    console.log(this.checklistSelection.selected)
  }
}

