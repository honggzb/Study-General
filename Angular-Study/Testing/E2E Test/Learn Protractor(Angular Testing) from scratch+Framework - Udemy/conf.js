var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    directConnect: true,
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./src/dropdown.spec.js'],
    // suites: {
    //     homepage: '*.spec.js',
    //     // search: ['tests/e2e/contact_search/**/*Spec.js',
    //     //     'tests/e2e/venue_search/**/*Spec.js'
    //     // ]
    // },
    // Capabilities to be passed to the webdriver instance
    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {    //Failed: sendKeysToActiveElement(Chrome>76)
            w3c: false
        }
        //browserName:'firefox'
    },
    // Options to be passed to Jasmine-node
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    },
    /* setup for typescript */
    // turn off control_flow, you cannot use a mix of async/await and the control flow, async/await causes the control flow to become unreliable
    //SELENIUM_PROMISE_MANAGER: false,
    beforeLaunch: function () {
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    },
    /** setup for reporter */
    onPrepare: function () {
        browser.waitForAngularEnabled(false);  //non-angular site
        //browser.driver.manage().window().maximize();
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'target/screenshots'
            })
        );
    }
};