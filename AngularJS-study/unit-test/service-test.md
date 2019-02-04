[Service](#top)

- [Simple Service](#simple-service)
- [Simple service with dependency on another simple service](#simple-service-with-dependency-on-another-simple-service)
- [Service with dependency on asynchronous service](#service-with-dependency-on-asynchronous-service)
- [Mocking entire services](#mocking-entire-services)

## Simple Service

```javascript
angular.module('math',[]).factory('add-service',[
   function(){
       function add(o1,o2){
           return o1 + o2;
       }
       return {add:add};
   }
]);
//Test fixture
describe('add', function(){
    var addService;
    beforeEach(function(){
        module('math');
        inject( function($injector){
            addService = $injector.get('add-service');
        });
    });
    it('should add two numbers', function(){
        var result = addService.add(5,5);
        expect(result).toBe(10);
    });
});
```

[back to top](#top)

## Simple service with dependency on another simple service

```javascript
angular.module('customer').factory('customer-formatting-service',[
    'customer-service',
    function(customerService){
        function getFormattedCustomerInfo(customerId){
            var customer = customerService.getCustomerById(customerId);
            return customer.firstName + ' ' + customer.lastName + ' Total Sales: $' + customer.totalSales
        }
        return {getFormattedCustomerInfo:getFormattedCustomerInfo};
    }
]);
//Test fixture
describe('getFormattedCustomerInfo', function(){
    var customerService;
    var customerFormattingService;
    beforeEach(function(){
        module('customer');
        inject( function($injector){
            customerService = $injector.get('customer-service');
            customerFormattingService = $injector.get('customer-formatting-service');
            spyOn(customerService,['getCustomerById']).and.returnValue({firstName:'Joe',lastName:'Smith',totalSales:50});
        });
    });
    it('should return formatted customer information', function(){
        var formatted = customerFormattingService.getFormattedCustomerInfo(1);
        expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
        expect(formatted).toBe('Joe Smith Total Sales: $50');
    });
});
```

[back to top](#top)

## Service with dependency on asynchronous service

```javascript
angular.module('customer').factory('customer-formatting-service-async',[
    'customer-service',
    function(customerService){
        function getFormattedCustomerInfo(customerId){
            return customerService.getCustomerById(customerId)
            .then(function(customer){
                return customer.firstName + ' ' + customer.lastName + ' Total Sales: $' + customer.totalSales;
            })
            .catch(function(e){
                return {error:e};
            });
        }
        return {getFormattedCustomerInfo:getFormattedCustomerInfo};
    }
]);
//Test fixture
describe('getFormattedCustomerInfo-async', function(){
    var customerService;
    var customerFormattingService;
    var $q;
    var $scope;
    beforeEach(function(){
        module('customer');
        inject( function($injector){
            customerService = $injector.get('customer-service');
            customerFormattingService = $injector.get('customer-formatting-service-async');
            $q = $injector.get('$q');
            $scope = $injector.get('$rootScope').$new();
        });
    });
    it('should return formatted customer information based on async call', function(done){
        spyOn(customerService,['getCustomerById']).and.returnValue($q.when({firstName:'Joe',lastName:'Smith',totalSales:50}));
        customerFormattingService.getFormattedCustomerInfo(1).then(function(formatted){
            expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
            expect(formatted).toBe('Joe Smith Total Sales: $50');
            done();
        });
        $scope.$digest();
    });
    //error test
    it('should handle error from async call', function(done){
        spyOn(customerService,['getCustomerById']).and.returnValue($q.reject('api error'));
        customerFormattingService.getFormattedCustomerInfo(1).then(function(e){
            expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
            expect(e).toEqual({error:'api error'});
            done();
        });
        $scope.$digest();
    });
```

[back to top](#top)

## Mocking entire services

- spy method is to mock piecemeal by spying on individual methods
- to mock entire service, we just use $provide method

```javascript
describe('show how to use $provide', function(){
        var customerFormattingService;
        var customerServiceMock = {
            getCustomerById:function(){return {firstName:'Joe',lastName:'Smith',totalSales:50}},
            getCustomerByPhoneNumber:function(){},
            getCustomerByName:function(){}
        };
        beforeEach(module('customer', function($provide) {
            $provide.factory('customer-service', function(){return customerServiceMock;});
        }));
        beforeEach(function(){
            inject( function($injector){
                customerFormattingService = $injector.get('customer-formatting-service');
            });
        });
        it('should show how to define a mock using $provide', function(){
            var formatted = customerFormattingService.getFormattedCustomerInfo(1);
            expect(formatted).toBe('Joe Smith Total Sales: $50');
        });
    });
```

[back to top](#top)

http://www.syntaxsuccess.com/viewarticle/comprehensive-guide-to-unit-testing-in-angularjs
