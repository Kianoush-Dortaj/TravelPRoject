import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
	name: 'jalali'
})
export class DateToPersian implements PipeTransform {
	transform(value: any, type = 'date'): any {
		let format = 'YYYY/MM/DD';
		if (type === 'dateTime') {
			format = 'YYYY/MM/DD HH:mm';
		} else if (type === 'time') {
			format = 'HH:MM';
		}

		const MomentDate = moment(value);
		return MomentDate.locale('fa').format(format);
	}
}
