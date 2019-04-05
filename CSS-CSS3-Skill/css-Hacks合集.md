[CSS hack合集](top)

- [1. CSS HACK的3种表现形式](#HACK的3种表现形式)
- [2. CSS 属性前缀法](#属性前缀法)
- [3. CSS选择器前缀法](#CSS选择器前缀法)
- [4. 条件注释](#条件注释)
- [5. 针对其他浏览器的HACK](#针对其他浏览器的HACK)
- [6. IE11的hack](#IE11的hack)
- [7. CSS3 Media Query to target different Browser](#CSS3-Media-Query-to-target)

```css
-moz-padding-start:    /*firefox*/
-webkit-      /*chrome*/
-ms-          /*IE*/
```

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

[back to top](#top)

<h2 id="IE11的hack">6. IE11的hack</h2>

win8的Metro版IE10将不再支持插件，并且不再支持条件注释

```css
/* IE10的专属css hack */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { 
/* IE10-specific styles go here */ 
} 
/* IE11的专属css hack */
@media all and (-ms-high-contrast:none) {
//这里是要单独为IE11设置的样式
}
```

[back to top](#top)

<h2 id="CSS3-Media-Query-to-target">7. CSS3 Media Query to target different Browser</h2>

```css
/* Internet Explorer */
/* IE 6 */
* html .ie6 { property: value; }
/* or */
.ie6 { _property: value; }
/* IE 7 */
*+html .ie7 { property: value; }
/* or */
*:first-child+html .ie7 { property: value; }

/* IE 6 and 7 */
@media screen\9 {
    .ie67 {
        property: value;
    }
/* or */
.ie67 { *property: value; }
/* or */
.ie67 { #property: value; }
/* IE 6, 7 and 8 */
@media \0screen\,screen\9 {
    .ie678 {
        property: value;
    }
}

/* IE 8 */
html>/**/body .ie8 { property: value; }
/* or */
@media \0screen {
    .ie8 {
        property: value;
    }
}
/* IE 8 Standards Mode Only */
.ie8 { property /*\**/: value\9 }
/* IE 8,9 and 10 */
@media screen\0 {
    .ie8910 {
        property: value;
    }
}
/* IE 9 only */
@media screen and (min-width:0\0) and (min-resolution: .001dpcm) {
    // IE9 CSS
    .ie9{
        property: value;
    }
}
/* IE 9 and above */
@media screen and (min-width:0\0) and (min-resolution: +72dpi) {
    // IE9+ CSS
    .ie9up {
        property: value;
    }
}
/* IE 9 and 10 */
@media screen and (min-width:0\0) {
    .ie910 {
        property: value\9;
    } /* backslash-9 removes ie11+ & old Safari 4 */
}
/* IE 10 only */
_:-ms-lang(x), .ie10 { property: value\9; }
/* IE 10 and above */
_:-ms-lang(x), .ie10up { property: value; }
/* or */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    .ie10up {
        property:value;
    }
}
/* IE 11 (and above..) */
_:-ms-fullscreen, :root .ie11up { property: value; }
/* Microsoft Edge */
@supports (-ms-ime-align:auto) {
    .selector {
        property: value;
    }
}

/* Firefox */
/* Any version (Gecko) */
@-moz-document url-prefix() {
    .ff {
        color: red;
    }
}
/* Quantum Only (Stylo) */
@-moz-document url-prefix() {
    @supports (animation: calc(0s)) {
        /* Stylo */
        .ffStylo {
            property: value;
        }
    }
}
/* Legacy (pre-Stylo) */
@-moz-document url-prefix() {
    @supports not (animation: calc(0s)) {
        /* Gecko */
        .ffGecko {
            property: value;
        }
    }
}

/* Webkit */
/* Chrome & Safari (any version) */
@media screen and (-webkit-min-device-pixel-ratio:0) {
    property: value;
}
/* Chrome 29+ */
@media screen and (-webkit-min-device-pixel-ratio:0) and (min-resolution:.001dpcm) {
    .chrome {
        property: value;
    }
}
/* Safari (7.1+) */
_::-webkit-full-page-media, _:future, :root .safari_only {
    property: value;
}
/* Safari (from 6.1 to 10.0) */
@media screen and (min-color-index:0) and(-webkit-min-device-pixel-ratio:0) {
    @media {
        .safari6 {
            color:#0000FF;
            background-color:#CCCCCC;
        }
    }
}
/* Safari (10.1+) */
@media not all and (min-resolution:.001dpcm) {
    @media {
        .safari10 {
            color:#0000FF;
            background-color:#CCCCCC;
        }
    }
}
```

[back to top](#top)

-------------------------------------

> Reference
- [史上最全的CSS hack方式一览（解决IE6-IE11,Firefox/Safari/Opera/Chrome兼容问题）](http1s://blog.csdn.net/dayu9216/article/details/70225261)
- [CSS3 Media Query to target only Internet Explorer (from IE6 to IE11+), Firefox, Chrome, Safari and/or Edge](https://www.ryadel.com/en/css3-media-query-target-only-ie-ie6-ie11-firefox-chrome-safari-edge/#Chrome_Safari_any_version)
