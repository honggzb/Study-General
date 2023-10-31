[styling in Angular](#top)

- [how styles work in angular](#how-styles-work-in-angular)
  - [view encapsulation mode](#view-encapsulation-mode)
  - [component styles](#component-styles)
- [Pre-process CSS](#pre-process-css)
- [Emulated CSS selectors- Special selectors](#emulated-css-selectors--special-selectors)

## how styles work in angular

- shadow DOM
- HTML imports, `<link rel="import` href="component.html">

### view encapsulation mode

```javascript
import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'saa-app',
  encapsulation: 'ViewEncapulation.Native',   //ViewEncapulation.None
  template: `...`,
  styles:[]
})
```

- none, equal to adding the same rules to a global styles.css
- emulated, (default mode)
- native: encapsulation style with shadow DOM, the only problem right now however is that support for Shadow DOM is still lacking

![](https://i.imgur.com/ZhtES5g.png)

```html
<h1 _ngcontent-c0>Hello, I am a 🐰</h1>
<!-- check by using dev-tools -->
<style>
 h1[_ngcontent-c0] {
  background: pink;
  color: white;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
  'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  text-align: center;
  padding: 1rem 0;
}
</style>
```

[back to top](#top)

### component styles

- component metadata with the style property(by default)
- other way to add component styling
  - embedded
  - link tag
  - @import
  - inline
  - styleUrls

```javascript
//Template inline styles
@Component({
  selector: 'app-hero-controls',
  template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
  `
})
//Template link tags
@Component({
  selector: 'app-hero-team',
  template: `
    <!-- must use a relative URL so that the AOT compiler can find the stylesheet -->
    <link rel="stylesheet" href="../assets/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>`
})
```

[back to top](#top)

## Pre-process CSS

```javascript
"scripts": {
  "clean": "rimraf app/**/*.css app/**/*.js app/**/*.js.map",
  "lite": "lite-server",
  "scss": "node-sass app/ -o app/",
  "scss.w": "nop run scss && node-sass app/ -o app/",
  "prestart": "npm run clean",\
  "start": "npm run scss\" "\npm run scss:w\" "\lite-server\"
}
```

[back to top](#top)

## Emulated CSS selectors- Special selectors

**Angular视图封装模式**, Angular的视图封装(View Encapsulation), 在Angular中，组件的样式可以封装在组件的宿主元素中(host)，这样它们就不会影响应用程序的其他部分。

1. ViewEncapsulation.ShadowDom: Angualr使用浏览器内置的Shadow Dom API将组件的视图封装在ShadowRoot中，用作组件的宿主元素，并以隔离的方式应用提供的样式(只对浏览器内置Shadow Dom支持时才起作用)。组件的样式只添加到Shadow Dom宿主中，确保它们只影响各自组件视图中的元素
2. ViewEncapsulation.Emulated：使样式仅应用于组件的视图，不会影响应用程序中的其他元素，模拟Shadow Dom行为(默认的视图封装模式)。组件的样式被添加到文档的<head>中，使它们在整个应用程序中可用，但只影响它们各自组件模板中的元素
3. ViewEncapsulation.None：不使用任何类型的视图封装，为组件指定的任何样式都是全局应用的，并且影响应用程序中的任何HTML元素。组建的样式被添加到文档的<head>中，使它们在整个应用程序中可用，所以时完全全局的，并影响文档中的任务匹配元素

```javascript
@Component({
    selector: 'app-root',
    template: `
        <h2>Parent Component</h2>
        <app-child></app-child>
    `,
    styles: [
        `h2 { background-color: lightskyblue; }`
    ],
    encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {
   // ...
}
```

|Selector|说明|sample|
|---|---|---|
|`:host`|选择组件宿主元素中的元素（相对于组件模板内部的元素）|`:host{border-width: 3px;}`,`:host(.active){border-width: 3px;}`|
|`:host-context`|当前组件宿主元素的祖先节点中查找CSS类， 直到文档的根节点为止(all the way up the tree)|`:host-contex(.theme-light) h2 {background-color: #eef;}`, 只有当某个祖先元素有 CSS 类theme-light时，才会把background-color样式应用到组件内部的所有`<h2>`元素|
| | 注：只有宿主元素及其后代会受到样式影响，而不是祖先元素| 
|`/deep/`,`>>>`, `::ng-deep`|强制一个样式对各级子组件的视图也生效|`:host /deep/ h3 {font-style: italic;}`, **只能被用在仿真 (emulated) 模式下**|
| |任何应用了::ng-deep的样式都会成为全局样式|此样式将应用于app-root内所有h3元素 |
| |为了将指定样式限定在当前组件以及后代，确保在::ng-deep之前包含:host选择器||
| |如果在没有:host伪类选择器的情况下使用::ng-deep选择器，样式可能会渗入其他组件||

- 当**angular引用第三方组件库无法改变其组件样式**时候，可加入`:host ::ng-deep`

```css
:host /deep/ .ant-input-affix-wrapper .ant-input:not(:first-child){
  padding-left: 30px;
}
```

![](https://i.imgur.com/FWF5RHv.png)

[back to top](#top)

> Reference
- [angular style guide](https://angular.io/guide/styleguide)
- [Scoping Your Styles in Angular With ViewEncapsulation](https://alligator.io/angular/viewencapsulation/)
