import { Injectable } from '@angular/core';
import { Language } from '../models/language';
import { BehaviorSubject } from 'rxjs';
import emojioneIR from '@iconify/icons-emojione/flag-for-flag-iran';
import emojioneUK from '@iconify/icons-emojione/flag-for-flag-united-kingdom';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '../models/locale';
import { locale as enLang } from '../configs/i18n/en';
import { locale as faLang } from '../configs/i18n/fa';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    languages: Language[];
    private langIds: string[] = [];
    private currentLang = new BehaviorSubject<string>('en');
    currentLang$ = this.currentLang.asObservable();
    emojioneIR = emojioneIR;
    emojioneUK = emojioneUK;

    constructor(private translate: TranslateService) {
        this.initLanguages();
        this.translate.setDefaultLang('en');
        const currentLang = this.getCurrentLang();
        if (currentLang) {
            translate.use(currentLang.lang);
            this.changeDirection(currentLang.dir);
            this.currentLang.next(currentLang.lang);
        } else {
            translate.use('en');
            this.changeDirection('ltr');
            localStorage.setItem('language', 'en');
        }
        this.loadTranslations(enLang, faLang);
    }

    initLanguages(): void {
        this.languages = [{
            lang: 'en',
            name: 'English',
            dir: 'ltr',
            rtl:false,
            flag: this.emojioneUK
        },
        {
            lang: 'fa',
            name: 'فارسی',
            dir: 'rtl',
            rtl:true,
            flag: this.emojioneIR
        }
        ];
    }

    getSelectedLanguage(): any {
        return localStorage.getItem('language') || this.translate.getDefaultLang();
    }

    loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach(locale => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
            this.translate.setTranslation(locale.lang, locale.data, true);

            this.langIds.push(locale.lang);
        });

        // add new languages to the list
        this.translate.addLangs(this.langIds);
    }
    setLanguage(lang): void {
        if (lang) {
            localStorage.setItem('language', lang);
            location.reload();
        }
    }

    changeDirection(dir: string): void {
        if (!dir) { dir = 'rtl'; }
        const cssRtl: any = document.getElementById('rtlStyle');
        if (dir === 'rtl') {
            //     cssRtl.disabled = false;
            document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        } else {
            //    cssRtl.disabled = true;
            document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        }
    }

    getCurrentLang(): Language {
        if (localStorage.getItem('language')) {
            const currentLang = localStorage.getItem('language');
            for (const item of this.languages) {
                if (item.lang === currentLang) {
                    return item;
                }
            }
        } else {
            return null;
        }
    }
}