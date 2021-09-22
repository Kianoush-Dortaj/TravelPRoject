import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PopoverService } from '../popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-person';
import theme from '../../utils/tailwindcss';
import { BrowserStorageService } from 'src/app/core/auth/services';
import { StyleService } from 'src/@vex/services/style.service';
export enum Style {
  light = 'vex-style-light',
  default = 'vex-style-default',
  dark = 'vex-style-dark'
}


@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent implements OnInit {

  dropdownOpen: boolean;
  icPerson = icPerson;
  disolayName:string;
  theme = theme;

  constructor(private popover: PopoverService,
    private styleService: StyleService,
      public browserStorageService:BrowserStorageService,
              private cd: ChangeDetectorRef) {
                this.disolayName=this.browserStorageService.getDisplayName();
                if(this.getDarkModeEnable())
                {
                  this.enableDarkMode();
                }else{
                  this.disableDarkMode();
                }
               }

  ngOnInit() {
  }

  getDarkModeEnable():boolean{
    return  this.browserStorageService.getLocal("DarkMode");
  }

  
  enableDarkMode() {
    this.styleService.setStyle(Style.dark);
    this.browserStorageService.setLocal("DarkMode",true);
  }

  disableDarkMode() {
    this.styleService.setStyle(Style.default);
    this.browserStorageService.setLocal("DarkMode",false);

  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
