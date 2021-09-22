import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  email: string;
  hashCode: string;

  confirmcodeFG: FormGroup;

  constructor(private route: ActivatedRoute,
    private rotuer: Router, private authService: AuthService) {

    this.hashCode = this.route.snapshot.paramMap.get('hash');
    this.email = this.route.snapshot.paramMap.get('email');

  }

  ngOnInit(): void {
    this.authService.confirmCode(this.hashCode, this.email)
      .subscribe(data => {
        if (data.success) {
          this.rotuer.navigate(['/auth/confirm-success']);
        } else {
          this.rotuer.navigate(['/auth/confirm-fail']);
        }
      })
  }

}
