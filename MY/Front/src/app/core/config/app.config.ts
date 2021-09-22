'use strict';

import { InjectionToken } from '@angular/core';
import { environment } from './../../../environments/environment';

export let APP_CONFIG = new InjectionToken<string>('app.config');
export interface IAppConfig {
  apiEndpoint: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: environment.apiUrl,
};
