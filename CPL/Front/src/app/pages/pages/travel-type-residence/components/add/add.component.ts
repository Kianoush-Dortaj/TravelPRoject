import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTravelTypeModel } from '../../models/add-create-model';
import { TravelTypeResidenceService } from '../../services/travel-type-residence-service.service';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  subscriptions: Subscription;

  addTravelTypeResidenceFG: FormGroup;
  categoryList: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: TravelTypeResidenceService) {
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addTravelTypeResidenceFG = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      icon: ['', Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.addTravelTypeResidenceFG.controls
  }

  onSubmit(): void {
    let addModel: AddTravelTypeModel;

    addModel = this.addTravelTypeResidenceFG.value;

    this.subscriptions = this.categoryService.Create(addModel, '/TravelResidence/create').subscribe(data => {
      if (data.success) {
        this.router.navigate(['/travel-type-residence']);
      }
    })
  }

}
