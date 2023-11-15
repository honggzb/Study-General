[React学习-大众点评](#top)
- [1. React JSX](#1-react-jsx)
  - [1.1 JSX语法](#11-jsx语法)
- [2. 数据传递props \& 数据变化state](#2-数据传递props--数据变化state)
- [3. 智能组件 \& 木偶组件](#3-智能组件--木偶组件)
- [4. React生命周期(生命周期钩子)](#4-react生命周期生命周期钩子)
- [5. React-router](#5-react-router)
  - [创建页面](#创建页面)
- [Redux](#redux)
  
---------------------------------------------------------------------

**代码分离原则**

```
├── app
│   ├── containers          #page层(智能组件)
│   │   └── Hello           #Hello page
│   │        ├── subpage    #子page层
│   │        │    ├── Carousel.jsx 
│   │        │    ├── Recommend.jsx 
│   │        │    └── List.jsx
│   │        └── index.jsx  #Hello page的入口文件
│   ├── components          #components层（公用组件, 木偶组件）
│   │   └── Header
│   │        ├── img/
│   │        └── index.jsx  #Header组件的入口文件
│   ├── static/
│   ├── util/
│   ├── index.jsx           #App入口文件
│   └── index.tmpl.html
```

## 1. React JSX

- JSX是一个看起来很像XML的JavaScript语法扩展, JSX就是Javascript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析
- JSX将XML语法直接加入JS中,通过代码而非模板来高效的定义界面。之后JSX通过翻译器转换为纯JS再由浏览器执行。在实际开发中，JSX在产品打包阶段都已经编译成纯JavaScript，JSX的语法不会带来任何性能影响。另外，由于JSX只是一种语法，因此JavaScript的关键字class, for等也不能出现在XML中，而要使用className, htmlFor代替，这和原生DOM在JavaScript中的创建也是一致的。JSX只是创建虚拟DOM的一种语法格式而已,除了用JSX,我们也可以用JS代码来创建虚拟DOM.

### 1.1 JSX语法</h3>

- 大括号里是JavaScript，不要加引号，加引号就会被当成字符串
- 注释： `{/* */}`
- 三元表达式: `var person = <Person name={window.isLoggedIn ? window.name : ''} />;`
- **使用一个父节点包裹**
    - jsx中不能一次性返回零散的多个节点，如果有多个请包涵在一个节点中。例如，

```javascript
// 三个 <p> 外面必须再包裹一层 <div>
return (
  <div>
    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>
  </div>
)
returb (
    <div> 
        <p>段落1</p> 
        { true ? <p>true</p> : <div> <p>false 1</p> <p>false 2</p> </div> } 
    </div>
)
```

- 数组循环，一般会用map

```javascript
var lis = this.todoList.todos.map(function (todo) {
  return  (
    <li>
      <input type="checkbox" checked={todo.done}>
      <span className={'done-' + todo.done}>{todo.text}</span>
    </li>
  );
});
var ul = (<ul className="unstyled"> {lis}</ul>);
```

- JSX中使用样式

```javascript
//通过style属性来定义，但和真实DOM不同的是，属性值不能是字符串而必须为对象
<div style={{color: '#ff0000', fontSize: '14px'}}>Hello World.</div>
//或
var style = {
  color: '#ff0000',
  fontSize: '14px'
};
var node = <div style={style}>HelloWorld.</div>;
```

- JSX中绑定事件

```javascript
class Hello extends React.Component { 
    render() { 
        return ( <p onClick={this.clickHandler.bind(this)}>hello world</p> )    //驼峰式写法
    }
    clickHandler(e) { 
        // e 即js中的事件对象，例如 e.preventDefault() 
        // 函数执行时 this 即组件本身，因为上面的 .bind(this) 
        this.setState({...})
        console.log(Date.now())
    } 
}
```

[back to top](#top)

## 2. 数据传递props & 数据变化state

- props : 父组件给子组件传递数据用, props 不能被自身修改
- state : 组件内部自身的属性发生变化
- React会实时监听每个组件的props和state的值，一旦有变化，会立刻更新组件，将结果重新渲染到页面上

```javascript
render(){
    return(
        <p>{this.props.title}</p>
    )
}
class Hello extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            now: Date.now()
        }
    }
    render() {
        return (
            <div>
                <p onClick={this.clickHandler.bind(this)}>hello world {this.state.now}</p>
            </div>
        )
    }
    clickHandler() {
        this.setState({   // 设置 state 的值的时候，一定要用 this.setState ，不能直接赋值修改
            now: Date.now()
        })
    }
}
```

[back to top](#top)

## 3. 智能组件 & 木偶组件

- 智能组件: 在日常开发中，我们也简称“页面”。为何说它“智能”，因为它只会做一些很聪明的事儿，脏活累活都不干。它只对数据负责，只需要获取了数据、定义好数据操作的相关函数，然后将这些数据、函数直接传递给具体实现的组件即可。
- 木偶组件: 这里“木偶”一词用的特别形象，它总是被人拿线牵着。它从智能组件（或页面）那里接受到数据、函数，然后就开始做一些展示工作，它的工作就是把拿到的数据展示给用户，函数操作开放给用户。至于数据内容是什么，函数操作是什么，它不关心。

## 4. React生命周期(生命周期钩子)

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.
      </div>
    );
  }
}
```

- getInitialState: 初始化组件state数据，但是在es6的语法中，我们可以使用以下书写方式代替

```javascript
class Hello extends React.Component {
    constructor(props, context) {
        super(props, context);
        // 初始化组件 state 数据
        this.state = {
            now: Date.now()
        }
    }
}
```

- render: 最常用的hook，返回组件要渲染的模板
- comopentDidMount: 组件第一次加载时渲染完成的事件，一般在此获取网络数据。实际开始项目开发时，会经常用到
- shouldComponentUpdate: 主要用于性能优化
- componentDidUpdate: 组件更新了之后触发的事件，一般用于清空并更新数据。实际开始项目开发时，会经常用到
- componentWillUnmount: 组件在销毁之前触发的事件，一般用户存储一些特殊信息，以及清理setTimeout事件等

[back to top](#top)

## 5. React-router

- https://reacttraining.com/react-router/web/guides/philosophy
- https://react-router.docschina.org/web/guides/philosophy
- [React-Router中文](https://react-router.docschina.org/)

### 创建页面

创建以下几个页面，用于演示

```
./app/containers/App.jsx    所有页面的外壳
./app/containers/Home       主页
./app/containers/List       列表页
./app/containers/Detail     详情页
./app/containers/NotFound`  404
```

```jsx
//App.jsx
class App extends React.Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
//配置 router ./app/router/routeMap.jsx
class RouteMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }
    render() {
        return (
             <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='list' component={List}/>
                    <Route path='detail/:id' component={Detail}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        )
    }
}
// 使用 router   ./app/index.jsx, 使用routeMap组件
import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import RouteMap from './router/routeMap'
render(
    <RouteMap history={hashHistory}/>,
    document.getElementById('root')
)
```

- 注意`hashHistory`，规定用url中的hash来表示 router 例如`localhost:8080/#/list`。
- 与之对应的还有一个`browserHistory`也可用，它就不使用hash，直接可以这样`localhost:8080/list`表示。但是后者需要服务器端支持，我们这里用前者。两者在前端开发中，使用起来都是一样的，只是表示形式不一样
- 可以`npm start`运行看效果了

**页面跳转**

从给一个页面跳转到另一个页面，有两种方法:

- 第一种是 `<Link>` 跳转，例如在 Home 页面中的代码。（其实这个`<Link>`渲染完了就是html中的`<a>`）
- 另一个方法是使用js跳转，例如在List页面中
- 
```jsx
//<Link>跳转
import React from 'react'
import { Link } from 'react-router'
class Home extends React.Component {
    render() {
        return (
            <div>
                <p>Home</p>
                <Link to="/list">to list</Link>
            </div>
        )
    }
}
export default Home
//js跳转
import React from 'react'
import { hashHistory } from 'react-router'
class List extends React.Component {
    render() {
        const arr = [1, 2, 3]
        return (
            <ul>
                {arr.map((item, index) => {
                    return <li key={index} onClick={this.clickHandler.bind(this, item)}>js jump to {item}</li>
                })}
            </ul>
        )
    }
    clickHandler(value) {
        hashHistory.push('/detail/' + value)
    }
}
export default List
```

**获取参数**

Detail 页面需要获取 url 中的`id`参数，否则配置这个参数就无用了。可以使用 `this.props.params.id` 获取

**高级&进阶**

- 如何让`/`路由（即首页）加载的更快？抛开代码效率问题，其中一个解决方案就是先不要加载其他页面的代码，**即首页需要哪些代码我就先加载、执行哪些，不需要的就先别加载**。
- 针对大型项目的**静态资源懒加载**问题，react-router 也给出了解决方案 —— [huge-apps](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps)，它将 react-router 本身和 webpack 的 `require.ensure` 结合起来，就解决了这一问题。
- [Lazy Loading with React and Webpack 2](https://medium.com/front-end-hacking/lazy-loading-with-react-and-webpack-2-8e9e586cf442)
- https://github.com/jasonslyvia/react-lazyload

[back to top](#top)

## Redux

- [Redux 中文文档](https://cn.redux.js.org/)

> reference
- [官网](https://reactjs.org/)
- [中文官网](https://react.docschina.org/)
- [React 模式](http://sangka-z.com/react-in-patterns-cn/)
- [React 设计思想](https://github.com/react-guide/react-basic)
- [React入门教程](https://hulufei.gitbooks.io/react-tutorial/content/)
- [阮一峰: React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)
- [react.js资源列表](https://reactjsexample.com/)
- [图解React](http://uyi2.com/docs?id=391)
- [React.js模仿大众点评webapp](http://www.imooc.com/article/16082)
