[Angular学习笔记17--2之Localization](#top)

- [1. Add the localize package](#1-add-the-localize-package)
- [2. Configure the supported locales -angular.json](#2-configure-the-supported-locales--angularjson)
- [3. Format data based on locale](#3-format-data-based-on-locale)
  - [Adding i18n attributes](#adding-i18n-attributes)
  - [built-in data transformation pipes](#built-in-data-transformation-pipes)
- [4. Configure my production server for a multilingual app](#4-configure-my-production-server-for-a-multilingual-app)
- [5. detect a visitor’s locale](#5-detect-a-visitors-locale)
  - [using express server](#using-express-server)
  - [using javascript \& jquery](#using-javascript--jquery)
- [language switcher component](#language-switcher-component)
- [work with plurals- plural clause](#work-with-plurals--plural-clause)
  - [Mark plurals](#mark-plurals)
  - [Mark alternates- select clause](#mark-alternates--select-clause)


----------------------------------------------

- Use built-in pipes to display dates, numbers, percentages, and currencies in a local format.
- Mark text in component templates for translation.
- Mark plural forms of expressions for translation.
- Mark alternate text for translation.

## 1. Add the localize package

- `ng add @angular/localize`
- The command will also import the $localize template tag in 'polyfill.ts'

## 2. Configure the supported locales -angular.json

- adding following to 'angular.json'

```js
"projects": {
    "project-name": {
      "i18n": {
        "sourceLocale": "en-US", //locale language
        "locales": {
          "ar-AE": {
            "translation": "src/locale/messages.ar.xlf",
            "baseHref": "ar-AE/"
          }
        }
      },
    //...
    "architect": {
        "build": {
          //...
          "options": {
            "localize": [ "ar-AE" ],
          }
```

[⬆ back to top](#top)

## 3. Format data based on locale

### Adding i18n attributes

```js
//html--> use i18n, i18n-placeholder
<button class="neumorphic-btn" i18n>Submit</button>
<img alt="hero image" i18n-alt class="hero-image" src="assets/undraw_order_confirmed_re_g0if.svg">
<img [src]="logo" i18n-title title="Angular logo" />
<input type="text" class="neumorphic-input" [(ngModel)]="name"
      placeholder="Enter your name"
      i18n-placeholder/>
//variable--> using $localize
export class AppComponent {
  title = $localize`Hello, How are you...`;
  //...
}
```

### built-in data transformation pipes

- DatePipe:   `{{today | date} ` --> will display the current date in the format for the locale in LOCALE_ID
- CurrencyPipe:  `{{amount | currency : 'en-US'}}` <-- override the value of LOCALE_ID
- DecimalPipe
- PercentPipe

## 4. Configure my production server for a multilingual app

- `ng extract-i18n --output-path src/locale`
  - ensuring that all of our translation files go under the 'src/locale' directory
  - copy to different language files
- `ng build --localize`
  - merge new translation into a build
  - test these builds: `npx http-server dist/azcadea`
- in package.json  --> `"start:ar": "ng serve --configuration ar",`


[⬆ back to top](#top)

## 5. detect a visitor’s locale

### using express server

- can use the [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) header to resolve the initial locale on the server for our Angular apps
- express sample

```js
//serve-prod-test.js
/*******************************************************
 * ⚠️ This server is for testing production builds in a
 * development environment. It has not been checked for
 * security. Please do not use in production!
 *****************************************************/
const path = require('path');
const express = require('express');
const matchSupportedLocales = require('./match-supported-locales');
// …
const locales = ['en-CA', 'ar'];
const defaultLocale = 'en-CA';
const server = express();
// …
server.get('/', (req, res) => {
  const closestSupportedLocale = matchSupportedLocales(
    req.acceptsLanguages(),
    locales,
    defaultLocale
  );
  return res.redirect(`/${closestSupportedLocale}`);
});
// …
// match-supported-locale.js
function matchSupportedLocale( acceptsLocales,supportedLocales,defaultLocale) {
  return (
    firstExactMatch(acceptsLocales, supportedLocales) ||
    firstLanguageMatch(acceptsLocales, supportedLocales) ||
    defaultLocale
  );
}
function firstExactMatch(acceptsLocales, supportedLocales) {
  return acceptsLocales.find((al) =>
    supportedLocales.includes(al)
  );
}
function firstLanguageMatch(acceptsLocales,supportedLocales) {
  for (acceptedLang of languagesFor(acceptsLocales)) {
    const match = supportedLocales.find(
      (sl) => languageFor(sl) === acceptedLang
    );
    if (match) {
      return match;
    }
  }
}
function languagesFor(locales) {
  return locales.map((loc) => languageFor(loc));
}
function languageFor(locale) {
  return locale.split('-')[0];
}
module.exports = matchSupportedLocale;
```

### using javascript & jquery

```js
//1
$.get("https://ipinfo.io", function(response) {
    console.log(response.city, response.country);
}, "jsonp");
//2
fetch('https://api.ipregistry.co/?key=tryout')
    .then(function (response) {
        return response.json();
    })
    .then(function (payload) {
        console.log(payload.location.country.name + ', ' + payload.location.city);
    });
//3
var requestUrl = "http://ip-api.com/json";
$.ajax({
  url: requestUrl,
  type: 'GET',
  success: function(json){
    console.log("My country is: " + json.country);
  },
  error: function(err){
    console.log("Request failed, error= " + err);
  }
});
//4
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON('http://ws.geonames.org/countryCode', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            type: 'JSON'
        }, function(result) {
            alert('Country: ' + result.countryName + '\n' + 'Code: ' + result.countryCode);
        });
    });
}​
//5
<script type="text/javascript">
  var a = document.getElementById("loc");
  function jsonpCallback(data) {
	  a.innerHTML = "Latitude: " + data.latitude +  "<br/>Longitude: " + data.longitude +
    "<br/>Country: " + data.address.country;
 	}
</script>
<script src="http://api.wipmania.com/jsonp?callback=jsonpCallback" type="text/javascript"></script>
//6
function getIPDetails() {
    var ipAddress = document.getElementById("txtIP").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", "http://ip-api.io/json/" + ipAddress, true);
    xhttp.send();
}
<input type="text" id="txtIP" placeholder="Enter the ip address" />
<button onclick="getIPDetails()">Get IP Details</button>
```

[⬆ back to top](#top)

## language switcher component

```ts
//src/app/locale-switcher/locale-switcher.component.ts
import {Inject,Component,LOCALE_ID} from '@angular/core';
@Component({
  selector: 'app-locale-switcher',
  templateUrl: `
    <select (change)="onChange()" [(ngModel)]="activeLocale">
      <option *ngFor="let locale of locales" [value]="locale.code">
        {{ locale.name }}
      </option>
    </select>
  `,
})
export class LocaleSwitcherComponent {
  locales = [
    { code: 'en-CA', name: 'English' },
    { code: 'ar', name: 'عربي (Arabic)' },
  ];
  constructor(@Inject(LOCALE_ID) public activeLocale: string) {}
  onChange() {
    // When the visitor selects Arabic, we redirect
    // to `/ar`
    window.location.href = `/${this.activeLocale}`;
  }
}
```

[⬆ back to top](#top)

## work with plurals- plural clause

### Mark plurals

- want display "updated x minutes ago" 
- `<span i18n>Updated {minutes, plural, =0 {just now} =1 {one minute ago} other {{{minutes}} minutes ago}}</span>`
  - The first parameter, **minutes**, is bound to the component property (minutes)
  - The second parameter identifies this as a plural translation type
  - The third parameter defines a pattern of pluralization categories and their matching values
    - For zero minutes, =0  -->  `{just now}`
    - For one minute, =1    --> `{one minute}`
    - For any unmatched cardinality   -->  `{{{minutes}} minutes ago}`

**Translate plurals and alternate expressions- messages.xlf**

```xml
<trans-unit id="5a134dee893586d02bffc9611056b9cadf9abfad" datatype="html">
  <source>{VAR_PLURAL, plural, =0 {just now} =1 {one minute ago} other {<x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes ago} }</source>
  <target>{VAR_PLURAL, plural, =0 {à l'instant} =1 {il y a une minute} other {il y a <x id="INTERPOLATION" equiv-text="{{minutes}}"/> minutes} }</target>
</trans-unit>
```

### Mark alternates- select clause

- `<span i18n>The author is {gender, select, male {male} female {female} other {other}}</span>`

**Translate plurals and alternate expressions- messages.xlf**

```xml
</trans-unit>
<trans-unit id="f99f34ac9bd4606345071bd813858dec29f3b7d1" datatype="html">
  <source>The author is <x id="ICU" equiv-text="{gender, select, male {...} female {...} other {...}}"/></source>
  <target>L'auteur est <x id="ICU" equiv-text="{gender, select, male {...} female {...} other {...}}"/></target>
</trans-unit>
```

- [The CLDR Language Plural Rules- plural forms for all languages](https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/language_plural_rules.html)

[⬆ back to top](#top)

> references
- [official- Localizing your app](https://docs.angular.lat/guide/i18n)
- [The Ultimate Guide to Angular Localization](https://phrase.com/blog/posts/angular-localization-i18n/)
