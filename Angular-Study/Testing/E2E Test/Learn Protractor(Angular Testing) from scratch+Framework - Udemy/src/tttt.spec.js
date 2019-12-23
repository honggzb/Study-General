
describe('W360 login page', function() {

  it('Should pass login', async function () {

    browser.driver.get('https://pmdev1.w360.cginet/pmcore/').then(function(){
      browser.sleep('3000');
      element(by.id('username')).sendKeys('test.wops');
      element(by.id('password')).sendKeys('Everest.1');

      browser.actions().sendKeys(protractor.Key.ENTER).perform().then(function () {
         //browser.sleep('3000');
         browser.getAllWindowHandles().then(function(handles){
          browser.switchTo().window(handles[0]);
          browser.getTitle().then(function(title){
            expect(title).toBe('Dashboard | CGI Wealth 360');
          });
        });
      });
    });

  });

});