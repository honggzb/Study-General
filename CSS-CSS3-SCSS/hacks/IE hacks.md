```css
/* IE 11 (and above..) */
_:-ms-fullscreen, :root .selector { property:value; }
/* Internet Explorer 11 (And Chrome 10-24, Safari 5.1-6.0) */
/* This -ms-backdrop hack also picks up old versions of Chrome and Internet Explorer so again, not my favorite */
*::-ms-backdrop, :root .selector { property:value; }
/*IE 10 and above*/
_:-ms-lang(x), .selector { property:value; }
/*or*/
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
   .selector{ property:value; }
}
/* Also for Internet Explorer 10-11 (and MS Edge) */
_:-ms-lang(x), .selector { property:value; }
/*IE 10 only */
_:-ms-lang(x), .selector { property:value\9; }
/*IE 9 and above */
@media screen and (min-width:0\0) and (min-resolution: +72dpi) {
  .selector {property:value;}
}
/*IE 9 and 10 */
@media screen and (min-width:0\0) {
    .selector /* backslash-9 removes.foo & old Safari 4 */
}
/*IE 9 only */
@media screen and (min-width:0\0) and (min-resolution: .001dpcm) { 
    .selector{property:value;}
}
/*IE 8,9 and 10 */
@media screen\0 {
    .selector {property:value;}
}
/*IE 8 Standards Mode Only */
.selector { property /*\**/: value\9 }
/*IE 8 */
html>/**/body .selector {property:value;}
/*or */
@media \0screen {
    .selector {property:value;}
}
/*IE 7 */
*+html .selector {property:value;}
/* or */
*:first-child+html .selector {property:value;}
/*IE 6, 7 and 8 */
@media \0screen\,screen\9 {
    .selector {property:value;}
}
/*IE 6 and 7 */
@media screen\9 {
    .selector {property:value;}
}
/*or */
.selector { *property:value;}
/*or */
.selector { #property:value;}
/*IE 6, 7 and 8 */
@media \0screen\,screen\9 {
    .selector {property:value;}
}
/*IE 6 */
* html .selector {property:value;}
/*or */
.selector { _property:value;}
```
