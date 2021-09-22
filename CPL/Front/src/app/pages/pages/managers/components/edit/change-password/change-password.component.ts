import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/app/core/utility/must-match-validation';
import { ManagersService } from '../../../services';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() userId: number;

  subscriptions: Subscription;
  changePasswordFG: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private alertService: AlertService
    , private route: Router
    , private managerSerivce: ManagersService) { }

  ngOnInit(): void {
    this.InitialForm();
  }


  get f() {
    return this.changePasswordFG.controls
  }


  InitialForm(): void {
    this.changePasswordFG = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  saveInfo(): void {
    this.subscriptions = this.managerSerivce.Update(this.changePasswordFG.value, '/manager/changePassword/'+this.userId).subscribe(data => {
      if (data.success) {
        this.alertService.success('', data['message']);
        this.route.navigate(['/managers']);
      }
    })
  }

}
