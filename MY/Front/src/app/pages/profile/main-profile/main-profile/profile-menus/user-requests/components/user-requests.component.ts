import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert-service';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
// import { SocketService } from 'src/app/core/services/socket.service';
import { RequestStatus } from 'src/app/pages/home-page/travel-items/models/request-status-enum';
import { TravelItemsService } from 'src/app/pages/home-page/travel-items/services/travel-item.service';
import { NotificationType } from 'src/app/share/models/notification-type-enum';
import { UserRequestService } from './../services/user-requests.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {

  items: any;
  status = RequestStatus;

  constructor(private userRequestService: UserRequestService,
    private travelItemService: TravelItemsService,
    // private socket: SocketService,
    private alertService: AlertService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private activatedRouted: ActivatedRoute) {

    this.items = this.activatedRouted.snapshot.data['requests'];

  }

  ngOnInit(): void {
    // this.socket.changeTravelStatus()
    //   .subscribe(data => {
    //     let item = this.items.find(x => x.id == data.reqId);
    //     item.status = data.status;
    //     if (item.status == RequestStatus.Pendding) {
    //       item.mustConfirm = true;
    //     } else if (item.mustConfirm == true && item.status !== RequestStatus.Pendding) {
    //       item.mustConfirm = false;
    //     }
    //   })
  }

  sneNotification(sender, reciver, notifType: NotificationType) {
    let sendNotifiacion = {} as any;

    sendNotifiacion.sender = sender;
    sendNotifiacion.reciver = reciver;
    sendNotifiacion.notificationType = notifType;

    // this.socket.SendNotification(sendNotifiacion);
  }

  confirm(id) {

    this.travelItemService.ConfirmRequest(id, RequestStatus.Accept)
      .subscribe(data => {
        // this.sneNotification(data.result.reciver, data.result.sender, NotificationType.ChangeStatusNotification);
        this.alertService.SuccessToast(data.message);
        let item = this.items.find(x => x.id == id);
        item.mustConfirm = false;
        item.status = RequestStatus.Accept;
      })
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

  GetAllRequests() {
    this.userRequestService.GetAllUserRequest()
      .subscribe(res => {
        if (res.success) {
          this.items = res.result.data.map(data => {
            return {
              travelType: data.travelTypeId,
              travelResidence: data.travelesidenceId,
              userId: data.userId,
              startDate: data.startDate,
              endDate: data.endDate,
              country: data.country,
              lookingfor: data.lookingfor,
              description: data.description,
              mustConfirm: data.mustConfirm,
              reqId: data.reqId,
              owner: data.owner,
              status: data.status,
              city: data.city,
              id: data.id,
              requestId: data.id,
              displayName: data.firstName + ' ' + data.lastName,
              travelTypeName: data.travelTypeName,
              travelTypeIcon: data.travelTypeIcon,
              travelResidentName: data.travelResidentName,
              travelResidentIcon: data.travelResidentIcon,
              budget: data.budget,
              diffDate: (startDate, endDate) => {
                var date1 = new Date(startDate);
                var date2 = new Date(endDate);
                var Difference_In_Time = date2.getTime() - date1.getTime();
                return Difference_In_Time / (1000 * 3600 * 24);
              }
            }
          });
        }
      })
  }

  GetAllMyRequests() {
    this.userRequestService.GetAllMyTravelRequest()
      .subscribe(res => {
        if (res.success) {
          this.items = res.result.data.map(data => {
            return {
              travelType: data.travelTypeId,
              travelResidence: data.travelesidenceId,
              userId: data.userId,
              startDate: data.startDate,
              endDate: data.endDate,
              country: data.country,
              lookingfor: data.lookingfor,
              description: data.description,
              mustConfirm: data.mustConfirm,
              reqId: data.reqId,
              owner: data.owner,
              status: data.status,
              city: data.city,
              id: data.id,
              requestId: data.id,
              displayName: data.firstName + ' ' + data.lastName,
              travelTypeName: data.travelTypeName,
              travelTypeIcon: data.travelTypeIcon,
              travelResidentName: data.travelResidentName,
              travelResidentIcon: data.travelResidentIcon,
              budget: data.budget,
              diffDate: (startDate, endDate) => {
                var date1 = new Date(startDate);
                var date2 = new Date(endDate);
                var Difference_In_Time = date2.getTime() - date1.getTime();
                return Difference_In_Time / (1000 * 3600 * 24);
              }
            }
          });
        }
      })
  }

  GetAllReciveRequest() {
    this.items = this.userRequestService.GetAllReciveTravelRequest()
      .subscribe(res => {
        if (res.success) {
          this.items = res.result.data.map(data => {
            return {
              travelType: data.travelTypeId,
              travelResidence: data.travelesidenceId,
              userId: data.userId,
              startDate: data.startDate,
              endDate: data.endDate,
              country: data.country,
              lookingfor: data.lookingfor,
              description: data.description,
              mustConfirm: data.mustConfirm,
              reqId: data.reqId,
              owner: data.owner,
              status: data.status,
              city: data.city,
              id: data.id,
              requestId: data.id,
              displayName: data.firstName + ' ' + data.lastName,
              travelTypeName: data.travelTypeName,
              travelTypeIcon: data.travelTypeIcon,
              travelResidentName: data.travelResidentName,
              travelResidentIcon: data.travelResidentIcon,
              budget: data.budget,
              diffDate: (startDate, endDate) => {
                var date1 = new Date(startDate);
                var date2 = new Date(endDate);
                var Difference_In_Time = date2.getTime() - date1.getTime();
                return Difference_In_Time / (1000 * 3600 * 24);
              }
            }
          });
        }
      })
  }
}
