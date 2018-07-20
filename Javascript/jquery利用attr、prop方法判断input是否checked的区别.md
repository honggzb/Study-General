## 小结和问题

### jquery判断(获取)checked的三种方法:

```javascript
.attr('checked')   //看版本1.6+返回:"checked"或"undefined" ;1.5-返回:true或false
.prop('checked')   //16+:true/false
.is(':checked')    //所有版本:true/false//别忘记冒号哦
```

### jquery赋值checked的几种写法

```javascript
//所有的jquery版本都可以这样赋值:
$("#cb1").attr("checked","checked");
$("#cb1").attr("checked",true);
//jquery1.6+:prop的4种赋值:
$("#cb1").prop("checked",true);       
$("#cb1").prop({checked:true});      //map键值对
$("#cb1").prop("checked",function(){
  return true;                       //函数返回true或false
});
```

### attr和prop方法区别- 建议使用prop方法

```javascript
// checked="checked"，但就是勾没有打上
$("#protocol").blur(function () {
   if($("#protocol").val()!="")
      $("#protocolCheckbox").attr("checked",true);
   else{
      $("#protocolCheckbox").removeAttr("checked");
   }
});
//勾打上了
$("#protocol").blur(function () {
   if($("#protocol").val()!="")
      $("#protocolCheckbox").prop("checked",true);
   else{
      $("#protocolCheckbox").prop("checked",false);
   }
});
```

## 原因（理论基础）

### HTML的属性分为attribute和property。checked属性即分为：

- attribute ->checked
- property  ->true,false


### attribute并不随着checkbox的状态变化而改变

也就是说：给复选框打上勾或取消勾，并不会影响到attr，但property会有变化。那为什么第一次有, 而第二次就没有呢？因为浏览器兼容的问题！如果换上IE8就没事了。。。（笔者用的chrome）

### 注意事项：

- 使用prop($.attr("checked"))的话输出则分别为false和true。property则随其变化而变化
- checkbox若未定义`checked="checked"`，`$.attr("checked")` 的结果是`undefined`。若已定义则结果是`checked`
  - 如果当前input中初始化定义了checked属性，无论`checked=""`或 `checked="checked"`，当前checkbox都处于选中状态, `$("#selectAll").attr("checked")`都会返回`"checked"`；
- 修改checked属性时要使用prop()。prop()在jQuery1.6版本后新增。
- 关于其他类似属性的图表

![](https://i.imgur.com/sWMPNeT.gif)

- [jQuery中attr()和prop()在修改checked属性时的区别](http://lib.csdn.net/article/jquery/35666)
- [jquery判断checked的三种方法](https://blog.csdn.net/snn1410/article/details/10146309)别](#top)

