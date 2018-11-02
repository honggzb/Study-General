[AngularJS 之 Factory vs Service vs Provider](#top)

- [Factory](#factory)
- [Service](#service)
- [Provider](#provider)

AngularJS提供了3种方法来创建并注册我们自己的 service。

| 方法     | 说明                                                                                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Factory  | 用Factory就是创建一个对象，为它添加属性，然后把这个对象返回出来。把service传进controller之后，在controller里这个对象里的属性就可以通过 factory 使用了                   |
| Service  | Service是用"new"关键字实例化的。因此，你应该给"this"添加属性，然后service 返回"this"。把 ervice传进controller之后，在controller里 "this"上的属性就可以通过service来使用 |
| Provider | Providers是唯一一种你可以传进.config()函数的service。当想要在service对象启用之前，先进行模块范围的配置，那就应该用provider                                              |

## Factory

- 创建一个对象，然后返回这个对象

```javascript
app.factory('myFactory', function($http, $q){
    var service = {};     //创建一个对象
    var baseUrl = '...';
    // private, 在controller中无法访问, 可定义setter和getter来修改private
    var _artist = '';  
    var _finalUrl = '';

    var makeUrl = function(){
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
        return _finalUrl;
    }

    service.setArtist = function(artist){
        _artist = artist;
    };
    service.getArtist = function(){
        return _artist;
    }

    service.callItunes = function(){
        markUrl();
        var deferred = $q.defer();
        $http({
            method: 'JSONP',
            url: _finalUrl
        }).success(function(data)){
            deferred.resolve(data);
        }).error(function(error){
            deferred.reject('There was an error')
        });
        return deferred.promise;
    }

    return service;   //返回这个对象
});

app.controller('myFactoryCtrl', function($scope, myFactory){
    $scope.data = {};
    $scope.updateArtist = function(){
        myFactory.setArtist($scope.data.artist);
    };
    $scope.submitArtist = function(){
        myFactory.callItunes()
                 .then(function(data){
                     $scope.data.artistData = data;
                 },function(data){
                     alert(data);
                 })
    };
});
```

## Service

- 创建一个Service时，通过new关键字实例化对象, 解释器会自动创建一个对象，并关联它的prototype对象，然后将该对象this返回

```javascript
app.service('myService', function($http, $q){
    var baseUrl = '...';
    var _artist = '';  
    var _finalUrl = '';

    var makeUrl = function(){
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
        return _finalUrl;
    }

    this.setArtist = function(artist){
        _artist = artist;
    };
    this.getArtist = function(){
        return _artist;
    }
    this.callItunes = function(){
        markUrl();
        var deferred = $q.defer();
        $http({
            method: 'JSONP',
            url: _finalUrl
        }).success(function(data)){
            deferred.resolve(data);
        }).error(function(error){
            deferred.reject('There was an error')
        });
        return deferred.promise;
    }
});
app.controller('myFactoryCtrl', function($scope, myService){
    $scope.data = {};
    $scope.updateArtist = function(){
        myFactory.setArtist($scope.data.artist);
    };
    $scope.submitArtist = function(){
        myService.callItunes()
                 .then(function(data){
                     $scope.data.artistData = data;
                 },function(data){
                     alert(data);
                 })
    };
});
```

## Provider

- Provider的最重要的事情是，可以传递到应用程序的app.config部分唯一的服务。如需要在你的服务对象可以在应用程序之外任何地方都可用之前改变它的某些部分，这是非常重要的
- 使用Provider创建一个service时，唯一的可以在控制器中访问的属性和方法是通过`this.$get()`函数返回内容
- 可以把Provider想象成由两部分组成
    - 第一部分的变量和函数是可以在app.config函数中访问的，可在它们被其他地方访问到之前来修改它们
    - 第二部分的变量和函数是可以在任何传入了’myProvider‘的控制器中进行访问的

```javascript
app.provider('myProvider', function(){
    var baseUrl = '...';
    var _artist = '';  
    var _finalUrl = '';

    var thingFromConfig = '';

    var makeUrl = function(){
        _artist = _artist.split(' ').join('+');
        _finalUrl = baseUrl + _artist + '&callback=JSON_CALLBACK';
        return _finalUrl;
    }
    //返回controller可以访问的属性和方法
    this.$get = function($http, $q){
        return {
            callItunes: function(){
                markUrl();
                var deferred = $q.defer();
                $http({
                    method: 'JSONP',
                    url: _finalUrl
                }).success(function(data)){
                    deferred.resolve(data);
                }).error(function(error){
                    deferred.reject('There was an error')
                });
                return deferred.promise;
            },
            setArtist: function(artist){
                _artist = artist;
            },
            getArtist: function(){
                return _artist;
            },
            thingOnConfig: thingFromConfig
        }
    };
});
app.controller('myFactoryCtrl', function($scope, myProvider){
    $scope.data = {};
    $scope.updateArtist = function(){
        myFactory.setArtist($scope.data.artist);
    };
    $scope.submitArtist = function(){
        myProvider.callItunes()
                 .then(function(data){
                     $scope.data.artistData = data;
                 },function(data){
                     alert(data);
                 })
    };
    $scope.data.thingFromConfig = myProvider.thingOnConfig;
});
//可以在myProvider对象传递到应用程序的其他部分之前对其继续修改，通过app.config
app.config(function(myProvider){
    myProvider.thingFromConfig = '...';
})
```

```html
<form name="test_form" ng-controller="TestCtrl">
  <input type="checkbox" name="a" ng-model="a" id="check" ng-checking="say()"/>
  <label for="check">{{ a }}</label>
</form>
<script>
var app = angular.module('Demo',[]);
app.directive('ngChecking',function(){
    var fun1 = function(element,attrs){
    return function(scope,iElement,iAttrs){
        scope.$watch('a',function(){
          if(iElement[0].checked){
            if(iAttrs['ngChecking']){            
              var fun = iAttrs['ngChecking'].match(/\w+()/g);
            scope[fun[0]]();
          }
        }
      })
    }
  }
    return {
        compile:fun1,
        restrict:'AE'
  }
})
app.controller('TestCtrl',function($scope){
    $scope.say = function(){
      alert(123)
  }
});
angular.bootstrap(document,['Demo']);
</script>
```

