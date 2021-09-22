import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
	providedIn: 'root'
})
export class UploadLocalFileAddress {


	ConvertFileToAddress(event): Promise<any> {

		return new Promise((resolve, reject) => {

			const reader = new FileReader();
			reader.readAsDataURL(event.target['files'][0]);
			reader.onload = (e) => {
				return resolve(e.target['result']);
			};
		});
	}


}