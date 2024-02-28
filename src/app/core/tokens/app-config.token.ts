import { InjectionToken } from '@angular/core';

export interface AppConfig {
  [key: string]: any;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
