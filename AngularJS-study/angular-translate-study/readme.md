[angular-translate学习](#top)

- [Conceptual Overview](#conceptual-overview)
- [基本配置](#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE)
- [多语言支持](#%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81)
- [变量替换-variable replacement](#%E5%8F%98%E9%87%8F%E6%9B%BF%E6%8D%A2-variable-replacement)
- [动态加载语言](#%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD%E8%AF%AD%E8%A8%80)
- [sample configuration in Grunt project](#sample-configuration-in-grunt-project)
- [完整案例](#%E5%AE%8C%E6%95%B4%E6%A1%88%E4%BE%8B)
- [Lazy-loading Translation Tables](#lazy-loading-translation-tables)
- [Generating Translation Tables with Automatic Translation](#generating-translation-tables-with-automatic-translation)
  - [my Project setup in grunt](#my-project-setup-in-grunt)
  - [with gulp](#with-gulp)

## Conceptual Overview

![](https://i.imgur.com/w6R7e5T.png)

- angular-translate provides a directive and a filter as components 
- $translate service
    - default Interpolators: interpolation services are decoupled from the main core, which means, you can install them as extra packages. There's a default interpolation service which ships with angular-translate built-in
    - MessageFormat interpolation service uses a different syntax
- Missing translation handlers
- Asynchronous loader
    - urlLoader and staticFilesLoader
- Storage

[back to top](#top)

## 基本配置

```html
<!--  1) -->
bower install angular-translate
<!--  2) -->
<script src="path/to/angular-translate.js"></script>
<!--  3) -->
<script>
var app = angular.module('myApp', ['pascalprecht.translate']);
angular.module('angularTranslateApp', ['pascalprecht.translate'])
       .config(function($translateProvider) {
           //让$translateProvider找到一个翻译表格translation table - 即一个JSON对象
       });
</script>
<!--  4) -->
<h1>{{ 'TITLE' | translate }}</h1>
```

[back to top](#top)

## 多语言支持

```javascript
// configuration multi-language
app.config(function($translateProvider) {
    $translateProvider
      .translations('en', {
        HEADLINE: 'Hello there, This is my awesome app!',
        INTRO_TEXT: 'And it has i18n support!' })
      .translations('de', {
        HEADLINE: 'Hey, das ist meine großartige App!',
        INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!' });
    $translateProvider.preferredLanguage('en');    // set default language
});
//运行时切换语言
<div ng-controller="TranslateController">
    <button ng-click="changeLanguage('de')" translate="BUTTON_TEXT_DE"></button>
    <button ng-click="changeLanguage('en')" translate="BUTTON_TEXT_EN"></button>
</div>
app.controller('TranslateController', function($translate, $scope) {
    $scope.changeLanguage = function(langKey) {
        $translate.use(langKey);
    }
});
```

[back to top](#top)

## 变量替换-variable replacement

- json file:  `{ "TRANSLATION_ID": "{{username}} is logged in." }`
- service:  `$translate('TRANSLATION_ID', { username: 'PascalPrecht' });`,
  - if more than one variable: `$translate('TRANSLATION_ID', { username: 'PascalPrecht', lastLogin: '2013-07-21 6:50PM'});`
- HTML 
  - translate filter:    `{{ 'TRANSLATION_ID' | translate:'{ username: "PascalPrecht" }' }}`
  - translate directive: `<p translate="TRANSLATION_ID" translate-values="{username: 'PascalPrecht'}"></p>`
  - angular-translate > 2: can use `translate-value-name` properity
    - `<p translate="TRANSLATION_ID" translate-value-name="PascalPrecht"></p>`

## 动态加载语言

- using angular-translate-loader-url
- using node+grunt/gulp/webpack

**Pluralization and Gender**

- `bower install angular-translate-interpolation-messageformat`
- https://angular-translate.github.io/docs/#/guide/14_pluralization

```html 
<script>
/src/app/core/core.config.js
app.config(function ($translateProvider) {
 $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
});
// /src/app/main/social/i18n/en.json
{
 "SHARED": "{GENDER, select, male{He} female{She} other{They}} shared this."
}
</script> 
<!-- /src/app/main/social/social.html -->
<div translate="SHARED"
    translate-values="{ GENDER: 'male' }"
    translate-interpolation="messageformat"></div>
<div>
 {{ 'SHARED' | translate:"{ GENDER: 'male' }":'messageformat' }}
</div>
```

[back to top](#top)

## sample configuration in Grunt project

```javascript
// only can use one language
  grunt.registerTask('injectTranslations', 'A task to inject the contents of locale files directly into translation to avoid filerev issues.', function injectTranslations() {
    var fs = require('fs'); // required to do file system actions
    var mkdirp = require('mkdirp'); // required to do file system actions
    var localesFolderPath = grunt.template.process('<%= yeoman.app %>') + '/assets/json/locales/'; // specify where the locales folders are
    var translationsStrings = []; // an array to contain all of the $translationProvider.translations(...) strings
    // look at all of the items within the locales folder
    //  NOTE: should only be directories (e.g. en_CA)
    fs.readdirSync(localesFolderPath).forEach(function (localeFolderName) {
      var translationObjectText = ''; // the text representation of the object for the translations
      var localeFolderPath = localesFolderPath + localeFolderName;
      // read through each locale file and add its content to translationObjectText
      fs.readdirSync(localeFolderPath).forEach(function (localeFileName) {
        // get the content from the file
        var fileContent = fs.readFileSync(localeFolderPath + '/' + localeFileName, 'utf8');
        // omit the opening and closing braces to keep everything in the same object
        var trimmedContent = fileContent.slice(fileContent.indexOf('{') + 1, fileContent.lastIndexOf('}'));
        // if nothing has been added to localeJSON yet, don't add in the comma separator
        translationObjectText = !translationObjectText ? trimmedContent : translationObjectText + ', ' + trimmedContent;
      });
      // wrap the object in braces to close it up
      translationObjectText = `{\n${translationObjectText}\n}\n`;
      // build the $translate text
      var translateText = '$translateProvider.translations(\'' + localeFolderName + '\', ' + translationObjectText + ')';
      translationsStrings.push(translateText);
    });
    // create the config content with each of the translations
    var configContent = `(function () {
      'use strict';
      angular.module('cgiW360App').config(function ($translateProvider) {
        ${translationsStrings.join('\n')}
        $translateProvider.preferredLanguage('en_CA');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
      });
    })();`;
    // create the config file
    var outputPath = grunt.template.process('<%= yeoman.tmp %>') + '/core/scripts/config';
    mkdirp(outputPath, function (err) {
      fs.writeFileSync(outputPath + '/translation.config.js', configContent, 'utf8');
    });
  });
```

[back to top](#top)

## 完整案例

1. 在项目目录下添加/i18n/文件夹，文件夹中添加对应语言的json文件, 如en.json、ch.json
   
```json
{
  "NAMESPACE": {
    "SUB_NAMESPACE": {
       "TRANSLATION_ID1": "This is a namespaced translation."
    }
  }
}
```

2. 在index.module中添加服务配置

```javascript
//1) Declaring dependencies
export default angular.module('myApp', ['pascalprecht.translate'])
//2) Introducing $translateProvider
    .config(function ($translateProvider) {
        let lang;
        //获取缓存语言，如果没有设置为English
        if (window.localStorage.lang === undefined || window.localStorage.lang === 'undefined') {
            lang = 'en'
        } else {
            lang = window.localStorage.lang;
        }
        $translateProvider.preferredLanguage(lang);  //告诉angular.js哪种语言是默认已注册的语言
        //读取本地json文件，prefix代表文件的路径前缀，suffix代表文件后缀
        //如果用户上次访问了中文站, window.localStorage.lang=ch，加载 /i18n/ch.json 文件
        //如果用户第一次访问, window.localStorage.lang=undefined ,默认加载 /i18n/en.json 文件
        $translateProvider.useStaticFilesLoader({
            prefix: 'src/app/i18n/',
            suffix: '.json'
        });
    });！
```

3. 页面添加下拉框可以进行语言选择

```html
<md-select aria-label="Selector for language" class="md-no-underline language-switching md-icon-earth" ng-model="$ctrl.cur_lang" md-on-close="$ctrl.switching($ctrl.cur_lang)">
    <md-option ng-value="::$ctrl.en">English</md-option>
    <md-option ng-value="::$ctrl.ch">简体中文</md-option>
 </md-select>
```
 
4. 构造器中添加：

```javascript
//构造器中添加：
this.en = "en";
this.ch = "ch";
this.cur_lang = this._translate.use();
// 方法：
  switching(lang) {
        this._translate.use(lang);//使用当前选中的语言
        this._window.localStorage.lang = lang;//将当前选中语言存入缓存中
        this._window.location.reload();//界面刷新

        this.cur_lang = this._translate.use();//界面显示当前选中语言
    }
//添加过滤器
.filter('I18N', ['$translate', function ($translate) {
    return function (key) {
      if (key) {
        return $translate.instant(key);
      }
    }
  }])
// 添加服务
.factory('I18N', ['$translate', function($translate) {
    var T = {
        T:function(key) {
            if(key){
                return $translate.instant(key);
            }
            return key;
        }
    }
    return T;
}]);
//controller中添加：
.controller('ctrl', ['$scope','I18N',
    function($scope,I18N) {    
        $scope.name=I18N.T("name");
    }
]);
```

4. 使用translate的两种常见方式
    1. 页面部分直接使用过滤器即可: `{{“Create”| I18N}}`
        - Create a pipe that we can use to translate our words in the HTML view. Like this: `<p>{{ 'hello world' | translate }}</p>`
    2. JS部分，直接注入$translate服务直接进行国际化转换: `this._translate = $translate;  this._translate.instant(key);`
        - Create a service that we can use to translate our words in JS/Typescript file. Like this:
        - `this.translatedText = this.translate.instant('hello world'); // this.translate is our translate service`
        - 第二种方式方便直接在ts文件中使用！不过翻译的东西依然是在$translateProvider.translations里

[back to top](#top)

## Lazy-loading Translation Tables

- partialLoader 
- $translatePartialLoader in controller
- using caching: 

```javascript
// /src/app/core/core.config.js
app.config(function ($translateProvider) {
 //...
 $translateProvider.useLoader('$translatePartialLoader', {
   urlTemplate: '/src/app/{part}/i18n/{lang}.json'
 });
 $translateProvider.useLoaderCache(true);      //using caching, default is false
});
// /src/app/main/main.controller.js
app.controller('MainCtrl', function ($translatePartialLoader) {
 $translatePartialLoader.addPart('main');
});
// /src/app/toolbar/toolbar.config.js
app.controller('ToolbarCtrl', function ($translatePartialLoader) {
 $translatePartialLoader.addPart('toolbar');
});
```

[back to top](#top)

## Generating Translation Tables with Automatic Translation

### my Project setup in grunt

using angular-translate in your project, you may find some of the following packages super useful:

- angular-sanitize: can be used to guard against XSS attacks in translations
- angular-translate-interpolation-messageformat: pluralization with support for gender-sensitive text formatting
- angular-translate-loader-partial: used to deliver translated strings to clients

```javascript
grunt.registerTask('injectTranslations', 'A task to inject the contents of locale files directly into translation to avoid filerev issues.', function injectTranslations() {
    var fs = require('fs'); // required to do file system actions
    var mkdirp = require('mkdirp'); // required to do file system actions
    var localesFolderPath = grunt.template.process('<%= yeoman.app %>') + '/assets/json/locales/'; // specify where the locales folders are
    var translationsStrings = []; // an array to contain all of the $translationProvider.translations(...) strings
    // look at all of the items within the locales folder
    //  NOTE: should only be directories (e.g. en_CA)
    fs.readdirSync(localesFolderPath).forEach(function (localeFolderName) {
      var translationObjectText = ''; // the text representation of the object for the translations
      var localeFolderPath = localesFolderPath + localeFolderName;

      // read through each locale file and add its content to translationObjectText
      fs.readdirSync(localeFolderPath).forEach(function (localeFileName) {
        // get the content from the file
        var fileContent = fs.readFileSync(localeFolderPath + '/' + localeFileName, 'utf8');
        // omit the opening and closing braces to keep everything in the same object
        var trimmedContent = fileContent.slice(fileContent.indexOf('{') + 1, fileContent.lastIndexOf('}'));
        // if nothing has been added to localeJSON yet, don't add in the comma separator
        translationObjectText = !translationObjectText ? trimmedContent : translationObjectText + ', ' + trimmedContent;
      });
      // wrap the object in braces to close it up
      translationObjectText = `{\n${translationObjectText}\n}\n`;
      // build the $translate text
      var translateText = '$translateProvider.translations(\'' + localeFolderName + '\', ' + translationObjectText + ')';
      // add the text to the text array
      translationsStrings.push(translateText);
    });
    // create the config content with each of the translations
    var configContent = `(function () {
      'use strict';
      angular.module('cgiW360App').config(function ($translateProvider) {
        ${translationsStrings.join('\n')}

        $translateProvider.preferredLanguage('en_CA');
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
      });
    })();`;
    // create the config file
    var outputPath = grunt.template.process('<%= yeoman.tmp %>') + '/core/scripts/config';
    mkdirp(outputPath, function (err) {
      fs.writeFileSync(outputPath + '/translation.config.js', configContent, 'utf8');
    });
  });
```

[back to top](#top)

### with gulp

```
/src/app/main/i18n/en.json
/src/app/toolbar/i18n/en.json
/src/app/navigation/i18n/en.json
```

```javascript
import gulp from 'gulp';
import map from 'map-stream';
import rename from 'gulp-rename';
import traverse from 'traverse';
import transform from 'vinyl-transform';
import jsonFormat from 'gulp-json-format';
import bluebird from 'bluebird';
import MicrosoftTranslator from 'mstranslator';

bluebird.promisifyAll(MicrosoftTranslator.prototype);

const Translator = new MicrosoftTranslator({
  client_id: process.env.MICROSOFT_TRANSLATOR_CLIENT_ID,
  client_secret: process.env.MICROSOFT_TRANSLATOR_CLIENT_SECRET
}, true);

function getTranslation(string, to) {
  const text = string;
  const from = 'en';
  return Translator.translateAsync({ text, from, to });
}

function getTranslations(strings, to) {
  const promises = [];

  traverse(strings).forEach((string) => {
    if (typeof string !== 'object') {
      promises.push(getTranslation(string, to));
    }
  });
  return Promise.all(promises);
}

function translateTable(to) {
  return transform(() => {
    return map((data, done) => {
      const strings = JSON.parse(data);
      getTranslations(strings, to)
        .then((translations) => {
          let index = 0;
          const translated = traverse(strings).forEach(function (string) {
            if (typeof string !== 'object') {
              this.update(translations[index++]);
            }
          });
          done(null, JSON.stringify(translated));
        })
        .catch(done);
    });
  });
}

function translate(to) {
  return gulp.src('src/app/**/i18n/en.json')
    .pipe(translateTable(to))
    .pipe(jsonFormat(2))
    .pipe(rename({ basename: to }))
    .pipe(gulp.dest('src/app'));
}
gulp.task('translate:tr', () => translate('tr'));
gulp.task('translate', ['translate:tr']);
```

[back to top](#top)

> Reference
- https://angular-translate.github.io/docs
- [使用angular-translate插件进行项目国际化](https://blog.csdn.net/weiqing723/article/details/79034847)
- [Simple Language Translation in Angular 2 (Part 1)](https://scotch.io/tutorials/simple-language-translation-in-angular-2-part-1)
- [How to Internationalize Your AngularJS App](https://www.toptal.com/angular-js/internationalize-your-angularjs-app)
- [github- How to Internationalize Your AngularJS App](https://github.com/mehmetbajin/angular-i18n-l10n-demo)
- [AngularJS Localization or Multilingual or Whatever](https://itnext.io/angularjs-localization-or-multilingual-or-whatever-53b88585cc48)

```
├── app/
|    ├── app.component.html
|    ├── app.component.ts
|    ├── app.module.ts
|    ├── main.ts
|    └──  translate/
|        ├── index.ts
|        ├── lang-en.ts
|        ├── lang-es.ts
|        ├── lang-zh.ts
|        ├── translate.pipe.ts
|        ├── translate.service.ts
|        └──  translation.ts
├── index.html
├── systemjs.config.js
└── tsconfig.json
```
