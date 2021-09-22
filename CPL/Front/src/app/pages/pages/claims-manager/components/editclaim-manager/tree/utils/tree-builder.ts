import {Injectable} from '@angular/core';
import {ItemNode} from '../models/ItemNode.model';
import {BehaviorSubject} from 'rxjs';
/**
 * This class transforms a data array into structured tree
 */

@Injectable()
export class TreeBuilder {
   dataChange = new BehaviorSubject<ItemNode[]>([]);
  
  get data(): ItemNode[] { return this.dataChange.value; }
  
  constructor() {
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
}
