import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/app/core/utility/must-match-validation';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { VisitorService } from '../../../services/visitor-service.service';

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
    , private userService: VisitorService) { }

  ngOnInit(): void {
    this.InitialForm();
  }


  get f() {
    return this.changePasswordFG.controls
  }


  InitialForm(): void {
    this.changePasswordFG = this.formBuilder.group({
      userId: [this.userId],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  saveInfo(): void {
    this.subscriptions = this.userService.Update(this.changePasswordFG.value,'/admin/Visitor/changePassword').subscribe(data => {
      if (data.success) {
        this.alertService.success('', data['message']);
        this.route.navigate(['/visitor']);
      }
    })
  }

}
