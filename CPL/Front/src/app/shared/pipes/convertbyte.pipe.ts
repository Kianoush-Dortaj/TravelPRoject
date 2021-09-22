import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
	name: 'convertbyte'
})
export class ConvertbytePipe implements PipeTransform {

	deciPipe: DecimalPipe;

	private units = [
		'bytes',
		'KB',
		'MB',
		'GB',
		'TB',
		'PB'
	];
	constructor(@Inject(LOCALE_ID) localeId) {
		this.deciPipe = new DecimalPipe(localeId);
	}

	transform(bytes: any, ...args: any[]): any {
		if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) { return '?'; }

		let unit = 0;

		while (bytes >= 1024) {
			bytes /= 1024;
			unit++;
		}

		return this.deciPipe.transform(bytes, '1.1-' + 2) + ' ' + this.units[unit];
	}

}
