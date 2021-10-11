import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert/alert-service';
import { RequestStatus } from '../../models/request-status-enum';
import { TravelItemsService } from '../../services/travel-item.service';

@Component({
  selector: 'app-reqive-request-list',
  templateUrl: './reqive-request-list.component.html',
  styleUrls: ['./reqive-request-list.component.scss']
})
export class ReqiveRequestListComponent implements OnInit {

  items: any;

  constructor(
    private travelItemService: TravelItemsService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<ReqiveRequestListComponent>) { }

  ngOnInit(): void {
    this.travelItemService.GetAllReciveRequest()
      .subscribe(data => {
        this.items = data.result.data
      })
  }


  onClick(data): void {
    this.dialogRef.close(data);
  }

  reject(id) {
    this.travelItemService.RejectRequest(id,RequestStatus.Rejecte)
      .subscribe(data => {
        // this.sneNotification(data.result.reciver, data.result.sender, NotificationType.ChangeStatusNotification);
        this.alertService.SuccessToast(data.message);
        let item = this.items.find(x => x.id == id);
        item.mustConfirm = false;
        item.status = RequestStatus.Rejecte;
        // this.socket.sendChangeTravelStatus({ reciver: data.result.sender, status: RequestStatus.Rejecte, id: data.result.targetRequestId })
      })
  }

}
