- [小结和问题](#小结和问题)
    - [jquery判断(获取)checked的三种方法](#jquery判断)
    - [jquery赋值checked的几种写法](#jquery赋值checked的几种写法)
    - [问题： attr和prop方法区别- 建议使用prop方法](#问题)
- [原因（理论基础）](#原因（理论基础）)
- [补充：jQuery中attr和prop的区别](#补充：jQuery中attr和prop的区别)
- [jQuery设置和获取select、checkbox、radio的选中值](#jQuery设置和获取select、checkbox、radio的选中值)

## 小结和问题

<h3 id="jquery判断">jquery判断(获取)checked的三种方法</h3>

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

<h3 id="问题">问题： attr和prop方法区别- 建议使用prop方法</h3>

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

### HTML的属性分为attribute和property。故checked属性也分为：

- attribute ->checked
- property  ->true,false


### attribute并不随着checkbox的状态变化而改变

也就是说：给复选框打上勾或取消勾，并不会影响到attr，但property会有变化。那为什么第一次有, 而第二次就没有呢？因为浏览器兼容的问题！如果换上IE8就没事了。。。（笔者用的chrome）

### 注意事项：

- 使用prop($.attr("checked"))的话输出则分别为false和true。property则随其变化而变化
- checkbox若未定义`checked="checked"`，`$.attr("checked")` 的结果是`undefined`。若已定义则结果是`checked`
  - 如果当前input中初始化定义了checked属性，无论`checked=""`或 `checked="checked"`，当前checkbox都处于选中状态, `$("#selectAll").attr("checked")`都会返回`"checked"`；
- prop()在jQuery1.6版本后新增, 修改checked属性时要使用`prop()`
    - jquery-1.4.1.min.js、jquery-1.4.2.min.js可以用attr方法正确地获取或设置checkbox的checked属性，但是高版本例如：1.10.2.min.js就不能用attr方法正确地获取或设置checkbox的checked属性
- 关于其他类似属性的图表

![](https://i.imgur.com/sWMPNeT.gif)

## 补充：jQuery中attr和prop的区别

- 对于HTML元素本身就带有的**固有属性**，在处理时建议使用**prop**方法
- 对于HTML元素我们自定义的**DOM属性**，在处理时建议使用**attr**方法

`<a id="first" href="#" target="_self" uuu="guoguo">超链接</a>`

- id、href、target、uuu，前三个是固有属性, 建议使用**prop**方法
- uuu属性是自定义的，<a>元素本身是没有这个属性的，这种就是自定义的DOM属性, 建议使用**attr**方法


功能|说明
---------|----------|
prop读取属性值|读取已赋值的固有属性会得到属性值，读取未赋值的固有属性会得到属性默认值，读取自定义属性时无论是否赋值均得到undefine
prop设置属性值|prop只能设置固有属性值
attr读取属性值|无论是固有属性还是自定义属性，attr只能读取元素中已有的属性值，读取元素中没有的属性值会返回undefine
attr设置属性值|attr可以对任意属性设置属性值

### 读取HTML元素固有属性（已赋值）

```javascript
<a href="#" target="_self">超链接</a>
//attr和prop都读取成功
//attr("href")的值是：#
//prop("href")的值是：http://localhost:4590/AttributeHandle/Index#
alert($("a").attr("href"));
alert($("a").prop("href"));
```

### 读取HTML元素固有属性（未赋值）

不同HTML标签的固有属性不完全相同，例如：checked属性是checkbox标签的固有属性，但不是a标签的固有属性。class属性虽然是a标签的固有属性，但是如果元素中没有对该属性赋值，用attr()也是读取不到的。

```javascript
<a href="#" target="_self">超链接</a>
<input type="checkbox" id="testCheckBox" value="测试CheckBox"/>
alert($("a").attr("id"));//输出：undefine
alert($("a").prop("id"));//输出：默认值""
alert($("a").attr("checked"));//输出：undefine
alert($("a").prop("checked"));//输出：undefine
alert($("#testCheckBox").attr("checked"));//输出：undefine
alert($("#testCheckBox").prop("checked"));//输出：默认值false
alert($("a").attr("class"));//输出：undefine
alert($("a").prop("class"));//输出：默认值""
```

### 读取HTML元素自定义属性（已赋值）

```javascript
<a href="#" target="_self" uuu="guoguo">超链接</a>
alert($("a").attr("uuu"));//输出：guoguo
alert($("a").prop("uuu"));//输出：undefine
```

### 读取HTML元素自定义属性（未赋值）

```javascript
<a href="#" target="_self" uuu="guoguo">超链接</a>
alert($("a").attr("abc"));//输出：undefine
alert($("a").prop("abc"));//输出：undefine
```

### 设置HTML元素固有属性

```javascript
<a href="#" target="_self" uuu="guoguo">超链接</a>
$("a").attr("id","link");//id属性添加成功
$("a").prop("id","link");//id属性添加成功
```

### 设置HTML元素自定义属性

```javascript
<a href="#" target="_self" uuu="guoguo">超链接</a>
$("a").attr("abc", "myself");//成功添加属性abc="myself"
$("a").prop("abc", "myself");//添加abc属性失败
$("a").attr("action", "addAttribute");//成功添加属性action="addAttribute"
$("a").prop("action", "addAttribute");//添加action属性失败
```

## jQuery设置和获取select、checkbox、radio的选中值

### 设置单选下拉框的选中值

- 如果option中没有value属性，那可以通过text设置选中项
- 如果option中有value属性，那必须通过value设置选中项

```javascript
//option中没有value属性：
<select id="single">
    <option>选择1号</option>
    <option>选择2号</option>
    <option>选择3号</option>
</select>
$("#btn1").click(function() {
    //【方法1】
    $("#single").val("选择3号");
    //【方法2】
    $("#single").val(["选择3号"]);
    //【方法3】
    $("#single option:eq(2)").prop("selected", true);
});
//option中有value属性
<select id="single">
    <option value="1">选择1号</option>
    <option value="2">选择2号</option>
    <option value="3">选择3号</option>
</select>
$("#btn1").click(function() {
    //【方法1】
    //通过val("选择3号")设置选中项无效
    $("#single").val("选择3号");
    //通过val("3")设置选中项有效
    $("#single").val("3");
    //【方法2】
    $("#single option:eq(2)").prop("selected", true);
});
```

### 获取单选下拉框的选中值

`alert($("#single").val());`

### 设置多选下拉框的选中值

多选下拉框默认的选中值是“选择1号”和“选择3号”。如果用val()的方式设置选中值是“选择2号”和“选择4号”，那只有“选择2号”和“选择4号”会被选中；如果用prop(“selected”, true)的方式设置选中值是“选择2号”和“选择4号”，那默认的“选择1号”和“选择3号”以及“选择2号”和“选择4号”都会被选中。

```javascript
<select id="multiple" multiple="multiple">
    <option selected="selected">选择1号</option>
    <option>选择2号</option>
    <option selected="selected">选择3号</option>
    <option>选择4号</option>
    <option>选择5号</option>
</select>
$("#btn2").click(function () {
    //【方法1】
    $("#multiple").val(["选择2号", "选择4号"]);
    //【方法2】
    $("#multiple option:eq(1)").prop("selected", true);
    $("#multiple option:eq(3)").prop("selected", true);
});
```

### 获取多选下拉框的选中值

读取多选下拉列表框的选中值时，会返回一个包含所有选择值的数组。

```javascript
var array = $("#multiple").val();
for (var i = 0; i < array.length; i++) {
    alert(array[i]);
}
```

### 设置多选框的选中值

- 多选框默认的选中值是“check1”。如果用val()的方式设置选中值是“check2”和“check4”，那只有“check2”和“check4”会被选中
- 如果用prop(“selected”, true)的方式设置选中值是“check2”和“check4”，那默认的“check1”以及“check2”和“check4”都会被选中

```javascript
<input type="checkbox" name="hobby" value="check1" checked="checked"/>多选1
<input type="checkbox" name="hobby" value="check2"/>多选2
<input type="checkbox" name="hobby" value="check3"/>多选3
<input type="checkbox" name="hobby" value="check4"/>多选4
<input type="checkbox" name="hobby" value="check5"/>多选5
$("#btn3").click(function () {
    //【方法1】
    $("input[type=checkbox][name=hobby]").val(["check2","check4"]);
    //【方法2】
    $("input[type=checkbox][name=hobby]:eq(1)").prop("checked", true);
    $("input[type=checkbox][name=hobby]:eq(3)").prop("checked", true);
});
````

### 获取多选框的选中值

```javascript
$("input[type=checkbox][name=hobby]:checked").each(function() {
    alert(this.value);
});
```

### 设置单选框的选中值

设置单选框的选中值不能用val(“volleyball”)，必须用val([“volleyball”])。

```javascript
<input type="radio" name="sport" value="soccer"/>足球
<input type="radio" name="sport" value="volleyball"/>排球
<input type="radio" name="sport" value="baseball"/>棒球
<input type="radio" name="sport" value="badminton"/>羽毛球
<input type="radio" name="sport" value="pingpong"/>乒乓球
$("#btn4").click(function () {
    //【方法1】
    $("input[type=radio][name=sport]").val(["volleyball"]);
    //【方法2】
    $("input[type=radio][name=sport]:eq(1)").prop("checked", true);
});
```

### 获取单选框的选中值

`alert($("input[type=radio][name=sport]:checked").val());`

- [jQuery中attr()和prop()在修改checked属性时的区别](http://lib.csdn.net/article/jquery/35666)
- [jquery判断checked的三种方法](https://blog.csdn.net/snn1410/article/details/10146309)
- [jQuery中attr和prop的区别](https://blog.csdn.net/xiaouncle/article/details/53959496)
