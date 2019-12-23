// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 50000,
  specs: ['./src/features/**/*.feature'],
  suites: {
    "homepage": "./src/features/app.feature",
    "coursedetail": "./src/features/CourseDetail.feature"
  },
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {    //Failed: sendKeysToActiveElement(Chrome>76)
      w3c: false
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    format: "json:./e2e/src/reporting/cucumber_report.json",
    require: ['./src/steps/**/*.steps.ts'],
    tags: '@smoke or @regression'
  },
  onPrepare: () => {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    var fs = require('fs');
    var mkdirp = require('mkdirp');
    const reportDir = process.cwd() + "/e2e/src/reporting/";
    const screenshotsDir = process.cwd() + "/e2e/src/reporting/screenshots";
    if (!fs.existsSync(reportDir)){
        mkdirp.sync(reportDir);
    }
    if (!fs.existsSync(screenshotsDir)){
      mkdirp.sync(screenshotsDir);
  }
  },
  onComplete: () => {
    var world = this;

    var report = require('cucumber-html-reporter');
    //const browser = require("protractor");
    const reportDir = process.cwd() + "/e2e/src/reporting/";
    const jsonFile = reportDir + "/cucumber_report.json";
    const screenshotsDir = process.cwd() + "/e2e/src/reporting/screenshots";

    const cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: jsonFile,
        output: reportDir + "/cucumber_reporter.html",
        screenshotsDirectory: screenshotsDir,
        storeScreenshots: true,
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
    //console.log(browser);
    // browser.takeScreenshot().then(function (buffer) {
    //   return world.attach(buffer, 'image/png');
    // });
  }
};