[Building Reusable Angular Services: Configuration Management - Paul D. Sheriff](#top)

- [Global Class/Service to hold global settings](#global-classservice-to-hold-global-settings)
- [Global settings from a JSON file with errorHandle](#global-settings-from-a-json-file-with-errorhandle)
- [Global settings by using localStorage](#global-settings-by-using-localstorage)

------------------------------------------------

![](https://i.imgur.com/asxMnRz.png)

- Create service for global settings
- Retrieve and store settings in
  - Class
  - JSON file
  - Local storage
  - SQL Server via Web API

------------------------------------------------

## Global Class/Service to hold global settings

```javascript
export class AppSettings {
  defaultPrice: number = 1;
  defaultUrl: string = "http://www.fairwaytech.com";
}
@Injectable()
export class AppSettingsService {
  getSettings(): Observable<AppSettings> {
    let settings = new AppSettings();
    return of(settings);
  }
}
```

## Global settings from a JSON file with errorHandle

- read json file by using **HttpClient,** 'app/assets/appsettings.json'
- adding errorHandle

```javascript
//app/assets/appsettings.json
{
  "defaultPrice": 2,
  "defaultUrl":"http://angular.io"
}
//
const SETTINGS_LOCATION = "assets/appsettings.json";
export class AppSettings {
  defaultPrice: number = 1;
  defaultUrl: string = "http://www.fairwaytech.com";
}
@Injectable()
export class AppSettingsService {
  constructor(private http: HttpClient) {}
  getSettings(): Observable<AppSettings> {
    return this.http.get<AppSettings>(SETTINGS_LOCATION)
      .pipe(
        catchError(
         this.handleError<AppSettings>('getSettings', new AppSettings()))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      switch (error.status) {
        case 404:
          console.error("Can't find file: " +
              SETTINGS_LOCATION);
          break;
        default:
          console.error(error);
          break;
      }
      return of(result as T);
    };
  }
}
```

[back to top](#top)

## Global settings by using localStorage

```javascript
const SETTINGS_LOCATION = "assets/appsettings.json";
const SETTINGS_KEY = "configuration";
export class AppSettings {
  defaultPrice: number = 1;
  defaultUrl: string = "http://www.fairwaytech.com";
}
@Injectable()
export class AppSettingsService {
  constructor(private http: HttpClient) {}
  //read from localstorage
  getSettings(): Observable<AppSettings> {
    let settings = localStorage.getItem(SETTINGS_KEY);
    if (settings) {
      return of(JSON.parse(settings));
    }
    else {
      return this.http.get<AppSettings>(SETTINGS_LOCATION)
        .pipe(
          tap(settings => {
            if (settings) { this.saveSettings(settings); }
          }),
          catchError( this.handleError<AppSettings>('getSettings', new AppSettings())));
    }
  }
  //save to localStorage
  saveSettings(settings: AppSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
 //delete in localStorage
  deleteSettings(): void {
    localStorage.removeItem(SETTINGS_KEY);
  }
   //...
}
```

[back to top](#top)
