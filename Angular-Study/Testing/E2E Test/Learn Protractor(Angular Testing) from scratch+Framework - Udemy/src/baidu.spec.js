// 3) 完整案例
// describe('测试百度搜索', function () {
//     it('测试protractor官网会不会出现在第一个搜索结果中', async function () {
//         await browser.waitForAngularEnabled(false);   //non-angular site
//         await browser.driver.get('https://www.baidu.com');

//         await $('#kw').sendKeys('protractor');
//         await $('#su').click();

//         var EC = protractor.ExpectedConditions;
//         await browser.wait(EC.presenceOf($('.result.c-container h3')), 5000);

//         await expect($$('.result.c-container h3 a').first().getText())
//             .toBe('Protractor - end-to-end testing for AngularJS');
//     });
// });

//为了脚本的可维护性， 把页面功能和测试用例分开来写
// 页面功能
function baidu() {
    this.open = function () {
        browser.waitForAngularEnabled(false);  //non-angular site
        return browser.driver.get('https://www.baidu.com');
    };
    this.getSearchInput = function () {
        return $('#kw');
    };
    this.getSubmitBtn = function () {
        return $('#su');
    };
    this.getResults = async function () {
        await browser.wait(ExpectedConditions.presenceOf($('.result.c-container h3')), 5000);
        return $$('.result.c-container h3 a');
    };
}

// 测试用例
describe('测试百度搜索', function () {
    it('测试protractor官网会不会出现在第一个搜索结果中', async function () {
        var page = new baidu();
        await page.open();

        await page.getSearchInput().sendKeys('protractor');
        await page.getSubmitBtn().click();

        var searchResults = await page.getResults();
        var firstResult = await searchResults[0].getText();
        expect(firstResult).toBe('Protractor - end-to-end testing for AngularJS');
    });
});
//后面还可以再进一步，把function baidu()移到单独的文件中。