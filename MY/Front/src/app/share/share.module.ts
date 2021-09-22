import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/materials/material.module';
import { TranslationModule } from './../modules/i18n/translation.module';
import { SearchPlaceComponent } from './search-place/components/search-place.component';
import { FormsModule } from '@angular/forms';
import { SortByPipe } from './pipes/sortBy.pipe';
import { ScrollPagingDirective } from './directive/scroll-paging.directive';

@NgModule({
  declarations: [SearchPlaceComponent, SortByPipe, ScrollPagingDirective],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    TranslationModule
  ],
  exports: [
    MaterialModule,
    TranslationModule,
    SearchPlaceComponent,
    SortByPipe,
    ScrollPagingDirective
  ]
})
export class ShareModule { }
