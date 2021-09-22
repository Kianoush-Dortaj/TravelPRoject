import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddCategoryModel } from '../../models/add-create-model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CountryService } from '../../services/Country-service.service';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subscriptions: Subscription;

  addCategory: FormGroup;
  currency: any;
  language: any
  model:any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private CountryService: CountryService) {
    this.currency =this.activeteRoute.snapshot.data['currency'];
    this.language =this.activeteRoute.snapshot.data['language'];
    this.model =this.activeteRoute.snapshot.data['data'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addCategory = this.formBuilder.group({
      id:[this.model.id],
      name: [this.model.name, Validators.compose([Validators.required])],
      flag: [this.model.flag, Validators.compose([Validators.required])],
      currency: [this.model.currency, Validators.compose([Validators.required])],
      language: [this.model.language, Validators.compose([Validators.required])],
    });
  }

  get f() {
    return this.addCategory.controls
  }

  onSubmit(): void {
    let addModel : AddCategoryModel;
    addModel =this.addCategory.value;

    this.subscriptions = this.CountryService.Update(addModel, '/admin/Country/Update').subscribe(data=>{
      if(data.success)
      {
        this.router.navigate(['/country']);
      }
    })
  }

}
