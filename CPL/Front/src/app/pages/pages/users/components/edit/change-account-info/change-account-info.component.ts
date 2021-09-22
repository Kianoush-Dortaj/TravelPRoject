import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translationService';
import { AlertService } from 'src/app/core/services';
import { Route, Router } from '@angular/router';
import { MustMatch } from 'src/app/core/utility/must-match-validation';
import { UsersService } from '../../../services/users-service.service';

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
    , private userService: UsersService) { }

  ngOnInit(): void {
    this.InitialForm();
  }
  get f() {
    return this.changeAccountInfoFG.controls
  }

  InitialForm(): void {
    console.log(this.accountInfo)
    this.changeAccountInfoFG = this.formBuilder.group({
      userName: [this.accountInfo.userName, Validators.compose([Validators.required])],
      confirmuserName: [],
      isActive: [this.accountInfo.isActive],
      isWriter: [this.accountInfo.isWriter]
    },{
      validator:MustMatch('userName','confirmuserName')
    });
  }
  saveInfo(): void {
    this.subscription = this.userService.ChangeAccountInfo(this.f.userName.value, this.f.confirmuserName.value,this.f.isActive.value, this.f.isWriter.value ,this.accountInfo.id)
      .subscribe(data => {
        if (data['success']) {
          this.alertService.success('',data['message']);
          this.route.navigate(['/users']);
        }
      })
  }

}
