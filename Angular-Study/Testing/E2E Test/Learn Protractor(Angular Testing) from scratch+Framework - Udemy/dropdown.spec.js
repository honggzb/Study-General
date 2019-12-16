
describe('Protractor Element Demo', function() {
    function calc(a, b, c) {
        element(by.model('first')).sendKeys(a);
        element(by.model('second')).sendKeys(b);
        element.all(by.tagName("option")).each(function(item){
            item.getAttribute("value").then(function(values){
                if(values === c) {
                    item.click();
                }
            });
        });
        element(by.id('gobutton')).click();
    }

    it('Locators', function(){

        browser.get('https://juliemr.github.io/protractor-demo/');
        calc(3,5,"MULTIPLICATION");
        calc(3,5,"DIVISION");
        calc(3,5,"DIVISION");
        calc(10,6,"ADDITION");
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