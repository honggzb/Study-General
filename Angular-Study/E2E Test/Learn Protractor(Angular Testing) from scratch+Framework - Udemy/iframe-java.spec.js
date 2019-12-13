/**
 * Java sites- testing iframe
 * 1) locate to iframe, because iframe may not in the current screen
 *        browser.driver.manage().window().maximize();
 * 2) browser.switchTo().frame("courses-iframe")
 */
describe('Protractor iframe testing', function() {


    it('should open NonAngularJS website iframe', function() {

      browser.waitForAngularEnabled(false);       //non-angular site
      browser.get('http://qaclickacademy.com/practice.php');

      browser.driver.manage().window().maximize();   //locate to iframe, because iframe may not in the current screen
      browser.switchTo().frame("courses-iframe");
      element(by.css('a[href="http://qaclickacademy.usefedora.com/sign_in"]')).getText().then(function(text){
        console.log(text);
      });

    });

  });