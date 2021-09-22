import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BehavorSubject {
	
	private titleString: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	titleString$: Observable<string> = this.titleString.asObservable();

	private booleanValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
	booleanValue$: Observable<boolean> = this.booleanValue.asObservable();


	private listValue: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	listValue$: Observable<any> = this.listValue.asObservable();

	constructor() { }

	setBooleanValue(value): void{
		this.booleanValue.next(value);
	}

	setStringValue(title): void {
		this.titleString.next(title);
	}

	setListValue(value): void {
		this.listValue.next(value);
	}
}
