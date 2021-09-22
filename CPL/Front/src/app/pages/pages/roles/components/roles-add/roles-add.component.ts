import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { RoleAdd } from '../../models/role-add';
import { RoleService } from '../../services';
import { TranslationService } from 'src/app/core/services/translationService';
import { AlertService } from 'src/app/core/services';

@Component({
	selector: 'kt-roles-add',
	templateUrl: './roles-add.component.html',
	styleUrls: ['./roles-add.component.scss']
})
export class RolesAddComponent implements OnInit, OnDestroy {

	subscriptions: Subscription;
	unsubscribeAll$: Subject<any>;

	claimGroup: any;
	roleAddForm: FormGroup;
	role: RoleAdd;
	lang = 'en';
	dateObject: any;
	datePickerConfig: Object;
	isDatePickerOpen = false;
	loading = false;
	selectedList: number[];

	constructor(
		private alertService: AlertService,
		private translationService: TranslationService,
		private activeroute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private cdRef: ChangeDetectorRef,
		private roleService: RoleService,
		private route: Router
	) {
		// this.initLanguage();
		this.getClaimsGroup();
	}

	/*******************************************************************
	  Lifecycle Hook
	 *******************************************************************/

	ngOnInit(): void {
		this.initForm();
		this.cdRef.detectChanges();

	}

	ngOnDestroy(): void {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}
	}

	/******************************************************
	  PUBLIC
	*******************************************************/

	initLanguage(): void {

		this.translationService
			.currentLang$.pipe(takeUntil(this.unsubscribeAll$))
			.subscribe(lang => {
				this.lang = lang;
			});

	}

	getClaimsGroup(): void {
		this.claimGroup = this.activeroute.snapshot.data['rolesClaims'];
	}

	backToMenu(): void {
		this.route.navigate(['/roles-manager/list']);
	}

	/******************************************************
	  FORM
  *******************************************************/

	initForm(): void {
		this.createForm();
	}

	createForm(): void {
		this.roleAddForm = this.formBuilder.group({
			name: ['', Validators.compose([Validators.required])],
			permissions: ['']
		});

	}

	clearForm(): void {
		this.createForm();
		this.roleAddForm.markAsPristine();
		this.roleAddForm.markAsUntouched();
		this.roleAddForm.updateValueAndValidity();
	}

	get f(){
		return this.roleAddForm.controls;
	}


	/******************************************************
	   Actions
	  *******************************************************/

	onSubmit(): void {

		// check validation
		if (this.roleAddForm.invalid) {
			this.alertService.error('', 'GENERAL.FORM_INVALID');
			return;
		}

		// send form to server
		this.addRole();

	}

	addRole(): void {
		this.loading = true;
		this.roleAddForm.patchValue({
			permissions: this.selectedList
		})
		this.subscriptions = this.roleService
			.add(this.roleAddForm.value)
			.subscribe(
				res => {
					if (res.success === true) {
						this.alertService.success('', 'GENERAL.ADD_SUCCESS');
						this.backToMenu();
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
