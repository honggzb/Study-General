import { browser, element, by, protractor, $$, $ } from 'protractor';

export enum IdentificationType {
    Xpath,
    Css,
    Id,
    Js,
    Name,
    PartialLinkText,
    ClassName
}

export class BasePage {

     ElementLocator(obj) {
        switch (obj.type) {
            case IdentificationType[IdentificationType.Xpath]:
                return element(by.xpath(obj.value));
            case IdentificationType[IdentificationType.ClassName]:
                return element(by.className(obj.value));
            case IdentificationType[IdentificationType.Id]:
                return element(by.id(obj.value));
            case IdentificationType[IdentificationType.Js]:
                return element(by.js(obj.value));
            case IdentificationType[IdentificationType.Css]:
                return element(by.css(obj.value));
            default:
                break;
        }
     }

}