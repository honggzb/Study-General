var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'src/reporting/cucumber_report.json',
        output: 'src/reporting/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
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

    reporter.generate(options);