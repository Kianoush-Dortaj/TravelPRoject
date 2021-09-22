import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableFilterRules } from 'src/app/core/models/table-filter';
import { VisitorService } from '../../../services';

@Component({
  selector: 'fitler',
  templateUrl: './fitler.component.html',
  styleUrls: ['./fitler.component.scss']
})
export class FitlerComponent implements OnInit {

  @Input() loading: any;

  subscriptions: Subscription;
  filtersForm: FormGroup;
  birthDate: any;

  constructor(private formBuilder: FormBuilder, private userGroupsManagerService: VisitorService) { }

  ngOnInit(): void {
    this.InitialForm();
  }

  onChange(event) {
    this.birthDate = new Date(event.value._d).toISOString();
  }

  InitialForm(): void {
    this.filtersForm = this.formBuilder.group({
      userName: [''],
      isActive: [''],
      displayName: [''],
      endRegisterDate: [''],
      isDeleted: ['']
    })
  }

  get f(): any {
    return this.filtersForm.controls;
  }

  loadFilters(): void {
    this.userGroupsManagerService.updateFilter(this.MakeFiltersForTable(this.f))
  }

  ResetFilters(): void {
    this.filtersForm.reset();
    this.filtersForm.markAllAsTouched();
    this.filtersForm.patchValue({
      userName: '',
      isActive: '',
      isDeleted: ''
    })
  }

  MakeFiltersForTable(formControls: any): Array<TableFilterRules> {

    let q: TableFilterRules;
    const filters = new Array<TableFilterRules>();
    Object.keys(formControls).forEach(key => {
      if ((formControls[key].value + '').length > 0) {
        if (key === 'userName') {
          q = {
            field: key,
            op: 'cn',
            data: formControls[key].value
          };
        }
        if (key === 'displayName') {
          q = {
            field: key,
            op: 'cn',
            data: formControls[key].value
          };
        }
        else if (key === 'isActive') {
          q = {
            field: 'isActive',
            op: 'eq',
            data: formControls[key].value
          };
        }


        else if (key === 'isDeleted') {
          q = {
            field: 'isDelete',
            op: 'eq',
            data: formControls[key].value
          };
        }
        filters.push(q);
      }
    });
    return filters;
  }
}
