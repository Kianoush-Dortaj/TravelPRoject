import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddManagerModel, AdminEditRoles } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services';
import { ManagersService } from '../../services';
import { TranslationService } from 'src/app/core/services/translationService';
import { Gender } from 'src/app/shared/models/gender.enum';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  subscriptions: Subscription;
  addManagerFG: FormGroup;
  addRoleModelEdit: AdminEditRoles[] = [];
  addModel: AddManagerModel;
  roleListId: number[] = [];
  countryModel: any;
  gender = Gender;
  roles: any;

  constructor(private fromBuilder: FormBuilder
    , private router: Router
    , private managerService: ManagersService) {

  }

  /********** Initial ************/
  ngOnInit(): void {
    this.InitialFrom();
  }
  // From
  InitialFrom(): void {
    this.addManagerFG = this.fromBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      gender:['',Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      isActive: [false],
      isWriter: [false]
    })
  }

  get f() {
    return this.addManagerFG.controls
  }

  addRoleList(roleId: number): void {

    this.addManagerFG.patchValue({
      rolesId: this.roleListId
    });
  }

  /************** Submit ************** */
  onSubmit(): void {
    this.addModel = this.addManagerFG.value;
    this.subscriptions = this.managerService.Create(this.addModel, '/manager/create').subscribe(data => {
      if (data.success) {
        this.router.navigate(['/managers']);
      }
    });
  }
}
