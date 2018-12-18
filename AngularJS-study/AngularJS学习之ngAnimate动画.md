[AngularJS学习之ngAnimate动画](#top)

- [运作机制](#%E8%BF%90%E4%BD%9C%E6%9C%BA%E5%88%B6)
- [使用ngAnimation动画](#%E4%BD%BF%E7%94%A8nganimation%E5%8A%A8%E7%94%BB)
  - [使用CSS3过渡动画 -CSS-based Animations](#%E4%BD%BF%E7%94%A8css3%E8%BF%87%E6%B8%A1%E5%8A%A8%E7%94%BB--css-based-animations)
  - [使用类名过渡动画 -CSS Class-based Animations](#%E4%BD%BF%E7%94%A8%E7%B1%BB%E5%90%8D%E8%BF%87%E6%B8%A1%E5%8A%A8%E7%94%BB--css-class-based-animations)
- [交错延迟CSS过渡/动画-ng-EVENT-stagger](#%E4%BA%A4%E9%94%99%E5%BB%B6%E8%BF%9Fcss%E8%BF%87%E6%B8%A1%E5%8A%A8%E7%94%BB-ng-event-stagger)
- [案例](#%E6%A1%88%E4%BE%8B)
- [javascript动画](#javascript%E5%8A%A8%E7%94%BB)

-------------------------

- 动画不是Angular核心的一部分，为了在Angular应用中包含动画，需要在应用中安装并且引用这个模块
- `angular.module('myApp', ['ngAnimate']);`

-------------------------

## 运作机制

- `$animate`服务默认给动画元素的每个动画事件（参见后面的列表）添加了两个CSS类
  - 结构性的动画（比如进入、移动和离开），添加上去的CSS类是ng-[EVENT]和ng-[EVENT]-active
  - 基于样式类的动画（比如ngClass），动画样式类的形式是[CLASS]-add、[CLASS]-addactdive、[CLASS]-remove、[CLASS]-remove-active
  - ngShow和ngHide，只有.ng-hide类会被添加和移除，它的形式跟ngClass一样：.ng-hide-add、.ng-hide-add-active、.ng-hide-remove、.ng-hide-remove-active
- `$animate`服务支持多个Angular内置的指令, 它们无需额外的配置即可支持动画
- `$animate`服务会在触发事件的指令会在DOM变更时收到一个.ng-[EVENT]样式类，然后，Angular添加ng-[EVENT]-active类，它会触发动画。ngAnimate自动检测CSS代码来判定动画什么时候完成。这个事件完成时，Angular会从DOM元素上移除这两个类，使能够在DOM元素上定义动画相关的属性
  - 如果浏览器不支持CSS过渡或者动画，动画会开始，然后立即结束，DOM会处于最终的状态，不会添加过渡或者动画的样式类

可使用`$animate`服务的指令|触发事件
---|---
ngRepeat |enter(一项被插入到列表之后)、leave(列表中的一项移动了)、remove(一项从列表中移除)
ngView |enter(新的视图内容准备好了)、leave(正在离开，已有的内容将被隐藏)
ngInclude |enter、leave
ngSwitch |enter、leave
ngIf |enter(ngIf的内容变更了，新DOM被插入之后触发)、leave(在ngIf的内容被移除之前触发)
ngClass或者class="…" |add(ngClass求值为真之后，类被添加之前)、remove(类被移除之前触发)
ngShow & ngHide |add(ngClass求值为真之后，类被添加之前)、remove(类被移除之前触发) (.ng-class)
form & ngModel|	add and remove (dirty, pristine, valid, invalid & all other validations)
ngMessages|	add and remove (ng-active & ng-inactive)
ngMessage|enter and leave

[back to top](#top)

## 使用ngAnimation动画

### 使用CSS3过渡动画 -CSS-based Animations

```html
<div ng-if="bool" class="fade">Fade me in out</div>
<button ng-click="bool=true">Fade In!</button>
<button ng-click="bool=false">Fade Out!</button>
<style>
/* 定义ng-[EVENT]和ng-[EVENT]-active*/
.fade.ng-enter {
  transition:0.5s linear all;
  opacity:0;
}
.fade.ng-enter.ng-enter-active {
  opacity:1;
}
/* or */
.fade.ng-leave {
  animation: my_fade_animation 0.5s linear;
  -webkit-animation: my_fade_animation 0.5s linear;
}
@keyframes my_fade_animation {
  from { opacity:1; }
  to { opacity:0; }
}
@-webkit-keyframes my_fade_animation {
  from { opacity:1; }
  to { opacity:0; }
}
</style>
```

### 使用类名过渡动画 -CSS Class-based Animations

```html
<div ng-class="{on:onOff}" class="highlight">Highlight this box</div>
<button ng-click="onOff=!onOff">Toggle</button>
<style>
.highlight {
  transition:0.5s linear all;
}
.highlight.on-add {
  background:white;
}
.highlight.on {
  background:yellow;
}
.highlight.on-remove {
  background:black;
}
</style>
```

[back to top](#top)

## 交错延迟CSS过渡/动画-ng-EVENT-stagger

The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be performed by creating a ng-EVENT-stagger CSS class and attaching that class to the base CSS class used for the animation

```css
.my-animation.ng-enter {
  transition: 1s linear all;
  opacity:0;
}
.my-animation.ng-enter-stagger {
  /* this will have a 100ms delay between each successive leave animation */
  transition-delay: 0.1s;
  transition-duration: 0s;
}
.my-animation.ng-enter.ng-enter-active {
  opacity:1;
}
```

[back to top](#top)

## 案例

```css
/* ANIMATIONS================================= */
@keyframes rotateFall {
    0%      { transform: rotateZ(0deg); }
    20%     { transform: rotateZ(10deg); animation-timing-function: ease-out; }
    40%     { transform: rotateZ(17deg); }
    60%     { transform: rotateZ(16deg); }
    100%    { transform: translateY(100%) rotateZ(17deg); }
}
/* slide in from the bottom */
@keyframes slideOutLeft {
    to      { transform: translateX(-100%); }
}
@keyframes rotateOutNewspaper {
    to      { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; }
}
@keyframes scaleUp {
    from    { opacity: 0.5; -webkit-transform: scale(0.5); }
}
@keyframes slideInRight {
    from    { transform:translateX(100%); }
    to      { transform: translateX(0); }
}
@keyframes slideInUp {
    from    { transform:translateY(100%); }
    to      { transform: translateY(0); }
}
/* Same animation for all the pages================================= */
.ng-enter {
    animation: scaleUp 0.8s both ease-in;
    z-index: 5555;
}
.ng-leave {
    animation: slideOutLeft 0.7s both ease-in;
    z-index: 6666;
}
/*Different animation for different pages================================= */
.page-home.ng-enter {
    animation: scaleUp 0.8s both ease-in;
 }
.page-home.ng-leave {
    transform-origin: 0% 0%;
    animation: rotateFall 1s both ease-in;
}
.page-about.ng-enter {
    animation: slideInRight 0.8s both ease-in;
}
.page-about.ng-leave {
    animation: slideOutLeft 0.7s both ease-in;
}
```

[back to top](#top)

## javascript动画

`<li ng-repeat="item in items" class="fade"> {{item.name}} <span ng-click="removeItem($index)">X</span></li>`

```javascript
angular.module('myApp', ['ngAnimate'])
        .animation('.fade', function() {
        return {
            enter: function(element, done) {
                element.css('display', 'none');
                $(element).fadeIn(1000, function() {
                    done();
                });
            },
            leave: function(element, done) {
                $(element).fadeOut(1000, function() {
                    done();
                });
            },
            move: function(element, done) {
                element.css('display', 'none');
                $(element).slideDown(500, function() {
                    done();
                });
            }
        }
})
````

> References
- [How to Create Animations in AngularJS With ngAnimate](https://code.tutsplus.com/tutorials/how-to-create-animations-in-angularjs-with-nganimate--cms-28593)
- [Animations: the Angular Way](https://css-tricks.com/animations-the-angular-way/)
