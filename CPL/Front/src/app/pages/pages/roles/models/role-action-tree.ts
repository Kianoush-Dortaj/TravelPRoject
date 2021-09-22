export class RoleActionTree{
	attributes: Attribute[];
	controller: string;
	selectAll: boolean;
	indeterminate: boolean;
	isOpen: boolean;

}


export interface Attribute{
	actionId: string;
	actionName: string;
	selected: boolean;
}
