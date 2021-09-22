import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert-service';
import { AccountService } from '../services/account-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountSettingFG: FormGroup;
  info: any;
  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alretService: AlertService,
    private activatedRoute: ActivatedRoute) {
    this.info = this.activatedRoute.snapshot.data['info'];
  }

  ngOnInit(): void {
    this.initalForm();
  }

  initalForm(): void {
    this.accountSettingFG = this.formBuilder.group({
      firstName: [this.info.firstName, Validators.compose([Validators.required])],
      lastName: [this.info.lastName, Validators.compose([Validators.required])],
      email: [this.info.email, Validators.compose([Validators.required])],
      gender: [this.info.gender, Validators.compose([Validators.required])],
      aboutMe: [this.info.aboutMe, Validators.compose([Validators.required])]
    })
  }

  onSubmit(): void {
    this.accountService.SetAccountService(this.info.id, this.accountSettingFG.value)
      .subscribe(res => {
        if (res.success) {
          this.alretService.SuccessToast(res.message);
        }
      })
  }

}
