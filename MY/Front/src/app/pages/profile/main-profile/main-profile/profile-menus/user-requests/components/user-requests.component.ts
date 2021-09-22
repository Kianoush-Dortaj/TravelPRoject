import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert-service';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { SocketService } from 'src/app/core/services/socket.service';
import { RequestStatus } from 'src/app/pages/home-page/travel-items/models/request-status-enum';
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
    private socket: SocketService,
    private alertService: AlertService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private activatedRouted: ActivatedRoute) {

    this.items = this.activatedRouted.snapshot.data['requests'];

  }

  ngOnInit(): void {
    this.socket.changeTravelStatus()
      .subscribe(data => {
        let item = this.items.find(x => x.id == data.reqId);
        item.status = data.status;
        if (item.status == RequestStatus.Pendding) {
          item.mustConfirm = true;
        } else if (item.mustConfirm == true && item.status !== RequestStatus.Pendding) {
          item.mustConfirm = false;
        }
      })
  }

  sneNotification(sender, reciver, notifType: NotificationType) {
    let sendNotifiacion = {} as any;

    sendNotifiacion.sender = sender;
    sendNotifiacion.reciver = reciver;
    sendNotifiacion.notificationType = notifType;

    this.socket.SendNotification(sendNotifiacion);
  }

  confirm(id): void {
    this.userRequestService.ConfirmRequest(id)
      .subscribe(data => {
        this.sneNotification(data.result.reciver, data.result.sender, NotificationType.ChangeStatusNotification);
        this.alertService.SuccessToast(data.message);
        let item = this.items.find(x => x.id == id);
        item.mustConfirm = false;
        item.status = RequestStatus.Accepted;
        this.socket.sendChangeTravelStatus({ reciver: data.result.sender, reqId: data.result.id, status: RequestStatus.Accepted, id: data.result.targetRequestId })
      })
  }

  reject(id): void {
    this.userRequestService.RejectRequest(id)
      .subscribe(data => {
        this.sneNotification(data.result.reciver, data.result.sender, NotificationType.ChangeStatusNotification);
        this.alertService.SuccessToast(data.message);
        let item = this.items.find(x => x.id == id);
        item.mustConfirm = false;
        item.status = RequestStatus.Rejected;
        this.socket.sendChangeTravelStatus({ reciver: data.result.sender, reqId: data.result.id, status: RequestStatus.Rejected, id: data.result.targetRequestId })
      })
  }

  GetAllRequests() {
    this.userRequestService.GetAllUserTravelRequest()
    .subscribe(res => {
      if (res.success) {
        this.items = res.result.map(data => {
          return {
            userId: data.userId,
            startDate: data.startDate,
            endDate: data.endDate,
            country: data.country,
            city: data.city,
            id: data.id,
            displayName: data.displayName,
            travelType: data.travelTypeName,
            travelTypeIcon: data.travelTypeIcon,
            travelResident: data.travelResident,
            status: data.status,
            mustConfirm: data.mustConfirm,
            owner: data.owner,
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
          this.items = res.result.map(data => {
            return {
              userId: data.userId,
              startDate: data.startDate,
              endDate: data.endDate,
              country: data.country,
              city: data.city,
              id: data.id,
              displayName: data.displayName,
              travelType: data.travelTypeName,
              travelTypeIcon: data.travelTypeIcon,
              travelResident: data.travelResident,
              status: data.status,
              mustConfirm: data.mustConfirm,
              owner: data.owner,
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
          this.items = res.result.map(data => {
            return {
              userId: data.userId,
              startDate: data.startDate,
              endDate: data.endDate,
              country: data.country,
              city: data.city,
              id: data.id,
              displayName: data.displayName,
              travelType: data.travelTypeName,
              travelTypeIcon: data.travelTypeIcon,
              travelResident: data.travelResident,
              status: data.status,
              mustConfirm: data.mustConfirm,
              owner: data.owner,
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
