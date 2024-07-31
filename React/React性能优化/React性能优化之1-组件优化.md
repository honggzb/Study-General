[React性能优化之1-组件优化](#top)

- [案例1](#案例1)
- [案例2](#案例2)
- [React性能优化API- useMemo, React.memo](#react性能优化api--usememo-reactmemo)

-------------------------------------------

**原则**：将变的部分和不变的部分分离

- props
- state
- context

小结：
1. 寻找性能损耗严重的子树
2. 在子树的**根节点**使用性能优化API
3. 在子树中运用**变与不变分离**原则

## 案例1

```ts
// before
import { useState } from "react";
function ExpensiveCpn() {     //child
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <p>耗时的组件</p>;
}
export default function App() {  //parent
  const [num, updateNum] = useState(0);
  return (
    <div title={num + ""}>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCpn />
    </div>
  );
}
// After
import { useState } from "react";
funtion Input() {                           //变的部分抽离为一个单独的组件
  const [num, updateNum] = useState(0);
  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  )
}
function ExpensiveCpn() {     //child
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <p>耗时的组件</p>;
}
export default function App() {  //parent
  return (
    <div title={num + ""}>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}
```

## 案例2

```ts
// before
import {useState} from 'react';
function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}
export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <div title={num + ''}>      // App中也依赖num
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      <ExpensiveCpn />
    </div>
  );
}
// After
import {useState} from 'react';
function InputWrapper({children}: {children: ReactNode}) {  //变的部分抽离为一个单独的组件
  const [num, updateNum] = useState(0);
  return (
    <div title={num + ''}>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
      {children}
    </div>
  )
}
function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log('耗时的组件 render');
  return <p>耗时的组件</p>;
}
export default function App() {

  return (
    <InputWrapper>
      <ExpensiveCpn />
    </InputWrapper>
  );
}
```

[⬆ back to top](#top)

## React性能优化API- useMemo, React.memo

- 减少不必要的组件更新。这类优化是在组件状态发生变更后，通过减少不必要的组件更新来实现，对应到 React 中就是：减少渲染的节点 、降低组件渲染的复杂度、充分利用缓存避免重新渲染（利用缓存可以考虑使用PureComponent、React.memo、hook函数useCallback、useMemo等方法）
- 如何比较props变化
  - 全等比较
  - 浅比较： 
    - PureComponent 是对类组件的 Props 和 State 进行浅比较
    - React.memo 是对函数组件的 Props 进行浅比较



```js
// before
// https://codesandbox.io/s/gifted-star-hhbfgk?file=/src/App.tsx
import React, {useState, useContext} from 'react';
const numCtx = React.createContext<number>(0);
const updateNumCtx = React.createContext<React.Dispatch<number>>(() => {});
function Button() {
  const updateNum = useContext(updateNumCtx);
  console.log('btn render');
  return (
    <button onClick={() => updateNum(Math.random())}>产生随机数</button>
  )
}
function Show() {
  const num = useContext(numCtx);
  return <p>num is: {num}</p>;
}
const Middle = () => {
  return (
    <>
      <Button/>
      <Show/>
    </>
  )
}
export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <numCtx.Provider value={num}>
      <updateNumCtx.Provider value={updateNum}>
        <Middle/>
      </updateNumCtx.Provider>
    </numCtx.Provider>
  );
}
//因为 oldProps !== newProps， 需要性能优化API
// After
import React, {useState, useContext} from 'react';
const numCtx = React.createContext<number>(0);
const updateNumCtx = React.createContext<React.Dispatch<number>>(() => {});
function Button() {
  const updateNum = useContext(updateNumCtx);
  console.log('btn render')
  return (
    <button onClick={() => updateNum(Math.random())}>产生随机数</button>
  )
}
function Show() {
  const num = useContext(numCtx);
  return <p>num is: {num}</p>;
}
const Middle = React.memo(() => {   //浅比较时候用memo
  return (
    <>
      <Button/>
      <Show/>
    </>
  )
});
// const Middle = () => {   //或用useMemo
//   return useMemo(() => {
//     return (
//     <>
//       <Button/>
//       <Show/>
//     </>
//   )}, [])
// };
export default function App() {
  const [num, updateNum] = useState(0);
  return (
    <numCtx.Provider value={num}>
      <updateNumCtx.Provider value={updateNum}>
        <Middle/>
      </updateNumCtx.Provider>
    </numCtx.Provider>
  );
}
```

```js
// good sample
import React, { useState } from "react";
function Input() {
  const [num, updateNum] = useState(0);
  return (
    <>
      <input value={num} onChange={(e) => updateNum(+e.target.value)} />
      <p>num is {num}</p>
    </>
  );
}
function ExpensiveGrandChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的孙组件 render");
  return <p>耗时的组件</p>;
}
function ExpensiveChild() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的子组件 render");
  return <ExpensiveGrandChild />;
}
function ExpensiveCpn() {
  let now = performance.now();
  while (performance.now() - now < 100) {}
  console.log("耗时的组件 render");
  return <ExpensiveChild />;
}
export default function App() {
  return (
    <div>
      <Input />
      <ExpensiveCpn />
    </div>
  );
}
```

- https://www.bilibili.com/video/BV1j44y1g74m

[⬆ back to top](#top)
