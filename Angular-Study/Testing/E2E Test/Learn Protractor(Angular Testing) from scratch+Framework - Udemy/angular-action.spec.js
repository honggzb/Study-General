describe('angularjs action demo', function () {
  it('should open Posse website', function () {
    browser.get('http://posse.com/');

    element(by.model('userInputQuery')).sendKeys('river');
    //browser.actions().mouseMove(element(by.model('locationQuery')).sendKeys('London')).perform();
    //browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function () {

      browser.sleep(3000);

      expect(element.all(by.css('div[ng-mouseover="onSearchResultOver(searchResult)"]')).count()).toEqual(1);

      element(by.css('a[ng-href="/place/US/Morgantown/Rocktop"]')).click().then(function(){

        browser.getTitle().then(function(title){
          console.log("Before switch title is ", title);
        });

        browser.getAllWindowHandles().then(function(handles){
          browser.switchTo().window(handles[0]);     // 跳转到新窗口
          browser.getTitle().then(function(title){
            console.log("After switch title is ", title);
          });
        });

      });

    });
  });
});