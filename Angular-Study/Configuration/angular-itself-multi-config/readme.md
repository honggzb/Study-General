## Configure and build Angular application for different environments

- [Custom environment file](#custom-environment-file)
- [Use environment settings inside components](#use-environment-settings-inside-components)
- [Update angular.json configuration](#update-angularjson-configuration)
- [Build application for custom environment](#build-application-for-custom-environment)

## Custom environment file

- environments/environment.ts
- environments/environment.prod.ts
- environments/environment.qa.ts
- environments/environment.staging.ts

```javascript
export const environment = {
  production: true,
  environmentName: 'QA',
  apiUrl: 'QA url'
};
```

## Use environment settings inside components

```javascript
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multiple-env-demo';
  environmentName = '';
  environmentUrl = 'Debug api';
  constructor() {
    this.environmentName = environment.environmentName;
    this.environmentUrl = environment.apiUrl;
  }
}
```

## Update angular.json configuration

```javascript
"build": {
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
            },
            "qa": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.qa.ts"
                }
              ]
            },
            "staging": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.staging.ts"
                }
              ]
            }
          }
        }
```


## Build application for custom environment

`ng build --configuration qa`

> Reference
- [Configure and build Angular application for different environments](https://medium.com/@balramchavan/configure-and-build-angular-application-for-different-environments-7e94a3c0af23)
