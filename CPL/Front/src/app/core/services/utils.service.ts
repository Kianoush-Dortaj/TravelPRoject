import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { TableSearch, TableFilterRules } from '../models/table-filter';
import { BrowserStorageService } from '../auth/services';
import { APP_CONFIG, IAppConfig } from '../configs/app.config';

@Injectable({
	providedIn: 'root'
})
export class UtilsService {
	constructor(private browserStorageService: BrowserStorageService,
		@Inject(APP_CONFIG) private appConfig: IAppConfig) { }

	isEmptyString(value: string): boolean {
		return !value || 0 === value.length;
	}

	getCurrentTabId(): number {
		const tabIdToken = 'currentTabId';
		let tabId = this.browserStorageService.getSession(tabIdToken);
		if (tabId) {
			return tabId;
		}
		tabId = Math.random();
		this.browserStorageService.setSession(tabIdToken, tabId);
		return tabId;
	}

	lowerCaseFirstLetter(data: string): string {
		return data.charAt(0).toLowerCase() + data.slice(1);
	}

	upperCaseFirstLetter(data: string): string {
		return data.charAt(0).toUpperCase() + data.slice(1);
	}

	splitPascalCase(word): string {
		const wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
		return word.match(wordRe).join(' ');
	}

	generateHttpParam(searchParam: TableSearch): HttpParams {
		const params = new HttpParams()
			.set('_search', searchParam._search.toString())
			.set('page', searchParam.page.toString())
			.set('rows', searchParam.rows.toString());

		return params;
	}

	downloadFile(response, fileName: string = null): void {
		// const a = document.createElement('a');
		// a.href = URL.createObjectURL(response['body']);

		// if (fileName) {
		// 	a.download = fileName;
		// } else {
		// 	a.download = this.getFileNameFromHttpResponse(response);
		// }

		// // start download
		// a.click();

		const link = document.createElement('a');
		link.setAttribute('type', 'hidden');

		if (fileName) {
			link.download = fileName;
		} else {
			link.download = this.getFileNameFromHttpResponse(response);
		}

		link.href = URL.createObjectURL(response['body']);
		document.body.appendChild(link);
		link.click();
		link.remove();
	}

	getFileNameFromHttpResponse(httpResponse): string {
		const contentDispositionHeader = httpResponse.headers.get(
			'Content-Disposition'
		);
		const result = contentDispositionHeader
			.split(';')[1]
			.trim()
			.split('=')[1];
		return result.replace(/"/g, '');
	}

	handleResponse(response: any): any {
		return (response && response['result']) || {};
	}

	MakeFiltersForTable(formControls: any): Array<TableFilterRules> {
		const filters = new Array<TableFilterRules>();
		Object.keys(formControls).forEach(key => {
			if ((formControls[key].value + '').length > 0) {
				const q: TableFilterRules = {
					field: key,
					op: 'cn',
					data: formControls[key].value
				};
				filters.push(q);
			}

		});
		return filters;
	}



	treeToFlat<T>(array: Array<T>): Array<T> {
		const data = new Array<T>();
		array.forEach(parent => {
			data.push(parent);
			parent['children'].forEach(lesson => {
				data.push(lesson);
			});
		});
		return data;
	}


}
