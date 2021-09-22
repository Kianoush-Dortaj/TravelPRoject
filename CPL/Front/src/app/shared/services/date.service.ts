import { Inject, Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
import { APP_CONFIG, IAppConfig } from 'src/app/core/configs/app.config';

@Injectable({
	providedIn: 'root'
})
export class DateService {

	constructor(@Inject(APP_CONFIG) private appConfig: IAppConfig) { }
	toPersianDate(date: any, format = 'YYYY/MM/DD'): string {
		const MomentDate = moment(date, format);
		return MomentDate.locale('fa').format(format);
	}

	toMiladiDate(date: any, format = 'YYYY/MM/DD'): string {
		const MomentDate = moment(date, format);
		return MomentDate.locale('en').format(format);
	}

	toMiladiDateSlash(date: any, format = 'YYYY-MM-DD'): string {
		const MomentDate = moment(date, format);
		return MomentDate.locale('en').format(format);
	}

	toServerDate(clientDate, currentLanguage): string {
		if (clientDate === undefined) {
			return '';
		}
		if (currentLanguage === 'fa') {
			const momentDate = moment.from(clientDate, currentLanguage, this.appConfig.datePickerConfigFa['format']);
			let datetime = momentDate.locale('en').format(this.appConfig.dateTimeFormatServer);
		} else {
			return clientDate;
		}
	}
	toServerDateNoTime(clientDate, currentLanguage): string {
		if (clientDate === undefined) {
			return '';
		}
		if (currentLanguage === 'fa') {
			const momentDate = moment.from(clientDate, currentLanguage, this.appConfig.datePickerConfigNoTime['format']);
			return momentDate.locale('en').format(this.appConfig.dateTimeFormatServer);
		} else {
			return clientDate;
		}
	}

	toCreateOnUtcFilter(clientDate, currentLanguage): string {
		if (clientDate === undefined) {
			return '';
		}
		if (currentLanguage === 'fa') {
		
			const momentDate = moment.from(clientDate, currentLanguage, this.appConfig.datePickerConfigFa['format']);
			let date= momentDate.locale('en').format('YYYY-MM-DD');
			console.log('in serv',date)
			return date;
		} else {
			return clientDate;
		}
	}

	MaterialServerDateTime(clientDate,lang?): string {
		return new Date(clientDate).toISOString();
	}

	toServerDateTime(clientDate, currentLanguage): string {
		console.log(clientDate)
		if (clientDate === undefined) {
			return '';
		}
		if (currentLanguage === 'fa') {
			const momentDate = moment.from(clientDate, currentLanguage, this.appConfig.dateTimePickerConfigFa['format']);
			return momentDate.locale('en').format(this.appConfig.dateTimeFormatServer);
		} else {
			return clientDate;
		}
	}

	toClientDate(date: any, currentLang: string): string {
		if (currentLang === 'fa') {
			return this.toPersianDate(date, this.appConfig.datePickerConfigFa['format']);
		} else {
			return this.toPersianDate(date, this.appConfig.datePickerConfig['format']);
		}
	}

	toClientDateNoTime(date: any, currentLang: string): string {
		console.log(date, currentLang)
		if (currentLang === 'fa') {
			return this.toPersianDate(date, this.appConfig.datePickerConfigNoTime['format']);
		} else {
			return this.toPersianDate(date, this.appConfig.datePickerConfigNoTime['format']);
		}
	}

	toClientDateTime(date: any, currentLang: string): string {
		if (currentLang === 'fa') {
			const d = this.toPersianDate(date, this.appConfig.dateTimePickerConfig['format']).substring(0, 10);
			const time = this.toPersianDate(date, this.appConfig.dateTimePickerConfig['format']).substring(11, 16);
			return (d + ' ' + time);
		} else {
			return this.toMiladiDate(date, this.appConfig.dateTimePickerConfig['format']);
		}
	}

	toClientDateTimeWithOutTime(date: any, currentLang: string): string {
		if (currentLang === 'fa') {
			const d = this.toPersianDate(date, this.appConfig.dateTimePickerConfig['format']).substring(0, 10);
			const time = this.toPersianDate(date, this.appConfig.dateTimePickerConfig['format']).substring(11, 16);

			return (d);
		} else {
			return this.toMiladiDate(date, this.appConfig.dateTimePickerConfig['format']);
		}
	}
}
