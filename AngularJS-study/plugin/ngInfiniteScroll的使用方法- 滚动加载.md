[ngInfiniteScroll的使用方法- 滚动加载](#top)

## 插件说明

```html
<ANY infinite-scroll='{expression}'
     [infinite-scroll-distance='{number}']
     [infinite-scroll-disabled='{boolean}']
     [infinite-scroll-immediate-check='{boolean}']
     [infinite-scroll-listen-for-event='{string}']
     [infinite-scroll-container='{HTMLElement | [] | string}']
     [infinite-scroll-use-document-bottom='{boolean}']
     [infinite-scroll-parent]>
</ANY>
```

属性|含义
---|---
:one: `infinite-scroll`: |当滚动到浏览器底部时，所执行的函数或者表达式，通常是函数形式。
:two: `infinite-scroll-distance (optional)`| {number} 表达式或者数字，如果是一个数字，表示滚动条距 
离浏览器底部多少远时，执行①中里面的函数。如果将这个值设置为2，对于1000px高度的元素，当 
元素底部距离浏览器窗口底部距离在2000px像素以内，没滚动一次，都会执行一次里面的函数。 
（这个值默认是0，即当元素滚动到元素底部达到浏览器窗口（滚动区域）底部时，执行滚动区域里面 
的函数。
:three: `infinite-scroll-disabled (optional)`|{boolean} 一个布尔值，用于标志滚动表达函数能否执行，如 
果值为true，表示滚动函数不能被执行。这个属性，通常用于暂停或者停止滚动。比如当我们在AJAX 
请求数据的过程中，移动了滚动条，这时就需要设置这个属性，禁止滚动函数的执行。
:four: `infinite-scroll-immediate-check (optional)` |{boolean} 一个布尔值，用于标志指令在初始化页面 
时，是否为初始执行一次（即使这种情况下，没有初始滚动），默认值为true，表示初始会执行一次这 
里面的函数。
:five: `infinite-scroll-listen-for-event (optional)`|{string} 一个事件，当接受到这个事件时候，会重新执 
行滚动函数，重新定位滚动位置，比如到元素被修改时，会重新执行滚动函数


> [ngInfiniteScroll documentation](https://sroze.github.io/ngInfiniteScroll/documentation.html)
