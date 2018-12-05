## Smooth transition for scrolled view amd Modal

the [Angular 1.3 animation services states](https://code.angularjs.org/1.3.18/docs/api/ngAnimate):

- `ng-enter` class will be added on "entering" elements
- `ng-enter-active` class will be added on "entered" elements
- `ng-leave` class will be added on "leaving" elements
- `ng-leave-active` will be added on "left" elements

[the method we recommended for smooth transitions](https://codepen.io/Javarome/blog/hardware-accelerated-transitions-for-mobile)

```scss
.scrolled {
  transition: transform $duration ease;
  transform: translate3d(0, 0, 0);
  &.ng-enter {
    transform: translate3d(
      100%,
      0,
      0
    ); // Move to the right (up to 100% of width)
  }
  &.ng-enter-active {
    transform: translate3d(0, 0, 0);
  }
  &.ng-leave {
    transform: translate3d(0, 0, 0);
  }
  &.ng-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
}
.backward {
  .scrolled {
    &.ng-enter {
      transform: translate3d(-100%, 0, 0);
    }
    &.ng-enter-active {
      transform: translate3d(0, 0, 0);
    }
    &.ng-leave {
      transform: translate3d(0, 0, 0);
    }
    &.ng-leave-active {
      transform: translate3d(100%, 0, 0);
    }
  }
}
// combining both opacity and scaling
.modal {
  transition: opacity 1s ease, transform 1s ease;
  opacity: 1;
  &.ng-enter {
    opacity: 0;
    transform: scale(0.95) translate3d(0, 0.5em, 0);
  }
  &.ng-enter-active {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
  &.ng-leave {
    opacity: 1;
  }
  &.ng-leave-active {
    opacity: 0;
  }
}
.backward {
  .modal {
    transition: opacity 1s ease, transform 1s ease;
    opacity: 1;
    &.ng-enter {
      opacity: 0;
      transform: scale(1) translate3d(0, 0, 0);
    }
    &.ng-enter-active {
      opacity: 1;
      transform: scale(1) translate3d(0, 0, 0);
    }
    &.ng-leave {
      opacity: 1;
      transform: scale(1) translate3d(0, 0, 0);
    }
    &.ng-leave-active {
      opacity: 0;
      transform: scale(0.95) translate3d(0, 0.5em, 0);
    }
  }
}
```

```
+-------------------------------------------+
|                   HEADER                  |
|------+------------------------------------|
|      |                                    |
| Menu |        CONTENT                     |
|      |                                    |
+------+------------------------------------+
```

```html
<!-- main -->
<html ng-app="scrollDemo">
  <body>
    <header>menu bar
      <nav>
        <a ui-sref="page.1">Search</a>
        <a ui-sref="page.2">Results</a>
        <a ui-sref="page.3">Detail</a>
      </nav>
    </header>
    <div class="content">
      <div class="scroll">
        <ui-view></ui-view>
      </div>
    </div>
  </body>
</html>
<!-- main structure page, that define a global structure (header, menu, etc.) -->
<div id="page1">
  <h1>Search movie</h1>
  <form name="searchForm">
    <label for="searchInput">Title</label>
    <input id="searchInput" type="text" ng-model="searchText" required>
    <input type="submit" value="Fetch" ui-sref="page.2({q:searchText})">
  </form>
  <div ng-show="searching"><br>Searching for {{searchText}}...</div><br>
  <a ng-if="results" ui-sref="page.2">&gt; See latest results</a>
</div>
<!-- content -->
<div id="page2">
  <h1>Movies with "{{searchText}}\"</h1>
  <a ui-sref="page.1">&lt; back</a>  // Link back to first search page
  <div ng-show="searching"><br>Searching for {{searchText}}...</div>
  <ul>
    <li ng-repeat="movie in results">
      <a ui-sref="page.3({movieIndex:$index})">{{movie.title}}</a>
    </li>
  </ul>
</div>
<!-- every detail about a given movie -->
<div id="page3">
  <div movie="movie" base-url="{{baseUrl}}"></div>
  <a ui-sref="page.2">&lt; Results</a>
</div>
```

```javascript
angular.module('scrollDemo', ['ui.router', 'ngAnimate'])
    .config(function($stateProvider) {
        $stateProvider
            .state('page.1', {
                    url: '/page1',
                    templateUrl: '/Page1.html',
            })
            .state('page.2', {
                //Fetch before
                    url: '/page2?q',
                    templateUrl: '/Page2.html'
                    controller: function($scope, resolvedResults){
                        $scope.results = resolvedResults;
                    },
                    resolve: {
                        resolvedResults: function($stateParams){
                            return moveFetch($stateParams.q);
                        }
                    }
            })
            .state('page.3', {
                    url: '/page3',
                    templateUrl: '/Page3.html'
        });
    })
    .run(function($state, $rootScope) {
        $state.go('page.1');
    });
//Fetch data
$scope.movieFetch = function(movieTitle, page) {
  return $q(function(resolve) {
    $scope.searching = true;
    $http.jsonp('https://api.themoviedb.org/3/search/movie?query=' + movieTitle + '&callback=JSON\_CALLBACK')
      .success(function(data) {
        $scope.searching = false;
        resolve(angular.fromJson(data).results);
      })
    });
  };
//Fetch before
$stateProvider
  .state('page.2', {
    url: '/page2?:q',
    controller: function($scope, resolvedResults) {
      $scope.results = resolvedResults;
    },
    resolve: {
      resolvedResults: function($stateParams) {
        return movieFetch($stateParams.q);
      }
    }
  });
//Fetch after
$stateProvider
  .state('page.2', {
    url: '/page2?:q',
    controller: function($scope, $element, $stateParams) {
      $element[0].addEventListener('transitionend', function(event) {
        movieFetch($stateParams.q).then(function(data) {
          $scope.results = data;
        });
      }, false);
    }
  });
```
