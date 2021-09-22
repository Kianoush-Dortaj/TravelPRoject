// Angular
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/core/services';

@Component({
	selector: 'kt-delete-entity-dialog',
	templateUrl: './delete-entity-dialog.component.html',
	styleUrls: ['./delete-entity-dialog.component.scss']
})
export class DeleteEntityDialogComponent implements OnInit {
	// Public properties
	viewLoading = false;
	eSevise: any;

	/**
     * Component constructor
     *
     * @param dialogRef: MatDialogRef<DeleteEntityDialogComponent>
     * @param data: any
     */
	constructor(
		public dialogRef: MatDialogRef<DeleteEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private translate: TranslateService,
		private alertServise: AlertService
	) {
		this.translate
			.get([
				'ALERT.SURE_DELTE',
				'GENERAL.DELETE',
				'GENERAL.ALERT',
				'GENERAL.CLOSE'
			])
			.subscribe(t => {
				data.description = t['ALERT.SURE_DELTE'];
				data.title = t['GENERAL.ALERT'];
				data.delete = t['GENERAL.DELETE'];
				data.close = t['GENERAL.CLOSE'];
			});
	}

	/**
     * On init
     */
	ngOnInit(): void { }

	/**
     * Close dialog with false result
     */
	onNoClick(): void {
		this.dialogRef.close();
	}

	/**
     * Close dialog with true result
     */
	onYesClick(): void {
		this.viewLoading = true;
		this.data.service.Delete(this.data.id,this.data.url).subscribe(res => {
			if (res['success'] === true) {
				this.alertServise.success('', 'GENERAL.DELETE_SUCCESS');
				this.dialogRef.close(true);
			} else {
				this.dialogRef.close(false);
			}
		});
		/* Server loading imitation. Remove this */
	}
}
