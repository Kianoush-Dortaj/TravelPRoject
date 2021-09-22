import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/alert/alert-service';
import { MainProfileService } from '../../services/main-profile.service';

export interface Data {
  userId: string;
}

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  sendMessageFG: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private profileService: MainProfileService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

  ngOnInit(): void {
    this.initailForm();
  }

  initailForm(): void {
    this.sendMessageFG = this.formBuilder.group({
      reciver: [this.data.userId, Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])]
    })
  }

  sendMessage(): void {
    this.profileService.SendMessage(this.sendMessageFG.value).subscribe(data => {
      if (data.success) {
        this.alertService.SuccessToast(data.message);
      }
    });
  }

}
