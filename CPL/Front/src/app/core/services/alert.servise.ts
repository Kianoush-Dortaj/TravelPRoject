import { ToastrService } from 'ngx-toastr';
import { Inject, NgZone, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertService {
	constructor(
		@Inject(NgZone) private ngZone: NgZone,
		@Inject(ToastrService) private toastr: ToastrService,
		private translateServise: TranslateService,
	) { }

	info(title, message, needTranslate = true): void {
		if (needTranslate) {
			this.translateServise.get([title, message]).subscribe(
				t => {
					this.ngZone.run(() => {
						this.toastr.info(t[title], t[message]);
					});
				}
			);
		} else {
			this.ngZone.run(() => {
				this.toastr.success(message, title);
			});
		}
	}

	success(title, message, needTranslate = true): void {
		if (needTranslate) {
			this.translateServise.get([title, message]).subscribe(
				t => {
					this.ngZone.run(() => {
						this.toastr.success(t[title], t[message]);
					});
				}
			);
		} else {
			this.ngZone.run(() => {
				this.toastr.success(message, title);
			});
		}

	}

	error(title, message, needTranslate = true): void {
		if (needTranslate) {
			this.translateServise.get([title, message]).subscribe(
				t => {
					this.ngZone.run(() => {
						this.toastr.error(t[title], t[message]);
					});
				}
			);
		} else {
			this.ngZone.run(() => {
				this.toastr.error(message, title);
			});
		}
	}

	warning(title, message, needTranslate = true): void {
		if (needTranslate) {
			this.translateServise.get([title, message]).subscribe(
				t => {
					this.ngZone.run(() => {
						this.toastr.warning(t[title], t[message]);
					});
				}
			);
		} else {
			this.ngZone.run(() => {
				this.toastr.warning(message, title);
			});
		}
	}

	optional(type: ToastType, title, message, options?): void {
		if (type === ToastType.Warning) {
			this.ngZone.run(() => {
				this.toastr.warning(message, title, options);
			});
		} else if (type === ToastType.Success) {
			this.ngZone.run(() => {
				this.toastr.success(message, title, options);
			});
		} else if (type === ToastType.Info) {
			this.ngZone.run(() => {
				this.toastr.info(message, title, options);
			});
		} else if (type === ToastType.Error) {
			this.ngZone.run(() => {
				this.toastr.error(message, title, options);
			});
		}
	}
}
export enum ToastType {
	Error,
	Success,
	Warning,
	Info
}
