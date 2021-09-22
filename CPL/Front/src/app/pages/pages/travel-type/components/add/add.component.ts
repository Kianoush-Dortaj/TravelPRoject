import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelTypeService } from '../../services/travel-type-service.service';
import { AddTravelTypeModel } from '../../models/add-create-model';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  subscriptions: Subscription;

  addTravelTypeFG: FormGroup;
  categoryList: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: TravelTypeService) {
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addTravelTypeFG = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      icon: ['', Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.addTravelTypeFG.controls
  }

  onSubmit(): void {
    let addModel: AddTravelTypeModel;

    addModel = this.addTravelTypeFG.value;

    this.subscriptions = this.categoryService.Create(addModel, '/traveltype/create').subscribe(data => {
      if (data.success) {
        this.router.navigate(['/travel-type']);
      }
    })
  }

}
