import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClaimsManagerService } from '../../services/claims-manager-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from 'src/app/core/services';
import { TableSearch } from 'src/app/core/models/table-filter';
import { DetailDialogComponent } from 'src/app/shared/components/detail-dialog/detail-dialog.component';

export interface ClaimManagerList {
  id: number;
  title: string;
  parentId: number;
  isChilde: boolean;
  childs: any[];
}

export interface Childes {
  id: string;
  title: string;
  parentId: number;
  isChilde: boolean;
  childes: any[];
}
@Component({
  selector: 'kt-claims-manager-add',
  templateUrl: './claims-manager-add.component.html',
  styleUrls: ['./claims-manager-add.component.scss']
})
export class ClaimsManagerAddComponent implements OnInit {
  subscriptions: Subscription;
  addClaimFG: FormGroup;
  roles: any;
  saveAndContinue = false;
  searchParam: TableSearch;
  claims: ClaimManagerList[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    private alertService: AlertService,
    private formBuilder: FormBuilder, private claimsManagerService: ClaimsManagerService, private activatedRoute: ActivatedRoute) {
    this.searchParam = {
      _search: true,
      dateTimeType: 1,
      page: 1,
      rows: 2
    };
  }


  getAllForManager(): void {
    this.searchParam.page = 1;
    this.searchParam.rows = 1000;
  }
  ngOnInit(): void {
    this.initialFormGroup();
  }

  get f(){
    return this.addClaimFG.controls;
  }

  initialFormGroup(): void {
    console.log(this.data.id)
    this.addClaimFG = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      permissionId: ['', Validators.compose([Validators.required])],
      parentId: [this.data.id],
      isChilde: [this.data.isChilde]
    })
  }

  onSubmit(): void {
    this.subscriptions = this.claimsManagerService.addClaim(this.addClaimFG.value).subscribe(x => {
      if (x['success']) {
        this.alertService.success('', x['message'])
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
      }
    })
  }

  saveAnContinue(): void {
    this.subscriptions = this.claimsManagerService.addClaim(this.addClaimFG.value).subscribe(x => {
      if (x['success']) {
        this.alertService.success('', x['message']);
        this.clearForm();
        this.saveAndContinue=true;
      } else {
        this.alertService.error('', x['message'])
      }
    })
  }

  clearForm(): void {
    this.addClaimFG.get('title').reset();
  }
  cancel(): void {
    this.dialogRef.close(this.saveAndContinue);
  }
}
