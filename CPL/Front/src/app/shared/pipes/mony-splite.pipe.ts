import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'monySplite'
})
export class MonySplitePipe implements PipeTransform {

	transform(value: any, ...args: any[]): any {
		return this.formatMoney(value);
	}

	formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ','): string {
		try {
			decimalCount = Math.abs(decimalCount);
			decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

			const negativeSign = amount < 0 ? '-' : '';

			const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), null).toString();
			const j = (i.length > 3) ? i.length % 3 : 0;

			const mony = negativeSign + (j ? i.substr(0, j) + thousands : '')
				+ i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands)
				+ (decimalCount ? decimal + Math.abs(amount - parseInt(i, null)).toFixed(decimalCount).slice(2) : '');
			return mony.replace('.00', ' ');
		} catch (e) {
		}
	}

}
