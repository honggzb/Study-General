[Learn Protractor(Angular Testing) from scratch+Framework - Udemy](#top)

- [Overview](#overview)
- [Protractor setup](#protractor-setup)
  - [VS code Setup](#vs-code-setup)
  - [lifecycle hooks and the order they are triggered in configuration file](#lifecycle-hooks-and-the-order-they-are-triggered-in-configuration-file)
  - [configuration file for debuging async/await](#configuration-file-for-debuging-asyncawait)
  - [Eclipse Setup](#eclipse-setup)
  - [Multi-browser support](#multi-browser-support)
- [Angular CLI Protractor setup](#angular-cli-protractor-setup)
- [Jasmine Terminology](#jasmine-terminology)
- [Protractor Global Variables](#protractor-global-variables)
- [Practical usages](#practical-usages)
  - [General usages](#general-usages)
  - [Realtime Angular Test Sample](#realtime-angular-test-sample)
- [Page object Mechanism for Protractor tests](#page-object-mechanism-for-protractor-tests)
  - [Page Object Model(POM) - define as object](#page-object-modelpom---define-as-object)
  - [Define as class(POM)](#define-as-classpom)
  - [define using async / await](#define-using-async--await)
- [jasmine-data-provider](#jasmine-data-provider)
- [Jenkins Protractor Integration](#jenkins-protractor-integration)
- [Jasmine and Protractor in Angular CLI project](#jasmine-and-protractor-in-angular-cli-project)
  - [Setup for Non-Angular CLI Project](#setup-for-non-angular-cli-project)
  - [Typescript and Cucumber in Angular CLI project](#typescript-and-cucumber-in-angular-cli-project)
  - [Gherkin](#gherkin)
  - [Cucumber in Angular CLI project](#cucumber-in-angular-cli-project)
- [Debug](#debug)
- [踩过的坑](#%e8%b8%a9%e8%bf%87%e7%9a%84%e5%9d%91)

## Overview

- Protractor is an end-to-end test framework for Angular and AngularJS
- WebDriver + Angular = Protractor   , Protractor is a Nodejs program built on top of WebDriverJS
- Protractor API - supports Behaviour-Driven Development(BDD)
  - Javascript -> [Jasmine](https://jasmine.github.io/)
  - Typescript -> [Cucumber](https://cucumber.io/)

![](https://i.imgur.com/ECTqBBZ.png)

## Protractor setup

### VS code Setup

1. Install and setup

```shell
npm install -g protractor  # install 2 command line tools, protractor and webdriver-manager
webdriver-manager update   # 浏览器的驱动
webdriver-manager start   # start up a server,  http://localhost:4444/wd/hub
```

2. create test file

- todo-spec.js
- conf.js
- http://juliemr.github.io/protractor-demo/

```javascript
//todo-spec.js
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();
    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');
    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
});
//conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['todo-spec.js']
};
```

**3. Test non-angular sites**

- `browser.waitForAngularEnabled(false);  //non-angular site`
- http://www.protractortest.org/#/timeouts

3. run test

- `protractor conf.js` general command
- `protractor protractor.conf.js --suite homepage` or `protractor protractor.conf.js --suite homepage,search` if there is suites in conf.js

###  lifecycle hooks and the order they are triggered in configuration file

```
--- beforeLaunch
    --- onPrepare          (set in conf) ***reporters initialized here
      --- jasmineStarted   (set in reporter)
        --- beforeAll
         --- suiteStarted  (set in reporter)
          --- specStarted  (set in reporter)
           --- beforeEach  (set in testFile)
           +++ afterEach   (set in testFile)
          +++ specDone     (set in reporter)
         +++ suiteDone     (set in reporter)
        +++ afterAll
      +++ jasmineDone      (set in reporter)
    +++ onComplete         (set in conf)
+++ afterLaunch
```

### configuration file for debuging async/await

- https://github.com/angular/protractor/blob/master/docs/async-await.md

```javascript
// An example configuration file for debugging test using async/await.
exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',
  specs: ['async_await.js'],
  // turn off control_flow, you cannot use a mix of async/await and the control flow, async/await causes the control flow to become unreliable
  SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {   // Options to be passed to Jasmine.
    defaultTimeoutInterval: 30000
  }
};
```

### Eclipse Setup

- create a 'javascript project'
  - ![](https://i.imgur.com/sxVDcas.png)
- copy 'C:\Users\...\AppData\Roaming\npm\node_modules\protractor' to your project folder
- go to 'run configuratution'
  - ![](https://i.imgur.com/1sX5MI3.png)

### Multi-browser support

- https://stackoverflow.com/questions/37456099/protractor-test-in-ie
- check if browser support driver exist
  - '~user\AppData\Roaming\npm\node_modules\protractor\node_modules\webdriver-manager\selenium'
  - if don't exits, using `webdriver-manager update --ie` to install
- conf.js: `capabilities: {...}`
- http://www.protractortest.org/#/browser-setup
- IE support setup
  1. Download [IEDriverServer.exe](https://selenium.dev/downloads/), Place it in C:\Windows\System32
  2. Open Internet Explorer click options
  3. In Security tab --> Disable protected mode for all zones
  4. Navigate to Privacy tab TurnOff PopUp Blocker
  5. Navigate to Advanced tab
  - ![](https://i.imgur.com/7xssVIf.png)

[back to top](#top)

## Angular CLI Protractor setup

1. `ng new projectName`
   1. the Angular CLI sets up everything you need for End-to-end testing using **Protractor** and **Jasmine.**
2. It will create the following files automatically
   1. 'e2e/src/app.po.ts'
   2. 'e2e/src/app.e2e-spec.ts'
   3. 'e2e/protractor.conf.js'
   4. 'e2e/tsconfig.json'
3. `ng e2e` to execute e2e testing
4. add testing report
   1. install library, `npm i --save-dev protractor-jasmine2-html-reporter`
   2. modify protractor.conf.js, `jasmine.getEnv().addReporter( new Jasmine2HtmlReporter({ savePath: 'e2e/target/screenshots' }) );`

[back to top](#top)

## Jasmine Terminology

- **It-** Testcase
- **Spec** - Test File//Java(Class file)
  - An **expectation** in Jasmine is an **assertion** that is either **true** or **false**
- **Spies** - Jasmine has test double functions called spies
- https://jasmine.github.io/tutorials/your_first_suite

[back to top](#top)

## Protractor Global Variables

- `browser` - A wrapper around an instance of WebDriver
  - `browser.get` method loads a page. Protractor expects Angular to be present on a page, so it will throw an error if the page it is attempting to load does not contain the Angular library. (If you need to interact with a non-Angular page, you may access the wrapped webdriver instance directly with browser.driver
- `element` - single DOM elements on the page you are testing.
  - it takes a *Locator* and will *return an ElementFinder.* :   `element(by.css('some-css'));`
    - **[Locator](http://www.protractortest.org/#/locators)**
    - The **[ElementFinder](http://www.protractortest.org/#/api?view=webdriver.WebElement)** has a set of action methods, such as `click()`, `getText()`, and `sendKeys`. These are the core way to interact with an element and get information back from it.
  - to manipulate multiple elements, use the `element.all()` function
  - to manipulate Sub-Elements- Using **chained** locators:  `element(by.css('some-css')).element(by.tagName('tag-within-css'));`
- `by` - A collection of element locator strategies
  - `by.css('.myclass')`
  - `by.id('myid')`
  - `by.name('field_name')` -> input
  - `by.model('name')`  -> ng-model
  - `by.binding('bindingname')` -> ng-bind, {{}}
  - `by.repeater()` -> ng-repeater
- `protractor` - The Protractor namespace which wraps the WebDriver namespace. Contains static variables and classes, such as protractor.Key which enumerates the codes for special keyboard signals

[back to top](#top)

## Practical usages

### General usages

```
├── root/
|    ├── alert-java.spec.js  - test popup window such like alert window
|    ├── angular-action.spec - browser actions(keyboard and mouse action) and switch window test
|    ├── baidu.spec.js       - Non angularJS site test
|    ├── dropdown.spec.js    - dropdown action test
|    ├── iframe-java.spec.js - test iframe
|    ├── spec1.spec.js       - basic locators
|    ├── sync.spec.js        - test async calling such like ajax calling
│    └── todo.spec.js        - angularJS site test
```

### Realtime Angular Test Sample

- 'angular-practise.spec.js'
- Submission of Forms with various Protractor locators
- Validating Angular error messages
- Handling dynamic sections with Protractor
- On selecting items to cart
- String functions to extract count of cart items

[back to top](#top)

## Page object Mechanism for Protractor tests

- [Using Page Objects to Organize Tests](http://www.protractortest.org/#/page-objects)
- [15 Best Practices for Building an Efficient Protractor Automation Framework](https://www.logigear.com/blog/test-automation/15-best-practices-for-building-an-awesome-protractor-framework/)
- [Improving Protractor Tests Using Shared Functions and Promises](https://bridge360blog.com/2015/05/05/improving-protractor-tests-using-shared-functions-and-promises/)

**Best practices**

- One file, one page object class
- Deal with JavaScript’s asynchronous behavior using async & await

### Page Object Model(POM) - define as object

```javascript
//toDoPage.js- define Page Objects
'use strict';
module.exports = {
    toDo: {
        addField: element(by.css('[placeholder="add new todo here"]')),
        checkedBox: element(by.model('todo.done')),
        addButton: element(by.css('[value="add"]'))
    },
    go: function() {
        browser.get('https://angularjs.org/'); //overrides baseURL
        browser.waitForAngular();
    },
    addItem: function(item) {
        var todo = this.toDo;
        todo.addField.isDisplayed();
        todo.addField.sendKeys(item);
        todo.addButton.click();
    }
};
//
var toDoPage = require('../pages/toDoPage.js');
describe('Protractor Test', function() {
  it('should navigate to the AngularJS homepage', function() {
    toDoPage.go();
  });
  it('should let you add a new task ', function() {
   toDoPage.addItem('New Task Item')
  });
});
```

### Define as class(POM)

- create a class for each page
- will have handle of each page using ites instance
- establish the relation between each pages directly in code, so that performing an operation in one page will return another page(which is expected) can be maintained in POM

```javascript
var AngularHomepage = function() {
  var nameInput = element(by.model('yourName'));
  var greeting = element(by.binding('yourName'));
  this.get = function() {
    browser.get('http://www.angularjs.org');
  };
  this.setName = function(name) {
    nameInput.sendKeys(name);
  };
  this.getGreetingText = function() {
    return greeting.getText();
  };
};
module.exports = new AngularHomepage();
//
var angularHomepage = require('./AngularHomepage');
describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    angularHomepage.get();
    angularHomepage.setName('Julie');
    expect(angularHomepage.getGreetingText()).toEqual('Hello Julie!');
  });
});
```

### define using async / await

```javascript
var AngularHomepage = function() {
  var nameInput = element(by.model('yourName'));
  var greeting = element(by.binding('yourName'));
  this.get = async function() {
    await browser.get('http://www.angularjs.org');
  };
  this.setName = async function(name) {
    await nameInput.sendKeys(name);
  };z
  this.getGreetingText = function() {
    return greeting.getText();
  };
  this.getGreeting = function() {  // Not async, returns the element
    return greeting;
  };
};
module.exports = new AngularHomepage();
//
var angularHomepage = require('./AngularHomepage');
describe('angularjs homepage', function() {
  it('should greet the named user', async function() {
    await angularHomepage.get();
    await angularHomepage.setName('Julie');
    expect(await angularHomepage.getGreetingText()).toEqual('Hello Julie!');
  });
});
```

- https://github.com/angular/protractor/blob/master/docs/page-objects.md
- [Protractor and Page Objects](https://moduscreate.com/blog/protractor-and-page-objects/)

[back to top](#top)

## jasmine-data-provider

- https://github.com/MortalFlesh/jasmine-data-provider
- jasmine-driver.spec.js

## Jenkins Protractor Integration

1. create Jenkins job

![](https://i.imgur.com/8492NCS.png)

2. Fetch code from Repository

- configuration

![](https://i.imgur.com/XTmZwk4.png)

3. using package.json

- If there is package.json, change commands to:

```shell
d: # change the driver to d
cd D:Protractor Demo # navigate to the folder where the conf file is present.
npm install
npm run test
```

[back to top](#top)

## Jasmine and Protractor in Angular CLI project

- refer to https://github.com/angular/protractor/tree/5.4.1/exampleTypescript

### Setup for Non-Angular CLI Project

- Protractor also uses ambient types including jasmine, jasminewd2, and node
  - `npm i --save typescript @types/jasmine @types/jasminewd2 ts-node`
  - JasmineWd is adapter for Jasmine-to-WebdriverJS, which is used by protractor
  - JasmineWd features
    - automatically makes tests asynchronously wait util the webDriverJS control flow is empty
    - If a done function is passed to the test, waits for both the control flow and until done is called
    - If a test returns a promise, waits for both the control flow and the promise to resolve
    - Enhances expect so that it automatically unwraps promises before performing the assertion
- create file 'tsconfig.json'
- add 'beforelaunch' to 'conf.js'
- run `tsc -w` for transpiling typescripts to JS
- run `webdriver-manager start` to run selenium server
- `protractor start` to run test

```javascript
//e2e/tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "target": "es2017",
        "lib": [ "es2017" ],
        "typeRoots": [ "node_modules/@types" ],
        "types": [ "jasmine", "node" ]
    },
    "exclude": [
    "node_modules",
    "asyncAwait",
    "plugins.ts"
  ]
}
//conf.js
exports.config = {
    directConnect: true,
    framework: 'jasmine',
    SELENIUM_PROMISE_MANAGER: false,
    specs: ['src/spec.ts'],
    beforeLaunch: function () {
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    }
```

[back to top](#top)

### Typescript and Cucumber in Angular CLI project

- `npm install --save-dev cucumber @type/cucumber`
- `npm install --save-dev protractor-cucumber-framework`

```javascript
/*
conf.js
Basic configuration to run your cucumber
feature files and step definitions with protractor.
**/
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://angularjs.org/',
  capabilities: {
      browserName:'chrome'
  },
  framework: 'custom',  // set to "custom" instead of cucumber.
  frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file
  specs: [
    './cucumber/*.feature'     // Specs here are the cucumber feature files
  ],
  // cucumber command line options
  cucumberOpts: {
    require: ['./cucumber/*.js'],  // require step definition files before executing features
    tags: [],                      // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    strict: true,                  // <boolean> fail if there are any undefined or pending steps
    format: ["pretty"],            // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    'dry-run': false,              // <boolean> invoke formatters without executing steps
    compiler: []                   // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
  },
 onPrepare: function () {
    browser.manage().window().maximize(); // maximize the browser before executing the feature files
  }
};
```

- [Detail](https://github.com/honggzb/Study-General/blob/master/Angular-Study/Testing/E2E%20Test/Cucumber%20and%20Protractor%20in%20Angular%20CLI%20project.md)

[back to top](#top)

### Gherkin

**concept**

- Gherkin is the format for Cucumber specification
- https://cucumber.io/docs/gherkin/

**Gherkin Syntax**

- https://cucumber.io/docs/gherkin/reference/
  - Feature
  - Background
  - Scenario
  - Given
  - When
  - Then
  - And
  - But
  - Scenario outline
  - Examples
  - Scenario Templates
- ![](https://i.imgur.com/NgcTgHD.png)

[back to top](#top)

### Cucumber in Angular CLI project

## Debug

- Using protractor debugger `browser.debugger()`
- Using Editor(VS code)- https://code.visualstudio.com/docs/editor/debugging
  - Open Debug(ctrl+shift+D)
  - ![](https://i.imgur.com/acVFAq4.png)
- **Note:** To debug node js on vs-code two extensions are required.
  - Node Debug
  - Node Debug(legacy)

```javascript
//lauch.json for angular CLI project
"configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Protractor",
            "program": "${workspaceFolder}/examples/node_modules/protractor/bin/protractor",
            "args": ["${workspaceFolder}/examples/e2e/protractor.conf.js"],
            "skipFiles": [
                "<node_internals>/**"
            ]
        }
    ]
```

[back to top](#top)

## 踩过的坑

1. 最好在protractor_conf.js的browserName填写“chrome”，因为火狐的浏览器（firefox）可能存在报错的问题，并且你的chrome的版本需要高于58
2. 页面假设有透明的地方可能会遮住你的按钮，那么会导致你的按钮点击不到报错
3. **Error** <-> `Failed: sendKeysToActiveElement`
   1. reason:  There are few legacy API like (sendKeysToActiveElement) deprecated from chrome 75
   2. solution- disabling w3c which is default set to true starting Chrome 75 in 'conf.js':  `'chromeOptions': { w3c: false }`
   3. https://github.com/angular/protractor/issues/5285

[back to top](#top)

> Reference
- http://www.protractortest.org/
- [Table of Contents-Protractor](http://www.protractortest.org/#/toc)
- [protractor docs](https://github.com/angular/protractor/tree/master/docs)
- [Protractor Tutorial](http://www.protractortest.org/#/tutorial)
- [15 Best Practices for Building an Efficient Protractor Automation Framework](https://www.logigear.com/blog/test-automation/15-best-practices-for-building-an-awesome-protractor-framework/)
- [Jasmine](https://jasmine.github.io/)
- [Cucumber](https://cucumber.io/)
- [Eclipse IDE for JavaScript and Web Developers](https://www.eclipse.org/downloads/packages/release/2019-09/r/eclipse-ide-web-and-javascript-developers-includes-incubating-components)
- [protractor自动化测试注意事项](https://blog.csdn.net/weixin_39430584/article/details/86677486)


=============================================


- https://www.devopsroles.com/jenkins-build-periodically-parameters/
- commands in current project

```shell
npm install
echo "===========GEM/COMPASS Configuration==========="
echo $PATH
gem environment
echo "==============================================="
bower install --allow-root
#===================================
grunt ngconstant:server
grunt build
grunt package
#===================================
tar -cvf dist-files.tar dist/
```
