import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagersService } from '../../../services';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translationService';
import { AlertService } from 'src/app/core/services';
import { Route, Router } from '@angular/router';
import { MustMatch } from 'src/app/core/utility/must-match-validation';

@Component({
  selector: 'change-account-info',
  templateUrl: './change-account-info.component.html',
  styleUrls: ['./change-account-info.component.scss']
})
export class ChangeAccountInfoComponent implements OnInit {

  @Input() accountInfo: any;

  subscription: Subscription;
  changeAccountInfoFG: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private translationService: TranslationService
    , private alertService:AlertService
    , private route:Router
    , private managerSerivce: ManagersService) { }

  ngOnInit(): void {
    this.InitialForm();
  }
  get f() {
    return this.changeAccountInfoFG.controls
  }

  InitialForm(): void {
    this.changeAccountInfoFG = this.formBuilder.group({
      email: [this.accountInfo.email, Validators.compose([Validators.required])],
      confirmEmail: [],
      isActive: [this.accountInfo.isActive],
      isWriter: [this.accountInfo.isWriter]
    },{
      validator:MustMatch('email','confirmEmail')
    });
  }
  saveInfo(): void {
    this.subscription = this.managerSerivce.ChangeAccountInfo(this.f.email.value, this.f.confirmEmail.value,this.f.isActive.value ,this.accountInfo.id)
      .subscribe(data => {
        if (data['success']) {
          this.alertService.success('',data['message']);
          this.route.navigate(['/managers']);
        }
      })
  }

}
