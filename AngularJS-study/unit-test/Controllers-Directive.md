[Controllers and Directive](#top)

- [前提条件](#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)
- [配置](#%E9%85%8D%E7%BD%AE)
- [test method in controller](#test-method-in-controller)
- [directive](#directive)
  - [test template part](#test-template-part)
    - [Simple HTML Element Directive](#simple-html-element-directive)
    - [Testing Transclusion Directives](#testing-transclusion-directives)
    - [Testing Directives that use templateUrl](#testing-directives-that-use-templateurl)
  - [directive with a controllerAs - only test method in controller](#directive-with-a-controlleras---only-test-method-in-controller)

## test method in controller

```javascript
describe('customer-controller', function(){
    var $controller;
    var customerService;
    beforeEach(function(){
        module('customer');
        inject( function($injector){
            customerService = $injector.get('customer-service');
            $controller = $injector.get('$controller');
        });
    });
    it('should print sales report', function(){
        spyOn(customerService,'getCustomerById').and.returnValue({firstName:'Joe', lastName:'Smith',totalSales:50});
        var ctrl = $controller('customer-controller');

        //Override controller functions
        ctrl.productName = 'Snacks';
        ctrl.getSalesDate = function(){return new Date(2000,1,1);};

        var report = ctrl.printSalesReport(1);
        expect(report).toBe('Snacks Joe Smith Total Sales: $50 Tue Feb 01 2000');
    });
});
```

[back to top](#top)

## directive

### test template part

```javascript
app.directive('aGreatEye', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
    };
});
```

#### Simple HTML Element Directive

```javascript
describe('Unit testing great quotes', function() {
  var $compile, $rootScope;
  beforeEach(module('myApp'));
  // Store references to $rootScope and $compile, so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  it('Replaces the element with the appropriate content', function() {
    var element = $compile("<a-great-eye></a-great-eye>")($rootScope);   // Compile a piece of HTML containing the directive
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
  });
});
```

[back to top](#top)

#### Testing Transclusion Directives

**must ensure that your 'element' transclude directive is wrapped in an element, such as a `<div>`**

- It is important to be aware of this when writing tests for directives that use 'element' transclusion. If you place the directive on the root element of the DOM fragment that you **pass to $compile**, then the DOM node returned from the linking function will be the comment node and you will lose the ability to access the template and transcluded content.

```javascript
var node = $compile('<div><div element-transclude></div></div>')($rootScope);
var contents = node.contents();
expect(contents[0].nodeType).toEqual(node.COMMENT_NODE);
expect(contents[1].nodeType).toEqual(node.ELEMENT_NODE);
```

[back to top](#top)

#### Testing Directives that use templateUrl

-  [karma-ng-html2js-preprocessor](https://github.com/karma-runner/karma-ng-html2js-preprocessor) to pre-compile HTML templates and thus avoid having to load them over HTTP during test execution 
-  karma-ng-html2js-preprocessor converts HTML files into JS strings and generates Angular modules

[How to Test Directives That Use templateUrl](http://tylerhenkel.com/how-to-test-directives-that-use-templateurl/)
[Testing With AngularJS Part 2: Other Useful Karma Plugins](https://www.credera.com/blog/custom-application-development/testing-angularjs-part-2-useful-karma-plugins/)

1. install `npm install karma-ng-html2js-preprocessor --save-dev`
2. enable preprocessing by add following to karma conf

```json
preprocessors: {
    'app/views/**/*.html': 'html2js'   //location of templates
},
```

3. Fixing the Template Cache in karma confi

- AngularJS maintains a cache of all html files it has converted into angularjs templates. The caches object keys are the urls of the template files as downloaded from the server. Because our urls will differ in the testing folder from the runtime folder, we have a problem.
- When AngularJS tries to load the template it will never be found because it will try to access it from 'views/templates/directive-tmp.html', but the path to the template is currently 'app/views/templates/directive-tmp.html'

```json
ngHtml2JsPreprocessor: {
    stripPrefix: 'app/'   // strip app from the file path
},
```

4. Add the Templates Location in karma confi

```json
files: [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-animate/angular-animate.js',
    'app/bower_components/angular-route/angular-route.js',
    'app/bower_components/angular-mocks/angular-mocks.js',
    'app/scripts/*.js',
    'app/scripts/**/*.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js',
    //location of templates
    'app/views/**/*.html'
],
```

5. Include the Template in Your Test: `beforeEach(module('views/templates/directive-tmp.html'));`

[back to top](#top)

### directive with a controllerAs - only test method in controller

```javascript
angular.module('customer').directive('customer-greeting', function(){
    return{
        scope:{},
        restrict:'E',
        templateUrl:'greeting.html',
        bindToController:{message:'@',id:'@'},
        controller:'customerGreetingController',
        controllerAs:'customerGreetingController'
    };
});
// test code
describe('CustomerDirective', function(){
    var customerService;
    var $controller;
    beforeEach(function(){
        module('customer');
        inject( function($injector){
            customerService = $injector.get('customer-service');
            $controller = $injector.get('$controller');
            spyOn(customerService,['getCustomerById']).and.returnValue({firstName:'Joe'});
        });
    });
    it('should create greeting', function(){
        var ctrl = $controller('customerGreetingController', {customerService:customerService},{message:'greetings'});
        expect(ctrl.greeting).toBe('greetings Joe!');
    });
    it('should add purchased item', function(){
        var ctrl = $controller('customerGreetingController', {customerService:customerService},{message:'greetings'});
        ctrl.purchaseItem('Milk');
        ctrl.purchaseItem('Bread');
        expect(ctrl.items.length).toBe(2);
        expect(ctrl.items[0]).toBe('Milk');
        expect(ctrl.items[1]).toBe('Bread');
    });
});
```

[back to top](#top)

- https://docs.angularjs.org/guide/unit-testing
- Testing With AngularJS Part 2: Other Useful Karma Plugin
- [Comprehensive Guide To Unit Testing In AngularJS](http://www.syntaxsuccess.com/viewarticle/comprehensive-guide-to-unit-testing-in-angularjs)
