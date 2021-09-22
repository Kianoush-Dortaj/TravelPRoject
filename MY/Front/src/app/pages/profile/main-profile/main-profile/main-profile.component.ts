import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert-service';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { GetProfileInfoModel } from '../models/get-information-model';
import { MainProfileService } from '../services/main-profile.service';
import { SendMessageComponent } from './send-message/send-message.component';


@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {

  info: GetProfileInfoModel;
  imageProfilePath: any = undefined;
  imageProfilePosterPath: any = undefined;

  constructor(private activateRoute: ActivatedRoute,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    public dialog: MatDialog,
    private matDialog: MatDialog,
    private alertService: AlertService,
    private mainProfileService: MainProfileService) {
    this.fetchDate();
  }

  ngOnInit(): void {
  }

  onClickBanner() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  onClickavatar() {
    const fileUpload = document.getElementById('fileUploadAvatar') as HTMLInputElement;
    fileUpload.click();
  }

  fileChangeBanner(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      // this.previewPoster(file);
      this.mainProfileService.UploadBanner(file).subscribe();
    }
  }

  preview(files) {
    if (files.length === 0)
      return;

    if (files.type !== 'image/jpeg' || files.type !== 'image/png') {
      return this.alertService.Error('File not Suported')
    }

    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imageProfilePath = reader.result;
    }
  }


  previewPoster(files) {
    if (files.length === 0)
      return;

    if (files.type !== 'image/jpeg' || files.type !== 'image/png') {
      return this.alertService.Error('File not Suported')
    }

    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imageProfilePosterPath = reader.result;
    }
  }

  fileChangeAvatar(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      // this.preview(file);
      this.mainProfileService.UploadAvatar(file).subscribe();
    }
  }

  fetchDate(): void {
    this.info = this.activateRoute.snapshot.data['info'].data;
  }

  sendMessage(): void {
    const dialogRef = this.matDialog.open(SendMessageComponent, {
      data: {
        userId: this.info.id
      }
      , panelClass: 'show-modal'
    });
  }

}
