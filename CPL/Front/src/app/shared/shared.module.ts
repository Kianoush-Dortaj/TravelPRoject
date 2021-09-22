import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG, FileInputConfig } from 'ngx-material-file-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LogHelper, DateService } from './services';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { ConvertbytePipe } from './pipes/convertbyte.pipe';
import { DateToPersian } from './pipes/date-to-persian.pipe';
import { EnumToArrayPipe } from './pipes/EnumToArrayPipe';
import { SearchWtihInput } from './pipes/saerch-with-input-pipe';
import { MonySplitePipe } from './pipes/mony-splite.pipe';
import { ArraySortPipe } from './pipes/sort-pipe';
import { IsEllipsisActiveDirective } from './directives/is-ellipsis-active.directive';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { DateTimeFormatComponent } from './components/date-time-format';
import { ShareErrorComponent } from './components/share-error/share-error.component';
import { ShowImageInListComponent } from './components/show-image-ln-list';
import { UserFieldComponent } from './components/user-field';
import { ElementActionDetailsComponent } from './components/element-action-details/element-action-details.component';
import { ReverseArrowDirective } from './directives/reverse-arrow.directive';
import { BreadCrumpsComponent } from './components/bread-crumps/bread-crumps.component';
import { DeleteEntityDialogComponent } from './components/delete-entity-dialog/delete-entity-dialog.component';
import { SideInfoComponent } from './components/side-info/side-info.component';
import { ReverseStyleDirective } from './directives/revers-style.directive';
import { DetailDialogComponent } from './components/detail-dialog/detail-dialog.component';
import { TreeRolesComponent } from './components/tree-roles/tree-roles.component';
import { DiffFinderComponent } from './components/diff-finder/diff-finder.component';
import { PrettyShowJson } from './pipes/pretty-json';
import { NoDataTabelComponent } from './components/no-data-tabel/no-data-tabel.component';
import { PreviewComponent } from './components/preview/components/preview.component';

@NgModule({
  declarations: [
    DateToPersian
    , EnumToArrayPipe
    , SearchWtihInput
    , ConvertbytePipe
    , ArraySortPipe
    , MonySplitePipe
    , IsEllipsisActiveDirective
    , CheckBoxComponent
    , DateTimeFormatComponent
    , ShareErrorComponent
    , TreeRolesComponent
    , ShowImageInListComponent
    , DetailDialogComponent
    , UserFieldComponent
    , DiffFinderComponent
    , ElementActionDetailsComponent
    , PrettyShowJson
    , NoDataTabelComponent
    , ReverseArrowDirective
    , BreadCrumpsComponent
    , ReverseStyleDirective
    , DeleteEntityDialogComponent
    , SideInfoComponent, PreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialFileInputModule,
    MatDatepickerModule,
    // use this if you want to use native javascript dates and INTL API if available
    // MatNativeDatetimeModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    TranslateModule.forChild()
  ],
  providers: [LogHelper, DateService
  ],
  exports: [
    MaterialModule
    , ConvertbytePipe
    , DateToPersian
    , EnumToArrayPipe
    , TreeRolesComponent
    , DiffFinderComponent
    , SearchWtihInput
    , DetailDialogComponent
    , MonySplitePipe
    , ArraySortPipe
    , IsEllipsisActiveDirective
    , PrettyShowJson
    , CheckBoxComponent
    , ReverseStyleDirective
    , DateTimeFormatComponent
    , ShareErrorComponent
    , NoDataTabelComponent
    , ShowImageInListComponent
    , UserFieldComponent
    , ElementActionDetailsComponent
    , ReverseArrowDirective
    , BreadCrumpsComponent
    , DeleteEntityDialogComponent
    , SideInfoComponent, PreviewComponent
  ],
  entryComponents: [DeleteEntityDialogComponent, PreviewComponent]
})
export class SharedModule {
  // static forRoot(): ModuleWithProviders {
  //   // Forcing the whole app to use the returned providers from the AppModule only.
  //   return {
  //     ngModule: SharedModule,
  //     providers: [LogHelper, DateService,
  //       { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
  //       { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  //     ],
  //   };
  // }
}
