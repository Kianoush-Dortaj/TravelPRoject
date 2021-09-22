import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ListFileModel } from '../../models/list-files';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FileManagerService } from '../../services/file-manager-service';
import { AddFileModel } from '../../models/add-file-model';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AlertService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FilePreview } from 'src/app/core/utility/file-preview';
import { FileType } from 'src/app/shared/components/preview/models/file-type';
import { FileManagerConfig } from '../../models/file-manager-config';
import { DeleteEntityDialogComponent } from 'src/app/shared/components/delete-entity-dialog/delete-entity-dialog.component';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('myfirstanimation', [
      state('small', style({
        height: '0px',
      })),
      state('large', style({
        height: '*',
      })),
      transition('small <=> large', animate('200ms ease-in')),
    ]),
  ]
})
export class ItemComponent implements OnInit {

  subscriptions: Subscription;

  @Input() item: ListFileModel;
  @Input() parentId: string;

  editFromFG: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private fileManagerService: FileManagerService,
    public fileManagerConfig: FileManagerConfig,
    private preview: FilePreview,
    public dialog: MatDialog,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.InitialFrom();
  }

  state: string = 'small';

  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  Preview(id: string): void {
    this.preview.filePreview(this.fileManagerConfig.getFileUrl, FileType.Sound, id)
  }

  InitialFrom(): void {
    this.editFromFG = this.formBuilder.group({
      _id: [this.item.id],
      name: [this.item.name, Validators.compose([Validators.required])],
      trackPoster: [''],
      trackProfile: [''],
      trackFile: ['']
    })
  }
  get f() {
    return this.editFromFG.controls;
  }

  delete(id: string): void {
    const title = 'Post Delete';
    const itemName = `Post `;
    const service = this.fileManagerService;

    const dialogRef = this.dialog.open(DeleteEntityDialogComponent, {
      data: { id, title, itemName, service, url: this.fileManagerConfig.deleteUrl },
      width: '440px'
    });


    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.fileManagerService.updateFilters();
      }
    });
  }

  addItem(id: string): void {
    const title = 'Post Delete';
    const itemName = `Post `;

    // const dialogRef= this.dialog.open(AddItemToPlayListComponent, {
    //   data: {
    //     itemId: id,
    //     generId: this.parentId,
    //   },
    //   width: '440px'
    // });

    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     this.fileManagerService.updateFilters();
    //   }
    // });

  }

  removeItemFromPlayList(id:string):void{
    this.fileManagerService.Update(id,'/admin/track/RemoveFromPlayList').subscribe(data=>{
      this.fileManagerService.updateFilters();
    })
  }


  onSubmit(): void {
    let addModel = {} as AddFileModel;

    addModel.name = this.f.name.value;
    if (this.f.trackFile.value) {
      addModel.trackFile = this.f.trackFile.value['files'][0];
    }
    if (this.f.trackPoster.value) {
      addModel.trackPoster = this.f.trackPoster.value['files'][0];
    }
    if (this.f.trackProfile.value) {
      addModel.trackProfile = this.f.trackProfile.value['files'][0];
    }
    addModel.parentId = this.item.parentId;

    this.subscriptions = this.fileManagerService.UpdateWithFile(addModel, this.f._id.value).subscribe(
      (upload: HttpEvent<any>) => {
        switch (upload.type) {
          case HttpEventType.UploadProgress:
            if (upload.total) {
              // this.queueProgress = Math.round(upload.loaded / upload.total * 100);
              // if (this.queueProgress <= 100 && this.queueProgress > 0) {
              //   elemnt.style.strokeDashoffset = 440 + (445 * this.queueProgress / 100) + 'px'
              // }
              // this.cdRef.detectChanges();
            }
            break;
          case HttpEventType.Response:
            if (upload.body['success']) {
              this.state = 'small';
              this.item = upload.body['data'];
              //   this.cdRef.detectChanges();
              this.alertService.success('', upload.body['message']);
            } else {
              // this.cdRef.detectChanges();
            }
            // this.loading = false;
            // this.queueProgress = null;
            break;
        }
      },
      error => {
        // this.loading = false;
        // this.queueProgress = null;
      });
  }

}
