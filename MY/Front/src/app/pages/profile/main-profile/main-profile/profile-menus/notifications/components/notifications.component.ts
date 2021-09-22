import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  items: any;
  showLoadding = false;
  page: number = 0;
  notificationtype = ['Recive Travel Norification','Send Message', 'Change Travel Norification'];

  constructor(private activatedRoute: ActivatedRoute,
    public notificationService: NotificationService,
    private cdRef: ChangeDetectorRef,
    @Inject(APP_CONFIG) public appConfig: IAppConfig) {
    this.items = this.activatedRoute.snapshot.data['getAll'];
  }

  ngOnInit(): void {
    this.paging();
  }

  paging(): void {
    this.page += 1;
    this.showLoadding = true;
    this.notificationService.pagingsubject$.subscribe(data => {
      this.notificationService.GetAllNotification(data).subscribe(data => {
        if (data.success) {
          this.items.push(...data.result);
        }
      })
      this.showLoadding = false;
      this.cdRef.detectChanges();
    })
  }

}
