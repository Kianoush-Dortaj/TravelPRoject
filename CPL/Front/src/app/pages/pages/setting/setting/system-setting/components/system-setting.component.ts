import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SystemSettingService } from '../services/system-setting-services.service';

@Component({
  selector: 'system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.scss']
})
export class SystemSettingComponent implements OnInit {

  subscriptions: Subscription;

  data: any;
  systemSettingFG: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountsettingService: SystemSettingService) {
  }

  ngOnInit(): void {
    this.systemSettingFG = this.formBuilder.group({
      verifyRegisterAccountWithEmail: ['']
    });

    this.FetchData().then(res => {
      this.data=res;
        this.InitialForm();
    });
  }

  InitialForm(): void {

    this.systemSettingFG.setValue(this.data);
  }

  FetchData() {
      return this.accountsettingService.GetListItem('/SiteOption/SystemSetting')
        .toPromise()
        .then(res => {
          return res.result['systemSettingModel'];
        })
  }

  onSubmit(): void {

    this.subscriptions = this.accountsettingService.Create(this.systemSettingFG.value, '/SiteOption/SystemSetting')
      .subscribe(data => {
 
      })
  }

}
