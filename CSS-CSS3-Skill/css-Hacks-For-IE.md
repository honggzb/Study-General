See specific [CSS & JS hacks beyond IE](http://browserhacks.com/)

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
