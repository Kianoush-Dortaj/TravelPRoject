import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category-service.service';

@Component({
  selector: 'vex-attribute-category',
  templateUrl: './attribute-category.component.html',
  styleUrls: ['./attribute-category.component.scss']
})
export class AttributeCategoryComponent implements OnInit {

  subscriptions: Subscription;
  data: any;
  attributeFG: FormGroup;
  categoryId: any;
  constructor(private activeteRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService, private formBuilder: FormBuilder) {

    this.data = this.activeteRoute.snapshot.data['data'];
    this.activeteRoute.params.subscribe(params => {
      this.categoryId=params['id'];
    });
    }

  ngOnInit(): void {
    this.InitialForm();
    if (this.data.attr) {
      this.setItem(this.data.attr)
    }
  }

  InitialForm(): void {
    this.attributeFG = this.formBuilder.group({
      categoryId: [this.categoryId, Validators.compose([Validators.required])],
      attr: this.formBuilder.array([])
    })
  }

  setItem(items: any): void {
    const formArray = new FormArray([]);
    for (const item of items) {
      formArray.push(this.formBuilder.group({
        id: item._id,
        attrType: item.attrType,
        attrName: item.attrName
      }));
    }
    this.attributeFG.setControl('attr', formArray);
  }

  // Initial FormArray
  createItem(): FormGroup {
    return this.formBuilder.group({
      attrType: ['', Validators.compose([Validators.required])],
      attrName: ['', Validators.compose([Validators.required])]
    });
  }

  // Delete Item
  deleteItem(id: number): void {
    const items = <FormArray>this.attributeFG.controls['attr'];
    items.removeAt(id);
  }

  // Push the Forms Item to controls['courseOptions']
  AddItems(): void {
    const items = <FormArray>this.attributeFG.controls['attr'];
    items.push(this.createItem());
  }

  onSubmit(): void {
    this.categoryService.Create(this.attributeFG.value, '/admin/Attribute/Create')
      .subscribe(data => {
        if (data.success) {
          this.router.navigate(['category']);
        }
      })
  }

}
