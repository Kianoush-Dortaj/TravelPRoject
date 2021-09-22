import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  roles: any;
  accessList: any;
  accountIfoEditModel: any
  personalInfoEditModel: any;
  rolesList:any;


  constructor(private activeteRoute: ActivatedRoute) {
    this.accountIfoEditModel = this.activeteRoute.snapshot.data['data']['accountIfno'];
    this.personalInfoEditModel = this.activeteRoute.snapshot.data['data']['personalInfo'];
    this.rolesList = this.activeteRoute.snapshot.data['data']['roles'];
  }

  ngOnInit(): void {
  }

}
