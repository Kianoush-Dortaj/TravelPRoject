import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'pfa-share-error',
    templateUrl: './share-error.component.html',
    styleUrls: ['./share-error.component.scss']
})
export class ShareErrorComponent implements OnInit ,AfterViewInit {

    @Input("form") from: FormGroup
    @Input("field") fieldName: string;
    @Input("nicename") nicename: string;
    param: any;
    constructor() { }

    ngAfterViewInit(): void {
    }

    ngOnInit() {
        console.log(this.nicename)
        this.param = { value:this.nicename }
    }

    fieldErrors(field: string) {
        let controlState = this.from.controls[field];
        return (controlState.dirty || controlState.touched) ? controlState.errors : null;
    }
}
