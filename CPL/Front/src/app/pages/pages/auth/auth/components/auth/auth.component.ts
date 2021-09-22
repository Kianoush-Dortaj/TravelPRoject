import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translationService';
import { LayoutService } from 'src/@vex/services/layout.service';
import emojioneIR from '@iconify/icons-emojione/flag-for-flag-iran';
import emojioneUK from '@iconify/icons-emojione/flag-for-flag-united-kingdom';

@Component({
  selector: 'vex-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  language: any;
  selectedLanguage: string;
  emojioneIR = emojioneIR;
  emojioneUK = emojioneUK;
  languages:any;
  
  constructor(   
    private layoutService: LayoutService,
    private translteService: TranslationService) {
    this.languages = this.translteService.languages;
   }

  ngOnInit(): void {
    this.selectedLanguage= this.translteService.getSelectedLanguage();
  }

  layoutRTLChange(change, lang) {  
    this.translteService.setLanguage(lang);
    change === true ? this.layoutService.enableRTL() : this.layoutService.disableRTL();
  }

}
