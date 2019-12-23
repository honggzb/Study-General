const { BeforeAll, Before, After, AfterAll, Status, setDefaultTimeout } = require("cucumber");
import { browser } from "protractor";
//import { CucumberReportExtension } from "../reporting/CucumberReportExtension";
var fs = require('fs');
var mkdirp = require('mkdirp');

setDefaultTimeout(10000);

// BeforeAll(async () => {
//     const reportDir = process.cwd() + "/e2e/src/reporting/reports";
//     if (!fs.existsSync(reportDir)){
//         c
//         mkdirp.sync(reportDir);
//     }
//     console.log("Starting the application");
// });

After(async function(scenario) {
        if (scenario.result.status === Status.FAILED) {
            // screenShot is a base-64 encoded PNG
             const screenShot = await browser.takeScreenshot();
             this.attach(screenShot, "image/png");
        }
});