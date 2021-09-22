import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { tap, takeUntil, finalize } from 'rxjs/operators';
import { Credentials } from 'src/app/core/auth/services/models/credentials';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services';
import { AlertService } from 'src/app/core/services/alert.servise';
import { Subject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Public params
  subscriptions: Subscription;
  loginForm: FormGroup;
  loading = false;
  isLoggedIn$: Observable<boolean>;
  errors: any = [];

  private unsubscribe: Subject<any>;

  private returnUrl: any;

  /**
    * Component constructor
    *
    * @param router: Router
    * @param auth: AuthService
    * @param authNoticeService: AuthNoticeService
    * @param translate: TranslateService
    * @param store: Store<AppState>
    * @param fb: FormBuilder
    * @param cdr
    * @param route
    */
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private alretService: AlertService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.unsubscribe = new Subject();
  }

  /**
    * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

  /**
    * On init
    */
  ngOnInit(): void {
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  /**
    * On destroy
    */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
    * Form initalization
    * Default params, validators
    */
  initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ]
    });
  }

  /**
    * Form Submit
    */
  submit(): void {
    const controls = this.loginForm.controls;
    //   this.router.navigate(['auth/confirm-code']);
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;
    const authData: Credentials = {
      username: controls['username'].value,
      password: controls['password'].value,
      rememberMe: true
    };
    this.subscriptions = this.auth
      .login(authData)
      .pipe(
        tap(res => {
          if (res == true) {
            this.router.navigateByUrl(this.returnUrl);
          }
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  /**
    * Checking control validation
    *
    * @param controlName: string => Equals to formControlName
    * @param validationType: string => Equals to valitors name
    */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) &&
      (control.dirty || control.touched);
    return result;
  }
}
