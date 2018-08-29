[React Study](#top)

- [1. Installation](#Installation)
  - [1.1 Creating a New Application](#Creating-a-New-Application)
  - [1.2 Adding React to an Existing Application](#Adding-React)
  - [1.3 Using a CDN](#Using-a-CDN)
  - [1.4 Yarn](#Yarn)
  - [1.5 Enable ES6 and JSX](#Enable)
- [2. JSX 用法](#JSX用法)
  - [2.1 属性 in JSX](#Embedding-Expressions)
    - [2.11 属性扩散 in JSX - 设置多属性](#多属性)
  - [2.2 属性Attributes与行内样式 with JSX](#属性Attributes与行内样式)
  - [2.3 Objects in JSX](#Objects-in-JSX)
- [3. Rendering Elements](#Rendering-Elements)
- [4. React Components](#Components-Props)
  - [4.1. Props(静态的、只读的、无状态的)](#Props)
  - [4.2. State(动态的) and Lifecycle](#State-Lifecycle)
  - [4.3. 组件生命周期](#组件生命周期)
  - [4.4. 组件间的通信](#组件间的通信)
  - [4.5. Handling Events事件处理](#Handling-Events)
  - [4.6 DOM 操作和Refs](#DOM操作)
- [5. Conditional Rendering](#Conditional-Rendering)
- [6. Flux](#Flux)
- [7. 表单](#表单)

```
- JSX: html+javascript => javascript
- 虚拟DOM
- React 的核心思想是：封装组件，各个组件维护自己的状态和 UI，当状态变更，自动重新渲染整个组件
  - React 大体包含下面这些概念：组件、JSX、Virtual DOM、Data Flow
  - 当组件状态state有更改的时候，React会自动调用组件的render方法重新渲染整个组件的UI
  - “单向数据绑定”是 React 推崇的一种应用架构的方式  - Flux
```

<h3 id="Installation">1. Installation</h3>

<h4 id="Creating-a-New-Application">1.1 Creating a New Application</h4>

```shell
npm install -g create-react-app
create-react-app my-app
cd my-app
npm start
npm run build  #deploy to production
```

<h4 id="Adding-React">1.2 Adding React to an Existing Application</h4>

```shell
#1)install React by npm
npm init
npm install --save react react-dom
```

<h4 id="Using-a-CDN">1.3 Using a CDN</h4>

```html
<script src="https://unpkg.com/react@15/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
```

- [Creating a Production Build with Create React App](https://facebook.github.io/react/docs/optimizing-performance.html#create-react-app)
- [Creating a Production Build with Single-File Builds](https://facebook.github.io/react/docs/optimizing-performance.html#single-file-builds)
- [Creating a Production Build with Brunch](https://facebook.github.io/react/docs/optimizing-performance.html#brunch)
- [Creating a Production Build with Browserify](https://facebook.github.io/react/docs/optimizing-performance.html#browserify)
- [Creating a Production Build with Rollup](https://facebook.github.io/react/docs/optimizing-performance.html#rollup)
- [Creating a Production Build with Webpack](https://facebook.github.io/react/docs/optimizing-performance.html#webpack)

<h4 id="Yarn">1.4 Yarn</h4>

- [Yarn](https://yarnpkg.com/en/)是Facebook最近发布的一款依赖包安装工具。Yarn是一个新的快速安全可信赖的可以替代NPM的依赖管理工具
- [Yarn的安装与使用详细介绍](http://www.jb51.net/article/95630.htm)

**1.4.1 Installation**

- MacOS: `curl -o- -L https://yarnpkg.com/install.sh | bash`
- Linux: 

``` 
sudo apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 
echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn  #然后输入安装命令就行啦
```

- windows: windows 下需要下载msi文件 ，下载地址：https://yarnpkg.com/latest.msi
- npm 的方式: `npm install -g yarn`

```shell
yarn init
yarn add gulp-less@version  #加一些依赖
yarn remove gulp-less
yarn upgrade gulp-less
```

yarn与npm的命令行

npm|yarn
---|---
npm install|yarn
npm install taco --save|yarn add taco
npm install taco --save-dev|yarn add taco --dev
npm undate --save|yarn upgrade
npm init| yarn init
npm link|yarn link
npm outdated|yarn outdated
npm publish|yarn publish
npm run|yarn run
npm cache clean|yarn cache clean
npm login|yarn login (logout 同理)
npm test| yarn test

[back to top](#top)

<h4 id="Enable">1.5 Enable ES6 and JSX</h4>

```
npm install --save-dev babel-preset-react babel-preset-es2015
```

[back to top](#top)

<h3 id="JSX用法">2. JSX 用法</h3>

<h4 id="Embedding-Expressions">2.1 属性 in JSX</h4>

- Embed any JavaScript expression in JSX by wrapping it in curly braces `{ }`
- 子组件也可以作为表达式使用

```JavaScript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[back to top](#top)

<h4 id="多属性">2.11 属性扩散 in JSX - 设置多属性</h4>

```javascript
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
//后面的属性值会覆盖前面的属性
ar props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```

[back to top](#top)

<h4 id="属性Attributes与行内样式">2.2 属性Attributes与行内样式 with JSX</h4>

```javascript
// 1) use quotes
const element = <div tabIndex="0"></div>;
// 2) use curly braces
const element = <img src={user.avatarUrl}></img>;
// 3) 行内样式
ReactDOM.render(
  <ul style={{ backgroundColor: 'yellow' }, abc="123" }>  //use curl bracket
    <Item />
  </ul>, document.getElementById('test')
)  
React.createElement('ul',
  { style: {backgroundColor: 'yellow'}, abc: 123 }    //props
)
```

<h4 id="Objects-in-JSX">2.3 creating Objects in JSX</h4>

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
//或
const element = React.createElement(   //React.createElement() performs a few checks to help you write bug-free code
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
//或
function element(){
  return ( <h1 className="greeting">Hello, world!</h1> )
}
```

[back to top](#top)

<h3 id="Rendering-Elements">3. Rendering Elements(`ReactDOM.render()`)</h3>

`ReactDOM.render()`: React的最基本方法，用于将模板转为HTML语言，并插入指定的DOM节点

```javascript
//推荐写法1
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root')
);
//推荐写法2 - Composing Components
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//const element = <Welcome name="Sara" />;
function element() {
  return (
    <div>
      <Welcome name="Sara" />   // refer to other components in their output
      <Welcome name="Cahal" />
    </div>
  )
}
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

**Updating the Rendered Element - React elements are immutable**

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}
setInterval(tick, 1000);    //
```

[back to top](#top)

<h3 id="Components-Props">4. React Components</h3>

- components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen.
- 主程序组件总入口定义： `ReactDOM.render(<App />, document.getElementById('root'));`
- 外部组件代码格式: 

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// or
import React, { Component } from 'react';
class ComponentName extends Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>;
    );
  }
}
export default ComponentName;
```

![](http://i.imgur.com/cGZFosd.png)

- 组件两个核心概念： props, state

<h4 id="Props">4.1 Props(静态的、只读的、无状态的)</h4>

- components accept arbitrary inputs (called `props`) and return React elements describing what should appear on the screen
- Props are Read-Only
- props 就是组件的属性，由外部通过JSX属性传入设置，一旦初始设置完成，就可以认为`this.props`是不可更改的
- `this.props.children`, `this.props`对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children`属性。它表示组件的所有子节点, `this.props.children`的值有三种可能：
  - 如果当前组件没有子节点，它就是 undefined ;
  - 如果有一个子节点，数据类型是 object ；
  - 如果有多个子节点，数据类型就是 array 
  - 所以，处理`this.props.children`的时候要小心。React提供一个工具方法`React.Children`来处理 this.props.children。可以用 `React.Children.map` 来遍历子节点，而不用担心`this.props.children`的数据类型是 undefined 还是 object
- `PropTypes`: 用来验证组件实例的属性是否符合要求, `getDefaultProps`方法可以用来设置组件属性的默认值

[back to top](#top)

<h4 id="State-Lifecycle">4.2. State(动态的) and Lifecycle</h4>

- reusable and encapsulated
- `this.state`-- 组件与用户互动, React的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染UI - 根据状态 state 呈现不同的 UI 展示
  - 一旦状态（数据）更改，组件就会自动调用 render 重新渲染 UI，这个更改的动作会通过 this.setState 方法来触发
  - `this.props`表示那些一旦定义，就不再改变的特性
  - `this.state`是会随着用户互动而产生变化的特性

```jsx
class Clock extends React.Component {  //1) Converting a Function to a Class, create an ES6 class with the same name that extends React.Component
  constructor(props) {   //3) Add a class constructor that assigns the initial this.state
    super(props);        // pass props to the base constructor(Class components should always call the base constructor with props)
    this.state = {date: new Date()};  // assigns the initial this.state
  }
  componentDidMount() {    //4)  set up a timer whenever the Clock is rendered to the DOM for the first time
    this.timerID = setInterval( () => this.tick(), 1000 );
  }
  componentWillUnmount() { clearInterval(this.timerID); }   //4) clear that timer whenever the DOM produced by the Clock is removed
  tick() {
    this.setState({ date: new Date() }); //5) this.setState() to schedule updates to the component local state
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>   //2) Adding Local State to a Class
      </div>
    );
  }
}
ReactDOM.render(
  <Clock />,    //there is no need to add date prop in <Clock /> element
  document.getElementById('root')
);
```

**Note**

- Do Not Modify State Directly, instead, use `setState()`
- this.props and this.state updates may be Asynchronous. To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
//correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

[back to top](#top)

<h4 id="组件生命周期">4.3. 组件的生命周期</h4>

- Mounting：已插入真实DOM
- Updating：正在被重新渲染
- Unmounting：已移出真实DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数

- componentWillMount()
- componentDidMount()
- componentWillUpdate(object nextProps, object nextState)
- componentDidUpdate(object prevProps, object prevState)
- componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

**可以使用`componentDidMount`方法设置Ajax请求，等到请求成功，再用`this.setState`方法重新渲染 UI（查看 demo11)**

```
    var UserGist = React.createClass({
      getInitialState: function() {
        return {
          username: '',
          lastGistUrl: ''
        };
      },
      componentDidMount: function() {
        $.get(this.props.source, function(result) {
          var lastGist = result[0];
          if (this.isMounted()) {
            this.setState({
              username: lastGist.owner.login,
              lastGistUrl: lastGist.html_url
            });
          }
        }.bind(this));
      },
      render: function() {
        return (
          <div>
            {this.state.username}'s last gist is <a href={this.state.lastGistUrl}>here</a>.
          </div>
        );
      }
    });

    ReactDOM.render(
      <UserGist source="https://api.github.com/users/octocat/gists" />,
      document.body
    );
```

甚至可以把一个Promise对象传入组件，请看Demo12。

如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

```javascript
    var RepoList = React.createClass({
      getInitialState: function() {
        return { loading: true, error: null, data: null};
      },
      componentDidMount() {
        this.props.promise.then(
          value => this.setState({loading: false, data: value}),
          error => this.setState({loading: false, error: error}));
      },
      render: function() {
        if (this.state.loading) {
          return <span>Loading...</span>;
        }
        else if (this.state.error !== null) {
          return <span>Error: {this.state.error.message}</span>;
        }
        else {
          var repos = this.state.data.items;
          var repoList = repos.map(function (repo) {
            return (
              <li>
                <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
              </li>
            );
          });
          return (
            <main>
              <h1>Most Popular JavaScript Projects in Github</h1>
              <ol>{repoList}</ol>
            </main>
          );
        }
      }
    });
```

[back to top](#top)

<h4 id="组件间的通信">4.4. 组件间的通信</h4>

情况|方法|说明
---|---|---
子组件调用父组件(父组件向子组件传值)|采用props的方式进行调用和赋值|在父组件中设置相关属性值或者方法，子组件通过props的方式进行属性赋值或者方法调用
父组件调用子组件|采用refs的方式进行调用|需要父组件在调用子组件的时候，添加ref属性，并进行唯一命名，在父组件中即可调用
子组件向父组件传值|采用state|父组件写好state和处理该state的函数，同时将函数名通过props属性值的形式传入子组件，子组件调用父组件的函数，同时引起state变化。子组件要写在父组件之前
没有任何嵌套关系的组件之间传值（PS：兄弟组件之间传值）1|使用`Event Emitter/Target/Dispatcher`|在componentDidMount 里面订阅事件，在 componentWillUnmount 里面取消订阅，当收到事件触发的时候调用setState更新UI
没有任何嵌套关系的组件之间传值（PS：兄弟组件之间传值）2|使用全局事件`Publish/Subscribe`模式|[React 组件之间如何交流](http://www.tuicool.com/articles/AzQzEbq)
没有任何嵌套关系的组件之间传值（PS：兄弟组件之间传值）3|使用全局事件`Publish/Subscribe`模式|在componentDidMount 里面订阅事件，在 componentWillUnmount 里面取消订阅，当收到事件触发的时候调用setState更新UI

![](http://i.imgur.com/Wc9Lb0n.png)

> 说明：

- 有的时候父组件传过来的数据类型跟子组件需要的类型不一样，用PropTypes属性来验证组件实例的属性是否符合要求
- 若属性不符合要求此外，我们可以用getDefaultProps 方法可以用来设置组件属性的默认值

[back to top](#top)

<h4 id="Handling-Events">4.5. Handling Events</h4>

- similar to handling events on DOM elements
- 合成事件（synthetic event system）: React 实现了一个“合成事件”层，这个事件模型保证了和 W3C 标准保持一致，所以不用担心有什么诡异的用法，并且这个事件层消除了IE与W3C标准实现之间的兼容问题(React defines these synthetic events according to the W3C spec, so you don't need to worry about cross-browser compatibility), “合成事件”额外提供了两个好处
  - 自动绑定上下文:  “合成事件”自动将事处理件方法的上下文绑到当前组件，所以handleClick 方法里面可以直接使用 this.setState。
  - 事件委托:  “合成事件”会以事件委托（event delegation）的方式绑定到组件最上层，并且在组件卸载（unmount）的时候自动销毁绑定的事件
- 原生事件:  如在componentDidMount方法里面通过addEventListener绑定的事件就是浏览器原生事件
  - 使用原生事件的时候注意在 componentWillUnmount 解除绑定 removeEventListener
  - 所有通过JSX这种方式绑定的事件都是绑定到“合成事件”，除非有特别的理由，建议总是用React的方式处理事件
- 参数传递:  给事件处理函数传递额外参数的方式：`bind(this, arg1, arg2, ...)`

```javascript
// The common pattern when define a component using an ES6 class
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called
    this.handleClick = this.handleClick.bind(this); // This binding is necessary to make `this` work in the callback
  }
  handleClick() {
    this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[back to top](#top)

<h4 id="DOM操作">4.6 DOM操作和Refs</h4>

大部分情况下不需要通过查询DOM元素去更新组件的UI，只要关注设置组件的状态（setState）。但是可能在某些情况下确实需要直接操作DOM。

- Managing focus, text selection, or media playback
- Triggering imperative animations
- Integrating with third-party DOM libraries

- getDOMNode(): 当组件加载到页面上之后（mounted），可通过 getDOMNode() 方法拿到组件对应的DOM元素
- Refs:  通过在要引用的 DOM 元素上面设置一个 ref 属性指定一个名称，然后通过 this.refs.name 来访问对应的 DOM 元素
  - 注意ref 引用到的元素其实是一个 React 组件，所以要用 this.refs.theInput.getDOMNode() 来拿到它的 DOM 元素，实际上 React 会把组件里面的所有子元素都认为是组件对象，因为 HTML 元素在 Virtual DOM 里面就是描述为一个 JS 对象（ReactElement）,所以，ref 不仅仅可以引用 HTML 元素，也可以直接引用子组件，比如 <Typeahead ref="myTypeahead" />
  - 可以使用引用组件定义的任何公共方法，比如 this.refs.myTypeahead.reset()
  - Refs 是访问到组件内部 DOM 节点唯一可靠的方法
  - Refs 会自动销毁对子组件的引用（当子组件删除时）

**Refs注意事项**
  
- 不要在render或者render之前访问 refs
- 不要滥用 refs，通过它来按照传统的方式：找到 DOM -> 更新 DOM


[back to top](#top)

<h3 id="Conditional-Rendering">5. Conditional Rendering</h3>

```javascript
class LoginControl extends React.Component {  //stateful component 
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) { return <UserGreeting />; }
  return <GuestGreeting />;
}
// use variables to store elements
function LoginButton(props) {
  return (<button onClick={props.onClick}>Login</button>);
}
function LogoutButton(props) {
  return (<button onClick={props.onClick}>Logout</button>);
}
ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[back to top](#top)

<h3 id="Flux">[6. Flux](https://facebook.github.io/flux/docs/in-depth-overview.html#content)</h3>

Flux is the application architecture that Facebook uses for building client-side web applications(Flux是一种模式，来描述单向数据流)

- Flux is a pattern for managing data flow in web application
- data flows in one direction (a unidirectional data flow) `Action -> Dispatcher -> Store -> View`
- one state <--> one or more views(setState) 

Flux part|function
---|---
dispatcher- 处理动作分发，维护Store之间的依赖关系|The dispatcher receives actions and dispatches them to stores that have registered with the dispatcher. Every store will receive every action. There should be only one singleton dispatcher in each application
store- 数据和逻辑部分|holds the data of an application, The data in a store must only be mutated by responding to an action, Every time a store's data changes it must emit a "change" event
Action-提供给dispatcher传递数据给store|Actions define the internal API of your application. They capture the ways in which anything might interact with your application. They are simple objects that have a "type" field and some data.
view (React components)|Data from stores is displayed in views, When a view uses data from a store it must also subscribe to change events from that store.

![](http://i.imgur.com/8jNkTlc.png)

![](http://i.imgur.com/nT2C7gd.png)

```javascript
//view --> actionCreators
//Nav.JSX
export default class Nav extends React.Component {
  _handleClick(nav){
    NavActionCreators.clickNav(nav);
  }
  render(){
    let itemList = this.props.list.map((nav,index) => {
      return (
        <li className="index-menu-item" onClick={this._handleClick.bind(this, nav)} key={index}>
          <span>{nav.text}</span>
        </li>
      )
    });
    return (
      <nav className="index-menu">
        <ul className="index-menu-list"> {itemList}</ul>
      </nav>
    );
  }
}
//action dispatch  -- NavActionCreators.js
export default {
  clickNav(nav){
    AppDispatcher.dispatch(
      {
        type: ActionTypes.CLICK_NAV,
        nav
      }
    );
  }
};
// dispatcher -> store callback
AppDispatcher.register(action => {
  switch (action.type) {
    case ActionTypes.CLICK_NAV:
      IndexWebAPIUtils.getGiftList(_currentUserInfo.userId, action.nav.id)
                      .then(function (giftList) {
                          _currentGiftList = giftList;
                          IndexStore.emitChange();
                      });
      break;
  }
});
//store emitChange --> controller view --> setState
export default class Index extends React.components {
    constructor(props){
      super(props);
      let currentUser = UserStore.getCurrentuser();
      this.state = IndexStore.getAll();
    }
    componentDidMount(){
      Indexstore.addChangeListener(this._onChange.bind(this));
    }
    componentWillMount(){
      IndexStore.removeChangeListener(this._onChange.bind(this));
    }
    _onChange(){
      this.setState(IndexStore.getall());
    }
    render(){
      let state = this.state;
      return(
        <div className="page active">
          <!-- ... -->
          <Nav list={state.navList}/>
          <!-- ... -->
        </div>
      )
    }
}
```

**复杂的Flux**

![](http://i.imgur.com/PNwr7UC.jpg)

**Flux的编程思维**

1. 分而治之（DivideAndConquer）， 将大的页面拆分为小的模块，再由小的模块拆分为小的组件 -- 松耦合
2. 合而治之-中心化控制
3. 函数式编程思想： 函数式编程中的纯函数（PureFunction）定义如下：纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用
  - 为了保证组件也能做到“纯函数”的特性，相同的属性会得到相同的渲染结果。在写React组件的时候尽量准守一下约定：
尽量使用无状态组件除了控制类组件以外其他组件避免使用组件状态可以通过属性计算出来的状态不要用状态来表示组件的渲染避免外部依赖，按照纯函数的方式写
  - 函数式的优点也是无副作用组件的优点: 无耦合，可移植性强:组件可重用性高可测试性高：组件无依赖，可以很容易的单独测试组件

**Flux的优势**

1. 数据状态变得稳定同时行为可预测(Flux keeps things predictable)
2. 所有的数据变更都发生在store里，store里包含所有相关的数据及业务逻辑。所有store相关数据处理逻辑都集中在一起，避免业务逻辑分散降低维护成本
3. 数据的渲染是自上而下的
4. view层变得很薄，真正的组件化。业务逻辑被store做了，状态变更被controller-view做了，view自己需要做的只是根据交互触发不同的action，仅此而已。这样带来的好处就是，整个view层变得很薄很纯粹，完全的只关注ui层的交互，各个view组件之前完全是松耦合的，大大提高了view组件的复用性
5. dispatcher是单例的

[back to top](#top)





- 获取真实的DOM节点(**虚拟DOM（virtual DOM）**): 根据React的设计，所有的DOM变动，都先在虚拟DOM上发生，然后再将实际发生变动的部分，反映在真实DOM上，这种算法叫做DOM diff ，它可以极大提高网页的性能表现。但是，有时需要从组件获取真实 DOM 的节点，这时就要用到`ref`属性


- **表单**: 用户在表单填入的内容，属于用户跟组件的互动，所以不能用this.props读取, 需要定义一个事件的回调函数，通过event.target.value 读取用户输入的值。

```javascript
    var Input = React.createClass({
      getInitialState: function() {
        return {value: 'Hello!'};
      },
      handleChange: function(event) {
        this.setState({value: event.target.value});
      },
      render: function () {
        var value = this.state.value;
        return (
          <div>
            <input type="text" value={value} onChange={this.handleChange} />
            //文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值
            <p>{value}</p>
          </div>
        );
      }
    });
    ReactDOM.render(<Input/>, document.body);
```



> Reference

- https://facebook.github.io/react/docs
- [React 入门实例教程- 阮一峰](http://www.ruanyifeng.com/blog/2015/03/react.html)
- [React 入门教程](http://wiki.jikexueyuan.com/project/react-tutorial/)
- [React's official site](http://facebook.github.io/react)
- [React's official examples](https://github.com/facebook/react/tree/master/examples)
- [React (Virtual) DOM Terminology](http://www.jackcallister.com/2015/01/05/the-react-quick-start-guide.html), by Sebastian Markbåge
- [React JS Tutorial and Guide to the Gotchas](https://zapier.com/engineering/react-js-tutorial-guide-gotchas/), by Justin Deal
- [React Primer](https://github.com/BinaryMuse/react-primer), by Binary Muse
- [ReactJS学习笔记 父子组件间的通信](http://blog.csdn.net/sinat_17775997/article/details/59058781?locationNum=5&fps=1)
- [一目了然，React组件通信技巧](http://www.jianshu.com/p/8ed3a060f636)
- [React Flux入门指南](http://www.cocoachina.com/webapp/20151008/13649.html)
- [谈一谈我对 React Flux 架构的理解](http://www.cocoachina.com/webapp/20150928/13600.html)
- [What is the Flux Application Architecture?](https://brigade.engineering/what-is-the-flux-application-architecture-b57ebca85b9e)
