[Scss小结](#top)

- [Scss Variables和数据类型](#scss-variables和数据类型)
- [Scss Nesting](#scss-nesting)
  - [Nested Rules](#nested-rules)
  - [Nested Properties](#nested-properties)
- [Scss @at-root](#scss-at-root)
- [Scss](#scss)
- [Scss @import directive](#scss-import-directive)
  - [Scss Partials](#scss-partials)
- [Scss @mixin and @include](#scss-mixin-and-include)
- [Scss !optional- 可选的](#scss-optional--可选的)
- [Scss @extend and Inheritance](#scss-extend-and-inheritance)
- [Scss #{}插值](#scss-插值)
- [Scss运算符](#scss运算符)
  - [Scss颜色运算符](#scss颜色运算符)
  - [Scss比较运算符](#scss比较运算符)
  - [Scss算术运算符](#scss算术运算符)
- [Scss字符串连接符](#scss字符串连接符)
- [Scss指令](#scss指令)
  - [Scss @for指令](#scss-for指令)
  - [Scss @while指令](#scss-while指令)
  - [Scss @each指令](#scss-each指令)
  - [Scss @else if指令](#scss-else-if指令)
  - [Scss @if指令](#scss-if指令)
- [Scss Functions](#scss-functions)
  - [Scss String Functions](#scss-string-functions)
  - [Scss Numeric Functions](#scss-numeric-functions)
  - [Scss List Functions](#scss-list-functions)
  - [Scss Map Functions](#scss-map-functions)
  - [Scss自定义函数](#scss自定义函数)


-------------------------------------

## Scss Variables和数据类型

- Variables uses `$variables`
- 数据类型
  - strings: "foo", 'bar', baz
  - numbers: 1, 2, 13, 10px
  - colors: `blue`, `#04a3f9`, `rgba(255,0,0,0.5)`
  - booleans: `true`, `false`
  - nulls
  - lists: 用空格或逗号作分隔符
  - maps: 相当于JavaScript对象直接量, scss内置了七个用来专门操作map的函数
    - .map-get($map,$key)：根据给定key，返回map中对应的value
    - .map-merge($map1,$map2)：将两个map合并成一个新的map
    - .map-remove($map,$key)：从map中删除一个key，返回一个新map
    - .map-keys($map)：返回map中所有的key
    - .map-values($map)：返回map中所有的value
    - .map-has-key($map,$key)：根据给定key判断map是否有对应value，有返回true，否则false
    - .keywords($args)：返回一个函数的参数，这个参数可以动态的设置key和value


```scss
$myFont: Helvetica, sans-serif;
$myColor: red;
$myFontSize: 18px;
/*列表*/
//1 定义一个列表
$px: 5px 10px 15px 20px;
#main {
margin-top:nth($px, 1);
margin-right: nth($px, 2);
margin-bottom: nth($px, 3);
margin-left: nth($px, 4);
}
// 编译后的 CSS 文件
#main {
    margin-top: 5px;
    margin-right: 10px;
    margin-bottom: 15px;
    margin-left: 20px;
}
//2 列表合并
$px1: 5px 10px 15px;
$px2: 1px 2px 3px;
$px: join($px1, $px2); // 5px 10px 15px 1px 2px 3px
// 3 列表添加新值
$px: 5px 10px 15px 20px;
$px: append($px, 11px); // 将 11px 添加到 $px 中
/*Map对象*/
$map: (
  $key1: value1,
  $key2: value2,
  $key3: value3
)
//嵌套map
$map: (
  key1: value1,
  key2: (
    key-1: value-1,
    key-2: value-2,
  ),
  key3: value3
);
//比如网站的皮肤管理
$theme-color: (
  default: (
    bgcolor: #fff,
    text-color: #444,
    link-color: #39f),
  primary:(
    bgcolor: #000,
    text-color:#fff,
    link-color: #93f),
  negative: (
    bgcolor: #f36,
    text-color: #fefefe,
    link-color: #d4e)
)
```

## Scss Nesting

### Nested Rules

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
}
```

### Nested Properties

```scss
font: {
  family: Helvetica, sans-serif;
  size: 18px;
  weight: bold;
}
text: {
  align: center;
  transform: lowercase;
  overflow: hidden;
}
```

[⬆ back to top](#top)

## Scss @at-root

- `@at-root`使一个或多个规则被限定输出在文档的根层级上，而不是被嵌套在其父选择器下
  - `@at-root(without: rule)`: rule关键词只能跳出选择器嵌套，不能跳出 `@media` 和 `@support`
  - `@at-root(without: media)`: 可以跳出`@media` ，但是没有跳出父级选择器
  - `@at-root(without: support)`: 可以跳出的是 `@support`，但是没有跳出父级选择器
  - `@at-root(without: all)`: 跳出所的指令和规则
- 在默认情况下`@at-root`并不会使指定的规则或则选择器跳出指令，比如`@media`或者`@supports`
  - 跳出这两种，则需使用` @at-root(without: media)`，`@at-root(without: support)`

```scss
.parent{
  color:red;
  @at-root .child {
    width:200px;
    height:50px;
  }
}
// 跳出 @media并跳出父级选择器
@media print {
    .page {
      width: 800px;
      a {
          color: red;
          @at-root(without: media rule) {  // @at-root(without: all)
            span { color: #00f }
          }
        }
    }
}
//编译后的css
@media print {
    .page { width: 800px; }
    .page a { color: red; }
}
span { color: #00f; }
```

[⬆ back to top](#top)

## Scss 

## Scss @import directive

- allows you to include the content of one file in another
- The CSS `@import` directive has a major drawback due to performance issues; it creates an extra HTTP request each time you call it. However, the Scss `@import` directive includes the file in the CSS; so no extra HTTP call is required at runtime
- `@import filename;`

### Scss Partials

- Scss has a mechanism for this: If you start the filename with an **underscore**, Scss will not transpile it. Files named this way are called partials in Scss
- such as "_colors.scss" - This file will not be transpiled directly to "colors.css"
- if you import the partial file, omit the underscore. Scss understands that it should import the file "_colors.scss":

```scss
// "_colors.scss"
$myBlue: #4169E1;
// other.scss
@import "colors";
body {
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  color: $myBlue;
}
```

[⬆ back to top](#top)

## Scss @mixin and @include

- `@mixin` directive lets you create CSS code that is to be **reused** throughout the website
- `@include` directive is created to let you use (include) the mixin
  - A mixin can also include other mixins
  - mixin没带参数，那么可以省略小括号；如果带有参数，必须带有小括号。参数与参数之间用逗号分隔。
  - mixin可以给混合器的参数设置默认值

```scss
// 没带参数
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}
// Using a Mixin
.danger {
  @include important-text;
  background-color: green;
}
//A mixin can also include other mixins
@mixin special-text {
  @include important-text;
  @include link;
  @include special-border;
}
// 带参数设置默认值
@mixin setborder($color, $width: 2px) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {  @include setborder(green); }
h1 { @include setborder(green, 4px); }
// 参数变量（...）也可以在@include引用混合器的时候，将值列表中的值逐条作为参数引用
@mixin colorlist($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}
$values: #ccc, #0ff, #fff;
.orignal{
  @include colorlist($values...);
}
```

[⬆ back to top](#top)

## Scss !optional- 可选的

```scss
p {
  color:red;
  @extend .notice !optional
}
```

[⬆ back to top](#top)

## Scss @extend and Inheritance

- `@extend` directive lets you share a set of CSS properties from one selector to another
- `@extend` directive is useful if you have almost identically styled elements that only differ in some small details

```scss
.button-basic {
  border: none;
  padding: 15px 30px;
  text-align: center;
}
.button-report {
  @extend .button-basic;
  background-color: red;
}
.button-submit {
  @extend .button-basic;
  background-color: green;
  color: white;
}
//css output
.button-basic, .button-report, .button-submit {
  border: none;
  padding: 15px 30px;
  text-align: center;
}
.button-report {
  background-color: red;
}
.button-submit {
  background-color: green;
  color: white;
}
```

[⬆ back to top](#top)

## Scss #{}插值

当变量作为**属性**或在**某些特殊情况**下则必须要以`#{$variables}` 形式使用

```scss
$borderDirection: top !default;
$baseFontSize: 12px !default;
$baseLineHeight: 1.5 !default;
//1 应用于 class 和属性
.border-#{$borderDirection} {
  border-#{$borderDirection}: 1px solid #ccc;
}
// 编译后的css
.border-top { border-top:1px solid #ccc; }
//2 应用于复杂的属性值
body {
  font:#{$baseFontSize}/#{$baseLineHeight};
}
// 编译后的css
body { font: 12px/1.5; }
```

[⬆ back to top](#top)

## Scss运算符

### Scss颜色运算符

- scss允许使用颜色分量以及算术运算和任何颜色表达式返回颜色值

```scss
$color1: #333399;
$color2: #CC3399;
p{ color: $color1 + $color2; }
// 编译后的css
p { color: #ff66ff; }
```

### Scss比较运算符

- `===` : 类似于JavaScript严格类型比较(===)
- `>`、`>=`
- `<`、`<=`

```scss
$padding: 50px;
h2 {
  @if($padding <= 20px) {
    padding: $padding;
  } @else {
    padding: $padding / 2;
  }
}
```

### Scss算术运算符

- 赋值运算符: `:`, `$highlight-color: #F90;`
- 算数运算符: `+`、`-`、`*`、`/`和`%`(求余)
  - 除法运算符（/）需要特别注意一下，因为除法运算符本身也是css语法的一部分, 如`font: 16px / 24px Arial sans-serif;`

```scss
div {
  font-size: 5px + 2em;   /*单位不一致，编译报错*/
  font-size: 5px + 2;    /*7px，如果有一个操作数没有单位，则默认使用另一个操作数的单位。*/
}
div {
  font-size: 5px * 2;
  font-size: 5px * 2px;  /*具有相同单位的数值相乘会报错*/
}
div {
  font-size: 16px / 24px;    /*不执行除法操作，原样输出*/
  font-size: #{$base-size} / #{$line-height};  /*使用插值语法之后，原样输出*/
  font-size: (16px / 24px);   /* 使用括号包裹之后，执行除法操作*/
  font-size: $base-size / $line-height;  /* 使用变量，执行除法操作*/
  opacity: random(4) / 5;   /* 调用函数，执行除法操作*/
  padding-right: 2px / 4px + 3px;  /* 使用算术操作符，执行除法操作*/
}
```

[⬆ back to top](#top)

## Scss字符串连接符

- `+`运算可用于连接字符串
- 如果带引号的字符串被添加到不带引号的字符串中（也就是说，带引号的字符串在 + 的左侧），那么返回的结果是带引号的字符串。同样，如果一个不带引号的字符串添加到带引号的字符串中（不带引号的字符串在 + 的左侧）那么返回的结果是一个不带引号的字符串
- 默认情况下，运算表达式与其他值连用时，用空格做连接符
- 在文本字符串中，`#{}`式插值可以用来在字符串中放置动态值
- 在字符串插值时，`Null`值被视为空字符串

```scss
// SCSS
p { cursor: e + -resize;}  // p { cursor: e-resize; }
// SCSS
p:before {
    content: "Foo " + Bar;
    font-family: sans- + "serif";
}
// 编译后的 CSS 样式
p:before {
    content: "Foo Bar";
    font-family: sans-serif;
}
p:before { content: "I ate #{5 + 10} pies!";}
// p:before { content: "I ate 15 pies!"; }
$value: null;
p:before { content: "I ate #{$value} pies!"; }
// p:before { content: "I ate  pies!"; }
```

[⬆ back to top](#top)

## Scss指令

### Scss @for指令

- `@for $var from <start> through <end>`: 遍历索引区间是[start,end]
- `@for $var from <start> to <end>`:  遍历索引区间是[start,end-1]

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

### Scss @while指令

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```

### Scss @each指令

- `@each $var in <list or map>`
- `@each $var1, $var2, $var3 ... in <list>`:  多个值用@each 指令中使用之列表list
- `@each $var1, $var2 in <map>`:  多个值用@each 指令中使用之列表对map

```scss
@each $color in red, green, yellow, blue {
  .p_#{$color} {
    background-color: #{$color};
  }
}
// 编译后的css
.p_red { background-color: red; }
.p_green { background-color: green; }
.p_yellow { background-color: yellow; }
.p_blue { background-color: blue; }
// 多个值
@each $color, $border in (aqua, dotted), (red, solid), (green, double){
  .#{$color} {
    background-color : $color;
    border: $border;
  }
}
// 编译后的css
.aqua {
  background-color: aqua;
  border: dotted; }
.red {
  background-color: red;
  border: solid; }
.green {
  background-color: green;
  border: double; }
//
@each $header, $color in (h1: red, h2: green, h3: blue) {
  #{$header} {
    color: $color;
  }
}
// 编译后的css
h1 { color: red; }
h2 { color: green; }
h3 { color: blue; }
```

[⬆ back to top](#top)

### Scss @else if指令

```scss
$type: audi;
p {
  @if $type == benz {
    color: red;
  } @else if $type == mahindra {
    color: blue;
  } @else if $type == audi {
    color: green;
  } @else {
    color: black;
  }
}
```

### Scss @if指令

```scss
p {
    @if 10 + 10 == 20 { border: 1px dotted;   }
    @if 7 < 2 { border: 2px solid;  }
    @if null { border: 3px double; }
}
```

[⬆ back to top](#top)

## Scss Functions

### Scss String Functions

|Functions|description|sample|
|---|---|--|
|`quote(string)`|Adds quotes to string|`quote(Hello world!)`, "Hello world!"|
|`unquote(string)`|Removes quotes around string (if any)|`unquote("Hello world!")`, Hello world!|
|`str-index(string, substring)`|Returns the index of the first occurrence of the substring|`str-index("Hello world!", "H")`|
|`str-insert(string, insert, index)`| insert inserted at the specified index position|`str-insert("Hello world!", " wonderful", 6)`|
|`str-length(string)`|Adds quotes to string, and returns the result|`quote(Hello world!)`|
|`str-slice(string, start, end)`| |`str-slice("Hello world!", 2, 5)`|
|`to-lower-case(string)`| |`to-lower-case("Hello World!")`|
|`to-upper-case(string)`| |`to-upper-case("Hello World!")`|
|`unique-id()`|Returns a unique randomly generated unquoted string |`unique-id()`|
|`to-upper-case(string)`| |`to-upper-case("Hello World!")`|

[⬆ back to top](#top)

### Scss Numeric Functions

|Functions|sample|
|---|---|
|`abs(number)`|`abs(-15)`, 15|
|`ceil(number)`|`ceil(15.20)`, 16|
|`floor(number)`|`floor(15.20)`, 15|
|`round(number)`|`round(15.20)`, 15, `round(15.80)`, 16|
|`comparable(num1, num2)`|`comparable(15px, 10px)`, true, `comparable(20mm, 1cm)`, true, `comparable(35px, 2em)`, false|
|`max(number...)`|`max(5, 7, 9, 0, -3, -7)`, 9|
|`min(number...)`|`min(5, 7, 9, 0, -3, -7)`, -7|
|`percentage(number)`|`percentage(1.2)`, 120|
|`random()`|`random()`, 0.45673|

[⬆ back to top](#top)

### Scss List Functions

|Functions|sample|
|---|---|
|`append(list, value, [separator])`|`append((a b c), d)`, a b c d, `append((a b c), (d), comma)`, a, b, c, d|
|`index(list, value)`|`index(a b c, b)`, 2, `index(a b c, f)`, null|
|`is-bracketed(list)`|`is-bracketed([a b c])`, true, `is-bracketed(a b c)`, false|
|`join(list1, list2, [separator, bracketed])`|`join(a b c, d e f)`, a b c d e f,`join((a b c), (d e f), comma)`, a, b, c, d, e, f, `join(a b c, d e f, $bracketed: true)`,[a b c d e f]|
|`length(list)`|`length(a b c)`, 3|
|`list-separator(list)`|`list-separator(a b c)`, space, `list-separator(a, b, c)`, comma|
|`nth(list, n)`|`nth(a b c, 3)`, 3|
|`set-nth(list, n, value)`|`set-nth(a b c, 2, x)`, a x c|
|`zip(lists)`|`zip(1px 2px 3px, solid dashed dotted, red green blue)`, 1px solid red, 2px dashed green, 3px dotted blue|

[⬆ back to top](#top)

### Scss Map Functions

<table class="ws-table-all notranslate">
  <tbody><tr>
    <th>Function</th>
    <th>Description &amp; Example</th>
  </tr>
  <tr>
    <td>map-get(<em>map</em>, <em>key</em>)</td>
    <td>Returns the value for the specified <em>key </em>in the map.<br><br>
    <strong>Example:</strong><br>$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)<br>map-get($font-sizes, 
    "small")<br>Result: 12px</td>
  </tr>
  <tr>
    <td>map-has-key(<em>map</em>, <em>key</em>)</td>
    <td>Checks whether <em>map</em> has the specified <em>key</em>. Returns true or 
    false.<br><br><strong>Example:</strong><br>$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)<br>map-has-key($font-sizes, 
    "big")<br>Result: false</td>
  </tr>
  <tr>
    <td>map-keys(<em>map</em>)</td>
    <td>Returns a list of all keys in <em>map</em>.<br><br><strong>Example:</strong><br>
    $font-sizes: ("small": 12px, "normal": 18px, "large": 24px)<br>map-keys($font-sizes)<br>Result: 
    "small", "normal, "large"</td>
  </tr>
  <tr>
    <td>map-merge(<em>map1</em>, <em>map2</em>)</td>
    <td>Appends <em>map2</em> to the end of <em>map1</em>.<br><br><strong>
    Example:</strong><br>$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)<br>
    $font-sizes2: ("x-large": 30px, "xx-large": 36px)<br>map-merge($font-sizes, 
    $font-sizes2)<br>Result: "small": 12px, "normal": 18px, "large": 24px, 
    "x-large": 30px, "xx-large": 36px</td>
  </tr>
  <tr>
    <td>map-remove(<em>map</em>, <em>keys...</em>)</td>
    <td>Removes the specified keys from <em>map</em>.<br><br><strong>Example:</strong><br>$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)<br>map-remove($font-sizes, 
    "small")<br>Result: ("normal": 18px, "large": 24px)<br>map-remove($font-sizes, 
    "small", "large")<br>Result: ("normal": 18px)</td>
  </tr>
  <tr>
    <td>map-values(<em>map</em>)</td>
    <td>Returns a list of all values in <em>map</em>.<br><br><strong>Example:</strong><br>$font-sizes: ("small": 12px, "normal": 18px, "large": 24px)<br>map-values($font-sizes)<br>Result: 
    12px, 18px, 24px</td>
  </tr>
  </tbody>
</table>

[⬆ back to top](#top)

### Scss自定义函数

- scss函数名中的中划线和下划线是等同的，font-size和font_size指向同一个函数

```scss
// 语法
@function function-name($args) { 
  @return value-to-be-returned; 
}
// sample
@function column-width($col, $total) { 
  @return percentage($col/$total); 
}
.col-3 { width: column-width(3, 8);}
.col-3 { width: column-width(4); }   // 报错，函数调用时只传递了一个参数
//默认参数
@function column-width($col:3, $total:8) { 
  @return percentage($col/$total); 
}
.col-3 { width: column-width(4); }  // 传递的参数会覆盖默认的参数，所以4会覆盖3，第二个参数使用默认值
// 函数rest参数
@function column-width($index, $widths...){ 
  @return nth($widths, $index); 
}
.col-3 { width: column-width(3, 25%, 50%, 75%, 100%); }  // .col-3 { width: 75%; }
/*结合mixin sample：文本格式化，超出范围，显示省略号*/
@mixin text-overflow($width:100%, $display:block) {
  width: $width;
  display: $display;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
}
@include text-overflow()
```

[⬆ back to top](#top)

> references
- [Scss Tutorial](https://www.w3schools.com/Scss)
- [scss-@for 指令](https://www.cnblogs.com/ibabyli/p/9871289.html)
