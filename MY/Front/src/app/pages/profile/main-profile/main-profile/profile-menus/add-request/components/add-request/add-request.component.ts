import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert-service';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { TravelRequestUpdateModel } from '../../models/TravelRequestUpdateModel';
import { RequestService } from './../../services/request.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {

  travelTypeList: any;
  travelResidentList: any;
  items: any;
  requestFG: FormGroup;
  model: any;

  constructor(private activateRoute: ActivatedRoute,
    private reuqestService: RequestService,
    private alertService: AlertService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.fetchDate();
    this.InitailForm();
  }

  InitailForm(): void {
    this.requestFG = this.formBuilder.group({
      id: [],
      travelType: ['', Validators.compose([Validators.required])],
      travelResidence: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      budget: ['', Validators.compose([Validators.required])],
      lookingfor: ['', Validators.compose([Validators.required])],
      description: ['']
    })
  }

  fetchDate(): void {
    this.travelTypeList = this.activateRoute.snapshot.data['travelType'];
    this.travelResidentList = this.activateRoute.snapshot.data['travelResident'];
    this.items = this.activateRoute.snapshot.data['travelRequests'];
  }

  onSubmit(): void {
    if (!this.model) {
      this.reuqestService.CreateRequest(this.requestFG.value)
        .subscribe(data => {
          if (data.success) {
            this.alertService.SuccessToast(data.message);
            this.requestFG.reset();
          }
        })
    } else {
      let model: TravelRequestUpdateModel = Object.assign({}, this.requestFG.value);

      this.reuqestService.UpdateRequest(model, this.model.id)
        .subscribe(data => {
          if (data.success) {
            this.alertService.SuccessToast(data.message);
            this.requestFG.reset();
          }
        })
    }

  }


  DeleteRequest(id): void {
    this.reuqestService.DeleteRequest(id)
      .subscribe(data => {
        if (data.success) {
          let index = this.items.findIndex(x => x.id == id)
          this.items.splice(index, 1);
        }
      })
  }

  SetEdit(item): void {
    this.model = item;
    console.log( item.travelResidence)
    this.requestFG.patchValue({
      travelType: item.travelType,
      travelResidence: item.travelResidence,
      country: item.country,
      city: item.city,
      startDate: item.startDate,
      endDate:item.endDate,
      budget: item.budget,
      lookingfor: item.lookingfor,
      description: item.description
    });
  }

  SetLocation(event) {
    this.requestFG.patchValue({ country: event.country, city: event.name })
  }

}
