[React Basic](#top)

- [installation](#installation)
- [Components](#components)
  - [定义组件, 组件的导入与导出](#定义组件-组件的导入与导出)
  - [JSX 规则](#jsx-规则)
  - [在 JSX 中通过大括号使用 JavaScript](#在-jsx-中通过大括号使用-javascript)
  - [使用 props 来互相通信](#使用-props-来互相通信)
  - [条件渲染](#条件渲染)
- [Interactivity](#interactivity)
  - [Event](#event)
- [Adding Interactivity](#adding-interactivity)
  - [Events 事件处理函数](#events-事件处理函数)
  - [State](#state)
  - [Render and Commit](#render-and-commit)
  - [State as a Snapshot](#state-as-a-snapshot)
  - [状态更新- 在重新渲染之前读取最新的state](#状态更新--在重新渲染之前读取最新的state)
- [Managing State](#managing-state)
- [win10运行Visual Studio Code，终端无法执行node命令的解决方案](#win10运行visual-studio-code终端无法执行node命令的解决方案)

---------------------------------------------------------------------------------------------

## installation

|project type|CLI|
|---|---|
| typescript project| `npx create-react-app myproject --template typescript`|
|Next.js 全栈式的 React 框架<br>Next.js 的 App Router 是对 Next.js API 的重新设计，<br>旨在实现 React 团队的全栈架构愿景。它让你在异步组件中获取数据，这些组件甚至能在服务端构建过程中运行| `npx create-next-app@latest`|
|Remix 具有嵌套路由的全栈式 React 框架|`npx create-remix`|
|Gatsby 快速的支持 CMS 的网站的 React 框架|`npx create-gatsby`|
|Expo 具有真正原生 UI 的应用，包括 Android、iOS，以及 Web 应用| `npx create-expo-app`|

[⬆ back to top](#top)

## Components

### 定义组件, 组件的导入与导出

- 定义组件
  - 根组件: 一般定义在App.js 文件中。具体还需根据项目配置决定，有些根组件可能会声明在其他文件中。如果使用的框架基于文件进行路由，如 Next.js，那每个页面的根组件都会不一样
- 组件的导入与导出
  - 默认导入与导出
  - 具名导入与导出
  - 从同一文件中导出和导入多个组件 

语法|导出语句|导入语句
---|---|---
默认|`export default function Button() {}`|`import Button from './Button.js';`
具名|`export function Button() {}`|`import { Button } from './Button.js'`

```javascript
import Gallery from './Gallery.js';  //默认导入
export default function App() {  //默认导出, default
  return (
    <Gallery />
  );
}
//从同一文件中导出和导入多个组件
//Gallery.js 包含两个导出：一个是默认导出的 Gallery，另一个是具名导出的 Profile
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家们</h1>
      <Profile />
      <Profile />
    </section>
  );
}
//在 App 组件里 渲染 <Profile />
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';
export default function App() {
  return (
    <Profile />
  );
}
```

[⬆ back to top](#top)

### JSX 规则

- Component将 HTML 转化为 JSX
- 只能返回一个根元素
- 标签必须闭合 
- 使用驼峰式命名法给 所有 大部分属性命名
- [JSX 转化器](https://transform.tools/html-to-jsx)

```javascript
// JSX 规则
export default function TodoList() {  
  return (
    <div>
      <div className="intro">
        <h1>欢迎来到我的站点！</h1>
      </div>
      <p className="summary">
        你可以在这里了解我的想法
      </p>
    </div>
  );
}
```

[⬆ back to top](#top)

### 在 JSX 中通过大括号使用 JavaScript

- 大括号: 把一个字符串属性传递给 JSX 时，把它放到单引号或双引号中: `<img className="avatar" src={avatar} alt={description} />`
  - 只能在以下两种场景中使用大括号：
  1. 用作 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>` 
  2. 用作紧跟在 = 符号后的 属性：`src={avatar}` 会读取 avatar 变量，但是 src="{avatar}" 只会传一个字符串 {avatar}
- JSX 中的 CSS 和 对象使用 “双大括号”

```javascript
const today = new Date();
function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}
export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
//对象使用 “双大括号”
<ul style={{
    backgroundColor: 'black',
    color: 'pink'
}}>
```

### 使用 props 来互相通信

- Props 是传递给 JSX 标签的信息
- 每个父组件都可以提供 props 给它的子组件，从而将一些信息传递给它
  1. 将 props 传递给子组件
  2. 在子组件中读取 props
- some tip
  - 指定一个默认值: `function Avatar({ person, size = 100 }) { }`
  - 展开语法传递 props: `<div className="card"> <Avatar {...props} /></div>`
  - 将 JSX 作为子组件传递- `children`参数: `<Card><Avatar /></Card>`

```javascript
import { getImageUrl } from './utils.js';
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
  );
}
//展开语法传递 props
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
//将 JSX 作为子组件传递
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
function Card({ children }) {  {/*using children*/}
  return (
    <div className="card">
      {children}                 {/*using children*/}
    </div>
  );
}
export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

[⬆ back to top](#top)

### 条件渲染

- if语句
  - 选择性地将 JSX 赋值给变量: `if (isPacked) { itemContent = name + " ✔"; }`
  - `<li className="item"> {itemContent} </li>`
- 三目运算符`?`: `{cond ? <A /> : <B />}` 表示 当 cond 为真值时, 渲染 `<A />`，否则 `<B />`
- 与运算符`&&`: `{cond && <A />}` 表示 当 cond 为真值时, 渲染 `<A />`，否则不进行渲染

[⬆ back to top](#top)

## Interactivity

### Event

- 传递给事件处理函数的函数应直接传递，而非调用
  - correct: `<button onClick={handleClick}>`
  - wrong: `<button onClick={handleClick()}>`-handleClick() 中最后的 () 会在 渲染 过程中 立即 触发函数，即使没有任何点击
- 事件传播
  - 在 React 中所有事件都会传播，除了 onScroll，它仅适用于你附加到的 JSX 标签

```javascript
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}
function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}> Play Movie </Button>
      <Button onClick={onUploadImage}> Upload Image </Button>
    </div>
  );
}
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}> {children} </button>
  );
}
```

[⬆ back to top](#top)

## Adding Interactivity

- events: user-initiated events
- State: a component’s memory

### Events 事件处理函数

```javascript
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}
function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

|传递一个函数（正确）|调用一个函数（错误）|
|---|---|
|`<button onClick={handleClick}>`	|`<button onClick={handleClick()}>`|
|handleClick 函数作为 onClick 事件处理函数传递,并且只在用户点击按钮时调用你的函数|handleClick()会在渲染过程中立即触发函数，即使没有任何点击。因为在{和}之间的JavaScript会立即执行|
|传递一个函数（正确）|	调用一个函数（错误）|
|`<button onClick={() => alert('...')}>`|`<button onClick={alert('...')}>`|
|稍后调用的函数，而不会在每次渲染时执行其内部代码|在组件渲染时触发，而不是点击时触发|
|传递了`() => alert('...')` 函数|传递了`handleClick`函数|

### State

- 在 React 中，useState 以及任何其他以“use”开头的函数都被称为 **Hook**, Hook是特殊的函数，只在React渲染时有效
  - **陷阱: 以use开头的函数(Hooks)——只能在组件或自定义Hook的最顶层调用**。 不能在条件语句、循环语句或其他嵌套函数内调用Hook。Hook是函数，但将它们视为关于组件需求的无条件声明会很有帮助。在组件顶部 “use” React 特性，类似于在文件顶部“导入”模块
- [useState](https://react.dev/reference/react/useState) Hook: add state to a component
  - declare a state variable. It takes the initial state and returns a pair of values: the current state, and a state setter function that lets you update it
  - useState Hook 提供了这两个功能：
    - State 变量(index) 用于保存上次渲染的数据
    - State setter 函数 更新变量并触发 React 再次渲染组件
- Render and commit: Before components are displayed on the screen, they must be rendered by React
  - Triggering a render
  - Rendering the component
  - Committing to the DOM

```typescript
// using useState hook
//1) 要添加 state 变量，先从文件顶部的 React 中导入 useState
import { useState } from 'react';
//2) change let index = 0; to 
const [index, setIndex] = useState(0);   //index 是一个 state 变量，setIndex 是对应的 setter 函数
//3) using setIndex()
function handleClick() {
  setIndex(index + 1);
}
```

- 赋予一个组件多个 state 变量

```typescript
import { useState } from 'react';
import { sculptureList } from './data.js';
export default function Gallery() {
  // define 多个 state 变量, index和showMore
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  function handleNextClick() {
    setIndex(index + 1);
  }
  function handleMoreClick() {
    setShowMore(!showMore);
  }
  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
    </>
  );
}
```

[⬆ back to top](#top)

### Render and Commit

在一个React应用中一次屏幕更新都会发生以下三个步骤：
- **触发**一次渲染
  - 状态更新时重新渲染: 一旦组件被初次渲染，就可以通过使用**set函数**更新其状态来触发之后的渲染。更新组件的状态会自动将一次渲染送入队列
- **渲染**组件
  - 在进行初次渲染时, React会调用根组件
  - 对于后续的渲染, React会调用内部状态更新触发了渲染的函数组件
- **提交**到DOM
  - 在渲染（调用）组件之后，React将会修改DOM
  - 对于初次渲染， React会使用 `appendChild() DOM API` 将其创建的所有 DOM 节点放在屏幕上
  - 对于重渲染， React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配
  - **React仅在渲染之间存在差异时才会更改DOM节点**

[⬆ back to top](#top)

### State as a Snapshot

当 React 重新渲染一个组件时：
- React 会再次调用你的函数
- 函数会返回新的 JSX 快照
- React 会更新界面以匹配返回的快照
- 注意： **State是隔离且私有的，React会使state的值始终”固定“在一次渲染的各个事件处理函数内部**，即每一次渲染的state值都是固定的

[⬆ back to top](#top)

### 状态更新- 在重新渲染之前读取最新的state 

1. updater function（更新函数）
2. Updating Objects in State
3. Updating Arrays in State

[⬆ back to top](#top)

## Managing State

- 数据如何在组件之间流动

[⬆ back to top](#top)

## win10运行Visual Studio Code，终端无法执行node命令的解决方案

1. 关闭Visual Studio Code
2. 在桌面上找到其图标，右击–属性–兼容性，勾选“以管理员身份运行此程序”
3. 打开Visual Studio Code后，重新打开终端，执行node -v

[⬆ back to top](#top)

> References
- [React官方](https://react.dev/learn/start-a-new-react-project)
- [React中文文档](https://react.docschina.org/learn/start-a-new-react-project)

