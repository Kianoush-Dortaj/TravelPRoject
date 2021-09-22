import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AddCategoryModel } from '../../models/add-create-model';

@Component({
  selector: 'vex-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  subscriptions: Subscription;

  addCategory: FormGroup;
  categoryList: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activeteRoute: ActivatedRoute,
    private categoryService: CategoryService) {
    this.categoryList =this.activeteRoute.snapshot.data['category']['accountIfno'][0];
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addCategory = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      icon: ['', Validators.compose([Validators.required])],
      parentId: [''],
    });
  }

  get f() {
    return this.addCategory.controls
  }

  onSubmit(): void {
    let addModel : AddCategoryModel;
    addModel =this.addCategory.value;
    addModel.parentId=this.f.parentId.value==="null"?null:this.f.parentId.value

    this.subscriptions = this.categoryService.Create(addModel, '/category/create').subscribe(data=>{
      if(data.success)
      {
        this.router.navigate(['/category']);
      }
    })
  }

}
