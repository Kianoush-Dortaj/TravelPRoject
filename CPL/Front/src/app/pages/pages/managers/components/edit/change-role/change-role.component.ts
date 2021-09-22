import { Component, OnInit, Input } from '@angular/core';
import { AdminEditRoles } from '../../../models';
import { Subscription } from 'rxjs';
import { ManagersService } from '../../../services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services';

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

  constructor(private managerService: ManagersService, private alertService: AlertService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.initAdminRoles(this.allRoles, this.userRole);
    this.InitialForm();
  }

  get f() {
    return this.changeRoleForm.controls;
  }

  InitialForm() {
    this.changeRoleForm = this.formBuilder.group({
      userId: [this.userId],
      roleId: [this.userRole, Validators.compose([Validators.required])]
    })
  }

  saveInfo(): void {

    this.subscription = this.managerService.Update(this.changeRoleForm.value, '/manager/ChangeUserRole')
      .subscribe(data => {
        if (data['success']) {
          this.alertService.success('', data['message']);
          this.route.navigate(['/managers']);
        }
      })
  }

  updateAdminRoles(): void {
    const rolesId = new Array<number>();
    this.adminEditRole.forEach(element => {
      if (element.hasRole) {
        rolesId.push(element.id);
      }
    });
    this.subscription = this.managerService.UpdateAdminRoles(this.userId, rolesId).subscribe(res => {
      if (res['success']) {
        this.backToMenu();
      }
    });

  }

  backToMenu(): void {
    this.route.navigate(['/managers']);
  }

  initAdminRoles(roles: any, adminRoles): void {
    const adminEditRole = new Array<AdminEditRoles>();
    roles.forEach(role => {
      let hasRole = false;
      adminRoles.forEach(adminRole => {
          if (role.id == adminRole) {
          let a: AdminEditRoles;
          a = { id: role.id, name: role.name, hasRole: true };
          adminEditRole.push(a);
          hasRole = true;
        }
      });
      if (!hasRole) {
        let a: AdminEditRoles;
        a = { id: role.id, name: role.name, hasRole: false };
        adminEditRole.push(a);
      }

    });
    this.adminEditRole = adminEditRole;
  }

}
