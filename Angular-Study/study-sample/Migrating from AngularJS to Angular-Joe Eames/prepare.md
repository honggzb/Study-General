[Migration from AngularJS1.x to Angular2+](#top)

## Migration Overview

### Overview

![](https://i.imgur.com/g1B31QQ.png)

1. Follow the style guide -[Angular Style Guide-johnpapa](https://github.com/johnpapa/angular-styleguide)
   1. use controllAs
2. Update to the Latest Version of Angular 1
3. All new Development with components:
   1. components is new feature in angularJS 1.5
4. Switch controllers to components
5. Remove Invompatible features from directives
   1. Compile,
   2. Terminal,
   3. Priority,
   4. Replace: remove all `transclude: true` in directive or component
6. Switch component directives to components

```javascript
// old component directive
angular.module('app').directive('detailPanel', function() {
  return {
    restrict: 'E',
    templateUrl: '/components/detailPanel.html',
    replace: true,
    scope: {
      title: '@',
      initialCollapsed: '@collapsed'
    },
    controllerAs: 'vm',
    bindToController: true,
    controller: function() {
      this.collapsed = (this.initialCollapsed === 'true');

      this.collapse = function() {
        this.collapsed = !this.collapsed;
      }
    }
  }
})
//new
angular.module('app').component('detailPanel', {
  transclude: true,
  templateUrl: '/components/detailPanel.html',
  bindings: {   //change to bindings
    title: '@',
    initialCollapsed: '@collapsed'
  },
  controllerAs: 'vm',
  controller: function() {
    this.collapsed = (this.initialCollapsed === 'true');

    this.collapse = function() {
      this.collapsed = !this.collapsed;
    }
  }
});
```

7. Implement Manual Bootstraping
   1. remove `ng-app="app"` in `<html ng-app="app">`  -> `<html>`
   2. add following code in app.js

```javascript
angular.element(document).ready(function(){
  angular.bootstrap(document.body, ['app'])
})
```

8. Add TypeScript & a Build
   1. overview of Typescript
      1. superset of Javascript
      2. Types: `var myname: string = 'Joe';`, `var person: {} = {name: 'Joe'}`
      3. Typescript class and interface
   2. `npm i typescript@2.3.4 @types/angular@1.6.26 @types/core-js@0.9.42 @types/jasmine@2.5.53 --save-dev`
   3. add `"tsc": "tsc -p . -w"` into package.json
   4. create tsconfig.json in root directory
   5. change all .js to .ts
   6. change vs code setting
      1. file -> references -> settings -> workspace settings
      2. add following code
   7. `npm run tsc`
9.  Start using ES6
    1.  variable declarations: `let`, `const`
    2.  `this` and arrow function and variable declarations
    3.  destructuring: `var obj = {a:3, b:4}; var {a,b} = obj;`
    4.  classes
10. Switch controllers to ES6 Classes

```javascript
  //before
  controller: function($location, currentIdentity, auth, toastr) {
    if(currentIdentity.authenticated()) {
      $location.path('/home');
    }
    this.login = function() {
      auth.login({
        username: this.email,
        password: "pass"
      }).then(function() {
        $location.path('/home');
      }, function(err) {
        toastr.error(err);
      })
    }
  }
})
//after
controller: class LoginCtrl{
    $location: any;
    auth: any;
    toastr: any;
    email: string;
    constructor($location, currentIdentity, auth, toastr) {
      this.$location = $location,
      this.auth = auth;
      this.toastr = toastr;
      if(currentIdentity.authenticated()) {
        $location.path('/home');
      }
    }
      login() {
        this.auth.login({
          username: this.email,
          password: "pass"
        }).then(() => {   //need change to arrow function or bind(this)
          this.$location.path('/home');
        }, (err) => {
          this.toastr.error(err);
        })
      }
  }
})
```

11. Switch services to ES6 Classes
    1.  switch all callback function to arrow function
    2.  change others

```javascript
/* convert multiple function service to classes*/
//before
angular.module('app').factory('auth', function($q, $http, currentIdentity) {
  return {
    login: function(credentials) {
      var dfd = $q.defer();
      $http.post('/api/login', credentials).then((response) => {
        currentIdentity.setUser(response.data.user);

        dfd.resolve();
      }, function(response) {
        dfd.reject("Invalid Credentials");
      })
      return dfd.promise;
    },
    logout: function() {
      var dfd = $q.defer();
      $http.post('/api/logout').then((response) => {
        currentIdentity.clearUser();
        dfd.resolve();
      }, function(response) {
        dfd.reject("Error Logging Out");
      })
      return dfd.promise;
    },
  //...
  }
})
//after
angular.module('app').factory('auth', class Auth {
  $q: any;
  $http: any;
  currentIdentity: any;
  constructor($q, $http, currentIdentity) {
    this.$q = $q;
    this.$http = $ http;
    this.currentIdentity = currentIdentity;
  }
  login(credentials) {
    var dfd = this.$q.defer();
    this.$http.post('/api/login', credentials).then(response => {
      this.currentIdentity.setUser(response.data.user);
      dfd.resolve();
    }, response => {
      dfd.reject("Invalid Credentials");
    })
    return dfd.promise;
  }
  logout() {
    var dfd = this.$q.defer();
    this.$http.post('/api/logout').then((response) => {
      this.currentIdentity.clearUser();
      dfd.resolve();
    }, function (response) {
      dfd.reject("Error Logging Out");
    })
    return dfd.promise;
  }
  //...
})
/*2) function service */
angular.module('app').factory('parseNames', function() {
  return function(blobInput) {
    var lines = blobInput.split(/\r?\n/);
    lines.forEach(function(line, idx) {
      var pieces = line.split('|');
      lines[idx] = {
        email: pieces[0],
        firstName: pieces[1],
        lastName: pieces[2]
      }
    })
    return lines;
  }
})
//implemetation service
angular.module('app').component('createUsers', {
  templateUrl: '/admin/createUsers.html',
  bindings: {
  },
  controller: function(parseNames, users, toastr) {
    this.import = function() {
      var people = parseNames(this.namesblob);
      people.forEach((function(person) {
        console.log(person);
      users.createNewUser({
          email: person.email,
          password: "pass",
          firstName: person.firstName,
          lastName: person.lastName
        }).catch(function(error) {
          toastr.error("User already exists: " + person.email)
        }.bind(this))
      }).bind(this));
      toastr.success("Users Created!")
    }
  }
})
// create a new ts file - nameParser.ts
angular.module('app').factory('nameParser', class NameParser {
  parse(blobInput) {
    var lines = blobInput.split(/\r?\n/);
    lines.forEach(function(line, idx) {
      var pieces = line.split('|');
      lines[idx] = {
        email: pieces[0],
        firstName: pieces[1],
        lastName: pieces[2]
      }
    })
    return lines;
  }
})
//implemetation service
angular.module('app').component('createUsers', {
  templateUrl: '/admin/createUsers.html',
  bindings: {
  },
  controller: function(NameParser, users, toastr) {
    this.import = function() {
      var people = NameParser.parse(this.namesblob);
      people.forEach((function(person) {
        console.log(person);
      users.createNewUser({
          email: person.email,
          password: "pass",
          firstName: person.firstName,
          lastName: person.lastName
        }).catch(function(error) {
          toastr.error("User already exists: " + person.email)
        }.bind(this))
      }).bind(this));
      toastr.success("Users Created!")
    }
  }
})
```

## VS code setting

```json
//tsconfig.json
{
    "compilerOptions": {
      "target": "ES5",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "lib": ["es2017", "dom"]
    },
    "exclude": [
      "node_modules"
    ]
}
// file -> references -> settings -> workspace settings
"file: excludes": {
    "migrationDemo/public/**/*.js": {"when": "$(basename}.ts"},
    "migrationDemo/public/**/*.map": true
}
```

> Note: Angular 1: Types of directives
- Component
  - represented by an Element
  - has a template
  - should use isolate scope
  - most common custom directive
- Decorator
  - represented by an attribute
  - has no template
  - should use shared scope
  - uncommon custom directive
- Structural: `<div ng-repeat="user in users">{{user.name}}</div>`
  - adds or removes nodes
  - almost nver created

```html
<!-- Component Directive -->
{
    restrict: 'E',
    templateUrl: '/...',
    scope: {},
    controller: ...
}
<div>
    <user-panel user="currentUser"></user-panel>
</div>
<!-- Decorator Directive -->
{
    restrict: 'A',
    link: ...
    controller: ...
}
<div blink>This is some content that I want to blick</div>
```

### Preparing your code

- Difficult point
  - Inherited scope
  - certain Directive Features
  - Using $rootScope

[back to top](#top)

## ui-router Migration to component

```javascript
// 1) change all controller in angularJS to components
.component('users', {
  templateUrl: '',
  bindings: {
    // input binding from the component's `users` attribute to the internal `users` property of the controller
    users: '<'
  },
  controllerAs: 'vm',
  controller: function() {

  };
});
// 2) Update the state definition
.state('userlist', {
  url: '/users',
  component: 'users',    // The component's name
  resolve: {
    users: function(UserService) {
      return UserService.list();
    }
  }
});
```

> Reference
- [Migrating AngularJS UI Router to Angular Router](https://gist.github.com/zaenk/21e8bee3071f339aed27f411822bb8d9)
- https://ui-router.github.io/guide/ng1/route-to-component
