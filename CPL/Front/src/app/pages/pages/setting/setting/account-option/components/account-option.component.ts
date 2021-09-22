import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountSettingService } from '../services/account-setting-services.service';
import { AlertService } from 'src/app/core/services';

@Component({
  selector: 'account-option',
  templateUrl: './account-option.component.html',
  styleUrls: ['./account-option.component.scss']
})
export class AccountOptionComponent implements OnInit {

  subscriptions: Subscription;

  data: any;
  accountSettingFG: FormGroup;
  constructor(private formBuilder: FormBuilder, private accountsettingService: AccountSettingService) {
  }

  ngOnInit(): void {
    this.accountSettingFG = this.formBuilder.group({
      twoFactorAuthentication: [''],
      email: [''],
      sms: ['']
    });

    this.FetchData().then(res => {
      this.data=res;
        this.InitialForm();
    });
  }

  InitialForm(): void {
    console.log(this.data)
    this.accountSettingFG.patchValue({
      twoFactorAuthentication: this.data.twoFactorAuthentication,
      email: this.data.email,
      sms: this.data.sms
    });
  }

  FetchData() {
      return this.accountsettingService.GetListItem('/Setting/GetAccountSetting')
        .toPromise()
        .then(res => {
          return res.result;
        })
  }

  onSubmit(): void {

    this.subscriptions = this.accountsettingService.Update(this.accountSettingFG.value, '/Setting/SetAccountSetting')
      .subscribe(data => {
 
      })


  }

}
