import { browser, element, by, protractor, $$, $ } from 'protractor';
import { IdentificationType, BasePage } from "../basepage";
import * as json from 'load-json-file';
import { ExcelUtil } from '../utilities/excelUtil';

const Locators = {
    heading: {
        type:IdentificationType[IdentificationType.Xpath],
        value: "//course-thumb/div/h3[text()=' Selenium Framework development ']"
    },
    headings: {
        type: IdentificationType[IdentificationType.Css],
        value: ".card-title"
    },
    searchText: {
        type: IdentificationType[IdentificationType.Css],
        value: "[type='search']"
    },
  }

export class AppPage extends BasePage {

    heading = this.ElementLocator(Locators.heading).element(by.xpath("//span[contains(text(),'4th')]"));
    headings = this.ElementLocator(Locators.headings);
    searchText = this.ElementLocator(Locators.searchText);

    async navigateTo() {
        await browser.get(browser.baseUrl) as Promise<any>;
    }

    async GetFirstHeading(){
        await this.heading.getText().then((text) => {
            console.log("The first heading is :" + text);
        });
    }

    async GetAllHeadings(){
        await this.headings.getText().then((text) => {
            console.log("The heading is :" + text);
        });
    }

    async ClickFirstHeading(heading: string){
        console.log("Can I print the input value from StepDefinition, if yes, this is it" + heading);
        await this.headings.click();
    }

    async EnterDataInSearchFromJson(){
        json("./e2e/src/steps/data.json").then((text) => {
            console.log("The heading is :" + text);
            this.searchText.sendKeys((<any>text).SearchValue);
        });
    }

    async EnterDataInSearchFromExcel(){
        let sheet = <SearchData>ExcelUtil.ReadExcelSheet("./e2e/src/steps/data.xlsx");
        console.log(sheet.SearchValue);
    }

}

// for strongly-type
interface SearchData{
    SearchValue: string,
    CourseTitle: string,
    Durations: string
}