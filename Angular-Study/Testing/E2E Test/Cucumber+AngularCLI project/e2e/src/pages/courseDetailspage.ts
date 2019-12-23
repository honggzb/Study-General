import { browser, element, by, protractor, $$, $ } from 'protractor';
import { IdentificationType, BasePage } from "../basepage";

const Locators = {
    courseHeading:{
        type:IdentificationType[IdentificationType.Xpath],
        value:"//h2"
    }
  }

export class CourseDetailsPage extends BasePage {

    courseHeading = this.ElementLocator(Locators.courseHeading);

    async navigateTo() {
        await browser.get(browser.baseUrl) as Promise<any>;
    }

    async GetCourseHeading(course){
        //await this.courseHeading;
        await this.courseHeading.getText().then((text) => {
            console.log("The heading is :" + text);
        });
    }

}