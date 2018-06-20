## js和jq中常用追加元素方法

- javascript中常用追加元素的几种方法：append，appendTo，after，before，insertAfter，insertBefore，appendChild
  - javascript的parentNode.append()是还在试用期的方法，有兼容问题。在parendNode节点中最后一个子节点后插入新Node或者DOMString（字符串，插入后为Text节点）
- jquery中常用追加元素的几种方法：append, appendTo, prepend, prependTo, insertBefore, insertAfter, before, after

```javascript
/* javascript中常用追加元素的几种方法 */
$('#div_one').append('<span>新添加1</span>');          
//在元素中最后一个子节点后添加（无子节点就直接添加）    
$('<span>新添加2-1</span>').appendTo($('#div_one'));   //意义同上  
$('<span>新添加2-2</span>').appendTo('#div_one');      //此写法也可以  
$('<span>新添加3</span>').insertBefore('#span_one');   
//向节点前添加兄弟节点    
$('<span>新添加4</span>').insertAfter('#span_one');    
//向节点后添加兄弟节点    
$(".span-one").before("<p>Hello world，before span-one!</p>"); 
//向每个class=span-one的节点前添加节点$(".span-one").after("<p>Hello world，after span-one!</p>"); //向每个class=span-one的节点后添加节点  

/* jquery中常用追加元素的几种方法： */
var htmlnode = document.createElement('book');
//命名节点为book(只能定义节点名称，不能在节点中添加内容)  
document.getElementById('div_two').appendChild(htmlnode);
//在元素内部最后一个子节点后添加节点<book></book>（无子节点就直接添加）  
var textnode = document.createTextNode('<span>新添加5</span>');
 //以文本格式创建节点（注意这里的<span>会被当做文本，而不是html标签）  
document.getElementById('div_two').getElementsByTagName('book')[0].appendChild(textnode);
//在元素内部最后一个子节点后添加节点（无子节点就直接添加）
var node = document.getElementById("div_one").lastChild;
//appendChild也可以用来移动节点  
document.getElementById("div_two").appendChild(node);  
document.getElementById('div_two').innerHTML = document.getElementById('div_two').innerHTML + '<span>新添加6</span>';
//以html形式添加标签及内容  
```

## javascript的append()和appendChild有什么区别

- parentNode.append()可以同时传入多个节点或字符串，没有返回值
  - 常用于： 动态增加一个元素，将其加入到指定的父节点下
  - 如果子节点不是动态创建的元素，而是在某个元素下的子元素，那么还会自动执行一次removeChild功能
- parentNode.appendChild()只能传一个节点，且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，返回追加的Node节点

```javascript
/* jquery中常用追加元素的几种方法： */
 $(function(){ 
        //append(),在父级最后追加一个子元素  
        $(".append").click(function(){  
            $("#wrap").append("<p class='three'>我是子元素append</p>");  
        });  
        //appendTo(),将子元素追加到父级的最后  
        $(".appendTo").click(function(){  
            $("<p class='three'>我是子元素appendTo</p>").appendTo($("#wrap"));  
        });  
        //prepend(),在父级最前面追加一个子元素  
        $(".prepend").click(function(){  
            $("#wrap").prepend("<p class='three'>我是子元素prepend</p>");  
        });  
        //prependTo(),将子元素追加到父级的最前面  
        $(".prependTo").click(function(){  
            $("<p class='three'>我是子元素prependTo</p>").prependTo($("#wrap"));  
        });  
        //after(),在当前元素之后追加（是同级关系）  
        $(".after").click(function(){  
            $("#wrap").after("<p class='siblings'>我是同级元素after</p>");  
        });  
        //before(),在当前元素之前追加（是同级关系）  
        $(".before").click(function(){  
            $("#wrap").before("<p class='siblings'>我是同级元素before</p>");  
        });  
        //insertAfter(),将元素追加到指定对象的后面（是同级关系）  
        $(".insertAfter").click(function(){  
            $("<p class='three'>我是同级元素insertAfter</p>").insertAfter($("#wrap"));  
        });  
        //insertBefore(),将元素追加到指定对象的前面（是同级关系）  
        $(".insertBefore").click(function(){  
            $("<p class='three'>我是同级元素insertBefore</p>").insertBefore($("#wrap"));  
        });  
});   
//appendChild(),在节点的最后追加子元素  
function appChild(){  
            // 创建p节点  
            var para=document.createElement("p");  
            // 创建文本节点  
            var node=document.createTextNode("我是子集appendChild新段落。");  
            // 把文本节点添加到p节点里  
            para.appendChild(node);  
               
            // 查找div1  
            var element=document.getElementById("wrap");  
            // 把p节点添加到div1里  
            element.appendChild(para);  
}
```
