import { Component, OnInit, Inject, Input, AfterViewInit, OnDestroy, ViewChildren, QueryList, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { KeyValue } from './key-value';
import { Subscription, Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { TranslationService } from 'src/app/core/services/translationService';

export interface DetailModel {
	id: number;
	name: string;
	value: string;
	isDate: boolean;
	isImage: boolean;
	isBoolean: boolean;
}

@Component({
	selector: 'kt-detail-dialog',
	templateUrl: './detail-dialog.component.html',
	styleUrls: ['./detail-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DetailDialogComponent implements OnInit, AfterViewInit, OnDestroy {

	globalModel: DetailModel[] = [];
	general = ['TITLE', 'DESCRIPTION', 'CREATED_ON_UTC'];
	lang = 'en';
	showBtn: number;
	src: string;
	showMore = false;
	unsubscribeAll$: Subject<any>;
	readMoreIndex: number[] = [];
	index: number[] = [];
	translateSubscription: Subscription;
	count = 0;


	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private elem: ElementRef,
		public dialog: MatDialog,
		private translateService: TranslateService,
		private translationService: TranslationService,
		private dialogRef: MatDialogRef<DetailDialogComponent>) {

		this.unsubscribeAll$ = new Subject();
		if (data.service != null || data.service !== undefined) {
			this.showMore = true;
		}
	}
	/*********************************
	 Life Cycle Hook
	 *******************************/
	ngOnInit(): void {
		this.setValue(this.data.data);
		this.InitLanguage();
	}

	ngAfterViewInit(): void {
		this.Elipses();
	}

	ngOnDestroy(): void {
		this.unsubscribeAll$.next();
		this.unsubscribeAll$.unsubscribe();
	}

	/*********************************
	 Public
	 *******************************/

	published(): void {
		// this.data.service.published(this.data.id).subscribe(res => {
		// 	if (res['success'] === true) {
		// 		if (res['result'] === true) {
		// 			this.alertService.success('', 'COURSE_COMMENT.COMMENT_PUBLISHED');
		// 		} else {
		// 			this.alertService.success('', 'COURSE_COMMENT.COMMENT_UNPUBLISHED');
		// 		}
		// 		this.dialogRef.close(true);
		// 	} else {
		// 		this.dialogRef.close(false);
		// 	}
		// });
	}

	translateEnum(data, type): string {
		data = 'DIALOG_PREVIEW.' + data;
		let transalte: string;
		if (type === 'dialog') {
			// get translate of enums
			this.translateService.get(data).pipe(takeUntil(this.unsubscribeAll$)).subscribe(
				v => {
					transalte = v;
				}
			);
		} else {
			// get translate of enums
			this.translateService.get('ENUM.' + this.data.enum + '.' + data).pipe(takeUntil(this.unsubscribeAll$)).subscribe(
				v => {
					transalte = v;
				}
			);
		}
		return transalte;
	}

	setValue(obj): void {
		let index = 0;
		for (const property in obj) {
			if (!property) {
				continue;
			}
			let detailModel: DetailModel;
			detailModel = {
				id: index,
				value: obj[property],
				name: this.changeTextForTranslate(property).toLocaleUpperCase(),
				isImage: this.isImage(property),
				isBoolean: this.findBoolean(obj[property]),
				isDate: this.mashkokToDate(obj[property])
			};
			const value = obj[property];
			if (value != null) {
				this.globalModel.push(detailModel);
			}
			this.index.push(index);
			index++;
		}
	}

	Elipses(): void {
		const index = this.index.length;
		for (let i = 0; i < index; i++) {
			const getElipsisValue = document.getElementsByClassName('spanArea')[i];
			const showMoreBtn = document.getElementsByClassName('showMoreBtn')[i];
			if (getElipsisValue) {
				const htmlLenght = getElipsisValue.innerHTML.length;
				if (typeof getElipsisValue.innerHTML === 'string' && htmlLenght > 10) {
					getElipsisValue.setAttribute('style', 'height:66px;overflow:hidden');
					const name = this.translateEnum('SHOW_MORE', 'dialog');
					getElipsisValue.innerHTML =
						getElipsisValue.innerHTML.substring(0, 300) + ' . . . ';
					showMoreBtn.innerHTML = name;
					showMoreBtn.setAttribute('style', 'display:block;margin-top: -6px;');
				}
			}
		}
	}

	isImage(value: any): boolean {
		if (value.toLocaleLowerCase().includes('thumbnail')) {
			this.count++;
			return true;
		} else {
			return false;
		}
	}

	mashkokToDate(name): boolean {
		let count = 0;
		if (typeof name === 'string') {
			if (name.length <= 35) {
				for (let i = 0; i < name.length; i++) {
					if (name.charAt(i) === '-') {
						count++;
						if (() => 2) {
							return this.convrtStringToDate(name);
						}
					}
				}
			}
		}
		return false;
	}

	findBoolean(value): boolean {
		if (typeof value === 'boolean') {
			if (value === true || value === false) {
				this.count += 1;
				return true;
			} else {
				return false;
			}
		}
	}

	convrtStringToDate(date: string): boolean {
		const regDate = /^\([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
		const findPersian = /^[\u0600-\u06FF\s]+$/;
		const dateValue = date.substring(0, 10);
		if (!dateValue[0].match(findPersian)) {
			const dateValue = date.substring(0, 10);
			if (!dateValue.match(regDate)) {
				this.count++;
				return true;
			}
		}
		return false;
	}

	More(index: number): void {
		const value = this.globalModel.filter(x => x.id = index);
		const getElipsisValue = document.getElementById('spanArea' + index);
		const InnerValue = getElipsisValue.innerHTML;
		const showMoreBtn = document.getElementById('showMoreBtn' + index);
		const htmlLenght = getElipsisValue.innerHTML.length;
		const elisiLenght = 8 + 8;
		if (htmlLenght < elisiLenght) {
			const name = this.translateEnum('SHOW_LESS', 'dialog');
			showMoreBtn.innerHTML = name;
			getElipsisValue.setAttribute('style', 'height:inherit;');
			showMoreBtn.setAttribute('style', 'display:block;');
			getElipsisValue.innerHTML = getElipsisValue.innerHTML.replace(InnerValue, value[index].value);
		} else {
			this.Elipses();
		}

	}


	FindLenghtString(item: string, index: number): string {
		if (this.showMore === false) {
			this.showMore = !this.showMore;
			return item.substring(0, 300) + ' . . . ';
		}
		else if (this.showMore === true) {
			this.showMore = !this.showMore;
			return item;
		}
		return item;
	}

	openDialog(id: number): void {
		// this.preview.filePreview(this.data.showUrl, TypeFile.Picture, this.data.id);
	}

	changeTextForTranslate(input: string): string {
		for (let i = 0; i < input.length; i++) {
			if (input.charAt(i) === input.charAt(i).toUpperCase()) {
				const t = input.substring(0, i) + '_' + input.substring(i, input.length);
				input = t;
				i++;
			}
		}
		return ((this.findTranslateSection(input.toLocaleUpperCase()) + input.toLocaleUpperCase()));
	}


	private InitLanguage(): void {
		this.translateSubscription = this.translationService.currentLang$.subscribe(lang => {
			this.lang = lang;
		});
	}

	findTranslateSection(text: string): string {
		if (this.general.includes(text)) {
			return 'GENERAL.';
		} else {
			return (this.data['moduleName'] + '.');
		}
	}

	truncate(input): any {
		if (input.length > 100) {
			return input.substring(0, 100) + '...';
		}
		else {
			return input;
		}
	}

	close(): void {
		this.dialogRef.close();
	}
}
