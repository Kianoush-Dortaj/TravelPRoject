import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { SearchPlaceInterface } from '../models/search-place-model';
import { SearchPlaceService } from './../services/search-place.service';

@Component({
  selector: 'search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPlaceComponent implements OnInit, OnChanges {

  @Output() location = new EventEmitter<SearchPlaceInterface>();
  @Input() setLocation: any;

  item: SearchPlaceInterface[];
  name: string;

  constructor(private searchPlaceService: SearchPlaceService) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.setLocation.city) {
      this.name = this.setLocation.city + ' , ' + this.setLocation.country;
    }
  }

  SearchPlace(event): void {
    this.searchPlaceService.SearchPlace(event).subscribe(data => {
      this.item = data;
    })
  }

  setInputText(value: SearchPlaceInterface): void {
    this.name = value.name + ' , ' + value.country;
    this.item = null;
    this.location.emit(value);
  }
}
