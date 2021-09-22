import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterSettingService } from '../service/register-setting.service';

@Component({
  selector: 'register-setting',
  templateUrl: './register-setting.component.html',
  styleUrls: ['./register-setting.component.scss']
})
export class RegisterSettingComponent implements OnInit {

  subscriptions: Subscription;

  data: any;
  systemSettingFG: FormGroup;
  roles: any;

  constructor(private formBuilder: FormBuilder, private registerSettingService: RegisterSettingService) {
    this.GetRoles();
  }

  ngOnInit(): void {
    this.systemSettingFG = this.formBuilder.group({
      adminRegister: [''],
      userRegister: ['']
    });

    this.FetchData().then(res => {
      this.data = res;
      this.InitialForm();
    });
  }

  InitialForm(): void {

    this.systemSettingFG.patchValue({
      adminRegister: this.data.adminRegister,
      userRegister: this.data.userRegister
    });
  }

  FetchData() {
    return this.registerSettingService.GetListItem('/Setting/GetRegisterSetting')
      .toPromise()
      .then(res => {
        return res.result;
      })
  }

  GetRoles() {
    return this.registerSettingService.GetListItem('/role/GetAll/Select')
      .toPromise()
      .then(res => {
        this.roles = res.result
      })
  }

  onSubmit(): void {

    this.subscriptions = this.registerSettingService.Update(this.systemSettingFG.value, '/Setting/SetRegisterSetting')
      .subscribe(data => {

      })
  }


}
