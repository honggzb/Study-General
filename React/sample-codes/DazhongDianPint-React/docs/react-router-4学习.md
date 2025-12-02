[ React router v4](#top)

- [1. install](#install)
- [2. sample](#sample)
- [3. Inclusive Routing && Exclusive Routing](#Inclusive)

### install

"react-router": "^4.1.1" React Router V4 基于 Lerna 管理多个 Repository

- react-router React Router 核心
- react-router-dom 用于 DOM 绑定的 React Router
- react-router-native 用于 React Native 的 React Router
- react-router-redux React Router 和 Redux 的集成
- react-router-config 静态路由配置帮助助手 [api](https://reacttraining.com/react-router/web/guides/quick-start)

```shell
npm i --save react-router-dom
yarn add react-router-dom
```

### sample

react route v3 VS react route v4

```javascript
//v3
import { Router, Route, IndexRoute } from 'react-router'
const PrimaryLayout = props => (
  <div className="primary-layout">
    <header>
      Our React Router 3 App
    </header>
    <main>
      {props.children}
    </main>
  </div>
)
const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>
const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={PrimaryLayout}>
      <IndexRoute component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </Route>
  </Router>
)
render(<App />, document.getElementById('root'))
//v4
import { BrowserRouter, Route } from 'react-router-dom'
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
    </header>
    <main>
      <Route path="/" exact component={HomePage} />  //Exclusive Routing
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)
const HomePage =() => <div>Home Page</div>
const UsersPage = () => <div>Users Page</div>
const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)
render(<App />, document.getElementById('root'))
```

- there is no <IndexRoute> in v4, using <Route exact> achieves the same thing, or use <Switch> with <Redirect> to redirect to a default page
- {props.children} to nest components is missing in v4

<h3 id="Inclusive">3. Inclusive Routing && Exclusive Routing</h3>

```javascript
//Inclusive Routing
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      Our React Router 4 App
      <Route path="/users" component={UsersMenu} />
    </header>
    <main>
      <Route path="/" exact component={HomePage} />
      <Route path="/users" component={UsersPage} />
    </main>
  </div>
)
//Exclusive Routing
const PrimaryLayout = () => (
  <div className="primary-layout">
    <PrimaryHeader />
    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users/add" component={UserAddPage} />
        <Route path="/users" component={UsersPage} />
        <Redirect to="/" />
      </Switch>
    </main>
  </div>
)
```

- Inclusive Routing
  - render either the HomePage or the UsersPage depending on the path, because of `exact`
  - render `{UsersMenu}` and `{UsersPage}` when the user visits `/users`
- Exclusive Routing
  - use `<Switch>` to enable exclusive routing, only one of the routes in a given <Switch>
  - `/users/add` before `/users` to ensure the correct matching
  - `<Redirect>` only rendered if no other routes match first

<h3 id="Nested">4. Nested Layouts</h3>

**approach 1**

```javascript
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" exact component={BrowseUsersPage} />   //use exact
          <Route path="/users/:userId" component={UserProfilePage} />
          <Route path="/products" exact component={BrowseProductsPage} />  //use exact
          <Route path="/products/:productId" component={ProductProfilePage} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}
const BrowseUsersPage = () => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <BrowseUserTable />
    </div>
  </div>
)
const UserProfilePage = props => (
  <div className="user-sub-layout">
    <aside>
      <UserNav />
    </aside>
    <div className="primary-content">
      <UserProfile userId={props.match.params.userId} />   //props.match.params
    </div>
  </div>
)
```

**approach 2**

```javascript
const PrimaryLayout = props => {
  return (
    <div className="primary-layout">
      <PrimaryHeader />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/users" component={UserSubLayout} />    //do not use the exact
          <Route path="/products" component={ProductSubLayout} />  //do not use the exact
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  )
}
const UserSubLayout = props => (
  <div className="user-sub-layout">
    <aside><UserNav /></aside>
    <div className="primary-content">
      <Switch>
        //<Route path="/users" exact component={BrowseUsersPage} />
        //<Route path="/users/:userId" component={UserProfilePage} />
        <Route path={props.match.path} exact component={BrowseUsersPage} />
        <Route path={`${props.match.path}/:userId`} component={UserProfilePage} />
      </Switch>
    </div>
  </div>
)
```

>Reference:  https://reacttraining.com/react-router/web/guides/philosophy

- [All About React Router 4](https://css-tricks.com/react-router-4/)
- [由浅入深地教你开发自己的 React Router v4](http://huziketang.com/blog/posts/detail?postId=58d36df87413fc2e82408555)
- [React.js 小书](http://huziketang.com/books/react/)
- [react+react-router 4.0+redux 构建购物车实战项目](http://www.cnblogs.com/qiufenghua/archive/2017/05/25/6904022.html)
- 
