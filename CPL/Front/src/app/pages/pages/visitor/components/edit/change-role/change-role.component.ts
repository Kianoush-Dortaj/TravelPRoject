import { Component, OnInit, Input } from '@angular/core';
import { AdminEditRoles } from '../../../models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services';
import { VisitorService } from '../../../services/visitor-service.service';

@Component({
  selector: 'change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {

  @Input() userRole: any;
  @Input() allRoles: any;
  @Input() userId: number;

  subscription: Subscription;
  changeRoleForm: FormGroup;
  adminEditRole: AdminEditRoles[];

  constructor(private userService: VisitorService,private alertService:AlertService ,private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
   this.InitialForm();
  }

  get f() {
    return this.changeRoleForm.controls;
  }

  InitialForm() {
    this.changeRoleForm = this.formBuilder.group({
      id: [this.userId],
      roleId: [this.userRole, Validators.compose([Validators.required])]
    })
  }

  saveInfo(): void {

    this.subscription = this.userService.Update(this.changeRoleForm.value,'/admin/Visitor/ChangeRole')
      .subscribe(data => {
        if (data['success']) {
          this.alertService.success('',data['message']);
          this.route.navigate(['/users']);
        }
      })
  }

  backToMenu(): void {
    this.route.navigate(['/users']);
  }

  // initAdminRoles(roles: any, adminRoles): void {
  //   const adminEditRole = new Array<AdminEditRoles>();
  //   roles.forEach(role => {
  //     let hasRole = false;
  //     adminRoles.forEach(adminRole => {
  //       if (role.id === adminRole.id) {
  //         let a: AdminEditRoles;
  //         a = { id: role.id, name: role.name, hasRole: true };
  //         adminEditRole.push(a);
  //         hasRole = true;
  //       }
  //     });
  //     if (!hasRole) {
  //       let a: AdminEditRoles;
  //       a = { id: role.id, name: role.name, hasRole: false };
  //       adminEditRole.push(a);
  //     }

  //   });
  //   this.adminEditRole = adminEditRole;
  // }

}
