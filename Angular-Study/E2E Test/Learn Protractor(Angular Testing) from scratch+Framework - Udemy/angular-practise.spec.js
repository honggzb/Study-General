describe('angularjs site demo', function () {

  function addItemToCart(product) {
    element.all(by.tagName('app-card')).each(function (item) {
      item.element(by.css('h4 a')).getText().then(function (text) {
        console.log(text);
        if (text === product) {
          item.element(by.css('button[class="btn btn-info"]')).click();
        }
      });
    });
  }

  beforeEach(function(){
    browser.get('https://qaclickacademy.github.io/protocommerce/');
  });

  it('should open qaclickacademy website and submit', function () {
    //1) test form submit
    //locators
    element(by.name('name')).sendKeys('Mystudents'); //input
    element(by.css('input[name="email"]')).sendKeys('mystudents@gmail.com');
    element(by.id('exampleInputPassword1')).sendKeys('password2');
    element(by.css('input[type="checkbox"]')).click(); //checkbox
    element(by.cssContainingText('[id="exampleFormControlSelect1"] option', 'Female')).click(); //dropdown option
    //element.all(by.name('inlineRadioOptions')).get(0).click();
    element.all(by.name('inlineRadioOptions')).first().click(); //radio
    element(by.buttonText('Submit')).click().then(function () { //button -> submit button
      element(by.css('div[class="alert alert-success alert-dismissible"]')).getText().then(function (text) {
        console.log(text);
      });
      // 2) test error message in name input field
      element(by.name('name')).clear();
      element(by.name('name')).sendKeys('M').then(function () {
        element(by.css('div[class="alert alert-danger"]')).getText().then(function (text) {
          //console.log(text);
          expect(text).toEqual('Name should be at least 2 characters');
        });
      });

      //2) click 'shop' link to redirect to shop page
      element(by.linkText('Shop')).click();
      //click samsung Note 8 button to add to cart
      addItemToCart('Samsung Note 8');
      addItemToCart('iphone X');
      // check 'checkout' button to see cart information
      element(by.partialLinkText('Checkout')).getText().then(function (text) {
        //console.log(text);
        var res = text.split('(');
        expect(res[1].trim().charAt(0)).toBe('2');
      })
    });

  });

  afterEach(function(){
    console.log('Test of qaclickacademy is completed');
  });

});