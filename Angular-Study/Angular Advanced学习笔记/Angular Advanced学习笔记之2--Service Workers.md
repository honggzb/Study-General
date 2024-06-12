[Angular Advanced学习笔记之--Service Workers](#top)

- [Change Detection Strategy](#change-detection-strategy)
- [setup PWA](#setup-pwa)
- [Push notification](#push-notification)
- [Deploy a PWA to production](#deploy-a-pwa-to-production)
- [Related resources](#related-resources)
-------------------------------------

## setup PWA

- `ng add @angular/pwa`
  - if it is multiple project: `ng add @angular/pwa --project <projectname>`
- Imports and registers the service worker in the application module
- Enables service worker build support in the CLI
- Create the service worker configuration file at root directory:'ngsw-config.json'
- create 'src\manifest.webmanifest' file
  - create 'src\icons\' folder and create some icon files
- Updates the index.html file:
  - includes a link to add the 'manifest.webmanifest' file: `<link rel="manifest" href="manifest.webmanifest">`
  - Adds a meta tag for 'theme-color': `<meta name="theme-color" content="#1976d2">`
- update 'angular.json' in root directory
  - ![pwangular](pwangular.png)
- Update 'app.module.ts', add 'ServiceWorkerModule'

```ts
//app.module.ts
import { ServiceWorkerModule } from '@angular/service-worker';
imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes counter-one).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
```

- update package.json: `"start": "ng build && http-server -p 8080 -c-1 dist/advanced-app",`

[⬆ back to top](#top)

## Push notification

- update notification
  - ![pushU](pushU.png)
- push notification
  - ![pushN](pushN.png)

```ts
import {Component} from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";
import {filter, timer} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'service-worker';

  constructor(swUpdate: SwUpdate, swPush: SwPush) {
    swUpdate.versionUpdates.pipe(
      filter((event) => event.type === 'VERSION_READY'))
      .subscribe(() => {
        if (confirm('New version for the app is available. Do you want to reload?')) {
          document.location.reload();
        }
      });
    // swPush.messages.subscribe(console.log);
    // timer(1000 * 60 * 60 * 20).subscribe(() => {
    //   swUpdate.checkForUpdate().then()
    // })
    Notification.requestPermission().then(permissions => {
      if (permissions === 'granted') {
        console.log('Show notifications');
      }
    })
    // Notification API formats: 
    // {
    //   "notification": {
    //     "title": "Angular",
    //     "body": "Test push notifications",
    //     "icon": "http://icon/url",
    //     "click_action": "http://navigation-link"
    //   }
    // }

  }
}

```

## Deploy a PWA to production

- deploy application to Github using `gh-pages`

```
"predeploy": "ng build --prod --base-href=/angular-pwa/",
"deploy": "npx gh-pages -d dist/angular-pwa"
```

## Related resources

- [App Shell](https://v16.angular.io/guide/app-shell)
- [Service Worker Communication](https://v16.angular.io/guide/service-worker-communications)
- [Service Worker Notifications](https://v16.angular.io/guide/service-worker-notifications)
- [Service Worker in Production](https://v16.angular.io/guide/service-worker-devops)
- [Service Worker Configuration](https://v16.angular.io/guide/service-worker-config)
  
[⬆ back to top](#top)

```
"scripts": {
  "ngsw-config": "node_modules/.bin/ngsw-config dist src/ngsw-config.json",
  "ngsw-copy": "cp node_modules/@angular/service-worker/ngsw-worker.js dist/",
  "build-prod-ngsw": "ng build --prod && npm run ngsw-config && npm run ngsw-copy",
  "serve-prod-ngsw": "npm run build-prod-ngsw && http-server dist -p 8080",
}
```

> Referencw
- [angular/pwa](https://www.npmjs.com/package/@angular/pwa)
- [Official-v16-Getting started with service workers](https://v16.angular.io/guide/service-worker-getting-started)
- [Angular PWA, install and configure](https://medium.com/ngconf/angular-pwa-install-and-configure-858dd8e9fb07)
  - https://github.com/pankajparkar/angular-pwa
