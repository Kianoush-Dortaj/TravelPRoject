import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pfa-element-action-details',
    templateUrl: './element-action-details.component.html',
    styleUrls: ['./element-action-details.component.scss']
})
export class ElementActionDetailsComponent implements OnInit {

    @Input() element: any;
    @Input() showMobileSize: any;
    @Input() onDesktopSize:any;
    @Input() onTabletSize:any;
    
    constructor() { }

    ngOnInit(): void {
    console.log("ElementActionDetailsComponent -> element", this.element)
    }


    checkBoolean(value): boolean {
        return typeof value === 'boolean' ? true : false;
    }

}
