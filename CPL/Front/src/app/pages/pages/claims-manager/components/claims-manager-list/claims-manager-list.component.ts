import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimsManagerService } from '../../services/claims-manager-service';
import { BehavorSubject } from 'src/app/core/services/behavior-subject';

@Component({
	selector: 'kt-claims-manager-list',
	templateUrl: './claims-manager-list.component.html',
	styleUrls: ['./claims-manager-list.component.scss']
})
export class ClaimsManagerListComponent implements OnInit {

	isLoading = true;
	claimGroup: any;
	searchParam:any;
	constructor(
		private claimsManagerService: ClaimsManagerService,
		private cdRef: ChangeDetectorRef,
		private transportData: BehavorSubject,
		private router: ActivatedRoute) {
		this.transportData.setBooleanValue(true);
		this.getClaimsGroup();
		this.searchParam = {
			_search: true,
			dateTimeType: 1,
			page: 1,
			rows: 2
		  };
	}
	ngOnInit(): void {

	}
	sendagain(flags): void {
		this.claimsManagerService.GetAll().subscribe(data => {
				this.claimGroup = data;
		});
		console.log(this.claimGroup)
	}
	getClaimsGroup(): void {
		this.claimGroup = this.router.snapshot.data['rolesClaims'];
	}



}