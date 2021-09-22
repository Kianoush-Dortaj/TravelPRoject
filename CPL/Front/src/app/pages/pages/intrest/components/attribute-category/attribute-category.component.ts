import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IntrestService } from '../../services/interst.service';

@Component({
  selector: 'vex-attribute-category',
  templateUrl: './attribute-category.component.html',
  styleUrls: ['./attribute-category.component.scss']
})
export class IntrestComponent implements OnInit {

  subscriptions: Subscription;
  data: any;
  attributeFG: FormGroup;
  categoryId: any;
  constructor(private activeteRoute: ActivatedRoute,
    private router: Router,
    private intersetService: IntrestService,
    private formBuilder: FormBuilder) {

    this.data = this.activeteRoute.snapshot.data['data'];

  }
  ngOnInit(): void {
    this.InitialForm();
    if (this.data) {
      this.setItem(this.data)
    }
  }

  InitialForm(): void {
    this.attributeFG = this.formBuilder.group({
      intrestName: this.formBuilder.array([])
    })
  }

  setItem(items: any): void {
    const formArray = new FormArray([]);
    for (const item of items) {
      formArray.push(this.formBuilder.group({
        id: item._id,
        name: item.name
      }));
    }
    this.attributeFG.setControl('intrestName', formArray);
  }

  // Initial FormArray
  createItem(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])]
    });
  }

  // Delete Item
  deleteItem(id, i): void {
    console.log("IntrestComponent -> deleteItem -> id", id)
    if (id) {
      this.intersetService.Delete(id, '/Intrest/Delete')
        .subscribe()
    }
    const items = <FormArray>this.attributeFG.controls['intrestName'];
    items.removeAt(i);
  }

  // Push the Forms Item to controls['courseOptions']
  AddItems(): void {
    const items = <FormArray>this.attributeFG.controls['intrestName'];
    items.push(this.createItem());
  }

  onSubmit(): void {
    this.intersetService.Create(this.attributeFG.value, '/Intrest/Create')
      .subscribe(data => {
        if (data.success) {
          this.router.navigate(['category']);
        }
      })
  }

}
