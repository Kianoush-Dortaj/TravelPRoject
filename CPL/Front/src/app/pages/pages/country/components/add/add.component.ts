import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AddCategoryModel } from '../../models/add-create-model';
import { CountryService } from '../../services/Country-service.service';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  subscriptions: Subscription;

  addCategory: FormGroup;
  currency: any;
  language: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private CountryService: CountryService) {
    this.currency =this.activeteRoute.snapshot.data['currency'];
    this.language =this.activeteRoute.snapshot.data['language'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addCategory = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      flag: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([Validators.required])],
      language: ['', Validators.compose([Validators.required])],
    });
  }

  get f() {
    return this.addCategory.controls
  }

  onSubmit(): void {
    let addModel : AddCategoryModel;
    addModel =this.addCategory.value;

    this.subscriptions = this.CountryService.Create(addModel, '/admin/Country/Create').subscribe(data=>{
      if(data.success)
      {
        this.router.navigate(['/country']);
      }
    })
  }

}
