import { TypeFile } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { AlertService } from '../services';
import { FileType } from 'src/app/shared/components/preview/models/file-type';
import { PreviewComponent } from 'src/app/shared/components/preview/components/preview.component';

@Injectable({
	providedIn: 'root'
})
export class FilePreview {

	constructor(private dialog: MatDialog, private alertService: AlertService) { }

	filePreview(name: string, type: FileType, id: string, customeStyle?: string, hasAavate?: boolean): void {
		let src: string;
		if (name === undefined) {
			this.alertService.warning('', 'عکسی برای نمایش وجود ندارد');
		} else {
			if (!name.includes('base64')) {
				src = name + id;
			}
			else if (name !== null) {
				src = name;
			}
		}

		this.dialog.open(PreviewComponent, {
			data: { id: id, src: src, type: type }
		});
	}

}
