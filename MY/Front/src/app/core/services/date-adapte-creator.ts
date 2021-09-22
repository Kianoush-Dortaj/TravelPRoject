import { GregorianDateAdapter } from './gregorian-date-adapter';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './material.persian-date.adapter';
import { MAT_MOMENT_DATE_FORMATS } from './moment-date-format';


export function createDateProvider() {
	const lang = localStorage.getItem('language');
	if (lang === 'fa') {
		return new MaterialPersianDateAdapter();
	} else {
		return new GregorianDateAdapter();
	}
}

export function getDateFormat() {
	const lang = localStorage.getItem('language');
	if (lang === 'fa') {
		return PERSIAN_DATE_FORMATS;
	} else {
		return MAT_MOMENT_DATE_FORMATS;
	}
 }
