export interface TableSearch {
	_search: Boolean;
	rows: number;
	page: number;
	sidx?: string;
	sort?: string;
	filters?: TableFilterRules[];
	dateTimeType?: number;
}

export interface TableFilter {
	groupOp: string;
	rules: TableFilterRules[];
}

export interface TableFilterRules {
	field: string;
	op: string;
	data: string;
}
