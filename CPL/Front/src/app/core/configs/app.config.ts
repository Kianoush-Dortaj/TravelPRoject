'use strict';

import { InjectionToken } from '@angular/core';
import { Url } from 'url';
import { HttpHeaders } from '@angular/common/http';
import { TableSearch } from '../models/table-filter';

export let APP_CONFIG = new InjectionToken<string>('app.config');
export interface IAppConfig {
	fileUrl: string;
	editorConfig: any;
	fileAvatarUrl: string;
	datePickerConfigFa: object;
	dateTimePickerConfigFa: object;
	datePickerConfigNoTime: object;
	datePickerConfigFa_Down: object;
	datePickerConfig: object;
	datePickerCiofig: object;
	dateTimePickerConfig: object;
	dateTimeFormat: string;
	dateTimeFormatServer: string;
	dateFormat: string;
	apiEndpoint: string;
	signalREndPoint: string;
	imagePath: string;
	refreshTokenPath: string;
	logoutPath: string;
	allowImageExtentions: string[];
	allowAudioExtentions: string[];
	allowViedoExtentions: string[];
	allowTextExtentions: string[];
	tablePageSize: number;
	tablePageSizeOptions: number[];
	fileUploadSize: number;
	headersOptions: HttpHeaders;
	defaultSearchParam: TableSearch;
	timeType: string;
	ellipsisLenght: number;
	dropdownPageSize: number;
	localImage: string;
	localAudio: string;
	localVideo: string;
	localText: string;
	// css
	detailDialogWidth: string;

	// validation
	val: {
		maxLen: {
			title: number,
			username: number,
			firstName: number,
			lastName: number
		},
		minLen: {
			title: number,
			firstName: number,
			lastName: number
		}
	};
}

export const AppConfig: IAppConfig = {
	apiEndpoint: 'http://localhost:7412',
	// apiEndpoint: 'http://192.168.200.134:55328/api/v1',
	refreshTokenPath: 'account/RefreshToken',
	signalREndPoint: 'http://pfa-cpl.toppayment.net/',
	imagePath: 'http://pfa-cpl.toppayment.net/api/v1/',
	logoutPath: 'account/logout',
	fileAvatarUrl: 'http://pfa-cpl.toppayment.net/file/avatars/',
	fileUrl: 'http://pfa-cpl.toppayment.net/',
	headersOptions: new HttpHeaders({ 'Content-Type': 'application/json' }),

	datePickerConfigFa: {
		// drops: 'down',
		format: 'YYYY-MM-DDTHH:MM:SS',
		showTwentyFourHours: 'enabled',
		showMultipleYearsNavigation: 'enabled',
		locale: 'fa',
		closeOnSelect: true,
		drops: 'down',
	},
	datePickerConfigNoTime: {
		// drops: 'down',
		format: 'YYYY-MM-DD',
		showTwentyFourHours: 'enabled',
		showMultipleYearsNavigation: 'enabled',
		closeOnSelect: true,

		locale: 'fa',
		drops: 'down',
	},
	datePickerConfigFa_Down: {
		// drops: 'down',
		format: 'YYYY/MM/DD',
		showTwentyFourHours: 'enabled',
		closeOnSelect: true,
		showMultipleYearsNavigation: 'enabled',
		locale: 'fa',
		drops: 'down',
	},
	dateTimePickerConfigFa: {
		format: 'YYYY/MM/DD HH:mm',
		showTwentyFourHours: 'enabled',
		showMultipleYearsNavigation: 'enabled',
		closeOnSelect: true,
		closeOnSelectDelay: true,
		locale: 'fa',
		drops: 'down',
	},
	datePickerConfig: {
		// drops: 'down',
		format: 'YYYY/MM/DD',
		showTwentyFourHours: 'enabled',
		showMultipleYearsNavigation: 'enabled',
		closeOnSelect: true,

		locale: 'en',
		drops: 'down',
	},
	dateTimePickerConfig: {
		format: 'YYYY/MM/DD HH:mm',
		showTwentyFourHours: 'enabled',
		closeOnSelect: true,

		showMultipleYearsNavigation: 'enabled',
		locale: 'en',
		drops: 'down'
	},
	dateTimeFormat: 'YYYY/MM/DD HH:mm',
	dateFormat: 'YYYY/MM/DD',
	datePickerCiofig: {
		drops: 'down',
		format: 'YY/M/D'
	},
	tablePageSize: 10,
	tablePageSizeOptions: [1, 5, 10, 20],
	fileUploadSize: 1000000,
	dateTimeFormatServer: 'YYYY-MM-DDTHH:MM:SS',
	ellipsisLenght: 300,
	allowImageExtentions: ['.png', '.jpg', '.jpeg'],
	allowAudioExtentions: ['.3gp', '.mp3', '.ogg', '.wma'],
	allowViedoExtentions: ['.avi', '.wmv', '.mp4', '.3gp'],
	allowTextExtentions: ['.DOCX', '.PDF', '.TXT', 'XLS', 'PPT'],
	defaultSearchParam: {
		_search: false,
		page: 1,
		rows: 10,
	},
	timeType: 'GENERAL.MINUTE',
	dropdownPageSize: 20,
	// css
	detailDialogWidth: '60%',
	localImage: 'data:image',
	localAudio: 'data:audio',
	localVideo: 'data:video',
	localText: 'data:application',

	// validation
	val: {
		maxLen: {
			title: 20,
			username: 20,
			firstName: 20,
			lastName: 30
		},
		minLen: {
			title: 5,
			firstName: 3,
			lastName: 2
		}
	},
	editorConfig: {
		toolbar: [
			// my custom dropdown
			['bold', 'italic', 'underline', 'strike'],        // toggled buttons
			['blockquote', 'code-block'],

			//     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
			//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
			//     [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
			//    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
			[{ 'direction': 'rtl' }],                         // text direction

			//    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
			//    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

			[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
			// [{ 'font': [] }],
			[{ 'align': [] }],

			//       ['clean']
		]
	}
	// apiEndpoint: 'http://serverAddress/api';
	// loginPath: 'account/login';
	// logoutPath: 'account/logout';
	// refreshTokenPath: this.baseUrl+'account/RefreshToken';
	// accessTokenObjectKey: 'access_token';
	// refreshTokenObjectKey: 'refresh_token';
};
