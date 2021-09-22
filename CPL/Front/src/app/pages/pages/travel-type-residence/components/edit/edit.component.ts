import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { EditTravelTypeModel } from '../../models/edit-travel-type-residence-model';
import { TravelTypeResidenceService } from '../../services/travel-type-residence-service.service';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subscriptions: Subscription;

  addTravelTypeResidenceFG: FormGroup;
  categoryList: any;
  data: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private travelTypeService: TravelTypeResidenceService) {
    this.data = this.activeteRoute.snapshot.data['data'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addTravelTypeResidenceFG = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.compose([Validators.required])],
      icon: [this.data.icon, Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.addTravelTypeResidenceFG.controls
  }

  onSubmit(): void {

    let addModel: EditTravelTypeModel;
    addModel = this.addTravelTypeResidenceFG.value;

    this.subscriptions = this.travelTypeService.Update(addModel, '/TravelResidence/Update').subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/travel-type-residence']);
        }
      })
  }
}
