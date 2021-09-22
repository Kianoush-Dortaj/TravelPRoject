import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pfa-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})

export class UserFieldComponent implements OnInit {
    @Input() displayName: string;
    @Input() username: string;
    @Input() row = true;
    constructor() { }

    ngOnInit(): void {
    }

}
