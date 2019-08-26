[AngularJS and Accessibility](#top)

- [Good document structure](#Good-document-structure)
- [Where you’ve defined your application routes, you’ll need to add in a title property to your routes](#Where-youve-defined-your-application-routes-youll-need-to-add-in-a-title-property-to-your-routes)
- [Keyboard navigation](#Keyboard-navigation)
  - [use a button for clickable interface items instead of div](#use-a-button-for-clickable-interface-items-instead-of-div)
  - [links](#links)
  - [Search/filter](#Searchfilter)
- [Focus Management](#Focus-Management)
  - [focus in toaster](#focus-in-toaster)
- [ARIA live and two-way binding of angularJS](#ARIA-live-and-two-way-binding-of-angularJS)
- [Others](#Others)

## Good document structure

## Where you’ve defined your application routes, you’ll need to add in a title property to your routes

SPA changing from view to view. These views should be interpreted as changes in web application pages. So, just like any other web application, the page title should change with each new view, keeping people in the loop about where they currently are in the application at all times.

```javascript
.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            title: 'Accessibility Ticket Tracker'
        })
        .when('/edit/:id', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            title: 'Edit Ticket'
        })
        .otherwise({
            redirectTo: '/main'
        });
})
```

## Keyboard navigation

### use a button for clickable interface items instead of div

`<input type="button" value="Cancel" class="btn btn-primary" ng-click="go('main')">`

###  links

- give each link a unique destination that will register with screen readers
- use visually hidden text that screen readers have access to (that isn’t displayed) to convey the state of the link

```html
<a href="#expandDetails-{{ ticket.$id }}" ng-click="toggleTicketDetails($event,$index)">
    {{ ticket.summary  }}
    <span class="visuallyhidden">{{ index==$index ? " - click to hide details" : " - click to show details"}}</span>
</a>
<style>
  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute !important;
  }
</style>
```

### Search/filter

```html
<input type="text" id="ticket-filter" ng-model="search" class="search-query" placeholder="Search">
<tr ng-repeat="(id, ticket) in tickets | filter:search" id="{{ticket.$id}}" set-last-ticket-id-focus>
  <!-- ...  -->
</tr>
<script>
//1) we can just add a variable to $rootScope that can be accessed between controllers
.run(['$location', '$rootScope', function($location, $rootScope) {
  //...
  $rootScope.search = "";
  //...
})
//2) set search model to the root search property and repopulate the search input element
.controller('MainCtrl', function ($scope, $rootScope, Tickets, Flash) {
    $scope.search = $rootScope.search;
});
//3) watches for updates to the value of the search model and updates our root level search property
// Watch when search field is updated and update global search variable
$scope.$watch("search", function(newValue, oldValue) {
    $rootScope.search = $scope.search;
});
</script>
```

[back to top](#top)

## Focus Management

**General method**

- The use of JavaScript to set focus to form elements and links, `.focus()`
- The ability to give any element a tabindex of -1 or 0, which will then also enable JavaScript to set focus to it
  - The -1 indicates that only JavaScript can set focus to that element

**AngularJS special**

- have to check for a previous route. If this is the first time the page loads, we don’t want to skip the header content and set focus to the h1

```javascript
myApp.run(['$location', '$rootScope', function($location, $rootScope) {
    //...
    var history; // stores uri of last page viewed - Used to track if we should set focus to main H1
    var currentURL; // store uri of current page viewed - Used to track if we should set focus to main H1
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {  // focus when switch between the views
        // Test for current route
        if(current.$$route) {
            // store current path
            currentURL = current.$$route.originalPath;
            // set page title to current route record
            $rootScope.title = current.$$route.title;
        }
        // When navigating between pages track the last page we were on
        // to know if we should be setting focus on the h1 on view update
        if(previous) {
            if(previous.$$route){
                history = previous.$$route.originalPath;
            }
        }
    });
    $rootScope.$on('$viewContentLoaded', function () {
        // Once the template loads set focus to the h1 to manage focus
        // if there is no history do not adjust focus this is the first page the user is seeing
        if(history) {
            $('h1').attr("tabIndex", -1).focus();   // Default - set page focus to h1
        }
    });
}]);
//In the controller, we create a “go” method that binds to the cancel button and sends people back to the main ticket list
.controller('EditCtrl', function ($scope, $rootScope ,$location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Flash) {
    // Add record to scope -- ticket object is coming from Firebase DB
    $scope.tickets = ticketsObject;
    //...
    // track record id so that we can set focus back to edit button if user hits cancel
    $rootScope.lastTicketID = $scope.tickets.$id;
    //...
    $scope.go = function (path) {  // In the controller, we create a “go” method that binds to the cancel button and sends people back to the main ticket list
        $rootScope.lastForm = "edit";  // indicate last form viewed
        $location.path(path);  // send user to path provided in ng-click
    };
})
//3) add the directive to the ng-repeat
<tr ng-repeat="(id, ticket) in tickets | orderBy:['firstName'] | filter:search" id="{{ticket.$id}}" set-last-ticket-id-focus>
  ...
</tr>
//4) define directive- using the $last property to check if we’ve iterated to the last element in the ng-repeat
.directive('setLastTicketIdFocus', function($timeout, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true && $rootScope.lastTicketID != "") {
                $timeout(function () {
                    if($rootScope.flashMsg == "" && $rootScope.lastForm == "edit"){
                        //set focus to the edit button within the table row with the ID of our ticket database ID by using JQuery
                        $("#" + $rootScope.lastTicketID + " .edit-btn").focus();
                        $rootScope.lastTicketID = "";
                        $rootScope.lastForm = "";
                    }
                });
            }
        }
    }
})
```

- With Angular, there’s a delay between when the route is set and when the view is actually rendered. If we try to set focus before the view is rendered, focus will be lost again

```javascript
$('h1').attr("tabIndex", -1)
$('h1').focus();
//or
$('h1').attr("tabIndex", -1).focus();
//
myApp.run(['$location', '$rootScope', function($location, $rootScope) {
    var history; // stores uri of last page viewed - Used to track if we should set focus to main h1
    var currentURL; // store uri of current page viewed - Used to track if we should set focus to main h1
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		//...
    });
    $rootScope.$on('$viewContentLoaded', function () {
        // Once the template loads set focus to the h1 to manage focus
        // if there is no history do not adjust focus this is the first page the user is seeing
        if(history) {
            // Default - set page focus to h1
            $('h1').attr("tabIndex", -1).focus();
        }
    });
}]);
```

- displaying ticket details- expand/collapse operation
  - set details to a show-and-hide panel by using `display: none/block`
  - using `class="visuallyhidden"` to hide details text
  - using `ng-class` in template
  - use `focus()` in main controller

```html
<style>
tr .ticket-details { display: none; }
tr .showdetails .ticket-details { display: block; }
.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute !important;
}
</style>
<tr ng-repeat="(id, ticket) in tickets | orderBy:['firstName'] | filter:search" id="{{ticket.$id}}" set-last-ticket-id-focus>
    <!-- using ng-class in template -->
  <th scope="row" ng-class="{showdetails:index==$index}" id="ticket-{{$index}}">
    <h3>
      <a href="#expandDetails-{{ ticket.$id }}" ng-click="toggleTicketDetails($event,$index)">
        <span class="glyphicon glyphicon-{{ index==$index ? 'minus' : 'plus' }}-sign"  aria-hidden="true"></span>
          {{ ticket.summary  }}
        <span class="visuallyhidden">{{ index==$index ? " - click to hide details" : " - click to show details"}}</span>
      </a>
    </h3>
    <div class="ticket-details">
      <h4>Description:</h4>
      <span>{{ticket.description}}</span>
      <h4>Recommended Fix:</h4>
      <span>{{ticket.fix}}</span>
    </div>
  </th>
  <!-- ... -->
</tr>
<script>
.controller('MainCtrl', function ($scope, $rootScope, search, Tickets, Flash, $timeout) {
 	//...
    // track toggle state of record details - sets scope index to current index
    // uses ng-class to display table row indexes
    $scope.toggleTicketDetails = function (e, index) {
        if ($scope.index == index) {
            delete $scope.index;
        } else {
            $scope.index = index;
        }
        e.preventDefault();
        // Add delay to allow time for element to render then set focus to header
        $timeout(function() {
            $('#ticket-'+ index + " h4").first().attr("tabIndex",-1).focus()
        });
    };
    //...
})
</script>
```

### focus in toaster

set the focus on toaster once they are displayed

```javascript
//1)  creae a factory to store and and queue toast messages used on save and create
.factory("Toast", function($rootScope) {
    var queue = [];
    var currentMessage = "";
    $rootScope.toastMsg = currentMessage;
    $rootScope.$on("$viewContentLoaded", function() {
        currentMessage = queue.shift() || "";
    });
    return {
        setMessage: function(message) {
            queue.push(message);
            $rootScope.toastMsg = message
        },
        getMessage: function() {
            return currentMessage;
        },
        clearMessage: function($event) {
            currentMessage = "";
            $rootScope.toastMsg = "";
            $event.preventDefault();
            $('h1').attr("tabIndex",-1).focus();
        }
    };
})
//2) use factory in controller
.controller('EditCtrl', function ($scope, $rootScope ,$location, $routeParams, $firebase, fbURL, WcagscService, SeverityLevelService, Toast) {
	//...
    // Clear any toast variables we have stored
    Toast.setMessage("");
    // Handle form submits (with errors)
    $scope.edit = function (inValid) { // invalid is passed from angulars form processing
        if (inValid) {
			//...
        } else {
            // If form has no errors - save results to database
            var edit = $scope.tickets.$save();
            // check that submit was successful
            if (edit) {
                // if submit was successful
                // set toast message to be displayed
                Toast.setMessage("Record saved!");
                // send user to main screen
                $location.path("#/main");
            } else {
                // if not successful warn user
                alert('something went wrong');
            }
        }
    }
})
//3) include the Toast factory to main controller and make the toast message property available to view
.controller('MainCtrl', function ($scope, $rootScope, search, Tickets, Flash,lastTicketIdTracker) {
    $scope.flash = Flash;
	//...
})
//4) check in the view using ng-show to see if there is a toast message
<div id="toast-message" class="alert alert-success" ng-show="toast.getMessage()">
  <p>
    <a href="#clearAlertMessages" ng-click="toast.clearMessage($event);">
      <strong>Success:</strong> {{flash.getMessage()}}
      <span class="glyphicon glyphicon-remove" style="float:right" aria-hidden="true"></span>
      <span class="visuallyhidden">Click to hide message</span>
    </a>
  </p>
</div>
//5) Set focus on view update. Provide custom page titles on route change
myApp.run(['$location', '$rootScope', function($location, $rootScope) {
	//...
    $rootScope.$on('$viewContentLoaded', function () {
        if(history) {
			//...
        }
        // If there is a flash message set focus to it - trumps all focus
        if($rootScope.flashMsg != ""){
            $('#flash-message a').attr("tabIndex", 0).focus();
        }
    });
}]);
//6)
```

- also use `aria-hidden="true"` on the glyphicon span tag to hide it from assistive technologies. This prevents some screen readers from announcing an interpretation of the Unicode character used for the graphic icon

[back to top](#top)

## ARIA live and two-way binding of angularJS

- use the aria-live attribute to keep our audience in the loop about interface updates
- `aria-alive="true"` will announce the updates once the screen reader finishes a current task
- `aria-atomic="true"` attribute indicates that the whole line should be read— not just the text sections that have changed
- `{{(tickets|filter:search).length}}` is a neat trick to learn the number of records that our filter is returning

```html
<div role="status" id="ticket-table-info" aria-live="polite" aria-atomic="true">Showing {{(tickets|filter:search).length}} of {{tickets.length}}</div>
```


[back to top](#top)
## Others

```
ng-click="vm.goToAccount(item.accountId); $event.stopPropagation();"
```

[back to top](#top)

> Reference
- [Single page applications, Angular.js and accessibility](https://simplyaccessible.com/article/spangular-accessibility/)
- [Angular documentation outlining how to implement ngAria](https://docs.angularjs.org/api/ngAria)
- dequelabs’ [ngA11y](https://github.com/dequelabs/ngA11y)
- Dirk Ginader’s [Making your Angular.js Application accessible](http://www.slideshare.net/ginader/angularjs-accessibilty)
