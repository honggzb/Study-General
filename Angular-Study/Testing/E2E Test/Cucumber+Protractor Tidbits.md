[Cucumber+Protractor Tidbits](#top)

- [Suites](#suites)
- [Data driven testing by using data table](#data-driven-testing-by-using-data-table)
- [Data driven testing by using JSON and excel sheet](#data-driven-testing-by-using-json-and-excel-sheet)
- [Handling global timeout](#handling-global-timeout)
- [Handling multiple browser and running test in parallel](#handling-multiple-browser-and-running-test-in-parallel)

## Suites

`protractor config.js --suite`

```javascript
//protrator.conf.js
suites: {
  "homepage": "../feature/Home.feature",
  "coursedetail": "../feature/CourseDetail.feature"
}
```

## Data driven testing by using data table

- Data tables are handy for passing a list of values to a step definition

```javascript
//**.feature
Then I should see all course information in Home page
            |Courses    |Duration   |
            |Selenium   |2          |
            |Java       |3          |
//**.steps.ts
import { Given, Then, When, TableDefinition } from 'cucumber';
import { expect, assert } from 'chai';
Then(/^I should see all course information in Home page$/, async (table: TableDefinition) => {
    const localTable = [
      ['Selenium',	'2'],
      ['Java',	'3']
    ];
    table.rows().forEach(element => {
      console.log(element);
    });
    assert.deepEqual(localTable, table.rows(), "The datasource does not matches with the step definition table.")
});
```

[back to top](#top)

## Data driven testing by using JSON and excel sheet

`npm i --save-dev load-json-file ts-xlsx`

```javascript
/*1) using JSON file -data.json*/
//e2e/src/pages/apppage.ts
import * as json from 'load-json-file';
searchText = this.ElementLocator(Locators.searchText);
async EnterDataInSearchFromJson(){
        json("./e2e/src/steps/data.json").then((text) => {
            console.log("The heading is :" + text);
            this.searchText.sendKeys((<any>text).SearchValue);
        });
    }
//e2e/src/pages/data.json
{
    "SearchValue": "Selenium",
    "CourseTitles":{
        "Title1": "Protractor",
        "Title2": "Selenium"
    }
}
//e2e/src/pages/app.steps.ts
When(/^I enter text in search from external data source$/, async () => {
    await page.EnterDataInSearchFromJson();
});
//e2e/src/pages/app.feature
    @regression
    Scenario: Search for course from External DataSource
        Given I navigate to application
        And I enter text in search from external data source
        And I get the heading
		
/*2) using JSON file -data.xlsx*/
//e2e/src/utilities/excelUtil.ts
import * as excel from 'ts-xlsx';
import { IWorkSheet } from "xlsx";
export class ExcelUtil {
    static ReadExcelSheet(filepath: string): IWorkSheet{
        let file = excel.readFile(filepath);
        let sheet = file.Sheets["Sheet1"];
        return excel.utils.sheet_to_json(sheet)[0];
    }
}
//e2e/src/pages/apppage.ts
import { ExcelUtil } from '../utilities/excelUtil';
import * as json from 'load-json-file';
searchText = this.ElementLocator(Locators.searchText);
async EnterDataInSearchFromExcel(){
        let sheet = ExcelUtil.ReadExcelSheet("./e2e/src/steps/data.xlsx");
        console.log(sheet);
    }
//e2e/src/pages/data.xlsx
//e2e/src/pages/app.steps.ts
When(/^I enter text in search from external data source$/, async () => {
    await page.EnterDataInSearchFromExcel();
});
//e2e/src/pages/app.feature
    @regression
    Scenario: Search for course from External DataSource
        Given I navigate to application
        And I enter text in search from external data source
        And I get the heading
```

[back to top](#top)

## Handling global timeout

- wait for page to load
- wait for angular
- asynchronous script timeout
- timeout from Jasmine
- timeout from sauce lab
- `setDefaultTimeout(10000);`

## Handling multiple browser and running test in parallel

```javascript
capabilities:[
	{'browserName': 'chrome'
    {'browserName': 'firebox'}
]
```
			
[back to top](#top)
