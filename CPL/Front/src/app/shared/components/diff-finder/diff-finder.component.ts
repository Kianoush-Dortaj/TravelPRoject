import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DiffrentService } from './services/difrent-service';
import { DeiffrentModel } from './models/diffrent-model';
import _ from 'lodash';

@Component({
  selector: 'kt-diff-finder',
  templateUrl: './diff-finder.component.html',
  styleUrls: ['./diff-finder.component.scss']
})
export class DiffFinderComponent implements OnInit {


  model : DeiffrentModel;

  newValue: any;
  oldValue: any;
  findDiffrent: any;

  constructor(@Inject(MAT_DIALOG_DATA) public id: any, private diffservice: DiffrentService
  ,private dialogRef: MatDialogRef<DiffFinderComponent>) { }

  ngOnInit(): void {
    this.fetchData();

  }



  fetchData(): void {
    this.diffservice.getById(this.id.id).subscribe(x => {
      this.model = x['result'];
      this.setOldNewValue(this.model);
    })
  }

  setOldNewValue(item: DeiffrentModel): void {
    this.newValue = item.newValues.split(',');
    this.oldValue = item.oldValues.split(',');
    this.findDiffrent = _.difference(this.newValue, this.oldValue);
    console.log(this.newValue)
    console.log(this.oldValue)
    console.log(this.findDiffrent)
  }

	close(): void {
		this.dialogRef.close();
	}
}
