[Angular CLI- in pluralsight by John Papa](#top)

- [ng new](#ng-new)
- [not standalone](#not-standalone)
- [Install Tailwind CSS with Angular](#install-tailwind-css-with-angular)
- [Install Angular Material](#install-angular-material)
- [Angular CLI configuration](#angular-cli-configuration)
- [Linting -checking and fixing code](#linting--checking-and-fixing-code)
- [Generating code from blueprints](#generating-code-from-blueprints)
- [Generating Routing Features](#generating-routing-features)
  - [generate a sub-module with routing](#generate-a-sub-module-with-routing)
  - [generating a guard](#generating-a-guard)
- [Building and Serving](#building-and-serving)
  - [development build](#development-build)
  - [Production build](#production-build)
  - [Serving](#serving)
- [Adding new Capabilities - new feature in version 6+](#adding-new-capabilities---new-feature-in-version-6)
  - [adding angular material](#adding-angular-material)
  - [adding scripts, styles and assets](#adding-scripts-styles-and-assets)
  - [Using 3th-library](#using-3th-library)
  - [Change css to SCSS for existing projects](#change-css-to-scss-for-existing-projects)
- [Tests with Angular CLI](#tests-with-angular-cli)
  - [Unit Tests](#unit-tests)
  - [End to End test- testing user interaction](#end-to-end-test--testing-user-interaction)
- [Tooling Features](#tooling-features)
  - [Updating Angular](#updating-angular)
  - [Workspace with multiple project](#workspace-with-multiple-project)
  - [Generating angular library](#generating-angular-library)
  - [Sample: Generating a Logger library and adding to angular](#sample-generating-a-logger-library-and-adding-to-angular)
  - [Angular Console](#angular-console)
- [other command](#other-command)
- [issues](#issues)
  - [Unable to execute Angular CLI commands in Visual Studio Code terminal](#unable-to-execute-angular-cli-commands-in-visual-studio-code-terminal)

```shell
node -v  # 8.x or higher
npm -v   # 5.x or higher
npm install -g @angular/cli
ng --version
ng new my-first-project
ng new ngtest --skip-install # generate but skip npm install
ng new ngtest --prefix=qh
cd my-first-project
ng serve --open
ng serve -o  # ng serve –open后，ng会找到.angular-cli.json文件中的main所指的main.ts文件，而main.ts文件加载了根模块
ng build my-app -c production
```

## ng new

- **Sample**: `ng new myApp -dstS --routing --style scss --prefix qh`
- some flags change the configuration in angular.json

```
           OPTION                |     short           | 
---------------------------------|---------------------|------------------------------------------------------------------------
ng new --help                    |                     |
ng new myApp --defaults          |                     |When true, disables interactive input prompts for options with a default
ng new myApp --dryRun	         |ng new myApp -d      |Don't write the files, but report them, good for checking before generate
ng new ngtest --skip-install     |                     |generate without runnign npm install
ng new ngtest --inline-template  |ng new ngtest -t     |includes template inline in the component TS file
ng new ngtest --routing          |                     |generate routing module, app-routing.module.ts, 表示新增带有路由信息的模块，并添加到根模块中
ng new ngtest --style scss       |                     |默认为 'css', 用于设置选用的样式语法 ('css', 'less' or 'scss')
ng new ngtest --prefix qh        |ng new ngtest -p qh  |默认为 'app', 用于设置创建新组件时，组件选择器使用的前缀
ng new ngtest --skip-tests       |ng new ngtest -S     |
ng new ngtest --skip-git         |ng new ngtest -g     | don't add the project to git
```

## not standalone

- `ng new myapp --standalone false`
- `ng generate component --standalone false`
- Angular.json

```
 "projects": {
    "my-angular17-project": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": false
        }
      },
    }
}
```

[back to top](#top)

## Install Tailwind CSS with Angular

### Tailwind 3.xxx

1. `npm install -D tailwindcss postcss autoprefixer`
2. `npx tailwindcss init`
3. add following to 'tailwind.config.js'
   1. `content: ["./src/**/*.{html,ts}"],`
4. Add the Tailwind directives to 'src\styles.css'
   - `@tailwind base;`
   - `@tailwind components;`
   - `@tailwind utilities;`
- https://tailwindcss.com/docs/guides/angular
- 
### Tailwind 4.xxx

1. `npm install tailwindcss @tailwindcss/postcss postcss --force`
2. Create a '.postcssrc.json' file in the root and add the @tailwindcss/postcss plugin
   - `{ "plugins": { "@tailwindcss/postcss": {} } }`
4. Import Tailwind CSS: add an @import to './src/styles.css'
   - `@import "tailwindcss";`

## Install Angular Material

1. `ng add @angular/material` 
2. Add the following to 'index.html'
   - `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
3. Or 
   1. `npm install material-design-icons`
   2. add the styles to 'angular.json'
      - `"styles": [ "node_modules/material-design-icons/iconfont/material-icons.css"]` 

[back to top](#top)

## Angular CLI configuration

- ng new some-flag
- manually edit angular.json
- `ng config`, `ng config --global  # -g`
  - `ng config schematics:@schematics/angular:component.style scss`

[back to top](#top)

## Linting -checking and fixing code

```shell
ng lint my-app --help
ng lint my-app --format stylish  # lint and format the output
ng lint my-app --fix             # lint and attempt to fix all problems
```

[back to top](#top)

## Generating code from blueprints

`ng generate <blueprint> <options>`

options|Alias| Description
---|---|---
--flat||should a folder be created
--inline-template|-t|will the template be in the .ts file
--inline-style|-s|will style in the .ts file
--spec||generate a spec?
--view-encapsulation|-v|view encapsulation strategy
--change-detection|-c|change detection strategy
--dry-run|-d|不会创建任何文件, 用于测试创建文件是否正确
--link-cli||默认为 false, 自动链接到 @angular/cli包
--skip-install||默认为 false, 表示跳过 npm install
--skip-git||默认为 false, 表示该目录不初始化为 git 仓库
--skip-tests||默认为 false, 表示不创建 tests 相关文件
--skip-commit||默认为 false, 表示不进行初始提交

**Sample**:

- `ng g c pet -st --flat --prefix my`
- `ng g c orders -v Emulated -c Onpush -d`
- `ng g d search --flat false` - create directive in seperate folder
- `ng g cl models/customer`   - create class in folder models
- `ng g e models/person`      - create enum in folder models
- `ng g i myInterface`        - create interface
- `ng g p models/person -m app.module`   -create pipe and add to app.module.ts
- `ng g m login --spec false -m app.module`   -create module and add to app.module.ts
- `ng g s products/product-parameter -m products/product.module`   -**create service and automatically register to product.module**
- `ng g c lib/au-md-input --module=lib/au-input`

[back to top](#top)

## Generating Routing Features

### generate a sub-module with routing

```javascript
ng g m admin --routing -m app.module
//create sub-module(admin.module.ts) with routing(admin-routing.module.ts) and add it to app.module.ts
ng g c admin      //create new component adminComponent
ng g c admin/email-blast   //create new child component-emailBlastComponent
ng g c admin/users         //create new child component-usersComponent
// write children routing
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: UsersComponent },
      { path: 'blast', component: EmailBlastComponent }
    ]
  }
];
```

### generating a guard

- `ng g guard auth` - create auth.guard.ts
- Routes with CanActivate/CanActivateChild Guards
- [Protecting Angular v2+ Routes with CanActivate/CanActivateChild Guards](https://scotch.io/tutorials/protecting-angular-v2-routes-with-canactivatecanactivatechild-guards)

[back to top](#top)

## Building and Serving

- compile to an output directory
- build targets determine the output
- all builds use bundling
- Prod builds add uglification and tree-shaking
- `ng build --help`

**ng build Options**

|Options| Alias | Description|
|---|---|---|
|--source-map||Generate a source map|
|--aot| |Ahead of Time compilation|
|--watch|-w|Watch and rebuild|
|--prod|-e|Shortcut for prod env and target|

### development build

**dist里面文件**

```
  File          |  Description
----------------|----------------------------------------------
runtime.js      | Webpack runtime
main.js         | App code
polyfills.js    | Platform polyfills(浏览器的Pollyfills)
styles.js       | Styles
vendor.js       | Angular and other vendor files(第三方库)
```

**Exploring the source in the output**- 分析依赖, 并且查看哪些模块和类在bundle里面

```shell
# tool 1
npm install webpack-bundle-analyzer --save-dev
ng build -stats-json
npx webpack-bundle=analyzer dist/my-app/stats.json
# put it to package.json
"stats": "npx webpack-bundle=analyzer dist/stats.json"
npm run stats
# tool 2
npm install source-map-explorer --save-dev
ng build
npx source-map-explorer disg/my-app/main.js
```

### Production build

`ng build --target production --build-optimizer --vendor-chunk`

|   | ng build  | ng build --prod |
|---|---|---|
|`--environment` |use environment.ts|use environment.prod.ts |
|Cache-busting|only images referenced in css只缓存css里引用的图片|all build files|
|`--sourcemaps false/true`|generated|not generated|
|`--extract-css true`|global CSS output to .js|yes, to css files|
|Uglification|no|yes|
|Tree-shaking|no不去掉无用代码|yes去掉无用代码|
|`--aot`|no|yes|
|Bundling|yes|yes|
|--named-chunks|是|否|
|--output-hashing|media|所有|
|`--build-optimizer`|否|是(和AOT以及Angular5)|
|`--vendor-chunk`||extract all vendor code into separate chunk|

- When using **Build Optimizer** the **vendor chunk** will be disabled by default. You can override this with `--vendor-chunk=true`

### Serving

- `ng serve --help`
- `ng serve -o`  ng会找到.angular-cli.json文件中的main所指的main.ts文件，而main.ts文件加载了根模块
- `ng serve --proxy-config proxy.config.json`

|Options| Alias | Description|
|---|---|---|
|--open|-o|Opens i the default browser|
|--port| |Port to listen to when serving|
|--live-reload||reload when changes occur|
|--ssl||Serve using HTTPS|
|--proxy-config||Proxy configuration file|
|--prod||test production files|

[back to top](#top)

## Adding new Capabilities - new feature in version 6+

### adding angular material

```shell
ng add @angular/material   # add angular material lib
ng g @angular/material:material-nav --name nav  #create navComponent which is angular material-nav
ng g @angular/material:material-dashboard --name dashboard
ng g @angular/material:material-table --name customer-list
```

### adding scripts, styles and assets

**edit angular.json**

```json
    "assets": [
        "src/assets"
    ],
    "styles": [
        "src/styles.css"
    ]
    "scripts": [

    ]
```

### Using 3th-library

**use ng add, such as angular material which has support schematics**

```shell
ng add @angular/material   # add angular material lib
ng g @angular/material:material-nav --name nav  #create navComponent which is angular material-nav
ng g @angular/material:material-dashboard --name dashboard
ng g @angular/material:material-table --name customer-list
```

**some library which did not support schematic, such as bootstrap, toastr**

```shell
# 1) install
npm install bootstrap font-awesome toastr jquery --save
# 2) configuration
# 2.1) method1 to use css, edit styles.scss file
@import "~bootstrap/dist/css/bootstrap.css";
@import "~font-awesome/css/font-awesome.css";
# 2.2) edit angular.json
"styles": [
              "node_modules/toastr/build/toastr.min.css",
              "src/styles.scss"
          ],
"scripts": [
              "node_modules/jquery/dist/jquery.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.js",
              "node_modules/toastr/build/toastr.min.js"
           ],
```

### Change css to SCSS for existing projects

1. `ng config defaults.styleExt=scss`   - for angular 2
  - if get an error 'Value cannot be found.'
  - `ng config schematics.@schematics/angular:component.styleext scss`  -for angular 6+
  - change angular.json
  
```javascript
"schematics": {
        "@schematics/angular:component": {
          "styleext": "scss"
        }
},
```

2. Rename your existing .css files to .scss
3. Point the CLI to find styles.scss in angular.json
4. Change the styleUrls in your components to match your new file names
5. If you want to set the default for all projects you create in the future run the following command:
   - `ng config --global defaults.styleExt=scss`
6. [Official documentation for Angular 6-CSS Preprocessor integration](https://github.com/angular/angular-cli/wiki/stories-css-preprocessors)

[back to top](#top)

## Tests with Angular CLI

### Unit Tests

`ng test [options] --help`

|Options| Description|
|---|---|
|--code-coverage|default false|
|--progress|Log progress to console, default true |
|--sourcemaps|default true|
|--watch|default true|

### End to End test- testing user interaction

- configuration file: `\e2e\protractor.conf.js`
- command: `ng e2e`

[back to top](#top)

## Tooling Features

### Updating Angular

`ng update [options] --help`

|Options| Description|
|---|---|
|--dryRun, -d||
|--all|whether to update all packages in package.json|
|--force|force updates, or error if installed packages are imcompatible|

- https://update.angular.io/
- adopt current verions of angular
- update 3rd party libraries with schematics
- transform project

### Workspace with multiple project

- `angular.json` schema support multiple projects in one workspace
- ng build <project>, ng serve <project>, ng test <project>, ng e2e <project>

```shell
ng build        #build all projects in the workspace
ng build myApp  #build the myApp project
```

**Generate multiple project in one workspace**

- `ng g <schematic> --help`
- `ng g application project2`  create a project2 inside current project
  - will create new folder - project2
  - change of `angular.json`

```json
"projects": {
    "project1": {
      ...
      },
    "project1-e2e": {
      ...
      },
    "project2": {
      ...
      },
    "project2-e2e": {
      ...
      },
},
"defaultProject":"project1"
```

### Generating angular library

- `ng g library <name> <options>`
- CLI updates tsconfig to look for your library reference
- Must build your library for your app to see it

|Options| Description|
|---|---|
|--dryRun, -d||
|--entry-file|Path to create library's public API file|
|--skip-package-json|Do not add dependencies to package.json|
|--skip-ts-config|Do not update tsconfig.json for dev experience|

- **Way that Angular CLI find libraries**
  - path in tsconfig.json --> path in the node_module folder
- build your library before you use
  - `ng build my-lib`
- Import it
  - `import {logger} from 'my-lib';`
- [Publishing your library](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
  - `ng build my-lib --prod`, `ng build my-lib`
    - [Beginning with version 6.1, Angular always does a production build of our library](https://stackoverflow.com/questions/52319576/configuration-production-could-not-be-found-in-project-my-lib)
    - [The Angular Library Series - Creating a Library with Angular CLI](https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5)
  - `cd dist/my-lib`
  - `npm publish`

### Sample: Generating a Logger library and adding to angular

```shell
ng g library my-lib                   #create a new library
ng g s logger --project my-lib        #create a new service inside my-lib library
ng build my-lib
#edit \projects\my-lib\src\public_api.ts, add "export * from './lib/logger.service';"
ng build my-lib   #rebuild- need rebuild for any change
#edit app.component.ts, add "import { LoggerService } from 'my-lib';"
```

- [The Angular Library Series — Publishing](https://blog.angularindepth.com/the-angular-library-series-publishing-ce24bb673275)

### Angular Console

- https://angularconsole.com/

## other command

```shell
#see angular cli version
npm ls -g @angular/cli
# Updating our Project to the latest version, package.json will up to date
ng update @angular/cli @angular/core
npm update
ng serve
#If ng serve is still throwing errors, try to update the CLI again by running the following commands:
npm update
ng serve
````

[back to top](#top)

## issues

### Unable to execute Angular CLI commands in Visual Studio Code terminal

- open power shell as administrator
- `set-executionpolicy remotesigned` or `set-executionpolicy remotesigned -Scope CurrentUse`

[back to top](#top)

> Reference
- [John Papa](https://johnpapa.net/)
- https://angular.io/cli
- https://github.com/angular/angular-cli
- http://angular2-first-look.azurewebsites.net/
