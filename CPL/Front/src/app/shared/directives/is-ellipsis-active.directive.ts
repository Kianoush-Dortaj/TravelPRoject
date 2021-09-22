import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
	selector: '[ktIsEllipsisActive]'
})

export class IsEllipsisActiveDirective implements AfterViewInit {

	constructor(private elementRef: ElementRef) { }

	ngAfterViewInit(): void {
		let innerHTML = this.elementRef.nativeElement['innerHTML'];
		if (innerHTML.length > 30) {
			innerHTML = innerHTML.substring(0, 30) + ' . . . ';
			this.elementRef.nativeElement['innerHTML'] = innerHTML;
		}
	}
}

