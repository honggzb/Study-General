
//1)

describe('Protractor Element Demo', function() {
    function add(a, b) {
        element(by.model('first')).sendKeys(a);
        element(by.model('second')).sendKeys(b);
        element(by.id('gobutton')).click();
    }

    it('Locators', function(){
        browser.get('https://juliemr.github.io/protractor-demo/');
        add(3, 5);
        /*1) locator */
        // element(by.css('h2[class="ng-binding"]')).getText().then(function(text){
        //     console.log(text);
        // });
        //expect(element(by.css('h2[class="ng-binding"]')).getText()).toBe("8");
        /*2) chained element */
        // element(by.repeater('result in memory')).element(by.css('td:nth-child(3)')).getText().then(function(text){
        //     console.log(text);
        // });
        expect(element(by.repeater('result in memory')).element(by.css('td:nth-child(3)')).getText()).toBe("8");

        add(1,1);
        element.all(by.repeater('result in memory')).count().then(function(text){
            console.log("The count of result is ", text);
        });
        element.all(by.repeater('result in memory')).each(function(item){
            item.element(by.css('td:nth-child(3)')).getText().then(function(text){
                console.log("restult is", text);
            });
        });
    });
});

//2) using sleep()
// describe('Protractor baby steps', function() {
//     // asynchronus javascript
//     it('Open Angular Js website', function(){
//         browser.get('http://www.protractortest.org/");
//         browser.sleep(3000);
//         console.log('I am last step to execute test');
//     });
// });