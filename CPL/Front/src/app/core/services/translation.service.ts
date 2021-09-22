// Angular
import { Injectable } from '@angular/core';
// Tranlsation
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface Locale {
	lang: string;
	data: Object;
}

export interface LanguageFlag {
	lang: string;
	name: string;
	flag: string;
	dir?: string;
	active?: boolean;

}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	// Private properties
	private langIds: any = [];
	languages: LanguageFlag[] = [
		{
			lang: 'en',
			name: 'English',
			dir: 'ltr',
			flag: './assets/media/flags/012-uk.svg'
		},
		{
			lang: 'fa',
			name: 'فارسی',
			dir: 'rtl',
			flag: './assets/media/flags/021-iran.svg'
		},
	];

	private currentLang = new BehaviorSubject<string>('fa');
	currentLang$ = this.currentLang.asObservable();


	/**
	 * Service Constructor
	 *
	 * @param translate: TranslateService
	 */
	constructor(private translate: TranslateService) {
		// add new langIds to the list
		this.translate.addLangs(['en']);

		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang('fa');
		this.setDirectionStyle();
	}

	/**
	 * Load Translation
	 *
	 * @param args: Locale[]
	 */
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

	/**
	 * Setup language
	 *
	 * @param lang: any
	 */
	setLanguage(lang): void {
		if (lang) {
			this.translate.use(this.translate.getDefaultLang());
			this.translate.use(lang);
			localStorage.setItem('language', lang);
			this.currentLang.next(lang);
		}
	}

	setDirectionStyle(dir?: string): void {

		if (!dir) { dir = 'ltr'; }
		if (dir === 'rtl') {
			const cssRtl: any = document.getElementById('rtlStyle');
			const cssLtr: any = document.getElementById('ltrStyle');
			cssRtl.disabled = false;
			cssLtr.disabled = true;
			document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
		} else {
			const cssRtl: any = document.getElementById('rtlStyle');
			const cssLtr: any = document.getElementById('ltrStyle');
			cssRtl.disabled = true;
			cssLtr.disabled = false;
			document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
		}
	}

	/**
	 * Returns selected language
	 */
	getSelectedLanguage(): any {
		return localStorage.getItem('language') || this.translate.getDefaultLang();
	}


	getCurrentLang(): LanguageFlag {
		let lang: LanguageFlag;
		this.languages.forEach((language: LanguageFlag) => {
			if (localStorage.getItem('language') !== undefined) {
				if (language.lang === localStorage.getItem('language')) {
					language.active = true;
					lang = language;
				}
			} else {
				if (language.lang === this.currentLang.value) {
					language.active = true;
					lang = language;
				}
			}

		});

		return lang;
	}
}
