export class ItemNode {
    actionId: string;
    name: string;
    children: ItemNode[];
  
    constructor(actionId,name) {
      this.actionId = actionId;
      this.name = name;
    }
  }