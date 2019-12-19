[Cucumber and Protractor in Angular CLI project](#top)

- [Structure of test files(cucumber)](#structure-of-test-filescucumber)
- [Setup and building step](#setup-and-building-step)
- [Cucumber HTML reporter 5+ and Cucumber 6+](#cucumber-html-reporter-5-and-cucumber-6)

## Structure of test files(cucumber)

```shell
├── e2e/
│   ├── src/
│   | # for testing files
│   │   ├── features/
│   │   │   ├── ...
│   │   │   └── app.feature
│   │   ├── pages/
│   │   │   ├── ...
│   │   │   └── app.po.ts
│   │   ├── reporting/
│   |   # for html reports
│   │   │   ├── cucumber_reporter.html
│   │   │   └── cucumber_reporter.json
│   │   ├── steps
│   │   │   ├── ...
│   │   │   └── app.steps.ts
│   │   ├── basepage.ts
│   | # for setup
│   │   ├── protractor.conf.js
│   │   └── tsconfig.json
```

## Setup and building step

1. Install libraries
  - `npm install --save-dev cucumber chai protractor-cucumber-framework chai-as-promised @types/cucumber @types/chai`
  - Cucumber is a testing framework which doesn't come with an assertion library like Jasmine does, soneed to install **chai**
  - The **protractor-cucumber-framework** package is a plugin that does the glue between Protractor and Cucumber. It's what makes possible running Cucumber tests using Protractor
2. Setup Cucumber and Chai's Type Definition Files, 'e2e/tsconfig.json'
3. Update the Protractor Configuration to Use Cucumber, 'e2e/protractor.conf.js'

```javascript
/* 1) e2e/tsconfig.json */
// change
"types": ["jasmine", "jasminewd2", "node"]
// to
"types": ["chai", "cucumber", "node"]
/* 2) e2e/protractor.conf.js  */
// change
specs: ['./src/**/*.e2e-spec.ts'],
// to
specs: ['./src/features/**/*.feature']    //feature files will reside in the e2e/src/features folder
// change
framework: 'jasmine',
// to
framework: 'custom',
frameworkPath: require.resolve('protractor-cucumber-framework'),
cucumberOpts: {
   require: ['./src/steps/**/*.steps.ts'],
 },
/* 3) remove any Jasmine specific code */
const { SpecReporter } = require('jasmine-spec-reporter');
  //....
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  //...
onPrepare() {
    // ...
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
```

4. Write the Actual Tests
   1. The Feature File - such like `e2e/src/features/app.feature`
   2. The Page Object - such like `e2e/src/pages/app.po.ts`
   3. The Step Definition - such like `e2e/src/steps/app.steps.ts`
5. Launch the Tests: `ng e2e`

## Cucumber HTML reporter 5+ and Cucumber 6+

- ![](https://i.imgur.com/XFRvMH6.png)
- `npm i --save-dev cucumber-html-reporter`
- 可用的HTML主题：
  - 'bootstrap'  带有饼图的 Bootstrap 主题报告
  - 'hierarchy'  层次结构结构专题报告，带有饼图
  - 'foundation' 基金会主题报告
  - 'simple'     简单主题报告
- [cucumber-html-reporter, 在三个不同的主题中，生成 Cucumber HTML报告])(https://www.helplib.com/GitHub/article_141521)

```javascript
//e2e/protractor.conf.js
cucumberOpts: {
    format: "json:./e2e/src/reporting/reports/cucumber_report.json",
    require: ['./src/steps/**/*.steps.ts'],
    tags: '@smoke or @regression'
  },
onPrepare: () => {
  require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
  });
  var fs = require('fs');
  var mkdirp = require('mkdirp');
  const reportDir = process.cwd() + "/e2e/src/reporting/reports";
  if (!fs.existsSync(reportDir)){
        mkdirp.sync(reportDir);
  }
},
onComplete: () => {
    var report = require('cucumber-html-reporter');
    const reportDir = process.cwd() + "/e2e/src/reporting/reports";
    const jsonFile = reportDir + "/cucumber_report.json";
    const cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: jsonFile,
        output: reportDir + "/cucumber_reporter.html",
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"0.0.0",
            "Test Environment": "Testing",
            "Browser": "Chrome 79.0.3945.88",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Local"
        }
    };
    report.generate(cucumberReporterOptions);
}
```

[back to top](#top)

> other
- Upgrading
  - ![](https://i.imgur.com/09LLGLC.png)
- [How to Set Up Angular E2E Testing with Cucumber](https://www.amadousall.com/angular-e2e-with-cucumber/)
