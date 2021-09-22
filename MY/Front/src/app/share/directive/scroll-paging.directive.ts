import { Directive, HostListener, Input } from "@angular/core";


@Directive({
  selector: "[scrollPaging]"
})
export class ScrollPagingDirective {
  pagingNumber = 2;

  @Input()  service:any;

  constructor() { }


  @HostListener("scroll", ["$event.target"])
  onScroll(elem) {
    console.log(this.service)
    if (elem.scrollTop + elem.clientHeight >= elem.scrollHeight) {
        this.service.ScrollPaging(this.pagingNumber++)
    }
  }

}
