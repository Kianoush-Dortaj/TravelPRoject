import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddCurrencyModel } from '../../models/add-currency-model';
import { SubscribeService } from '../../services/subscribe-service.service';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  subscriptions: Subscription;

  addCurrency: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private subscribeService: SubscribeService) {
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addCurrency = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
    });
  }

  get f() {
    return this.addCurrency.controls
  }

  onSubmit(): void {
    let addModel: AddCurrencyModel;
    addModel = this.addCurrency.value;

    this.subscriptions = this.subscribeService.Create(addModel, '/Subscribe/create').subscribe(data => {
      if (data.success) {
        this.router.navigate(['/subscribe']);
      }
    })
  }

}