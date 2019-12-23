import * as fs from 'fs';
import { mkdirp } from 'mkdirp';
var report = require('cucumber-html-reporter');

export class CucumberReportExtension {

    constructor(){
        // this.jsonDir = process.cwd() + "e2e/src/reporting/json";
        // this.htmlDir = process.cwd() + "e2e/src/reporting/html";
        // this.jsonFile = process.cwd() + + "e2e/src/reporting/json/cucumber_report.json";
    }

    private static jsonDir = process.cwd() + "e2e/src/reporting/json";
    private static htmlDir = process.cwd() + "e2e/src/reporting/html";
    private static jsonFile = CucumberReportExtension.jsonDir + "/cucumber_report.json";
   //2) Create cucumber option
    public static cucumberReporterOptions = {
        theme: "bootstrap",
        jsonFile: CucumberReportExtension.jsonFile,
        output: CucumberReportExtension.htmlDir + "/cucumber_reporter.html",
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
    // 1) Create json File directory & file
    public CreateReportFile(dirName) {
        //Check of the directory exist
        if (!fs.existsSync(dirName)){
            mkdirp.sync(dirName);
        }

    }

    //3) Generate Json report with cucumber options
    public GenerateCucumberReport() {
        return report.generate(CucumberReportExtension.cucumberReporterOptions);
    }

}