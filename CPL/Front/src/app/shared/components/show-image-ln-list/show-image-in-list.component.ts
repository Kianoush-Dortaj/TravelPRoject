import { Component, OnInit, Input, Inject, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APP_CONFIG, IAppConfig } from 'src/app/core/configs/app.config';
import { ValidationAuthTokenUser, AuthTokenType } from 'src/app/core/auth/services';
import { TypeFile } from '../../models/type-file-enum';
import { BehaviorSubject } from 'rxjs';
import { ImageService } from './service/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'pfa-show-image-in-list',
	templateUrl: './show-image-in-list.component.html',
	styleUrls: ['./show-image-in-list.component.scss']
})
export class ShowImageInListComponent implements OnInit {
	@ViewChild("myImage") myImage: ElementRef;

	@Input() Url: string;
	@Input() id: number;
	@Input() radius: boolean = false;
	@Input() hasAvatar;
	@Input() NoClick = false;

	ImageUrl: string;
	ImageBlobUrl: any;


	constructor(
		@Inject(APP_CONFIG) private appConfig: IAppConfig,
		private authService: ValidationAuthTokenUser,
		private domSanitizer: DomSanitizer,
		private imageService: ImageService
		, private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.imageService.GetImage(this.Url, this.id).subscribe(data => {

			if (data.type == 'application/json') {
				this.ImageBlobUrl = './../../../../assets/img/demo/default.png/' + 'img/demo/default.png';
			} else {
				this.ImageUrl = URL.createObjectURL(data);
				this.ImageBlobUrl = this.domSanitizer.bypassSecurityTrustUrl(this.ImageUrl);
			}
		})
	}
}
