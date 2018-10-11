[UI-Router for AngularJS 1.x](#top)

- [UI-Router Features](#ui-router-features)
- [Simple Sample](#simple-sample)
- [UI-Router States](#ui-router-states)
    - [State Properties](#state-properties)
    - [Nested States](#nested-states)
    - [States Lifecycle](#states-lifecycle)
- [UI-Router Views](#ui-router-views)
    - [Nested views](#nested-views)
    - [Multiple named uiviews](#multiple-named-uiviews)
        - [Targeting a named uiview](#targeting-a-named-uiview)
        - [Re-targeting a uiview from a nested state](#re-targeting-a-uiview-from-a-nested-state)
        - [Advanced view targeting](#advanced-view-targeting)
        - [All the other forms of view addressing](#all-the-other-forms-of-view-addressing)
- [Transitions](#transitions)
    - [Transition Lifecycle](#transition-lifecycle)
    - [Atomicity](#atomicity)
    - [Transition Object](#transition-object)
- [Transition Hooks](#transition-hooks)
    - [Overview](#overview)
    - [Return values](#return-values)
    - [Criteria object](#criteria-object)
    - [State-level hooks](#state-level-hooks)

## UI-Router Features

**UI-Router have three features**

- **States**:  UI-Router applications behave like a state machine. UI-Router applications are modeled as a tree of states
    - UI-Router provides state based routing. Each feature of an application is defined as a state. One state is active at any time, and UI-Router manages the transitions between the states
    - Each state describes the URL, the UI (a view or views), data prerequisites, and other logical prerequisites (such as authentication) for a feature. Before activating a state, UI-Router first fetches any prerequisites (asynchronously), and then activates the view(s) and updates the URL
    - UI-Router states are hierarchical; states can be nested inside other states, forming a tree
Child states may inherit data and behavior (such as authentication) from their parent states
- **views**: 
    - A state defines a feature’s UI (and UI behavior) using a view (or multiple views). **A view is a UI component**, which is placed into a viewport (`<ui-view>`) when the state is activated
    - Views can be **nested** inside other views. A parent state’s view can create a viewport (`<ui-view>`), and an nested state can fill that viewport with their own view when activated
    - Each state can have multiple named views, allowing complex layouts. A named view can target an arbitrary viewport, anywhere in the DOM (even outside the component hierarchy of the parent state). This can be used to fill (or override) named viewports such as footers, or nagivation, when some nested state is active
- **urls**: 
    - A state can define a URL, but **it isn’t required**. If a state has defined a URL, the browser’s location is updated to that URL when the state is active
    - **A state’s URL is actually a URL fragment**. Each state defines only the fragment (portion) of the URL that it “owns”. That fragment is appended to the parent state’s url in the browser URL when the nested state is active
  
**Features operations**

- parameters: 
    - A state can be parameterized
    - When a state needs specific data, such as which contact to edit, a parameter such as contactId may be defined. The parameter value can be encoded into the browser URL, e.g., url: 'http://myapp.com/edit/1234' where 1234 is the contactId
    - Parameters can be defined in three locations:
        - **Path**: in the URL's path: `/foo/{fooId}` matches '123' in `http://mysite.com/foo/123`
        - **Query**: in the URL's query string: `/foo?fooId` matches '123' in `http://mysite.com/foo?fooId=123`
        - **Non-url**: arbitrary parameter data may be passed programmatically, and not reflect in the URL
    - A parameter can be required or optional, When the parameter value is missing from the URL (for instance), the default parameter value will be used (instead of undefined, or empty string)
    - Default parameter values can be “squashed” from the URL
    - Parameters can be typed. Typed parameters are encoded as strings in the URL, but are converted to a native type when retrieved in javascript code. There are a few built in parameter types: string, int, bool, date, json. In addition, custom parameter types may be defined by the user with any encoding/decoding logic that is required.
- Resolve Data: 
    - to fetch a feature data from a server-side API. Often, that data is represented as an ID in a url parameter.
    - The **resolve mechanism** allows data retrieval to be a first class participant in the transition. When a state is being entered, its resolve data is fetched. If any of the resolve promises are rejected (perhaps due to a 401, 404, or 500 server response from a REST API), then the transition’s promise is rejected and the error hooks are invoked (This enables robust error handling for applications, and helps to avoid leaving the application in an inconsistent state)
    - **The resolve system is effectively an asynchronous, hierarchical dependency injection system**
        - Resolve data is declarative. A state defines what data should be fetched (generally by delegating to a service)
        - A resolve may depend on some other resolve’s result (within the same state, or from any ancestor state)
        - The resolve process is asynchronous. If a resolve returns a Promise, the transition is suspended until the promise is settled. Because of this, the resolve data participates in the transition lifecycle
        - Resolve data is made available to the views, as well as transition hooks
- Transitions:
    - Navigating between parts of the application occurs by transitioning from one state to another. Transitions between states are transaction-like, i.e., they either completely succeed or completely fail
    - If the app’s current state is `contacts` and the user wants to switch to the `prefs` state, the UI-Router state machine creates and runs a **Transition** from the `contacts` state to the `prefs` state
    - Transitions are essentially **atomic**. When transitioning from contacts to prefs, either the entire transition succeeds and the application’s current state is now prefs, or the entire transition fails and the application remains in the contacts state
    - API documentation for [TransitionService](https://ui-router.github.io/docs/latest/classes/transition.transitionservice.html)

[back to top](#top)

## Simple Sample

**Get UI-Router**

```shell
npm install --save @uirouter/angularjs
# or Using bower
bower install angular-ui-router
```

**index.html**

```html
<html>
  <head>
    <script src="lib/angular.js"></script>
    <script src="lib/angular-ui-router.js"></script>   <!-- Add script tags -->
    <script src="helloworld.js"></script>
    <style>.active { color: red; font-weight: bold; }</style>  <!-- Add active css class to actived target -->
  </head>
  <body ng-app="helloworld">
    <!-- ui-sref is a directive -->
    <!-- ui-sref-active="active" add the active css class to the link when the target state is active -->
    <a ui-sref="hello" ui-sref-active="active">Hello</a>  
    <a ui-sref="about" ui-sref-active="active">About</a>
    <ui-view></ui-view>  
    <!-- Add <ui-view> tags, UI-Router viewport. When a state is activated, the state’s view (the template:) will be loaded into the viewport -->
  </body>
</html>
```

**helloworld.js**

```javascript
var myApp = angular.module('helloworld', ['ui.router']);
myApp.config(function($stateProvider) {
  //Create state(view declaration)
  var helloState = {   //When the hello state is activated, the HelloComponent is rendered
    name: 'hello',
    url: '/hello',
    template: HelloComponent
  }
  var aboutState = {   //When the about state is activated, the AboutComponent is rendered
    name: 'about',
    url: '/about',
    template: AboutComponent
  }
  //Register states
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
```

[back to top](#top)

## UI-Router States

Each feature of an application as a set of states. Only one state can be active at one time. The user can transition from one state to another, to activate a different feature of the application

### State Properties

Properties|Explation
---|---
name|A name for the state, providing a way to refer to the state
views|How the UI will look and behave
url|What the browser’s URL will be
params|Parameter values that the state requires (such as blog-post-id)
resolve|The actual data the state requires<br> (often fetched, asynchronously, from the backend using a parameter value)

- `$stateProvider.state(stateName, stateConfig)`
    - stateName是string类型
    - stateConfig是object类型, statConfig可以为空对象
    - stateConfig包含的字段：template, templateUrl, templateProvider, controller, controllerProvider, resolve, url, params, views, abstract, onEnter, onExit, reloadOnSearch, data
- `$urlRouteProvider`
    - $urlRouteProvider.when(whenPath, toPath)
    - $urlRouterProvider.otherwise(path)
    - $urlRouteProvider.rule(handler)
- `$state.go(to, [,toParams],[,options])`
    - to是string类型，必须，使用"^"或"."表示相对路径；
    - toParams可空，类型是对象；
    - options可空，类型是对象，字段包括：location为bool类型默认true,inherit为bool类型默认true, relative为对象默认$state.$current,notify为bool类型默认为true, reload为bool类型默认为false
- `ui-sref`
    - `ui-sref='stateName'`
    -` ui-sref='stateName({param:value, param:value})'`

```javascript
/* $stateProvider.state(stateName, stateConfig) */
$stateProvider.state("home",{});
//state可以有子父级
$stateProvider.state("home",{});
$stateProvider.state("home.child",{})
//state可以是链式的
$stateProvider.state("home",{}).state("about",{}).state("photos",{});
/* $state.go(to, [,toParams],[,options]) */
$state.go('photos.detail')
$state.go('^')到上一级,比如从photo.detail到photo
$state.go('^.list')到相邻state,比如从photo.detail到photo.list
$state.go('^.detail.comment')到孙子级state，比如从photo.detail到photo.detial.comment
```

### Nested States

-  parent state can have multiple children, forming a tree of states. The URL and views (i.e., the rendered tree of components in the DOM) are artifacts of the active state
- a master/detail pattern

![](https://i.imgur.com/7YF0t11.png)

### States Lifecycle

- **before**: before the asyc portion of a transition has begun
- **start**: the transition has begun
- **exit**: the transition is exiting states
- **retain**: states are retained (a state was active, and is neither being exited nor entered)
- **enter**: the transition is entering states
- **finish**: the transition is finishing
- **success/error**: after the transition is complete

**Transition Lifecycle Hooks**

- Hooks may be registered for any stage of the transition lifecycle.
- **Hooks** can alter the transition:
    - **pause** the transition, waiting on some promise
    - **cancel** the transition
    - **redirect** the transition to a new target state
- **match criteria**:
    - A hook can choose which transitions it should be applied to.
    - **to/from**: only run the hook if the transition is going to or coming from a specific state
    - **entering/exiting**: only run the hook if the transition is going to enter or exit a specific state
- **criteria types**:
    - **state name**: the hook’s match criteria can be state names, such as `banking.account`
    - **glob**: the criteria can be a state glob pattern, such ash `banking.**`
    - **callback**: the criteria can be a callback function, such as `tostate => tostate.data.requiresAuth == true`

[back to top](#top)

## UI-Router Views

UI-Router applications are modeled as a tree of states. Each application state (generally) has a view declared on it. The view is the component which provides the user interface for that state

1. View Declaration: When an application state is activated, the view (component) for that state is rendered
2. UI-View viewport: When a state is activated, the state’s view (component) is rendered into the appropriate uiview viewport

### Nested views

```
+---------+---------------------------------+
|*INBOX*  |  MESSAGE1                       |
| SPAM    | *MESSAGE2*                      |
| DELETED |  MESSAGE3                       |
| SENT    +---------------------------------+
|         | MESSAGE 2 CONTENT               |
|         |                                 |
+---------+---------------------------------+
```

```html
<FolderListComponent>
  <ul class="left">
    <li>INBOX</li>
    <li>SPAM</li>
    <li>DELETED</li>
    <li>SENT</li>
  </ul>
  <div class="right">
    <uiview>
      <MessageListComponent class="top">
        <ul>
          <li>Message 1</li>
          <li>Message 2</li>
          <li>Message 3</li>
        </ul>
        <div class="bottom">
          <uiview>
            <MessageContentComponent>
              <p>Date: 2017-08-01</p>
              <p>Sender: GlobalCorp Bank</p>
              <p>Subject: Need a loan?</p>
              <div class="body">
                <p>Hey you! We have the best loans.</p>
                <p>You should really get a loan.</p>
                <p>Loans are awesome.</p>
              </div>
            </MessageContentComponent>
          </uiview>
        </div>
      </MessageListComponent>
    </uiview>
  </div>
</FolderListComponent>
<script>
var states = [
  { 
    name: 'folderlist',
    component: FolderListComponent
  },
  {
    name: 'folderlist.messagelist',
    component: MessageListComponent
  },
  {
    name: 'folderlist.messagelist.message',
    component: MessageContentComponent
  }
];
</script>
```

### Multiple named uiviews

- multiple views to be defined on **a single state**
- using `views:{}` property

```
+-------------------------------------------+
|                   HEADER                  |
|------+------------------------------------|
|      |                                    |
| NAV  |        MAIN CONTENT AREA           |
|      |                                    |
+------+------------------------------------+
```

```html

<script>
var mainState = {
  name: 'main',
  views: {
    header: HeaderComponent,
    nav: NavComponent,
    content: MainComponent,
  }
}
</script>
```

#### Targeting a named uiview

**method 1**: to use the uiview name only

```javascript
var parent = {
  name: 'parent',
  component: ParentComponent
}
var child = {
  name: 'parent.child',
  views: {
    'nav': NavComponent,        // targets uiview name='nav' created by ParentComponent
    'header': HeaderComponent,  // targets uiview name='header' created by ParentComponent
  }
}
```

**method 2**: to use View Name + State Name

```javascript
var grandparent = {
  name: 'grandparent', 
  component: GrandParentComponent
}
var parent = {
  name: 'grandparent.parent',
  component: ParentComponent
}
var child = {
  name: 'grandparent.parent.child',
  views: {
    'nav@grandparent': NavComponent,       // targets uiview name='nav' created in 'grandparent' state
    'header@grandparent': HeaderComponent  // targets uiview name='header' created in 'grandparent' state
  }
}
```

#### Re-targeting a uiview from a nested state

```javascript
var parent = {
  name: 'parent',
  component: ParentComponent  // renders a nested uiview named 'content'
}
var child = {
  name: 'parent.child',
  views: {
    'content@parent': ChildComponent,  
    // targets uiview name='content' created by 'parent' state
    // When parent.child is active, the ChildComponent fills the uiview named content
  }
}
var grandchild = {
  name: 'parent.child.grandchild',
  views: {
    // targets uiview name='content' created by 'parent' state
    // overrides the view from 'child' and replaces it with this component, ChildComponent from parent.child is no longer rendered
    'content@grandparent': GrandChildComponent,
  }
}
```

#### Advanced view targeting

- Relative Parent State:
    - `^`:  target a view in the parent state
    - `^.^`: target a view in the grandparent state
    - `^.^.^`: target a view in the great-grandparent state
    - and so on ...
- Absolute UIView Addressing
    - `!` + chain the uiview names together using `.`, such as `!$default.master.detail`    
    - `$default` is unamed default view
- Generalized Addressing
    - `[uiview path]@[state anchor]`, such as `main.nestedview@home.child`, `$default.$default@^.^`

#### All the other forms of view addressing

Type|Example|Comment
---|---|---
View Name Only|`header`|Shorthand for `header@^`, uiview path: header, state anchor: parent state
View Name + State Name|`nav@home.main`|uiview path: nav, state anchor: home.main
Relative Parent State|`nav@^.^`|uiview path: nav, state anchor: grandparent state
Absolute UIView|`!content.detail`|Shorthand for content.detail@, uiview path: content.detail, state anchor: the empty string (e.g., the root state)

[back to top](#top)

## Transitions

### Transition Lifecycle

Lifecycle event|from creation to completion
---|---
Create|The transition is being created
Before|The transition is about to start
Start|The transition has started
Exit|(state events) Any exiting states are exited
Retain|(state events) Any retained states are retained
Enter|(state events) Any entering states are entered
Finish| The transition is about to finish
Success/Error|The transition is finished and is either successful or errored

![](https://i.imgur.com/V6L9ZoC.png)

### Atomicity

- Transitions between states should be considered atomic. A transition will either fully succeed, or fail entirely

### Transition Object

Parameters/methods|Explanation|figure
---|---|---
**from state/to state**| `Transition.to()`, `Transition.from()`|![](https://i.imgur.com/8NCCUDS.png)
**Exiting and entering**|`Transition.entering()`,`Transition.exiting()`|![](https://i.imgur.com/8N9aY9s.png)
**Param value changes**<br>- A transition also occurs when a parameter value changes, even if the to and from states are the same<br>- When a state’s parameter value changes, the state is exited and then re-entered<br>- Each parameter is defined on a specific state| `Transition.params('to')`, `Transition.params('from')`|![](https://i.imgur.com/eXcdwun.png)
**Nested states**|

[back to top](#top)

## Transition Hooks

### Overview

- A Transition Hook is a callback function that is run during the specific lifecycle event of a Transition. The hook function receives the current Transition object as the first argument
- hook registration: on the TransitionService (`$transitions`)
- hook registration method for each lifecycle event: `onBefore`, `onStart`, `onExit`, `onRetain`, `onEnter`, `onFinish`, `onSuccess`, and `onError`

```javascript
$transitions.onSuccess({}, function(transition) {
  console.log(
      "Successful Transition from " + transition.from().name +
      " to " + transition.to().name
  );
});
```

### Return values

The return value of a transition hook can be used to alter the transition. Note: The `onSuccess` and `onError` hooks execute after a transition is finished, so their return values are ignored

```javascript
$transitions.onStart({}, function(transition) {
 //1) Promise
  if (transition.to().name === 'sloth') {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
  // 2) aborting a transition
  if (transition.to().name === 'unreachable') {
    return false;
  }
}
//3) Redirecting a transition
$transitions.onBefore({}, function(transition) {
  if (transition.to().protected && !user.isAuthenticated()) {   // check if the state should be protected
    return transition.router.stateService.target('login');      // redirect to the 'login' state
  }
}
// combining promises and redirects
$transitions.onBefore({}, function(transition) {
  const stateService = transition.router.stateService;
  const requiredRole = transition.to().data.role;
  return fetch('/currentuser/roles')
  .then(resp => resp.json())
  .then(roles => {
    if (roles.indexOf(requiredRole) === -1) {
      // User doesn't have the required role
      return stateService.target('noauth');
    }
  });
}
// 
$transitions.onBefore({}, function(transition) {
  // Don't mutate the current parameters
  const paramsCopy = Object.assign({}, transition.params());
  const stateService = transition.router.stateService;
  
  if (typeof paramsCopy.language === 'undefined') {
    // supply 'en' as a default language
    paramsCopy.language = 'en';
    return stateService.target(transition.to(), paramsCopy);
  }
}
```

[back to top](#top)

### Criteria object

- To/From
- Entering/Exiting/Retained
- Glob : globs to match state names using wildcards
- Functional criteria

```javascript
$transitions.onSuccess({ to: 'login' }, function(transition) {
  console.log("Now at 'login' state");
});
$transitions.onSuccess({ from: 'login' }, function(transition) {
  console.log("Left 'login' state");
});
$transitions.onError({ from: 'home' }, function(transition) {
  console.log("Error while leaving 'home' state: " + transition.error());
});
//this hook is not run again when transitioning between states inside the admin state tree
$transitions.onSuccess({ entering: 'admin' }, function(transition) {
  console.log("Now inside the admin section!");
});
//using wildcards
//this hook will be run when transitioning between states inside the admin state tree, such as from admin.users to admin.users.create
$transitions.onSuccess({ to: 'admin.**' }, function(transition) {
  console.log("Switched to an admin state: " + transition.to().name);
});
//Functional criteria
const criteriaObj = {
  to: (state) => state.name === 'admin'
};
$transitions.onSuccess(criteriaObj, function(transition) {
  console.log("Switched to the admin state.");
});
// Functional criteria can be used to check for metadata on state declarations
const states = [
  { name: 'home', data: { title: 'Home' } },
  { name: 'about', data: { title: 'About the app' } },
  { name: 'other' },
]
const criteriaObj = {
  to: (state) => !!state.data.title
}
$transitions.onSuccess(criteriaObj, function(transition) {
  document.title = transition.to().data.title;
});
```

[back to top](#top)

### State-level hooks

There are three state-level hooks: 

- onEnter
- onExit 
- onRetain

```javascript
$transitions.onEnter({}, function(transition, state) {
  console.log('Transition #' + transition.$id + ' Entered ' + state.name);
}
/*
Transition #1 Entered people
Transition #1 Entered people.person
*/
$transitions.onEnter({ entering: 'people' }, function(transition, state) {
  console.log('Transition #' + transition.$id + ' Entered ' + state.name);
}
//Transition #1 Entered people
```

[back to top](#top)

> References
- https://ui-router.github.io
- [AngularJS page transitions and loading techniques](https://codepen.io/Javarome/post/angularjs-page-transitions)
- [Angularjs中UI Router全攻略](https://www.jb51.net/article/78895.htm)
- [angularjs中的路由介绍详解 ui-route](https://www.cnblogs.com/littlemonk/p/5500801.html)
- [深究AngularJS——ui-router详解](https://blog.csdn.net/zcl_love_wx/article/details/52034193)
- [深入理解ANGULARUI路由_UI-ROUTER](https://blog.csdn.net/huwei2003/article/details/52278013)
