import { browser, by, element, $$, $ } from 'protractor';
import { IdentificationType, BasePage } from "./basepage";

const Locators = {
  heading: {
      type:IdentificationType[IdentificationType.Xpath],
      value: "//course-thumb/div/h3[text()=' Selenium Framework development ']"
  },

  headings: {
      type: IdentificationType[IdentificationType.Css],
      value: ".card-title"
  }
}

export class AppPage extends BasePage {

  //Selenium framework development course heading
  heading = this.ElementLocator(Locators.heading).element(by.xpath("//span[contains(text(),'4th')]"));
  //All heading
  headings = this.ElementLocator(Locators.headings);

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  GetFirstHeading(){
    this.heading.getText().then((text) => {
        console.log("The first heading is :" + text);
    });
  }

  GetAllHeadings(){
    this.headings.getText().then((text) => {
        console.log("The heading is :" + text);
    });
  }

  ClickFirstHeading(){
      this.headings.click();
  }

}
