import Baidu from './page';

describe('测试百度搜索',  () =>  {
    it('测试protractor官网会不会出现在第一个搜索结果中', async () => {
        let page = new Baidu();
        await page.open();

        await page.getSeachInput().sendKeys('protractor');
        await page.getSubmitBtn().click();

        let searchResults = await page.getResults();
        let firstResult = await searchResults[0].getText();
        expect(firstResult).toBe('Protractor - end-to-end testing for AngularJS');
    });
});