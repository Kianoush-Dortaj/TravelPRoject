import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './../../layouts/layouts.module';
import { ToollbarModule } from 'src/app/layouts/toollbar/toollbar.module';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ToollbarModule
  ],
  exports: [HomePageComponent]
})
export class HomePageModule { }
