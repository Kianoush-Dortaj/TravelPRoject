import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/services/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icChat from '@iconify/icons-ic/twotone-chat';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icUsers from '@iconify/icons-ic/round-supervised-user-circle';
import icConfigurations from '@iconify/icons-ic/sharp-settings-applications';
import icSecurity from '@iconify/icons-ic/lock';

import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icLock from '@iconify/icons-ic/twotone-lock';
import icWatchLater from '@iconify/icons-ic/twotone-watch-later';
import icError from '@iconify/icons-ic/twotone-error';
import icAttachMoney from '@iconify/icons-ic/twotone-attach-money';
import icPersonOutline from '@iconify/icons-ic/twotone-person-outline';
import icReceipt from '@iconify/icons-ic/twotone-receipt';
import icHelp from '@iconify/icons-ic/twotone-help';
import icBook from '@iconify/icons-ic/twotone-book';
import icBubbleChart from '@iconify/icons-ic/twotone-bubble-chart';
import icFormatColorText from '@iconify/icons-ic/twotone-format-color-text';
import icStar from '@iconify/icons-ic/twotone-star';
import icViewCompact from '@iconify/icons-ic/twotone-view-compact';
import icPictureInPicture from '@iconify/icons-ic/twotone-picture-in-picture';
import icSettings from '@iconify/icons-ic/twotone-settings';
import { LayoutService } from '../@vex/services/layout.service';
import icUpdate from '@iconify/icons-ic/twotone-update';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { locale as enLang } from './core/configs/i18n/en';
import { locale as faLang } from './core/configs/i18n/fa';
import { filter } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import theme from '../@vex/utils/tailwindcss';
import icChromeReaderMode from '@iconify/icons-ic/twotone-chrome-reader-mode';
import { ConfigName } from '../@vex/interfaces/config-name.model';
import { TranslationService } from './core/services/translationService';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService) {
    Settings.defaultLocale = this.localeId;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      let lang = this.translationService.getCurrentLang().lang
      if (event['url'].match(/\brtl=\b/)) {
        // nothing to do, we've been redirected already
      } else if (lang === 'fa') {
        this.router.navigate([event['urlAfterRedirects']], { queryParams: { rtl: 'true' } });
      } else {
        this.router.navigate([event['urlAfterRedirects']], { queryParams: { rtl: 'false' } });
      }
    });

    if (this.platform.BLINK) {
      this.translationService.loadTranslations(enLang, faLang);
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    showConfigButton: false,
     *    footer: {
     *      visible: false
     *    }
     *  });
     */

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl')))
    ).subscribe(queryParamMap => {
      this.document.body.dir = 'rtl';
      this.configService.updateConfig({
        rtl: true
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


    /**
     * Add your own routes here
     */
    this.navigationService.items = [
      {
        type: 'link',
        label: 'MENU.DASHBOARD',
        route: '/dashboards/analytics',
        icon: icLayers
      },
      {
        type: 'dropdown',
        label: 'MENU.VISITOR_MANAGER',
        icon: icUsers,
        children: [
          {
            type: 'link',
            icon: icContacts,
            label: 'MENU.VISITOR',
            route: '/visitor',
          },
        ]
      },
      {
        type: 'dropdown',
        label: 'MENU.MANAGER_MANAGERS',
        icon: icUsers,
        children: [
          {
            type: 'link',
            icon: icContacts,
            label: 'MENU.MANAGERS',
            route: '/managers',
          },
        ]
      },
      {
        type: 'dropdown',
        label: 'MENU.CONFIGURATION',
        icon: icConfigurations,
        children: [
          {
            type: 'dropdown',
            label: 'MENU.ACCESS_LEVEL_MANAGER',
            icon: icContacts,
            children: [
              {
                type: 'link',
                icon: icContacts,
                label: 'MENU.CLAIM_GROUP_MANAGER',
                route: '/claims-manager/list'
              },
              {
                type: 'link',
                icon: icContacts,
                label: 'MENU.ROLES_MANAGER',
                route: '/roles-manager/list'
              }
            ]
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.CATEGORY',
            route: '/category'
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.SETTING',
            route: '/settings'
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.SUBSCRIBE',
            route: '/subscribe'
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.DISCOUNT',
            route: '/discount'
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.TRAVEL_TYPE',
            route: '/travel-type'
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.TRAVEL_TYPE_RESIDENCE',
            route: '/travel-type-residence'
          },
          {
            type: 'link',
            icon: icSettings,
            label: 'MENU.INTERSET',
            route: '/interst'
          }
          //
        ]
      },
    ];
  }
}
