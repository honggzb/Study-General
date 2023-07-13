[textarea输入框限制字数](#top)

- [HTML解决方法](#HTML解决方法)
- [Jquery解决方法](#Jquery解决方法)


### HTML解决方法

- 在input标签中，只需要设置maxlength=”...”即可，但是在textarea标签中，IE9及IE9以下浏览器是不支持的，IE10、IE11则支持，估计后续的版本应该都会支持
- 让大部分IE版本都支持textarea标签限制字数

```HTML
<textarea id="taContent" rows="3"  maxlength="20" onchange="this.value=this.value.substring(0, 20)" onkeydown="this.value=this.value.substring(0, 20)" onkeyup="this.value=this.value.substring(0, 20)" ></textarea>
```

- onchange、onkeydown、onkeyup三者缺一不可
  - 如省略onchange，当你用负责功能，此时一直按着ctrl不松开，鼠标去点击其他地方（焦点移出textarea）时，不会自动取消超出部分
  - 如省略onkeydown，猛敲的时候会有很多个字符突然不见了
  - 如省略onkeyup，原想预计20的情况下，会变成21，并且最后一个字符是最后敲进去的
- Maxlength 也不可省略，加上maxlength 当碰到IE10及以上版本时，可以完美的实现限制输入框字数的功能。不想其他低版本的IE浏览器还可以出现一个字母后消失

### Jquery解决方法

```html
<textarea id="area" name="ss" placeholder="请输入文本内容"></textarea>  
<p><span id="text-count">20</span>/20</p>  
<script type="text/javascript">  
    /*字数限制*/  
    $("#area").on("input propertychange", function() {     //同时绑定onchange、onkeydown、onkeyup，ie8/9下解决不了右键粘贴问题
        var $this = $(this),  
            _val = $this.val(),  
            count = "";  
        if (_val.length > 20) {  
            $this.val(_val.substring(0, 20));  
        }  
        count = 20 - $this.val().length;  
        $("#text-count").text(count);  
    });  
</script>  
```

**验证textarea输入框字数限制,只作提示不作提交限制**

```HTML
<div class="formControls col-xs-8 col-sm-9">
   <textarea name="tablemsg" cols="" rows="" class="textarea"  placeholder="最少输入10个字符" onKeyUp="Huitextarealength(this)"></textarea>
   <p class="textarea-numberbar"><em class="textarea-length">0</em>/<am>100</am></p>
</div>
<script type="text/javascript">
var Huitextarealength = function (obj){
    var html = $(obj).parent();
    var tatal = html.find('am').html();
    var sets = $(obj).val().length;
    if(sets*1>tatal*1){
        var str = '<div style="width: auto;position: absolute; right: 4%;color: red;">内容超出限制</div>';
        $(obj).after(str);
        html.find('em').css({color:'red'});
    }else {
        $(obj).parent().find('div').remove();
        html.find('em').css({color:'black'});
    }
    //设置已输入数量
    html.find('em').html(sets);
}
</script>
```

> reference
> - [textarea 输入框限制字数（完美兼容）](https://blog.csdn.net/jackpk/article/details/42872073)
> - [jquery完美实现textarea输入框限制字数](https://www.cnblogs.com/wujixing/p/6000043.html)
> - [完美解决textarea字数限制](https://blog.csdn.net/fb_01/article/details/51026774)
