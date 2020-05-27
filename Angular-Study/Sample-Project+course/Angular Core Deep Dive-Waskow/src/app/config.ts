import { InjectionToken } from '@angular/core'

export interface AppConfig {
    apiUrl: string;
    courseCacheSize: number;
}

export const APP_CONFIG : AppConfig = {
    apiUrl: 'http://localhost:4222',
    courseCacheSize: 10
}

export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN',
                                    {    //tree shakeable configuration
                                        providedIn: 'root',
                                        factory: () => APP_CONFIG
                                    });