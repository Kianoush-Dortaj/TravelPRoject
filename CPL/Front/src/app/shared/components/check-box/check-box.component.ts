import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pfa-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  @Input() value;
  constructor() { }

  ngOnInit(): void {
  }

}
