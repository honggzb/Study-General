[CSS hack合集](top)

- [1. CSS HACK的3种表现形式](#HACK的3种表现形式)
- [2. CSS 属性前缀法](#属性前缀法)
- [3. CSS选择器前缀法](#CSS选择器前缀法)
- [4. 条件注释](#条件注释)
- [5. 针对其他浏览器的HACK](#针对其他浏览器的HACK)

<h2 id="HACK的3种表现形式">1. CSS HACK的3种表现形式</h2>

| 表现形式| 说明|
| :------------- | :------------- |
|CSS属性前缀法| 比如IE6能识别下划线"_"和星号" * "，IE7能识别星号" * "，但不能识别下划线"_"，IE6~IE10都认识"\9"，但firefox对前面三个都不能认识|
|CSS选择器前缀法|比如 IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}|
|IE条件注释法|针对所有IE， `<!--[if IE]>IE浏览器显示的内容 <![endif]-->`。比如：针对IE6及以下版本： <!--[if lt IE 6]>只在IE6-显示的内容 <![endif]-->。这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效(注：IE10+已经不再支持条件注释)|

<h2 id="属性前缀法">2. CSS 属性前缀法</h2>

**一般写HACK的顺序**：从最新版本到低版本，比如：新版本、IE（10/9/8）、IE（7/6）

```css
color: black;  /* 所有 */
color: white !important; /* 除了IE6外 */
color: orange\9\0; /* IE 9/10 */
color: green\0;  /* IE 8/9/10 */
*color: yellow;   /* IE6/7 */
+color: gold;  /* IE6/7 */
*+color: blue; /* IE6/7 */
_color: red;  /* IE6 */
```

|浏览器 |属性前缀|案例|
| :------------- | :------------- |:------------- |
|IE6|`_`|`.test1 { _color: red; }`|
|IE6|`-`|`.test5 { -color: pink; }`|
|IE7及其以下版本|`*`|`.test2 { *color: yellow; }`<br>如果是在选择器上设置，则只会在IE6中生效：`*html .test { color: gold; }`|
|IE6/IE7|`+`|`.test6 { +color: gold; }`|
|IE6/IE7|`*+`|`.test7 { *+color: blue; }`<br>如果在类的属性上加，会在IE6/IE7都生效,如果在选择器上加，只会在IE7生效:`*+html .test { color: black; }`|
|IE6/IE7/IE8|`\9`|`.test3 { color: purple\9; }`|
|IE8/IE9/IE10/IE11|`\0`|`.test4 { color: green\0; }`|
|IE6/IE7|`+`|`.test6 { +color: gold; }`|
|除了IE6，其他浏览器中都生效|`!important`|`.test8 { color: #fff !important; }`|
|IE9/IE10|`\9\0`|`.test9 { color: orange\9\0; }`|

[back to top](#top)

<h2 id="CSS选择器前缀法">3. CSS选择器前缀法</h2>

|浏览器 |属性前缀|案例|
| :------------- | :------------- |:------------- |
|只在IE6中生效|`*`|`*html .test21 { color: gold; }`|
|只在IE7中生效|`*+`|`*+html .test22 { color: gold; }`|
|IE6/IE7|`@media screen\9`|`@media screen\9 {.test23 { color: purple; }  }`|
|IE8|`@media \0screen`|`@media \0screen {.test25 { color: orange; }  }`|
|IE6/IE7/IE8|`@media \0screen\,screen\9`|`@media \0screen\,screen\9 { .test23 { color: gold; }  }`|
|IE8/IE9/IE10/IE11|`@media screen\0  `|`@media screen\0 { .test26 { color: green; }  }`|
|IE9/IE10/IE11|`@media screen and (min-width: 0\0) `|`@media screen and (min-width: 0\0) { .test27 { color: red; }  }`|

[back to top](#top)

<h2 id="条件注释">4. 条件注释</h2>

```html
<!--[if IE]> 所有IE中生效 <![endif]-->
<!--[if IE 7]>  只在IE7生效 <![endif]-->
<!--[if ! IE 6]>  在IE6上不生效（非IE6生效） <![endif]-->
<!--[if ! IE]>  所有IE中都不生效（非IE生效） <![endif]-->
<!--[if gt IE 6]>  在IE6以上（不包含IE6）生效 <![endif]-->
<!--[if lt IE 6]>  IE6以下（不包含IE6）可生效 <![endif]-->
<!--[if lte IE 6]>  IE6及IE6以下可生效 <![endif]-->
<!--[if gte IE 6]>  IE6及IE6以上可生效 <![endif]-->
<!--[if (gt IE 6)&(lt IE 8)]> IE6版本以上且IE8版本以下可生效 <![endif]-->    <!-- &符号表示AND运算符 -->
<!--[if (IE 6)|(IE 7)]>  IE6或IE7可生效 <![endif]-->   <!-- |符号表示OR运算符 -->
```

> 注：IE10+已经不再支持条件注释。

[back to top](#top)

<h2 id="针对其他浏览器的HACK">5. 针对其他浏览器的HACK</h2>

|其他浏览器|代码|
| :------------- | :------------- |
|火狐|`@-moz-document url-prefix() {.test { color: red; } }`|
|针对Webkit内核浏览器|`@media all and (min-width:0px) { color: purple; }`

[back to top](#top)

> References

- [CSS hack合集](http://ghmagical.com/article/page/id/I5NohCGdIxAt)
- See specific [CSS & JS hacks beyond IE](http://browserhacks.com/)

```css
/***** Attribute Hacks ******/
/* IE6 */
#once { _color: blue }
/* IE6, IE7 */
#doce { *color: blue; /* or #color: blue */ }
/* Everything but IE6 */
#diecisiete { color/**/: blue }
/* IE6, IE7, IE8, but also IE9 in some cases :( */
#diecinueve { color: blue\9; }
/* IE7, IE8 */
#veinte { color/*\**/: blue\9; }
/* IE6, IE7 -- acts as an !important */
#veintesiete { color: blue !ie; } /* string after ! can be anything */
/* IE8, IE9 */
#anotherone  {color: blue\0;} /* must go at the END of all rules */
/* IE9, IE10 */
@media screen and (min-width:0\0) {
    #veintidos { color: red}
}
/***** Attribute Hacks ******/

/* IE6 */
#once { _color: blue }
/* IE6, IE7 */
#doce { *color: blue; /* or #color: blue */ }
/* Everything but IE6 */
#diecisiete { color/**/: blue }
/* IE6, IE7, IE8, but also IE9 in some cases :( */
#diecinueve { color: blue\9; }
/* IE7, IE8 */
#veinte { color/*\**/: blue\9; }
/* IE6, IE7 -- acts as an !important */
#veintesiete { color: blue !ie; } /* string after ! can be anything */
/* IE8, IE9 */
#anotherone  {color: blue\0/;} /* must go at the END of all rules */
/* IE9, IE10 */
@media screen and (min-width:0\0) {
    #veintidos { color: red}
}
```
