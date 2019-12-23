/**
 * http://www.protractortest.org/#/api?view=ProtractorExpectedConditions
 * var EC = protractor.ExpectedConditions;
   browser.wait(EC.invisibilityOf(element(by.id('loader'))), 8000); //wait for an element to become clickable
 */

describe('Protractor Demo', function() {

    it('It should success for ajax loading', function(){
        browser.waitForAngularEnabled(false);       //non-angular site
        browser.get('http://www.itgeared.com/demo/1506-ajax-loading.html');

        element(by.css('a[href="javascript: void(0);loadAjax();"]')).click();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.invisibilityOf(element(by.id('loader'))), 8000); //wait for an element to become clickable

        element(by.id('results')).getText().then(function(text){
            //console.log(text);
            expect(text).toBe('Process completed! This response has been loaded via the Ajax request directly from the web server, without reoading this page.');
        })
    });

});
