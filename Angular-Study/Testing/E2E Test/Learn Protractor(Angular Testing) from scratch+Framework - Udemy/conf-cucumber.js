var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['ts/baiduPage.spec.ts'],
    // suites: {
    //     homepage: '*.spec.js',
    //     // search: ['tests/e2e/contact_search/**/*Spec.js',
    //     //     'tests/e2e/venue_search/**/*Spec.js'
    //     // ]
    // },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file
    // Capabilities to be passed to the webdriver instance
    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {    //Failed: sendKeysToActiveElement(Chrome>76)
            w3c: false
        }
        //browserName:'firefox'
    },
    // cucumber command line options
    cucumberOpts: {
        require: ['./cucumber/*.js'],
        tags: [],
        strict: true,
        format: ["pretty"],
        'dry-run': false,
        compiler: []
    },
    /* setup for typescript */
    // turn off control_flow, you cannot use a mix of async/await and the control flow, async/await causes the control flow to become unreliable
    SELENIUM_PROMISE_MANAGER: false,
    beforeLaunch: function () {
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    },
    /** setup for reporter */
    onPrepare: function () {
        //browser.waitForAngularEnabled(false);  //non-angular site
        browser.driver.manage().window().maximize();
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'target/screenshots'
            })
        );
    }
};