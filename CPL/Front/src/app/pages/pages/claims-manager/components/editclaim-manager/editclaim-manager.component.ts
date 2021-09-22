import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimsManagerService } from '../../services/claims-manager-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimManagerEdit } from '../../models/claim-manager-edit';
import { Subscription } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { AlertService } from 'src/app/core/services';
import { BehavorSubject } from 'src/app/core/services/behavior-subject';

@Component({
  selector: 'kt-editclaim-manager',
  templateUrl: './editclaim-manager.component.html',
  styleUrls: ['./editclaim-manager.component.scss']
})
export class EditclaimManagerComponent implements OnInit {

  subscription: Subscription;
  model: any;
  editRoleClaimFG: FormGroup;
  selectedList: string[];
  editModel = {} as ClaimManagerEdit;
  ch: boolean;

  constructor(private activeRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private alertService: AlertService,
    private behavorSubject: BehavorSubject,
    private route: Router,
    private formBuilder: FormBuilder, private claimService: ClaimsManagerService) {
    this.fetchData();
    this.behavorSubject.setListValue(activeRoute.snapshot.params['id']);
  }

  initlaForm(): void {
    this.editRoleClaimFG = this.formBuilder.group({
      id: [this.model._id, Validators.compose([Validators.required])],
      name: [this.model.name, Validators.compose([Validators.required])],
      permissionId: [this.model.permissionId, Validators.compose([Validators.required])],
      parentId: [this.model.parentId]
    })


  }

  ngOnInit(): void {
    this.initlaForm();
    this.cdRef.detectChanges();
  }

  fetchData(): void {
    this.model = this.activeRoute.snapshot.data['data'];

  }
  changeIsChild() {
    this.ch = !this.ch;
  }
  get f() {
    try {
      return this.editRoleClaimFG.controls;
    }
    catch (e) { }
  }

  changeSelectedList(selectedList): void {
    this.selectedList = [];
    selectedList.forEach(element => {
      this.selectedList.push(element['actionId']);
    });
  }

  onSubmit(): void {
    console.log(this.f)
    const claimEdit: ClaimManagerEdit = {
      id:this.f.id.value,
      permissionId: this.f.permissionId.value,
      parentId: this.f.parentId.value,
      name: this.f.name.value
    }
    this.subscription = this.claimService.update(this.model.id, claimEdit).subscribe(x => {
      if (x['success']) {
        this.alertService.success('', x['message'])
        this.route.navigate(['/claims-manager/list'])
      } else {
        this.alertService.error('', x['message'])
      }
    })
  }
}
