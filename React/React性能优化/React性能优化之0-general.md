[React性能优化](#top)

- [使用React.memo缓存组件](#使用reactmemo缓存组件)
- [用useCallbac和useMemo缓存函数与计算结果](#用usecallbac和usememo缓存函数与计算结果)
- [使用React.lazy和Suspense实现组件的懒加载](#使用reactlazy和suspense实现组件的懒加载)
- [避免使用匿名函数](#避免使用匿名函数)
- [合理使用Key Prop优化列表渲染](#合理使用key-prop优化列表渲染)
- [使用代码拆分Code Splitting](#使用代码拆分code-splitting)

  ----------------------------------------------

  ## 使用React.memo缓存组件

- 避免不必要的重渲染
- React 中父组件每次更新都会导致子组件重新渲染，即使子组件的状态没有发生变化。这时可以用`React.memo`这样只有在传入组件的状态值发生变化时才会从新渲染。如果传入的值相同，则会返回缓存的组件
- 在列表渲染和复杂组件中经常使用它，效果非常明显

```ts
// 使用 React.memo 将子组件包括起来
const Child = React.memo((props) => {
    console.log('子组件');
    return <div>子组件</div>
}
)
const App = () => {
    console.log('父组件');
    const [count, setCount] = useState(0);
    return(<>
    	<div>父组件：count：{count}</div>
        <button onClick={() => setCount(count + 1)}>点击更新</button>
        <Child />
    </>)
}
```

[🚀back to top](#top)

## 用useCallbac和useMemo缓存函数与计算结果

```ts
// 父组件传递一个函数给子组件，即使父组件重渲染但函数逻辑未变，子组件仍可能重新执行。这时可以用 useCallback
const handleClick = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []);
// 对于一些耗时的计算，可以使用 useMemo 做缓存
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(someValue);
}, [someValue]);
// 只有 props.item 改变时res的值才会被重新计算
function Component(props) {
  const res = useMemo(() => countFn(props.item), [props.item]);
  return <div>{res}</div>
}
// 计算函数
const countFn = (item) => {
    ...
}
```

[🚀back to top](#top)

## 使用React.lazy和Suspense实现组件的懒加载

```ts
// 尤其适合路由级别的拆分
// 能显著降低首屏加载时间
const LazyComponent = React.lazy(() => import('./LazyComponent'));
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

[🚀back to top](#top)

## 避免使用匿名函数

- 虽然匿名函数是传递函数的好方法，但它们在每次渲染上都有不同的引用。类似于内联对象
- 为了保证作为props传递给react组件的函数的相同引用，如果使用的类组件可以将其声明为类方法，如果使用的函数组件，可以使用useCallback钩子来保持相同的引用

```ts
// 避免这样做
function Component(props) {
  return <AComponent onChange={() => props.callback(props.id)} />  
}
// 函数组件，优化方法一
function Component(props) {
  const handleChange = useCallback(() => props.callback(props.id), [props.id]);
  return <AComponent onChange={handleChange} />  
}
// 类组件，优化方法二
class Component extends React.Component {
  handleChange = () => {
   this.props.callback(this.props.id) 
  }
  render() {
    return <AComponent onChange={this.handleChange} />
  }
}
```

[🚀back to top](#top)

## 合理使用Key Prop优化列表渲染

```ts
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

## 使用代码拆分Code Splitting

- 通过 Webpack 的动态`import` 或 `React.lazy`把代码按路由或功能拆分成多个chunk，实现按需加载
- `const Dashboard = React.lazy(() => import('./Dashboard'));`

[🚀back to top](#top)

> references
- [React 性能优化必杀技：让你的应用飞起来！](https://juejin.cn/post/7546362284784877587)
- [React性能优化的8种方式](https://blog.csdn.net/qq_15911201/article/details/132362178)
