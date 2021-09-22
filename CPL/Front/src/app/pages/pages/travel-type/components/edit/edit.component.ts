import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TravelTypeService } from '../../services/travel-type-service.service';
import { EditTravelTypeModel } from '../../models/edit-travel-type-model';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subscriptions: Subscription;

  travelTypeFG: FormGroup;
  categoryList: any;
  data: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private travelTypeService: TravelTypeService) {
    this.data = this.activeteRoute.snapshot.data['data'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.travelTypeFG = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, Validators.compose([Validators.required])],
      icon: [this.data.icon, Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.travelTypeFG.controls
  }

  onSubmit(): void {

    let addModel: EditTravelTypeModel;
    addModel = this.travelTypeFG.value;

    this.subscriptions = this.travelTypeService.Update(addModel, '/traveltype/Update').subscribe(
      data => {
        if (data.success) {
          this.router.navigate(['/travel-type']);
        }
      })
  }
}
