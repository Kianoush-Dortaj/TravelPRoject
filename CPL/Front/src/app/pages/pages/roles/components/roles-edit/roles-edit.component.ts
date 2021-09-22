import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RoleEdit } from '../../models/role-edit';
import { RoleService } from '../../services';
import { AlertService } from 'src/app/core/services';


@Component({
	selector: 'kt-roles-edit',
	templateUrl: './roles-edit.component.html',
	styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit, OnDestroy {

	subscription: Subscription;

	role: any;
	roleEditForm: FormGroup;
	lang = 'en';
	claimsGroup: any;
	loading = false;
	selectedList: string[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private alertService: AlertService,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private roleService: RoleService,
		private route: Router
	) {
		this.role = this.activatedRoute.snapshot.data['role'];
		this.claimsGroup= this.activatedRoute.snapshot.data['rolesClaims'];
		//	this.getClaimsById();
	}

	/*******************************************************************
		  Lifecycle Hook
	 *******************************************************************/

	ngOnInit(): void {


		this.initLanguage();
		this.createForm();

	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	/******************************************************
	  PUBLIC
	*******************************************************/

	initLanguage(): void {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.lang = event.lang;
		});
	}

	createForm(): void {
		this.roleEditForm = this.formBuilder.group({
			name: [this.role.name, Validators.compose([Validators.required])],
			permissions: ['']
		});
	}

	get f() {
		try {
			return this.roleEditForm.controls;
		}
		catch (e) { }
	}
	/******************************************************
	   Actions
	*******************************************************/

	onSubmit(): void {
		this.loading = true;
		const role: RoleEdit = {
			id: this.role.id,
			name: this.f['name'].value,
			permissions: this.selectedList.filter((item, i, arr) => arr.findIndex((t) => t=== item) === i),
		};
		this.editUserRoleActions(role);
	}


	editUserRoleActions(role: RoleEdit): void {
		this.subscription = this.roleService.edit(role)
			.subscribe(
				res => {
					if (res.success === true) {
						this.alertService.success('', 'GENERAL.EDIT_SUCCESS');
						this.route.navigate(['/roles-manager/list']);
					} else {
						this.alertService.error('', res.message);
					}
				}
			);
	}


	changeSelectedList(selectedList): void {
		this.selectedList = [];
		selectedList.forEach(element => {
			this.selectedList.push(element['actionId']);
		});

	}

}


