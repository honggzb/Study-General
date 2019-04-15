[Migration from AngularJS 1.x to Angular 2+ - Joe Eames](#top)

- [Preparation](#preparation)
  - [1. installing migration packages](#1-installing-migration-packages)
  - [2. preparing for a webpack build](#2-preparing-for-a-webpack-build)
  - [3. modify tsconfig.json](#3-modify-tsconfigjson)
  - [4. running the webpack build](#4-running-the-webpack-build)
  - [5. Bootstrapping Angular](#5-bootstrapping-angular)
  - [7. building angular application bundle](#7-building-angular-application-bundle)
  - [8. polyfill and vendor bundles](#8-polyfill-and-vendor-bundles)
- [Basic Angular Migration - top level](#basic-angular-migration---top-level)
  - [Migrating A Service](#migrating-a-service)
  - [Migrating A Sub-Component](#migrating-a-sub-component)
  - [Migrating A Pipe](#migrating-a-pipe)
- [Migrating Page-level Components](#migrating-page-level-components)
  - [Migrate a Page Component](#migrate-a-page-component)
  - [how to use AngularJS service(including build-in service) in Angular](#how-to-use-angularjs-serviceincluding-build-in-service-in-angular)
  - [Migrate Third-Party Service](#migrate-third-party-service)
  - [Upgrading Commonly Used Components](#upgrading-commonly-used-components)
- [Advanced Service Migration](#advanced-service-migration)
- [Transclusion & Content Projection Migration](#transclusion--content-projection-migration)
- [Testing While Migrating](#testing-while-migrating)
- [Taking Hybrid Angular Apps to Production](#taking-hybrid-angular-apps-to-production)
  - [Creating an AOT Build](#creating-an-aot-build)
  - [Adding AngularJS Code to the Build Refactoring - checking angularJS code production correctly](#adding-angularjs-code-to-the-build-refactoring---checking-angularjs-code-production-correctly)
- [Routing Migration](#routing-migration)
  - [1. migration relative angularJS component to angular component](#1-migration-relative-angularjs-component-to-angular-component)
  - [2. Add Angular Route + Angular Resolver](#2-add-angular-route--angular-resolver)
  - [3. add Angular Guard](#3-add-angular-guard)
  - [Html5mode - remove hash tag in url](#html5mode---remove-hash-tag-in-url)
- [Appex.](#appex)
  - [webpack loader](#webpack-loader)
  - [webpack plugin](#webpack-plugin)

## Preparation

### 1. installing migration packages

Adding following to package.json

```json
"dependencies": {
    "@angular/common": "4.3.0",
    "@angular/compiler": "4.3.0",
    "@angular/core": "4.3.0",
    "@angular/forms": "4.3.0",
    "@angular/http": "4.3.0",
    "@angular/platform-browser": "4.3.0",
    "@angular/platform-browser-dynamic": "4.3.0",
    "@angular/router": "4.3.0",
    "@angular/upgrade": "4.3.0",
    "core-js": "2.4.1",
    "rxjs": "5.0.1",
    "zone.js": "0.8.14"
},
devDependencies": {
    "@angular/compiler-cli": "4.3.0",
    "@ngtools/webpack": "1.5.5",
    "@types/node": "6.0.45",
    "angular2-template-loader": "0.6.2",
    "awesome-typescript-loader": "3.0.8",
    "html-loader": "0.4.5",
    "html-webpack-plugin": "2.28.0",
    "karma-mocha-reporter": "2.2.3",
    "karma-sourcemap-loader": "0.3.7",
    "karma-webpack": "2.0.4",
    "null-loader": "0.1.1",
    "raw-loader": "0.5.1",
    "typescript": "2.3.4",
    "webpack": "3.3.0",
    "webpack-bundle-analyzer": "2.8.3"
}
```

[back to top](#top)

### 2. preparing for a webpack build

- change all all templateUrl from full url to relative url
- change global variable to module import, mainly in routes.ts

```javascript
//from
app.config(function($routeProvider) {
//to
angular.module('app').config(function($routeProvider) {
```

[back to top](#top)

### 3. modify tsconfig.json

```json
    "module": "commonjs",
    "moduleResolution": "node",
```

`create '/public/index.ts' and move import from index.html to index.ts`

```javascript
import "./toastr/toastr";
import "./app";
import "./routes";
import "./admin/adminLogin";
import "./admin/results";
import "./admin/createUsers";
import "./admin/userList";
import "./admin/userDetails";
import "./admin/nameParser";
import "./nav/nav";
import "./security/logout";
import "./security/login";
import "./security/auth";
import "./security/currentIdentity";
import "./security/users";
import "./home/home";
import "./home/createNewSession";
import "./home/unreviewedTalk";
import "./sessions/sessions";
import "./sessions/unreviewedSessionCount";
import "./sessions/sessionDetail";
import "./sessions/sessionDetailWithVotes";
import "./components/detailPanel";
import "./components/talkDuration";
import "./components/zoomIn";
import "./profile/profile";
```

[back to top](#top)

### 4. running the webpack build

**creating config directory and files**

```
├── config
│   ├── helper.js
│   ├── index.html
│   └── webpack.dev.js
```

**create config/webpack.dev.js**

```javascript
const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer'.BundleAnalyzerPlugin;
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
module.exports = {
  entry: {
    'polyfills': './public/polyfills.ts',
    'vendor': './public/vendor.ts',
    'ng1': './public/index.ts',
    'app': './public/main.ts'
  },
  output: {
    path: helpers.root('dist/dev'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({  // webpack runtime
      name: 'common',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor', 'app'],
      minChunks: 2
    }),
    new webpack.SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new HtmlWebpackPlugin({
      template: 'config/index.html',
      chunks: ['app']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {}
    ),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // })
  ]
}
```

**modify some files for running webpack build**

- package.json
- server/expressConfig.js
- `npm run start`

```javascript
"scripts": {
    "server": "node ./server/server.js",
    "dev": "nodemon ./server/server.js -w ./server",
    "start": "npm run clean-dev && webpack --config config/webpack.dev.js --watch --profile --progress",
    "clean-dev": "rimraf dist/dev/*",
    "test": "karma start",
    "tsc": "tsc -p . -w"
  },
// server/expressConfig.js
app.use(express.static(rootPath + '/dist/dev'));
app.use('/vendor', express.static(rootPath + '/public/vendor'));
app.use('/styles.css', express.static(rootPath + '/public/styles.css'));
```

[back to top](#top)

### 5. Bootstrapping Angular

- To bootstrap a hybrid application, you must bootstrap each of the Angular and AngularJS parts of the application. You must bootstrap the Angular bits first and then ask the UpgradeModule to bootstrap the AngularJS bits next
- Pure AngularJS applications can be automatically bootstrapped by using an ng-app directive somewhere on the HTML page. But for hybrid applications, you manually bootstrap via the UpgradeModule

```javascript
//1) delete following code in public/app.ts
angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['app'])
});
//2) create new public/polyfills.ts
import 'core-js/es7/reflect';
import 'core-js/client/shim';
import 'zone.js/dist/zone';
//3) create new public/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from "./app/app.module";
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['app']);
  console.log('hybrid app bootstrapped');
})
```

**4) creating the Module and Application components**

change all files except main.ts

```javascript
├── public
│   ├── app
│   │   ├── app.component.ts
│   │   └── app.module.ts
// app.module.ts
import { NgModule } from "@angular/core";
import { UpgradeModule } from "@angular/upgrade/static";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UpgradeModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
//app.component.ts
import { Component } from "@angular/core";
@Component({
  selector: 'my-app',
  template: `<div class="ng-view"></div>`
})
export class AppComponent {}
//index.html
<my-app></my-app>
```

[back to top](#top)


### 7. building angular application bundle

```javascript
new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {}
    ),
```

[back to top](#top)

### 8. polyfill and vendor bundles

```javascript
entry: {
    'polyfills': './public/polyfills.ts',
    'vendor': './public/vendor.ts',
    'ng1': './public/index.ts',
    'app': './public/main.ts'
  },

new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor', 'app'],
      minChunks: 2
    }),

new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
```

**to make sure use correct loading queue**

```html
<!-- adding following to index.html -->
<script type="text/javascript" src="/common.bundle.js"></script>
<script type="text/javascript" src="/vendor.bundle.js"></script>
<script type="text/javascript" src="/polyfills.bundle.js"></script>
<script type="text/javascript" src="/ng1.bundle.js"></script>
<!-- edit webpack.dev.js -->
<script>
    new HtmlWebpackPlugin({
      template: 'config/index.html',
      chunks: ['app']
}),
</script>
```

[back to top](#top)

## Basic Angular Migration - top level

**Migration strategies**

- Just services
- Pick and choose components
- Page at a time
- Start with top level/page components

### Migrating A Service

- change service from angularJS to angular
- move this service to app directory
- add service to app.module.ts
- remove service from index.ts
- need downgrades service, then angularJS(component/service) can use this angular service

```javascript
// change service from angularJS to angular
// \public\app\admin\nameParser.service.ts
import { Injectable } from "@angular/core";
@Injectable()
export class NameParser {
  parse(blobInput) {
    var lines = blobInput.split(/\r?\n/);
    lines.forEach(function(line, idx) {
      var pieces = line.split('|');
      lines[idx] = {
        email: pieces[0],
        firstName: pieces[1],
        lastName: pieces[2]
      }
    })
    return lines;
  }
}
// downgrades this service NameParser
// \public\main.ts
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import {NameParser} from './app/admin/nameParser.service';
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  // downgrades
  angular.module('app').factory('nameParser', downgradeInjectable(NameParser));
  //...
})
```

[back to top](#top)

### Migrating A Sub-Component

- change component from angularJS to angular
  - component.ts
  - component.html
    - remove all `$ctrl`
    - change all `ng-show` to `*ngIf`
    - change all `ng-click` to `(click)`
    - change all `ng-model` to `[ngModel]`, and add **name** attribute
      - `<input type="text" id="lastName" placeholder="Last Name" class="form-control" [ngModel]="profile.lastName" name="lastName">`
    - add `#form="ngForm"` to form
    - Template migration principle
- move this component to app directory
- add component to app.module.ts, should add it into 2 places
  - `declarations: []`
  - `entryComponents: []`
- remove component from index.ts
- need downgrades component, then angularJS(component/service) can use this angular component in main.ts
  - `.directive('unreviewedTalk', downgradeComponent({ component: UnreviewedTalkComponent }));`

**Template migration principle**

|Binding definition|Template syntax
---|---|---
Attribute binding	|` myAttribute: '@myAttribute'`|`<my-component myAttribute="value">`
Expression binding|`myOutput: '&myOutput'`|`<my-component (myOutput)="action()">`
One-way binding	|`myValue: '<myValue'`|`<my-component [myValue]="anExpression">`
Two-way binding	|`myValue: '=myValue'`|As a two-way binding: `<my-component [(myValue)]="anExpression">`. <br>Since most AngularJS two-way bindings actually only need a one-way binding in practice, <br>`<my-component [myValue]="anExpression">`is often enough

```javascript
// change component from angularJS to angular
// \public\app\home\unreviewedTalk.component.ts - this component is only use in home, it is simple
import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'unreviewed-talk',
  templateUrl: './unreviewedTalk.component.html'
})
export class UnreviewedTalkComponent {
  @Input() session: any;
  @Output() voteYes = new EventEmitter();
  @Output() voteNo = new EventEmitter();

  yes() {
    this.voteYes.emit(null);
  }

  no() {
    this.voteNo.emit(null);
  }
}

// \public\app\home\unreviewedTalk.component.html

// downgrades this component
// \public\main.ts
import { UpgradeModule, downgradeInjectable } from '@angular/upgrade/static';
import {NameParser} from './app/admin/nameParser.service';
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  // downgrades
  angular.module('app')
         .factory('nameParser', downgradeInjectable(NameParser))
         .directive('unreviewedTalk', downgradeComponent({
           component: UnreviewedTalkComponent
         }));

})
```

[back to top](#top)

### Migrating A Pipe

- create a new angular pipe angular(\public\app\common\talkDuration.pipe.ts), and **keep the old angularJS filter**
  - **don't delete angularJS filter, it has more function than pipe**
- add pipe to app.module.ts

[back to top](#top)

## Migrating Page-level Components

### Migrate a Page Component

same as [Migrating A Sub-Component](#Migrating-A-Sub-Component)

[back to top](#top)

### how to use AngularJS service(including build-in service) in Angular

- Upgrade AngularJS Services + Upgrade Custom Service
- 1) add AngularJS Services into app.module.ts

```javascript
function getLocation(i: any) { return i.get('$location') }
function getCurrentIdentity(i: any) { return i.get('currentIdentity') }
//...
providers: [
    //...
    { provide: '$location', useFactory: getLocation, deps: ['$injector']},
    { provide: 'currentIdentity', useFactory: getCurrentIdentity, deps: ['$injector']}
  ],
```

- 2) inject this angularjs service to component

```javascript
constructor(
  @Inject('$location') private $location,
  @Inject('currentIdentity') private currentIdentity
) {}
//use
save(newProfile) {
    this.currentIdentity.updateUser(newProfile);
}
cancel() {
  this.$location.path('/home');
}
```

[back to top](#top)

### Migrate Third-Party Service

**Using Injection Token**

- create new service file: '\public\app\toastr\toastr.service.ts', this file did not create actual service, just define token and interface
- inject this token in 'app.module.ts'
- add a global variable in '\public\toastr\toastr.ts', this file is actually inject toastr service

```javascript
// \public\app\toastr\toastr.service.ts
export const TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');
export interface Toastr {
    success ( msg: string, title? : string) : void;
    info ( msg: string, title? : string) : void;
    warning ( msg: string, title? : string) : void;
    error ( msg: string, title? : string) : void;
}
// app.module.ts
function getToastr() { return toastr; }
//...
providers: [
    //...
    { provide: 'toastr', userFactory: getToastr }
  ],
// use token in component
constructor(
  @Inject(TOASTR_TOKEN) private toastr: Toastr
) {}
save(newProfile) {
   //...
    this.toastr.success('Profile Saved!');
  }
//\public\toastr\toastr.ts
declare var toastr;
```

[back to top](#top)

### Upgrading Commonly Used Components

- create a new component(\public\app\nav\nav.component.ts) for use selector 'app-nav' to instead of 'nav'
- inject this new component in app.module.ts
  - `declarations: [NavComponent]`
  - no need add to `entryComponents` because this component is only Angular component
- change 'nav' to 'app-nav' in relative component(\public\app\profile\profile.component.html)

```javascript
import { Directive, Injector, ElementRef } from "@angular/core";
import { UpgradeComponent } from "@angular/upgrade/static";
@Directive({
  selector: 'app-nav'
})
export class NavComponent extends UpgradeComponent {
    constructor(elementRef: ElementRef, injector: Injector){
        super('nav', elementRef, injector);
    }
}
```

[back to top](#top)

## Advanced Service Migration

- commonly used service:
  - change service to angular service
  - downgrade angular service to Angular Service in main.ts
- complicating factors which need to consider
  - services that use Http
  - stateful

**sample: upgrate '\public\sessions\sessions.ts'**

- create a new service '\public\app\sessions\sessions.service.ts'
  - note: all relative http method should return a Observable
  - note: add rxjsOpertions.ts to app directory
- add downgradeInject to main.ts
  - `.factory('sessions', downgradeInjectable(Sessions))`
- add new service to app.module.ts
- change injection components and service which use sessions service
  - unreviewedSessionCount.ts, routes.ts, createNewSession.ts, home.ts
  - replace all `response.data` with `response`
- delete old '\public\sessions\sessions.ts' file
- edit 'index.ts'

```javascript
//\public\app\sessions\sessions.service.ts
import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";
@Injectable()
export class Sessions {
    constructor(private http: Http){}
    getSessionsByUser(userId) {
        return this.http.get('/api/sessions/user/' + userId)
            .map((rsp: Response) => {return rsp.json()})
            .toPromise();
    }
    getAllSessions() {
        return this.http.get('/api/sessions')
            .map((rsp: Response) => {return rsp.json()})
            .toPromise();
    }
    createNewSession(newSession) {
        return this.http.post('/api/sessions', newSession)
                    .map((rsp: Response) => {return rsp.json()})
                    .toPromise();
    }
    getNextUnreviewedSession(userId) {
        return this.http.get(`/api/users/${userId}/randomUnreviewedSession`)
                    .map((rsp: Response) => {
                        let data = null;
                        if(rsp.text() !== ''){
                            data = rsp.json();
                        }
                        return data;
                    })
                    .toPromise();
    }
    addReviewedSession(userId, sessionId) {
        return this.http.post('/api/users/' + userId + '/reviewSession/' + sessionId, {}).toPromise();
    }
    incrementVote(sessionId) {
        return this.http.put('/api/sessions/' + sessionId + '/incrementVote/', {}).toPromise();
    }
    getUnreviewedCount(userId) {
        return this.http.get('/api/users/' + userId + '/unreviewedSessionCount')
                    .map((rsp: Response) => {return rsp.json()})
                    .toPromise();;
    }
}
```

[back to top](#top)

## Transclusion & Content Projection Migration

- change component from angularJS to angular
  - component.ts
  - component.html
    - same as [Migrating A Sub-Component](#Migrating-A-Sub-Component)
    - change `ng-hide="collapsed"` to `[hidden]="collapsed"`
    - delete `ng-transclude`
    - add `ng-transclude`

```javascript
// \public\app\common\detailPanel.component.ts
import { Component, Input, OnChanges } from "@angular/core";
@Component({
  selector: 'detail-panel',
  templateUrl: '/detailPanel.component.html'
})
export class DetailPanelComponent implements OnChanges {
  @Input() title: string;
  @Input('collapsed') initialCollapsed;
  collapsed: boolean;
  ngOnChanges() {
    this.collapsed = (this.initialCollapsed === 'true');
  }
  collapse() {
    this.collapsed = !this.collapsed;
  }
}
// \public\app\common\detailPanel.component.html
<div class="panel-body" [hidden]="collapsed">
    <ng-content></ng-content>
</div>
```

- move this component to app directory
- add component to app.module.ts, should add it into 2 places
  - `declarations: []`
  - `entryComponents: []`
- remove component from index.ts
- need downgrades component, then angularJS(component/service) can use this angular component in main.ts
  - `.directive('detailPanel', downgradeComponent({component: DetailPanelComponent}))`
- change the template in '\public\sessions\sessionDetail.html' to property binding
  - from `<detail-panel collapsed="{{$ctrl.initialCollapsed}}" title="{{$ctrl.session.title}}">`
  - to `<detail-panel [collapsed]="$ctrl.initialCollapsed" [title]="$ctrl.session.title">`
  - this step is optional, you can keep the old one

[back to top](#top)

## Testing While Migrating

- set up a multiple Karma file
  - '\config\angular-karma.config.js'
  - '\config\angularjs-karma.config.js'
- modify package.json
  - `"test": "karma start config/angularjs-karma.config.js"`
  - `"test2": "karma start config/angular-karma.config.js"`
- move test file to relative directory and change them to angular test file
  - '\public\app\admin\nameParser.service.spec.ts'
  - '\public\app\admin\nameParser.service.spec.ts'

[back to top](#top)

## Taking Hybrid Angular Apps to Production

### Creating an AOT Build

- create 'config/weppack.prod.js'
  - remove ng1 entry
  - change vendor entry to 'vendor-aot.ts'
  - add AotPlugin, UglifyJsPlugin
  - remove SourceMapDevToolPlugin
- create 'tsconfig.aot.json'
- create 'main-aot.ts', adding
  - `import { AppModuleNgFactory } from './app/app.module.ngfactory';`
- modify package.json
  - `"clean-aot": "rimraf dist/aot/*",`
  - `"build": "npm run clean-aot && webpack --config config/webpack.prod.js --profile --progress --bail"`
  - `"ngc": "ngc -p tsconfig.aot.json"`, this is calling `@angular/compiler-cli` to debug aot compiling

### Adding AngularJS Code to the Build Refactoring - checking angularJS code production correctly

- create 'config/webpack.ng1.prod.js'
- modify package.json, change "bulid" to
  - `"build": "npm run clean-aot && webpack --config config/webpack.ng1.prod.js --profile --progress --bail && webpack --config config/webpack.prod.js --profile --progress --bail"`
- modify tsconfig.json, add exclude `public/main-aot.ts`
  - for 'Cannot find module './app/app.module.ngfactory'' bug
  - if it still cannot be resolved, run `npm run ngc`
- edit 'server/expressConfig.js'
  - `app.use(express.static(rootPath + '/dist/aot'))`

[back to top](#top)

## Routing Migration

**recommend the last step is to migrate routing**

### 1. migration relative angularJS component to angular component

- '\public\app\sessions\sessionDetailWithVotes.component'
- '\public\app\admin\results.component'
- convert relative routing to angular properties binding in routes.ts

```javascript
.when('/admin/results', {
  // using [] in template
      template: '<results [all-sessions]="$resolve.allSessions"></results>',
      resolve: {
        admin: routeResolvers.requireAdmin,
        allSessions: routeResolvers.allSessions
      }
    })
```

[back to top](#top)

### 2. Add Angular Route + Angular Resolver

- add `<router-outlet></router-outlet>` in root template - app.component.ts
- comment relative route in routes.ts
- create resolver- '\public\app\sessions\allSessions.resolver.ts'
- modify app.module.ts, adding routeModule

```javascript
//app.module.ts
import { RouterModule, UrlHandlingStrategy, UrlTree } from "@angular/router";
// handle angularJS and Angular router communication
class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    return url.toString().startsWith("/admin/results");
  }
  extract(url:UrlTree):UrlTree { return url; }
  merge(newUrlPart:UrlTree, rawUrl: UrlTree):UrlTree { return newUrlPart }
}
//...
  imports: [
    //...
    RouterModule.forRoot([
      {
        path: 'admin/results',
        component: ResultsComponent,
        resolve: { sessions: AllSessionsResolver }
      },
    ], { useHash: true })
  ],
  providers: [
    //...
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy },
    // for error- No provider for $scope
    { provide: '$scope', useExisting: '$rootScope'},
    AllSessionsResolver
  ]
//remove toPromise() in \public\app\sessions\sessions.service.ts
getAllSessions() {
        return this.http.get('/api/sessions')
            .map((rsp: Response) => {return rsp.json()})
             // angular 2 already return as Observable, no need t o turn it to promise
            //.toPromise();
    }
// add resolve data in relative component- \public\app\admin\results.component.ts
export class ResultsComponent implements OnInit {
  // 1) add constuctor
  constructor(private route: ActivatedRoute){}

  @Input() sessionsByVoteDesc: any;
  ngOnInit() {
    // 2) catch data from router
    this.route.data.forEach( data => {
      this.sessionsByVoteDesc = data.sessions;
    })
    this.sessionsByVoteDesc.sort(function(session1, session2) {
      // reverse order
      return session2.voteCount - session1.voteCount;
    })
  }
}
```

[back to top](#top)

### 3. add Angular Guard

- create guard file - '\public\app\security\admin.guard.ts'
- add it to app.module.ts
-  modify relative service file - '\public\security\auth.ts'

```javascript
//  \public\app\security\admin.guard.ts
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from "@angular/core";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(@Inject('auth') private auth) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>  {
        return this.auth.requireAdmin2();
    }
}
// app.module.ts
imports: [
    //...
    RouterModule.forRoot([
      {
        path: 'admin/results',
        component: ResultsComponent,
        resolve: { sessions: AllSessionsResolver },
        canActivate: [ AdminGuard]
      },
    ], { useHash: true })
  ],
  providers: [
    //...
    { provide: 'auth', useFactory: getAuth, deps: ['$injector'] },
  ]
//\public\security\auth.ts
// for angular 2 routing
  requireAdmin2() {
    return this.waitForAuth().then(() => {
      return this.currentIdentity.authenticated() && this.currentIdentity.currentUser.isAdmin;
    })
  }
```

[back to top](#top)

### Html5mode - remove hash tag in url

- add `<base href="/">` to index.html
- modify `app.module.ts', change to `{ useHash: false }`
- modify 'app.ts', change to `$locationProvider.html5Mode(true);`
- modify 'main.ts' and 'main-aot.ts'
  - add `setUpLocationSync(upgrade);` after `upgrade.bootstrap`
- remove `#` in all related template file - nav.html/home.html/userList.html...

Inter-framework Linking
Removing AngularJS

## Appex.

### webpack loader

- [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader): Loads TypeScript 2.0+ like JavaScript
- [angular2-template-loader](https://github.com/TheLarkInn/angular2-template-loader): Loads and compiles Angular Components
- [sass-loader](https://webpack.js.org/loaders/sass-loader)
  - `npm install style-loader css-loader --save-dev`
  - `npm install sass-loader node-sass webpack --save-dev`

```json
rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
```

[back to top](#top)

### webpack plugin

- SourceMapDevToolPlugin
- HtmlWebpackPlugin
- ContextReplacementPlugin
- [Angular Ahead-of-Time Webpack Plugin]()
  - angular 4- use `const AotPlugin = require('@ngtools/webpack').AotPlugin;`
  - angular 5+ refer to [Webpack 4.0 plugin that AoT compiles your Angular components and modules](https://www.npmjs.com/package/@ngtools/webpack
)

[back to top](#top)

> reference
- [offical upgrade tutorial](https://angular.io/guide/upgrade)
- [CodeCraft angualrJS Migration](https://codecraft.tv/courses/angularjs-migration/)
- [offical Angular update guide-v2-to-v9](https://update.angular.io/)
- angular ui router migration
  - [Migrating AngularJS UI Router to Angular Router](https://gist.github.com/zaenk/21e8bee3071f339aed27f411822bb8d9)
  - [UI-Router angular-hybrid](https://github.com/ui-router/angular-hybrid)


to install & Run:

npm install
npm install nodemon -g
cd server
nodemon server.js
