import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditCurrencyModel } from '../../models/edit-currency-model';
import { DiscountService } from '../../services/discount-service.service';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subscriptions: Subscription;

  editDiscount: FormGroup;
  categoryList: any;
  data:any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private discountService: DiscountService) {
      this.data=this.activeteRoute.snapshot.data['data'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.editDiscount = this.formBuilder.group({
      id:[this.data.id],
      name: [this.data.name, Validators.compose([Validators.required])],
      percent: [this.data.percent, Validators.compose([Validators.required])],
      numberOfUse: [this.data.numberOfUse],
      startDate: [this.data.startDate, Validators.compose([Validators.required])],
      expireDate: [this.data.expireDate, Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.editDiscount.controls
  }

  onSubmit(): void {

    let addModel : EditCurrencyModel;
    addModel =this.editDiscount.value;

    this.subscriptions = this.discountService.Update(addModel, '/Discount/Update').subscribe(
    data=>{
      if(data.success)
      {
        this.router.navigate(['/discount']);
      }
    })
  }
}
