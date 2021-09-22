import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translationService';

@Component({
  selector: 'pfa-side-info',
  templateUrl: './side-info.component.html',
  styleUrls: ['./side-info.component.scss']
})
export class SideInfoComponent implements OnInit {

  @Input() infos: any;
  @Input() sideInfoHeight: boolean = false;
  @Input() element: any;
  @Input() title: string;
  @Input() scroll: boolean;
  @Input() oneByOne: boolean = false;

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    console.log(this.oneByOne)
    this.SetInfoButtonRTL();
    this.setTranslate();
  }

  SetInfoButtonRTL(): void {
    let element = document.getElementById("mySidenav");
    let lang = this.translationService.getCurrentLang().lang;
    if (lang === 'fa') {
      element.classList.add('right-info')
    }
    else {
      element.classList.add('left-info')
    }
  }

  setTranslate(): void {
    let element = document.getElementById("activity-container");
    let lang = this.translationService.getCurrentLang().lang;
    if (lang === 'fa') {
      element.classList.add('translate-rtl')
    }
    else {
      element.classList.add('translate-ltr')
    }
  }


  openNav(): void {
    let lang = this.translationService.getCurrentLang().lang;
    let activityInfo = document.getElementById("activity-info");
    let activityContainer = document.getElementById("activity-container");
    let closeDirection = document.getElementById("activity-header");
    activityInfo.classList.add('activity-info-open');
    if (lang === 'fa') {
      activityContainer.classList.remove('translate-rtl');
      activityContainer.classList.add('activity-open');
      closeDirection.classList.add('close-buttun-ltr');
      activityInfo.classList.add('activity-info-right');
    } else {
      activityContainer.classList.remove('translate-ltr');
      activityContainer.classList.add('activity-open');
      closeDirection.classList.add('close-buttun-rtl');
      activityInfo.classList.add('activity-info-left');
    }
  }
  closeActivityInfo(): void {
    let lang = this.translationService.getCurrentLang().lang;
    let activityInfo = document.getElementById("activity-info");
    let activityContainer = document.getElementById("activity-container");
    if (lang === 'fa') {
      activityContainer.classList.remove('activity-open');
      activityContainer.classList.add('translate-rtl')
    }
    else {
      activityContainer.classList.remove('activity-open');
      activityContainer.classList.add('translate-ltr')
    }
    activityInfo.classList.add('activity-close');
    activityInfo.classList.remove('activity-close');
    activityInfo.classList.remove('activity-info-open');
  }

}
