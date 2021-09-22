import { Directive, Input, ElementRef } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translationService';

@Directive({
    selector: '[reverseStyle]'
  })
  export class ReverseStyleDirective {
  
    @Input() value:string;
    @Input() rtl:string;
    @Input() ltr:string;
    constructor(private elementRef: ElementRef, private translattionService: TranslationService) { }
  
    ngAfterViewInit(): void {
  
      this.translattionService.currentLang$.subscribe(data => {
        if (data === 'fa') {
          this.elementRef.nativeElement['style'][this.rtl] = this.value;
          console.log(this.elementRef.nativeElement['style'][this.rtl])
        } else {
          this.elementRef.nativeElement['style'][this.ltr] = this.value;
        }
      })
    }
  }
  