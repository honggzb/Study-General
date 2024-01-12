## 1. 对象的mixin 

```typescript
interface A {
    age: number;
}
interface B {
    name: string;
}
let a: A = {
    age: 18
}
let b: B = {
    name: 'xxkdgjdfk'
}
// 1) 扩展运算符，返回新类型，浅拷贝
let c = {...a, ...b};
// 2) Object.assign，返回交叉类型，浅拷贝
let c1 = Object.assign({}, a, b)
```

## 2. 类的mixin 

```typescript
class A {
    type: boolean = false;
    changeType() {
        this.type = !this.type
    }
}
class B {
    name: string = '张三';
    getName(): string {
        return this.name;
    }
// 没使用extends而是使用implements。 把类当成了接口
class C implements A,B {
    type:boolean
    changeType:()=>void;
    name: string;
    getName:()=> string
}
```

**Example: 插件类型的mixin**

```typescript
class Logger {
    log(msg: string) {
        console.log('logger');
    }
}
class Html {
    render() {
        console.log('render');
    }
}
class App {
    run() {
        console.log('run')
    }
}
type Custructor<T> = new(...args, any[]) => T;
function pluginMixins<T extends Custructor<APP>>(Base: T){
    return class extends Base {
        private Logger = new Logger();
        private Html = new Html();
        constructor(...args: any[]) {
            super(...args)
            this.Logger = new Logger();
            this.Html = new Html();
        }
        run() {
            this.Logger.log('run');
        }
        render() {
            this.Logger.log('render');
            this.Html.render();
        }
    }
}
const mixins = pluginMixins(App);
const app = new mixins();
app.render();
```
