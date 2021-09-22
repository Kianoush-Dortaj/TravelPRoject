import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCurrencyModel } from '../../models/edit-currency-model';
import { SubscribeService } from '../../services/subscribe-service.service';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subscriptions: Subscription;

  editCurrency: FormGroup;
  categoryList: any;
  data:any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private subscribeService: SubscribeService) {
      this.data=this.activeteRoute.snapshot.data['data'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.editCurrency = this.formBuilder.group({
      id:[this.data.id],
      name: [this.data.name, Validators.compose([Validators.required])],
      price: [this.data.price, Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.editCurrency.controls
  }

  onSubmit(): void {

    let addModel : EditCurrencyModel;
    addModel =this.editCurrency.value;

    this.subscriptions = this.subscribeService.Update(addModel, '/Subscribe/Update').subscribe(
    data=>{
      if(data.success)
      {
        this.router.navigate(['/subscribe']);
      }
    })
  }
}
