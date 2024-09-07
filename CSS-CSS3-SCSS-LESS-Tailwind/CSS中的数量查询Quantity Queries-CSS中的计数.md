[CSS中的数量查询Quantity Queries-CSS中的计数](#top)

- [数1个](#数1个)
- [数N个- nth-last-child(n)](#数n个--nth-last-childn)
- [数大于或等于N个- nth-child(n+6)](#数大于或等于n个--nth-childn6)
- [数小于或等于N- nth-last-child(-n + 6)](#数小于或等于n--nth-last-child-n--6)
- [数大于N小于M](#数大于n小于m)
- [Sass版数量查询](#sass版数量查询)
- [Sample](#sample)

---------------------------------------

|function|css|
|---|---|
|1个|`:only-child`, `:not(only-child)`, `:only-of-type`, `:not(:only-of-type)`|
|N个|`li:nth-last-child(6):first-child, li:nth-last-child(6):first-child ~ li`|
|大于或等于N个|`li:nth-last-child(n + 6), li:nth-last-child(n + 6) ~ li`|
|小于或等于N|`li:nth-last-child(-n + 6), li:nth-last-child(-n + 6) ~ li`|
|大于N小于M|`li:nth-last-child(n + 4):nth-last-child(-n+6):first-child,li:nth-last-child(n + 4):nth-last-child(-n+6):first-child ~ li`|

## 数1个

- CSS3中的`:only-child`, `:not(only-child)`和`:only-of-type`, `:not(:only-of-type)`都可以选择只有一个子元素

[⬆ back to top](#top)

## 数N个- nth-last-child(n)

- 在CSS中`:nth-last-child(n)`选择器，可以从后面开始遍历n个参数。也就是倒数第n个
  - 多层伪类选择器，在原选择器基础上添加`:first-child`来做数量的过滤
  - 添加`~`选择器来完成选择第n个到m个
  
```css
/*  通过:first-child来完成选择到第一个li */
li:nth-last-child(6):first-child{
  background-position: 0 0;
}
/*  通过~选择器来完成选择第2个到6个li */
li:nth-last-child(6):first-child ~ li{
  background-position: 0 0;
}
/*  将这两个选择器组合在一起，就可以选择只有6个li的列表 */
li:nth-last-child(6):first-child,
li:nth-last-child(6):first-child ~ li{
  background-position: 0 0;
}
```

[⬆ back to top](#top)

## 数大于或等于N个- nth-child(n+6)

- 在CSS中`:nth-child(n+6)`选择器可以添加相应的参数，比如`n`或者`n + [整数]`。例如`:nth-child(n + 6)`会选择列表中第六个li后所有li(包括第6个)
- 添加`~`选择器来完成选择大于n个的所有

```css
/* 选择列表中第六个li后所有li(包括第6个) */
li:nth-child(n + 6){
  background-position: 0 0;
}
/* 选择的列表数大于6个的所有li时，可以通过:nth-last-child(n+6)结合:nth-last-child(n + 6) ~ li完成 */
li:nth-last-child(n + 6),
li:nth-last-child(n + 6) ~ li{
  background-position: 0 0;
}
```

[⬆ back to top](#top)

## 数小于或等于N- nth-last-child(-n + 6)

- 在CSS中`:nth-child(-n + 6)`选择器可以添加相应的参数，比如`n`或者`-n + [整数]`。例如`:nth-child(-n + 6)`会选择列表中倒数第一个一直选择倒数第六个li
- 添加`~`选择器来完成选择大于n个的所有

```css
/* 选择列表中倒数第一个一直选择倒数第六个li */
li:nth-last-child(-n + 6){
  background-position: 0 0;
}
/* 选择到了列表项目数小于或等于6的列表中的第一个li */
li:nth-last-child(-n + 6):first-child{
  background-position: 0 0;
}
/* 选择小于或等于六个li */
li:nth-last-child(-n + 6):first-child,
li:nth-last-child(-n + 6):first-child ~ li{
  background-position: 0 0;
}
```

[⬆ back to top](#top)

## 数大于N小于M

```css
li:nth-last-child(n + 4):nth-last-child(-n+6):first-child,
li:nth-last-child(n + 4):nth-last-child(-n+6):first-child ~ li{
  background-position: 0 0;
}
```

[⬆ back to top](#top)

## Sass版数量查询

- 定义几个混合宏, [Quantity Queries mixins](https://github.com/danielguillan/quantity-queries)

```css
ul li {
  @include at-least(6) {
     border: 2px solid green;
  }
  @include at-most(4) {
    border: solid 1px blue;
  }
  @include between(5, 7) {
    box-shadow: 0 0 5px rgba(#000, .5);
    border-radius: 5px;
  }
  @include exactly(8) {
    background: orange;
    box-shadow: 0 0 5px rgba(#000, .5);
    border-radius: 5px;
  }
}
/*  */
:nth-last-child(6):first-child,
:nth-last-child(6):first-child ~ * {
    // unique CSS for elements when there are 6 of these
}
```

[⬆ back to top](#top)

## Sample

- https://www.sitepoint.com/community/t/using-sass-for-quantity-queries/115989
- https://codepen.io/jdsteinbach/pen/myjOQy

```html
<div class="group">
  <div class="item">Item</div>
  <div class="item">Item</div>
  <div class="item">Item</div>
  <div class="item">Item</div>
  <div class="item">Item</div>
  <div class="item">Item</div>
  <div class="item">Item</div>
</div>
```

```css
$color-qty: ( red, orange, yellow, green, blue, indigo, violet );
.group {
  text-align: center;
  margin: 4em 0;
  padding: 0 4em;
}
.item {
  display: inline-block;
  vertical-align: middle;
  padding: .5em 2em .4em;
  margin: .5em;
  border: 2px solid currentColor;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 2;
  color: gray;
  &::after {
    position: fixed;
    display: block;
    width: 100px;
    top: 1em;
    right: 0;
    left: 0;
    width: 100%;
  }  
  @each $color in $color-qty {
    $number: index($color-qty, $color);
    &:nth-last-child(#{$number}):first-child {
      color: $color;
      ~ .item {
        color: $color;
      }
      &::after {
        content: "There are #{$number} of us."
      }
    }
  }
  &:nth-last-child(n+8) {
    &:first-child::after {
      content: "There are more than 7. No more colors."
    }
  }
}
.controls { text-align: center; }
button {
  padding: .5em;
  &.hide {  display: none; }
}
```

```javascript
$('.controls').on('click', function(e){
  e.preventDefault();
  console.log(e);
  if ( $(e.target).hasClass('add-item') ) {
    $('.group').append('<div class="item">Item</div>');
    $('.hide').removeClass('hide');
  } else if ( $(e.target).hasClass('delete-item') ) {
    $('.item:last-child').remove();
    if ( $('.item').length == 0 ) {
      $('.delete-item').addClass('hide');
    }
  }
});
```

[⬆ back to top](#top)

> references
- [CSS中的数量查询](https://www.cnblogs.com/qfly/p/4685801.html)
- [Quantity Queries for CSS](https://alistapart.com/article/quantity-queries-for-css/)
- [Quantity Ordering With CSS](https://www.smashingmagazine.com/2015/07/quantity-ordering-with-css/)
- [Demo of CSS Quantity selector](https://wow.techbrood.com/fiddle/6012)
