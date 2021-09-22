import { Component, OnInit, Inject } from '@angular/core';
import { FileType } from '../models/file-type';
import { AlertService } from 'src/app/core/services';
import { DomSanitizer } from '@angular/platform-browser';
import { IAppConfig, APP_CONFIG } from 'src/app/core/configs/app.config';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreviewService } from '../service/preview-service.service';

export interface DialogData {
  src: string;
  type: FileType;
  id:string;
}

@Component({
  selector: 'vex-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData
    , @Inject(APP_CONFIG) public appConfig: IAppConfig
    , private alertService: AlertService
    , private previewService: PreviewService
    , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.previewService.GetFile(this.data.src, this.data.id).subscribe(data => {

		// 	if (data.type == 'application/json') {
		// 		this.ImageBlobUrl = './../../../../assets/img/demo/default.png/' + 'img/demo/default.png';
		// 	} else {
		// 		this.ImageUrl = URL.createObjectURL(data);
		// 		this.ImageBlobUrl = this.domSanitizer.bypassSecurityTrustUrl(this.ImageUrl);
		// 	}
		// })
  }



}

