Scroll to position

## `.scrollTop()`方法

- 设置滚动条据顶部的高度： `$("div").scrollTop(100); //把 scroll top offset 设置为 100px`
- 获得滚动条的高度：      `$("div").scrollTop()；//获得 scroll top offset`
- 触发滚动事件:          `$(selector).scroll()`

```javascript
//获取滚动条高度
$(document).ready(function () {
    $(window).scroll(function () {
        var d = $(window).scrollTop();
        console.log(d);
    });
});
```

## jQuery和javascript的scroll事件

- javascript: `.scroll( handler(eventObject) )`
- jquery:     `jQueryObject.scroll( [ [ data ,]  handler ] )`

```javascript
var maxScrollTop = 1000;
// 向下滚动到据顶部超过1000px时，回到顶部
$(window).scroll( maxScrollTop, function(event){
    var $me = $(this);
    if( $me.scrollTop() > event.data ){
        $me.scrollTop( 0 );
    }
} );
```

## scroll到达指定位置- 方法1

```javascript
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}
$('#your-element').scrollView();
//
$('#your-link').click(function (event) {
  event.preventDefault();
  $('#your-div').scrollView();
});
```

## scroll到达指定位置- 方法2

https://www.cnblogs.com/bbyz/p/3968583.html

```javascript
goTo = function(target){
  var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
  if (scrollT >target) {
      var timer = setInterval(function(){
          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          var step = Math.floor(-scrollT/6);
          document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
          if(scrollT <= target){
              document.body.scrollTop = document.documentElement.scrollTop = target;
              clearTimeout(timer);
          }
      },20)
  }else if(scrollT == 0){
      var timer = setInterval(function(){
          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          var step = Math.floor(300/3*0.7);
          document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
          console.log(scrollT)
          if(scrollT >= target){
              document.body.scrollTop = document.documentElement.scrollTop = target;
              clearTimeout(timer);
          }
      },20)
  }else if(scrollT < target){
      var timer = setInterval(function(){
          var scrollT = document.body.scrollTop|| document.documentElement.scrollTop
          var step = Math.floor(scrollT/6);
          document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
          if(scrollT >= target){
              document.body.scrollTop = document.documentElement.scrollTop = target;
              clearTimeout(timer);
          }
      },20)
  }else if(target == scrollT){
      return false;
  }
}
//使用
on(goPs,'click',function(){ goTo(2450) }); //运动到scrolltop值为2450地位置，下面也一样， 运动到指定的位置
on(goJob,'click',function(){ goTo(3373) })
on(goTel,'click',function(){ buffer.goTo(3373) })
on(goMe,'click',function(){ buffer.goTo(1539) })
on(goHome,'click',function(){ buffer.goTo(0) });
on(scrollgoOne,'click',function(){ buffer.goTo(2450) });
on(scrollgoPc,'click',function(){ buffer.goTo(2450) });
on(scrollJob,'click',function(){ buffer.goTo(3373) });
on(scrollMe,'click',function(){ buffer.goTo(1539) });
on(goTop,'click',function(){ buffer.goTo(0) })
```

### scroll配合css使用

```html
<style>
  div { color:blue; }
  p { color:green; }
  span { color:red; display:none; }
</style>
<div>Try scrolling the iframe.</div>
<p>Paragraph - <span>Scroll happened!</span></p>
<script>
    $("p").clone().appendTo(document.body);
    $("p").clone().appendTo(document.body);
    $("p").clone().appendTo(document.body);
    $(window).scroll(function () {
        $("span").css("display", "inline").fadeOut("slow");
    });
</script>
```
