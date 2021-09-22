import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddFileModel } from '../models/add-file-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FileManagerService } from '../services/file-manager-service';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AlertService } from 'src/app/core/services';
import { ListFileModel } from '../models/list-files';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vex-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  subscriptions: Subscription;
  listModel: ListFileModel[] = [];
  uploadFormGroupFG: FormGroup;

  parentId: string;

  constructor(private formBuilder: FormBuilder,
    private fileManagerService: FileManagerService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {

    this.parentId = this.activatedRoute.snapshot.params['id'];
    this.listModel.push(...this.activatedRoute.snapshot.data['getListFiles'])
  }

  ngOnInit(): void {
    this.InitialForm();
    this.applyPage();
  }

  applyPage(): void {
    this.fileManagerService.filter$.subscribe(() => {
      this.fileManagerService.GetListItemById(this.parentId)
        .subscribe(data => {
          this.listModel = [...data.result]
        })
    })
  }


  InitialForm(): void {
    this.uploadFormGroupFG = this.formBuilder.group({
      items: this.formBuilder.array([])
    })
  }

  addForm(): void {
    const item = <FormArray>this.uploadFormGroupFG.controls['items'];
    item.push(this.newForm())
  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      trackPoster: ['', Validators.compose([Validators.required])],
      trackProfile: ['', Validators.compose([Validators.required])],
      trackFile: ['', Validators.compose([Validators.required])]
    })
  }

  removeTracks(index) {
    const items = <FormArray>this.uploadFormGroupFG.controls['items'];
    items.removeAt(index);
  }

  get f() {
    return this.uploadFormGroupFG.controls['items']['controls'];
  }



  onSubmit(index): void {
    let addModel = {} as AddFileModel;

    addModel.name = this.f[index]['controls']['name'].value;
    addModel.trackFile = this.f[index]['controls']['trackFile'].value['files'][0];
    addModel.trackPoster = this.f[index]['controls']['trackPoster'].value['files'][0];
    addModel.trackProfile = this.f[index]['controls']['trackProfile'].value['files'][0];
    addModel.parentId = this.parentId;

    this.subscriptions = this.fileManagerService.CreateWithFile(addModel).subscribe(
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
              // this.queueProgress = null;
              this.alertService.success('', upload.body['message']);
              this.removeTracks(index);
              this.listModel.push(upload.body['data'])
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