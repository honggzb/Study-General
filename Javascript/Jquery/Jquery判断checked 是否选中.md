1. 获取匹配集合中第一个元素的Property的值

`$(selector).prop("propertyName")`

2. 给匹配元素集合设定一个或多个属性

```
$(selector).prop("propertyName", "value" ) 
$(selector).prop( "map" ) 
$(selector).prop( "propertyName", function(index, "oldPropertyValue") )
```

**`$(selector).prop()`和`$(selector).attr()`区别**

- prop是Jquery 从1.6开始提供新的方法: To retrieve and change DOM properties such as the checked, selected, or disabled state of form elements, use the .prop() method.
- 什么时候使用attr()，什么时候使用prop()？
  -  根据官方的建议：具有true和false两个属性的属性，如checked, selected或者disabled使用prop(), 其他的使用 attr()
  - 添加属性名称该属性就会生效应该使用prop()
  - 是有true,false两个属性使用prop()
  - 其他则使用attr()
- 使用attr方法获取时:
  - 如果当前input中初始化未定义checked属性，则不管当前是否选中，$("#selectAll").attr("checked")都会返回undefined 
  - 注意： 此时通过prop方法获取checked属性，获取的checked返回值为boolean，选中为true,否则为false
   - `<input type="checkbox" id="selectAll" onclick="checkAll()">`
  - 如果当前input中初始化已定义checked属性，则不管是否选中，$("#selectAll").attr("checked")都会返回checked
   - `<input type="checkbox" id="selectAll" onclick="checkAll()" checked>`
 
 ```html
 <input type="checkbox" name="abc" id="aaa" />
<script>
$(function(){
 //都是获取元素是否选中
	alert( $("input[name='abc']:checked").val());    //undefined
	alert( $("input[name='abc'][checked]").val());   //undefined
	alert($("#aaa").attr("checked"));                //undefined
	alert($(":checkbox:checked").checked)            //undefined
	alert($("#aaa").prop("checked"));                //true
	alert($(":checkbox").get(0).checked);            //true
});
</script>
 ```
 
 |input单选标签选中状态 |code |
| :------------- | :------------- |
|设置某项单选input为选中状态|`$("input[type='radio']").eq(1).attr('checked',true);`|
|设置某项单选input为选中状态, 也可设其属性checked为'checked',设置完后原选中项会自动取消选中|`$("input[type='radio']").eq(1).attr('checked','checked');`|
|**判断某单选框是否被选中状态**||
|使用`object.attr('checked')==true`是错的,应使用`object.attr('checked')=='checked'`作判断|`$("input[type='radio']").eq(1).attr('checked')=='checked';`|
|也可使用 is(':checked')方法作判断|`$("input[type='radio']").eq(1).is(':checked');`|
|获取被选中的单选框：使用`:checked `方法|`$("input[type='radio']:checked");`|

```html
//
<ul id = "list-unstyled" class="list-unstyled">
    <li><input name="check" type="checkbox" value="9-DM"></li>
    <li><input name="check" type="checkbox" value="10-DM"></li>
    <li><input name="check" type="checkbox" value="11-DM"></li>
    <li><input name="check" type="checkbox" value="12-DM"></li>
</ul>
<script>
// 全选
 $('#allcheck').click(function(){
  $('input[name="check"]').prop('checked','true');
});
//反选
$('#reversecheck').click(function(){
     $('input[name="check"]').each(function () {
         $(this).prop("checked", !$(this).prop("checked"));    //实现全选反选 注意用：prop
      });
});
</script>
```
