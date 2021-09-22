import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ManagersService } from 'src/app/pages/pages/managers/services';
import { TableFilterRules } from 'src/app/core/models/table-filter';
import { CategoryService } from '../../../services/category-service.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() loading: any;

  subscriptions: Subscription;
  filtersForm: FormGroup;
  birthDate: any;

  constructor(private formBuilder: FormBuilder, private userGroupsManagerService: CategoryService) { }

  ngOnInit(): void {
    this.InitialForm();
  }

  onChange(event) {
    this.birthDate = new Date(event.value._d).toISOString();
  }

  InitialForm(): void {
    this.filtersForm = this.formBuilder.group({
      name: [''],
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
        if (key === 'name') {
          q = {
            field: key,
            op: 'cn',
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
