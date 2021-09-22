import { Directive, ElementRef, Input } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translationService';

@Directive({
  selector: '[PfaReverseArrow]'
})
export class ReverseArrowDirective {

  @Input() rtl:string;
  @Input() ltr:string;
  constructor(private elementRef: ElementRef, private translattionService: TranslationService) { }

  ngAfterViewInit(): void {

    this.translattionService.currentLang$.subscribe(data => {
      if (data === 'fa') {
        this.elementRef.nativeElement['innerHTML'] = this.rtl;
      } else {
        this.elementRef.nativeElement['innerHTML'] = this.ltr;
      }
    })
  }
}
