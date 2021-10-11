import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert-service';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { RequestStatus } from '../models/request-status-enum';
import { SendRequest } from '../models/send-request-model';
import { TravelItemsService } from '../services/travel-item.service';
import { NotificationType } from './../../../../../app/share/models/notification-type-enum';
import { ReqiveRequestListComponent } from './reqive-request-list/reqive-request-list.component';
import { YouTravelListComponent } from './you-travel-list/you-travel-list.component';

@Component({
  selector: 'app-travel-item',
  templateUrl: './travel-item.component.html',
  styleUrls: ['./travel-item.component.scss']
})
export class TravelItemComponent implements OnInit {

  items: any;
  status = RequestStatus;
  sendRequestId: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private travelService: TravelItemsService,
    private alertService: AlertService,
    public dialog: MatDialog,
    // private socket: SocketService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig) { }

  ngOnInit(): void {
    this.fetchDate();
    // this.socket.changeTravelStatus()
    //   .subscribe(data => {
    //     let item = this.items.find(x => x.id == data.requestId);
    //     item.status = data.status;
    //     if (item.status == RequestStatus.Pendding) {
    //       item.mustConfirm = true;
    //     } else if (item.mustConfirm == true && item.status !== RequestStatus.Pendding) {
    //       item.mustConfirm = false;
    //     }
    //   })
  }

  fetchDate(): void {
    this.items = this.activateRoute.snapshot.data['items'];
  }

  sneNotification(sender, reciver, notifType: NotificationType) {
    let sendNotifiacion = {} as any;

    sendNotifiacion.sender = sender;
    sendNotifiacion.reciver = reciver;
    sendNotifiacion.notificationType = notifType;

    // this.socket.SendNotification(sendNotifiacion);
  }

  sendRequest(reciverId, requestId, status, reqId) {

    let sendRequestModel = {} as SendRequest;
    sendRequestModel.reciverUserId = reciverId;
    sendRequestModel.status = RequestStatus.Pendding;
    sendRequestModel.targetRequestId = requestId;

    if (status == RequestStatus.SendRequest || status == RequestStatus.Delete) {
    
      const dialogRef = this.dialog.open(YouTravelListComponent);
    
      dialogRef.afterClosed().subscribe(result => {
        sendRequestModel.requestId = result;
    
        this.travelService.SendRequest(sendRequestModel)
          .subscribe(data => {
            if (data.success) {
              let item = this.items.find(x => x.id == requestId);
              item.status = data.result.status;
              item.requestId = data.result.id;
              // this.sneNotification(data.result.sender, data.result.reciver, NotificationType.TravelNotification);
              this.alertService.SuccessToast(data.message);
              // this.socket.sendChangeTravelStatus({ reciver: data.result.reciver, status: RequestStatus.Pendding, id: data.result.requestId })
            }
          })
      });

    } else {

      this.travelService.DeleteRequest(reqId)
        .subscribe(data => {
          if (data.success) {
            let item = this.items.find(x => x.id == requestId);
            item.status = RequestStatus.SendRequest;
            // this.socket.sendChangeTravelStatus({ reciver: data.result.reciver, status: RequestStatus["Send Request"], id: data.result.requestId })
          }
          this.alertService.SuccessToast(data.message);
        })
    }

  }

  confirm(id) {

    const dialogRef = this.dialog.open(ReqiveRequestListComponent);
    dialogRef.afterClosed().subscribe(result => {

      this.travelService.ConfirmRequest(result.id, RequestStatus.Accept)
        .subscribe(data => {
          this.sneNotification(data.result.reciver, data.result.sender, NotificationType.ChangeStatusNotification);
          this.alertService.SuccessToast(data.message);
          let item = this.items.find(x => x.id == id);
          item.mustConfirm = false;
          item.status = RequestStatus.Accept;
          // this.socket.sendChangeTravelStatus({ reciver: data.result.sender, status: RequestStatus.Accept, id: data.result.targetRequestId })
        })
    });


  }

  reject(id) {
    this.travelService.ConfirmRequest(id, RequestStatus.Rejecte)
      .subscribe(data => {
        this.sneNotification(data.result.reciver, data.result.sender, NotificationType.ChangeStatusNotification);
        this.alertService.SuccessToast(data.message);
        let item = this.items.find(x => x.id == id);
        item.mustConfirm = false;
        item.status = RequestStatus.Rejecte;
        // this.socket.sendChangeTravelStatus({ reciver: data.result.sender, status: RequestStatus.Rejecte, id: data.result.targetRequestId })
      })
  }
}
