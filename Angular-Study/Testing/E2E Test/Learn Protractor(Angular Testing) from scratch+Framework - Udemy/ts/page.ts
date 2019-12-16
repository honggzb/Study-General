//Protractor typings
import { browser, $, $$, ExpectedConditions, ElementFinder } from 'protractor';

export default class Baidu {
    open() {
        browser.waitForAngularEnabled(false);
        return browser.driver.get('https://www.baidu.com');
    }

    getSeachInput() {
        return $('#kw');
    }

    getSubmitBtn() {
        return $('#su');
    }

    private waitForSearchResults() {
        return browser.wait(ExpectedConditions.presenceOf($('.result.c-container h3')), 5000);
    }

    async getResults(): Promise<ElementFinder[]> {
        await this.waitForSearchResults();
        return await $$('.result.c-container h3 a');
    }
}