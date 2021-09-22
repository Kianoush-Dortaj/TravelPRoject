import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gender } from 'src/app/shared/models/gender.enum';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from "jalali-moment";
import { EditPersonalInfoModel } from '../../../models/edit-personal-info-model';
import { GetPersonalInfoModel } from '../../../models/get-personal-info-model';
import { ManagersService } from '../../../services';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AlertService } from 'src/app/core/services';
import { UploadLocalFileAddress } from 'src/app/core/utility/address-local-file-upload';
import { MatDialog } from '@angular/material/dialog';
import { FilePreview } from 'src/app/core/utility/file-preview';
import { TypeFile } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ValidationAuthTokenUser, AuthTokenType } from 'src/app/core/auth/services';
import { IAppConfig, APP_CONFIG } from 'src/app/core/configs/app.config';
import { FileType } from 'src/app/shared/components/preview/models/file-type';

@Component({
  selector: 'change-personal-info',
  templateUrl: './change-personal-info.component.html',
  styleUrls: ['./change-personal-info.component.scss']
})
export class ChangePersonalInfoComponent implements OnInit {

  @Input() personalInfo: GetPersonalInfoModel;
  @ViewChild("file") file: ElementRef;
  @Input() isDeleted: boolean;
  subscription: Subscription;

  changePersonalInfoFG: FormGroup;
  queueProgress: number;
  phoneconfirm = "";
  birthDate: string = "2020-05-17T00:00:00+00:00";
  loading = false;
  confirmed;
  gender = Gender;
  imagePath;
  imgURL:string;

  constructor(private formBuilder: FormBuilder
    , private managersService: ManagersService
    , private cdRef: ChangeDetectorRef
    , private prevFile: FilePreview
    , private dialog: MatDialog
    , private datePipe: DatePipe
    , private authService: ValidationAuthTokenUser
    , @Inject(APP_CONFIG) private appConfig: IAppConfig
    , private route: Router
    , private localization: UploadLocalFileAddress
    , private alertService: AlertService
    , private router: Router) { }

  ngOnInit(): void {
    this.InitialForm();
    if (this.personalInfo.hasAvatar) {
      this.imgURL = this.appConfig.apiEndpoint + '/Manager/GetManagerImage/' + this.personalInfo.id + '/?access_token=' + this.authService.getRawAuthToken(AuthTokenType.AccessToken);
    } else {
      this.imgURL = '../../../../assets/img/demo/default.png';
    }

    this.confirmed = this.personalInfo.phoneNumberConfirmed;
    if (this.isDeleted) {
      this.changePersonalInfoFG.disable()
    }
  }

  get f() {
    return this.changePersonalInfoFG.controls
  }



  InitialForm() {
    this.changePersonalInfoFG = this.formBuilder.group({
      id:[this.personalInfo.id],
      avatar: ['', Validators.compose([Validators.required])],
      firstName: [this.personalInfo.firstName, Validators.compose([Validators.required])],
      lastName: [this.personalInfo.lastName, Validators.compose([Validators.required])],
      phoneNumber: [this.personalInfo.phoneNumber, Validators.compose([Validators.required])]
    })
  }

  preview(files) {
    this.localization.ConvertFileToAddress(files).then(data => {
      this.imgURL = data;
      this.cdRef.detectChanges();
    });
  }

  openPrevieFile(): void {
    this.prevFile.filePreview(this.imgURL, FileType.Image, this.personalInfo.id.toString(), 'filePreview');
  }

  openFileDialog() {
    this.file.nativeElement.click();
  }

  backToMenu(): void {
    this.route.navigate(['/managers']);
  }

  SendVerifyPhoneNumberRequest(): void {
    this.subscription = this.managersService.VerifyPhonenumber(this.f.phoneNumber.value, this.personalInfo.id).subscribe(
      data => {
        if (data['success']) {
          this.confirmed = true;
          this.alertService.success('', data['message']);
        }
      }
    )
  }


  saveInfo() {
    let editModel = {} as EditPersonalInfoModel;
    const selectedFiles = this.f.avatar.value;
    editModel = Object.assign({}, this.changePersonalInfoFG.value);

    if (selectedFiles) {
      editModel.avatar = selectedFiles['files'][0];
    }

   this.subscription= this.managersService.UpdateWithFile(editModel, this.personalInfo.id, '/manager/UpdateInforamtion').subscribe(
      (upload: HttpEvent<any>) => {
        switch (upload.type) {
          case HttpEventType.UploadProgress:
            if (upload.total) {
              this.queueProgress = Math.round(upload.loaded / upload.total * 100);
              // if (this.queueProgress <= 100 && this.queueProgress > 0) {
              //   elemnt.style.strokeDashoffset = 440 + (445 * this.queueProgress / 100) + 'px'
              // }
              this.cdRef.detectChanges();
            }
            break;
          case HttpEventType.Response:
            if (upload.body['success']) {
              this.queueProgress = null;
              this.alertService.success('', upload.body['message']);
              this.router.navigate(['/managers']);
            } else {
              this.cdRef.detectChanges();
            }
            this.loading = false;
            this.queueProgress = null;
            break;
        }
      },
      error => {
        this.loading = false;
        this.queueProgress = null;
      });
  }

}
