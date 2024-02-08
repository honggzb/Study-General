[React学习-react中useRef详细总结](#top)

- [什么是useRef](#什么是useref)
- [简单示例1- 点击button的时候选中文本框(访问节点元素)](#简单示例1--点击button的时候选中文本框访问节点元素)
- [简单示例2- 点击image的时候触发上传图像操作input(访问节点元素)](#简单示例2--点击image的时候触发上传图像操作input访问节点元素)
- [useRef的用途](#useref的用途)
  - [访问节点元素- 存储和操作DOM元素](#访问节点元素--存储和操作dom元素)
  - [forwardRef方法和useImperativeHandle方法](#forwardref方法和useimperativehandle方法)
  - [保持可变变量- 操作DOM对象或者需要保存某个值](#保持可变变量--操作dom对象或者需要保存某个值)
  - [获取子组件的属性或方法](#获取子组件的属性或方法)
- [总结](#总结)


--------------------------------------------------------------

## 什么是useRef

```ts
const refContainer = useRef(initialValue);
//  接口定义:
interface React {
  //...
  useRef<T>(initialValue: T): {current: T}
}
//
```

- React 官网对useRef的描述原文
  - useRef is a React Hook that lets you reference a value that’s not needed for rendering
- 返回一个可变的 ref 对象，该对象**只有个 current 属性**，初始值为传入的参数( initialValue )。
- 返回的ref对象在组件的整个生命周期内保持不变(不管函数组件执行多少次，而useRef返回的对象永远都是原来那一个)
- **当更新current值时并不会re-render**，而 **createRef** 每次都会发生变化, 这是与 useState 不同的地方, 
- 更新 useRef 是 side effect (副作用)，所以一般写在 useEffect 或 event handler 里
- useRef 类似于类组件的 this

## 简单示例1- 点击button的时候选中文本框(访问节点元素)

通过useRef定义个inputEl变量，在input 元素上定义`ref={inputEl}`,这样通过inputEl.current就可以获取到input Dom元素，选中则调用下focus函数即可

```ts
import { MutableRefObject, useRef } from 'react'
const TextInputWithFocusButton: React.FC = () => {
   const inputEl: MutableRefObject<any> = useRef(null); //相当于createRef
   const handleFocus = () => {
      inputEl.current.focus()   // `current` 指向已挂载到 DOM 上的文本输入元素
   }
   return (
       <p>
           <input ref={inputEl} type="text" />
           <button onClick={handleFocus}>点击我让input组件获得焦点</button>
       </p>
   )
}
export default TextInputWithFocusButton
```

[⬆ back to top](#top)

## 简单示例2- 点击image的时候触发上传图像操作input(访问节点元素)

```ts
const filePickerRef = useRef();
const handleImageChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { 
      setImageFile(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file));
     }
});
//...
<input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
<div onClick={() => filePickerRef.current.click()}>   //点击我触发input组件onclick event
  <img src={imageFileUrl || currentUser.profilePicture} alt="user" />
</div>
```

[⬆ back to top](#top)

## useRef的用途

使用 useRef 的场景, 一般是需要与外部 API 通信的时候, 而且这些 API 大多不会影响到组件外观, 如果你的组件需要存储一些值, 但不会影响渲染逻辑, 请选择 ref, React 官方列举了一些出现频率较高的情况:

- 存储 timeout ID
- 存储和操作 DOM 元素
- 存储不需要被用来计算 JSX 的其他对象
  
### 访问节点元素- 存储和操作DOM元素

- 访问DOM节点或React元素
- 尽管使用React时，我们推荐大家仅仅只关注数据，但也存在一些场景，需要去访问DOM节点才能达到目的
- 见上面简单示例1，2

```ts
function MyApp () {
  const divRef = useRef(null);
  function logDom () {
  	console.log(divRef.current);    // div DOM
  }
  return <div ref={divRef}></div>
}
```

### forwardRef方法和useImperativeHandle方法

如封装一个Input组件，并且也希望该Input组件能够拥有.focus和.blur方法

- `forwardRef`方法能够传递ref引用: 子组件同意并通过`forwardRef`暴露出指定DOM节点给外界
- `useImperativeHandle`可以让我们在使用ref时自定义暴露给父组件的实例值: 
  -  使用了`useImperativeHandle`之后, 父组件的 ref 获取到的就不再是子组件的 DOM, 而是一个子组件指定的 JS 对象, 这样对子组件来说就保证了安全

```ts
// 1) 官网的案例
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));
// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
// 2) 自定义Input组件
import React, {forwardRef, useState, ChangeEvent} from 'react';
export interface InputProps {
  value?: string,
  onChange?: (value: string) => any
}
function MyInput({value, onChange}: InputProps, ref: any) {
  const [_value, setValue] = useState(value || '');
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onChange && onChange(value);
  }
  return (
    <div>
      自定义Input组件
      <input value={_value} onChange={_onChange} ref={ref} />
    </div>
  );
}
export default forwardRef(MyInput);
```

[⬆ back to top](#top)

要给`.focus`改个名字，或者返回其他额外的属性或者方法，可以使用`useImperativeHandle`

```ts
import React, {useRef, useImperativeHandle, forwardRef, Ref, useState, ChangeEvent} from 'react';
export interface InputProps {
  value?: string,
  onChange?: (value: string) => any
}
export interface XInput {
  focus: () => void;
  blur: () => void;
  sayHi: () => void
}
function MyInput({value, onChange}: InputProps, ref: Ref<XInput>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [_value, setValue] = useState(value || '');
  /**
   *  作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
   *  参数1: 父组件传递的ref属性
   *  参数2: 返回一个对象,父组件通过ref.current调用对象中方法
   */
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current && inputRef.current.focus()
    },
    blur: () => {
      inputRef.current && inputRef.current.blur()
    },
    sayHi: () => {
      console.log('hello, world!');
    }
  }));
  const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setValue(value);
    onChange && onChange(value);
  }
  return (
    <div>
      自定义Input组件
      <input value={_value} onChange={_onChange} ref={inputRef} />
    </div>
  );
}
export default forwardRef(MyInput);
```

使用一下这个MyInput组件

```ts
import React, { useRef, useState } from "react";
import MyInput from './components/Input';
import { Button } from "antd-mobile";
const Demo = () => {
  const textInput = useRef<any>(null);
  const [text, setText] = useState('')
  const focusTextInput = () => {
    if (textInput.current) {
      textInput.current.focus();
      textInput.current.sayHi();
    }
  }
  return (
    <>
      <MyInput ref={textInput} onChange={setText} value={text} />
      <Button onClick={focusTextInput}>点击我，input组件获得焦点</Button>
      <div>{text}</div>
    </>
  );
}
export default Demo;
```

[⬆ back to top](#top)

### 保持可变变量- 操作DOM对象或者需要保存某个值

- 在函数组件中，因为每次re-render就意味着函数重新执行一次，因此在函数内部保持变量引用就可以利用`ref`的`.current`
- 一个很常见的应用场景就是对于定时器的清除: 需要确保setInterval的执行结果timer的引用，才能准确的清除对应的定时器

```ts
import React, { useRef, useEffect } from 'react';
export default function Timer() {
  const timerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    timerRef.current = setInterval(() => {
      console.log('do something');
    }, 1000);
    // 组件卸载时，清除定时器
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    }
  }, []);
  return (
    <div>
      // ...
    </div>
  )
}
```

### 获取子组件的属性或方法

父组件创建一个ref作为一个属性传入子组件。子组件根据内部方法的变化动态更改ref（useEffect）

```ts
import React, { MutableRefObject, useState, useEffect, useRef, useCallback} from 'react'
interface IProps {
    label: string,
    cRef: MutableRefObject<any>
}
const ChildInput: React.FC<IProps> = (props) => {
    const { label, cRef } = props
    const [value, setValue] = useState('')
    const handleChange = (e: any) => {
        const value = e.target.value
        setValue(value)
    }
    const getValue = useCallback(() => { return value }, [value])
    useEffect(() => {
        if (cRef && cRef.current) {
            cRef.current.getValue = getValue
        }
    }, [getValue])
    return (
        <div>
            <span>{label}:</span>
            <input type="text" value={value} onChange={handleChange} />
        </div>
    )
}
// 父组件按钮点击时，通过调用getValue，获取到子组件input里的value值
const ParentCom: React.FC = (props: any) => {
  const childRef: MutableRefObject<any> = useRef({ })
  const handleFocus = () => {
    const node = childRef.current
    alert(node.getValue())
  }
  return (
    <div>
      <ChildInput label={ ‘名称’} cRef={ childRef} />
      <button onClick={ handleFocus}>focus</button>
    </div>
  )
}
export default ParentCom
```

通过useImperativeHandle，配合forwardRef(forwardRef： 将父类的ref作为参数传入函数式组件中)

```ts
通过useImperativeHandle，配合forwardRef
forwardRef： 将父类的ref作为参数传入函数式组件中
```

[⬆ back to top](#top)

## 总结

- useRef 是一个应急方案, 大多数时候不应该是首选, 与 useState 类似都是存储一个变量, 区别在于 useRef 的返回值不会引起重新渲染;
- useRef 接收一个任意类型的参数, 只有在首次渲染有用, 后续渲染会丢弃, 返回一个含有 current 字段的对象, 默认值是传入 useRef 的参数, current 的值可变, 但是不应该在渲染过程中读取和写入
- 渲染过程中可以使用 testRef.current === null 判断来限制修改 ref.current, 这种操作是允许的;
- 通过 JSX 节点上的 ref 属性, 可以让 React 将 DOM 赋值给 ref.current, 但是不能在子组件上直接使用;
- 要获取子组件 DOM 需要通过 forwardRef 方法包装子组件, 并报漏一个 DOM 节点给父组件.
- 如果子组件不想报漏 DOM 节点, 那么可以使用 useImperativeHandle 来指定传递一个任意值给父组件的 ref 接收

> reference
- [【React Hooks】useRef 用法](https://blog.csdn.net/qq_45677671/article/details/116707927)
- [react中useRef详细总结](https://blog.csdn.net/aliven1/article/details/120344030)

