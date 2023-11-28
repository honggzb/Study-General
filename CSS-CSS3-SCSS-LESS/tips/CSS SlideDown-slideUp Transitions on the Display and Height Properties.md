[CSS SlideDown/slideUp Transitions on the Display and Height Properties workaround](#top)

- [Opacity animation workaround](#opacity-animation-workaround)
- [CSS Transitions on the Height Property](#css-transitions-on-the-height-property)
- [CSS Transitions using the Max-Height Property](#css-transitions-using-the-max-height-property)
- [CSS Transition on the Margin-Top/Margin-Bottom Property](#css-transition-on-the-margin-topmargin-bottom-property)
- [Margin-Top/Margin-Bottom Transition Combined with Height Transition](#margin-topmargin-bottom-transition-combined-with-height-transition)
- [Adding WebGL Animations](#adding-webgl-animations)

## Opacity animation workaround

```html
<div>Hello</div>
<h1>Hover me</h1>
<style>
html, body { height: 100%; padding:0; font: 20px/40px sans-serif; }
h1 { padding: 20px; }
div {
    width: 100%; background: pink; padding: 20px;
    display: none;
}
body:hover div {
    display: block;
    -webkit-animation: slide-down .3s ease-out;
    -moz-animation: slide-down .3s ease-out;
}
@-webkit-keyframes slide-down {
      0% { opacity: 0; -webkit-transform: translateY(-100%); }   
    100% { opacity: 1; -webkit-transform: translateY(0); }
}
@-moz-keyframes slide-down {
      0% { opacity: 0; -moz-transform: translateY(-100%); }   
    100% { opacity: 1; -moz-transform: translateY(0); }
}
</style>
```

[back to top](#top)

## CSS Transitions on the Height Property

- works fine, as long as the **height of the element is fixed and known**. It is required to specify the height as number in the style sheet
- Unfortunately the transition does no longer work if height:auto or height:100% is specified (unless the parent element has a fixed height)

```html
<div > This is a first paragraph before the sample text. </div>
<div class="outer1">
   <div class="cl1">
      Sample Text<br >
      Line1 <br >
      Line2 
   </div>
   <div class="hoverhere">Hover Here</div>
</div>
<p > This is a second paragraph after the sample. </p>
<style>
.cl1{ height:0px; 
      transition-property:height; 
      transition-duration:1s; overflow:hidden
}
.outer1:hover .cl1 { height  : 100px}
</style>
```

[back to top](#top)

## CSS Transitions using the Max-Height Property

- using max-height is that the height of the content element does not need to be known and fixed
- It is possible to set max-height to a high value that is bigger than the biggest possible content element
- In summary the max-height transition works well, if one knows a close upper bound of the height of the content element, but it becomes difficult, if you know nothing about the content, e.g. because it contains unkonwn data

```html
<div > This is a first paragraph before the sample text. </div>
<div class="outer4">
   <div class="cl4">
      Sample Text <br >
      Line1 <br >
      Line2 
   </div>
   <div class="hoverhere">Hover Here</div>
</div>
<p > This is a second paragraph after the sample. </p>
<style>
<style >
   .cl4              { max-height:0px; 
                       transition:max-height 1s; 
                       overflow:hidden}
   .outer4:hover .cl4 { max-height  : 100px}
</style>
</style>
```

[back to top](#top)

## CSS Transition on the Margin-Top/Margin-Bottom Property

- enclosing the content element in another element with `overflow:hidden`
- using a **negative value** for margin-Top or margin-Bottom it is possible cut away the upper or lower part of the content element
- there are some timing problems:
    -  With Margin-Top/Margin-Bottom there is a delay before the opening animation
    -  with max-height there is a delay before the closing animation

```html
<div > This is a paragraph before the second example 
text. </div>
<div class="outer2">
   <div class="middle2">
       <div class="cl2">
            Sample Text<br>
            Sample Text<br>
            Sample Text<br>
            Sample Text
       </div>
   </div>
   <div class="hoverhere">Hover Here</div>
</div>
<p > This is a paragraph after the second sample. </p>
<style>
.cl2            { transition:margin-top 1s; margin-top:-200px;}
.outer2:hover .middle2 .cl2 { margin-top : 0px}
.middle2        { overflow:hidden }
</style>
```

[back to top](#top)

## Margin-Top/Margin-Bottom Transition Combined with Height Transition

- needs to supply an upper bound for maximal height of the content element
- the idea is to combine these solutions and to use a transition on max-height to make the element vanish after the transition. Then even if margin-top/margin-bottom does not completely remove the element max-height will
- a transition on max-height from 0px to 100% does not work smoothly, however it at least opens an closes the element instanteanously

```html
<div > This is a paragraph before the second example text. </div>
<div class="outer7">
   <div class="middle7">
       <div class="cl7">
            Sample Text
            Sample Text
            <div style="height:150px; background-color:blue">
            </div>
            Sample Text
       </div>
   </div>
   <div class="hoverhere">Hover Here</div>
</div>
<p > This is a paragraph after the second sample. </p>
<style>
<style >
   .cl7            { transition:margin-bottom 1s ease-in; 
                       margin-bottom:-150px;}
   .outer7:hover .middle7 .cl7 { 
                     transition:margin-bottom 1s ease-out;
                     margin-bottom : 0px}
   .middle7        { overflow:hidden; 
                       transition:max-height .1s ease 1s; max-height:0px}
   .outer7:hover .middle7 {
                       transition:max-height .1s ease 0s; 
                       max-height:10000px}
</style>
</style>
```

[back to top](#top)

## Adding WebGL Animations

```html
<style >
   #el10       { border: 1px black solid; background-color:yellow;
                       padding:30px}
   #middle10   { overflow:hidden; transition:height 2s linear 0.1s;
                       height:0px;}
</style>
 
<div > This is a paragraph before the example text. </div>
<div id="middle10">
       <div id="el10">
            Sample Text Sample Text  Sample Text Sample Text
       </div>
</div>
<p > This is a paragraph after the example. </p>
<!------------------------------------------------------------------------------>
var t=taccgl.actor("el10",taccgl.flexiBorder,"visible");
t.from(t.x+(t.w/2),t.y,0).to (t.x+(t.w-t.h)/2,t.y,0).
resize(1,1,t.h,t.h/2).Circle().start()
.cont().Rect1().flyHome().resize(t.h,t.h/2,t.w,t.h).start();
t.el.parentElement.style.height=t.h+"px";
<!------------------------------------------------------------------------------>
var t=taccgl.actor("el10",taccgl.flexiBorder,"hidden");
t.resize(t.w,t.h,t.w*2,t.h/2).
to(t.x-t.w/2,t.y,0).Circle1().dur(1).start();
t.cont().resize(t.w*2,t.h/2,t.w*4,1).
to(t.x-t.w*3/2,t.y,0).dur(1).start();
t.el.parentElement.style.height="0px";
<!----------------- SlideDown ------------------------------------------------------------->
t=taccgl.actor("el10",null,"visible");t.resize(t.w,1,t.w,t.h).dur(2).start();
t.el.parentElement.style.height=t.h+"px";
<!---------------- Shrink in -------------------------------------------------------------->
t=taccgl.actor("el10",null,"hidden");t.resize(t.w,t.h,1,1).dur(2).start();
t.el.parentElement.style.height="0px";
<!--------------- Flying in --------------------------------------------------------------->
taccgl.a(document.body).color("white").shadowOnly().dur(2).start(); 
var t=taccgl.actor("el10",null,"visible").from(-300,1000,-4000).
vEnd(0,0,0).duration(2).start()
t.el.parentElement.style.height=t.h+"px";
<!--------------- Flying out -------------------------------------------------------------->
taccgl.a(document.body).color("white").shadowOnly().dur(2).start(); 
var t=taccgl.actor("el10",null,"hidden").to(-400,1000,-4000).
vBegin(0,0,0).rotateMiddle(0,1,0).duration(2).start()
t.el.parentElement.style.height="0px";
```

[back to top](#top)

> Reference
- [Workarounds for CSS Transitions on the Display and Height Properties](https://www.taccgl.org/blog/css_transition_display.html)
- https://jsfiddle.net/jalbertbowdenii/mHRb8/
