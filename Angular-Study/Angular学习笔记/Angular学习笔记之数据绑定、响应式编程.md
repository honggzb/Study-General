[Angular学习笔记之数据绑定、响应式编程](#top)

- [DOM属性和HTML属性的关系](#DOM%E5%B1%9E%E6%80%A7%E5%92%8CHTML%E5%B1%9E%E6%80%A7%E7%9A%84%E5%85%B3%E7%B3%BB)
- [angular绑定的分类](#angular%E7%BB%91%E5%AE%9A%E7%9A%84%E5%88%86%E7%B1%BB)
- [响应式编程](#%E5%93%8D%E5%BA%94%E5%BC%8F%E7%BC%96%E7%A8%8B)
  - [使用formControl来监听输入的值，并用流的方式处理](#%E4%BD%BF%E7%94%A8formControl%E6%9D%A5%E7%9B%91%E5%90%AC%E8%BE%93%E5%85%A5%E7%9A%84%E5%80%BC%E5%B9%B6%E7%94%A8%E6%B5%81%E7%9A%84%E6%96%B9%E5%BC%8F%E5%A4%84%E7%90%86)

## DOM属性和HTML属性的关系

- DOM属性和HTML属性的关系
  - 少量HTML属性和DOM属性直接有1：1点的映射，如id
  - 有些HTML属性没用对应的DOM属性，如textContent
- DOM属性和HTML属性的不同
  - HTML属性的值指定了初始值，DOM属性的值表示当前值
  - DOM属性的值可以改变，HTML属性的值不能改变
- 模板绑定是通过DOM属性和事件来工作的，而不是HTML属性
- 模板变量: 是在html标签上使用#开头来定义的变量，它代表html元素本身, `<input #iValue (keyup)="onKeyUp(iValue.value)">`

## angular绑定的分类

```html
<!--Dom属性绑定-->
  <input value="Yan" (input)="doOnInput($event)">
<!--html属性绑定-->
  <table border="solid">
    <tr>
      <!-- <td [colspan]="colspanSize">hello</td>会报错：colspan不是td的属性-->
      <td [attr.colspan]="colspanSize" align="center">hello</td>
    </tr>
    <tr>
      <td>嘻嘻</td>
    </tr>
  </table>
  <script>protected colspanSize: number = 2;</script>
<!-- 样式绑定   -->
  <!--单一样式绑定-->
  <div [style.color]="isRed?'red':'green'">单一样式绑定</div>
  <!--多个样式绑定-->
  <div [ngStyle]="divStyles">多个样式绑定</div>
  <script>
  protected isRed = Math.random() < 0.5;
  protected divStyles: any = {
    color: 'red',
    background: 'yellowgreen'
  };
  </script>
```

## 响应式编程

- 万物皆可用流处理，比如页面上的按钮点击事件
  
```javascript
let button = document.querySelector('button');
Observable.fromEvent(button,'click');
```

### 使用formControl来监听输入的值，并用流的方式处理

- `<input [formControl]="formControl">`
- **注意：要使用`[formControl]`需要在`app.module.ts`中引入模块`ReactiveFormsModule`**

```javascript
protected formControl: FormControl = new FormControl();
constructor() {
  this.formControl.valueChanges
                  .debounceTime(500)
                  .subscribe(bookname => this.print(bookname));
}
```
