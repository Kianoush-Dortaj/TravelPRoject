import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category-service.service';
import { AddCategoryModel } from '../../models/add-create-model';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'vex-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  subscriptions: Subscription;

  addCategory: FormGroup;
  categoryList: any;
  data:any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    this.categoryList =this.activeteRoute.snapshot.data['category']['accountIfno'][0];
      this.data=this.activeteRoute.snapshot.data['data'];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addCategory = this.formBuilder.group({
      id:[this.data.id],
      name: [this.data.name, Validators.compose([Validators.required])],
      parentId: [this.data.parentId==null?'null':this.data.parentId]
    });
  }

  get f() {
    return this.addCategory.controls
  }

  onSubmit(): void {

    let addModel : AddCategoryModel;
    addModel =this.addCategory.value;
    addModel.parentId=this.f.parentId.value==="null"?null:this.f.parentId.value

    this.subscriptions = this.categoryService.Update(addModel, '/category/Update').subscribe(
    data=>{
      if(data.success)
      {
        this.router.navigate(['/category']);
      }
    })
  }
}
