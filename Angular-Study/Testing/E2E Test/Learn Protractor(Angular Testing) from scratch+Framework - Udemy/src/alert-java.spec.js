/**
 * Java sites- testing alert window
 *  browser.switchTo().alert().accept()  -> OK button
 *  browser.switchTo().alert().dismiss() -> cancel button
 */
describe('Protractor Alert testing', function() {


    it('should open NonAngularJS website alert', function() {

      browser.waitForAngularEnabled(false);       //non-angular site
      browser.get('http://qaclickacademy.com/practice.php');

      element(by.id('confirmbtn')).click();
      browser.switchTo().alert().accept().then(function(){    //click OK button
        browser.sleep(5000);
      });
      // browser.switchTo().alert().dismiss().then(function(){    // click cancel button
      //   browser.sleep(5000);
      // });

    });

  });