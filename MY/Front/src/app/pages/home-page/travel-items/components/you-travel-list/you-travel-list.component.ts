import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TravelItemsService } from '../../services/travel-item.service';

@Component({
  selector: 'app-you-travel-list',
  templateUrl: './you-travel-list.component.html',
  styleUrls: ['./you-travel-list.component.scss']
})
export class YouTravelListComponent implements OnInit {

  items: any;

  constructor(private travelItemService: TravelItemsService,
    public dialogRef: MatDialogRef<YouTravelListComponent>) { }

  ngOnInit(): void {
    this.travelItemService.GetAllUserTravelREquest()
      .subscribe(data => {
        this.items = data.result.data
      })
  }

  onClick(data): void {
    this.dialogRef.close(data);
  }

}
