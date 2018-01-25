[javascript操作JSON常用方法](#top)

- [1. 定义一个JSON对象](#定义一个json对象)
- [2. JSON对象和JSON字符串的转换](#JSON对象和JSON字符串的转换)
- [3. 遍历JSON对象和JSON数组](#遍历JSON对象和JSON数组)
- [4. Javascript操作JSON对象，增加 删除 修改](#JSON对象)
- [5. JSON.stringify()的详细用法-  过滤结果、输出美化](#JSON的输出美化)
- [6. JSON字符串的替换](#JSON字符串的替换)

|类型|案例|
|--->|--->|
|JSON对象| `var jsonObj={id:{userId:'001',sex:'男'},id1:{userId:'002',sex:'女'}}`|
|JSON数组| `var jsonArray=[{id:{userId:'001',sex:'男'},id1:{userId:'002',sex:'女'}}];`|
|JSON字符串| `'{"name":"Liza", "password":"123"}'`|

<h3 id="定义一个json对象">1. 定义一个JSON对象</h3>

```javascript
//直接定义
//1）使用字面量{}定义
var jsonObj={id:{userId:'001',sex:'男'},id1:{userId:'002',sex:'女'}}; 
//2) 由字符串转换
var jsonStr="{\"userId\":\"001\"}";//字段和字符串值必须用双引号引起，单引号都不行
var jsonObj=JSON.parse(jsonStr);//字符串转json对象
//3) 由字符串转换
jsonObj.name='李明';   //或者：jsonObj['name']='李明';
// 结果： {userId:"001",name:'李明'}
```

[back to top](#top)

<h3 id="JSON对象和JSON字符串的转换">2. JSON对象和JSON字符串的转换</h3>

- `JSON.stringify(value[,replace][,space])`
- JSON.stringify()除了要序列化的js对象外，还可以接收另外两个参数，这两个参数用于指定不同方式序列化js对象。
   - 第一个参数是过滤器， 可以使一个数组，也可以是一个函数
   - 第二个参数是一个选项，表示是否在JSON字符串中保留缩进。单独或组合使用这两个参数，可以更全面深入地控制 JSON的序列化

```javascript
//JSON对象转化为JSON字符串
var jsonObject = {"name":"Liza", "password":"123"};
var jsonstr =JSON.stringify(jsonObject);
var jsonStr = jsonObject.toString();
// JSON字符串转换为JSON对象
var jsonStr ='{"name":"Liza", "password":"123"}';
var jsonObject= jQuery.parseJSON(jsonstr);  
var jsonObject= JSON.parse(jsonStr);
var jsonObject = eval('(' + jsonStr + ')');
```

- 除了eval()函数是js自带的之外，其他的多个都来自json.js包, 新版本的JSON修改了API，将JSON.stringify() 和JSON.parse() 两个要领都注入到了Javascript 的内建对象里面，前者变成了Object.toJSONString()，而后者变成了String.parseJSON()。如果提示找不到toJSONString()和parseJSON()要领，则说明您的json包版本太低
- 如果obj本来就是一个JSON对象，那么运用eval（）函数转换后（哪怕是多次转换）还是JSON对象，但是运用parseJSON（）函数处理后会有疑问（抛出语法异常）

[back to top](#top)

<h3 id="遍历JSON对象和JSON数组">3. 遍历JSON对象和JSON数组</h3>

```javascript
var packJson  = {"name":"Liza", "password":"123"} ;  
for(var k in packJson ){//遍历packJson 对象的每个key/value对,k为key  
   alert(k + " " + packJson[k]);  
}  
//遍历JSON数组
var packJson = [{"name":"Liza", "password":"123"}, {"name":"Mike", "password":"456"}];  
for(var i in packJson){//遍历packJson 数组时，i为索引  
   alert(packJson[i].name + " " + packJson[i].password);  
}
//jQuery方法
var obj2 ={"comments":[
                    {"content":"很不错嘛","id":1,"nickname":"纳尼"},
                    {"content":"哟西哟西","id":2,"nickname":"小强"}
                     ],
             "content":"你是木头人，哈哈。",
             "infomap":{"性别":"男","职业":"程序员","博客":"http:\/\/www.cnblogs.com\/codeplus\/"},
                "title":"123木头人"
            };
$.each(obj2.infomap,function(key,value){
       $(".mapinfo").append(key+"----"+value+"<br/><hr/>");
});
//递归遍历
//1)返回处理后的 json字符串
function jsonParse(jsonObj) {
      distinctJson(jsonObj);
      var last=JSON.stringify(jsonObj, undefined, 2);
      return last;
}
//2)去掉 json中数组多余的项
function distinctJson(obj) {
      if(obj instanceof Array) {
             if(obj.length > 1) { //数组中有超过一个对象，删除第一个对象之后的所有对象
                  obj.splice(1, (obj.length - 1));
            }
            distinctJson(obj[0]);
      } else if(obj instanceof Object) {
             for( var index in obj){
                   var jsonValue = obj[index];
                  distinctJson(jsonValue);
            }
      }
}
//3) 递归查找目标节点
function findTarget(obj,targetId,targetChildren){
    if(obj.id==targetId){
          obj.children=targetChildren;
          return true;
    }else{
          if(obj.children!=null){
               for(var i=0; i<obj.children.length; i++){
                    var flag=findTarget(obj.children[i],targetId,targetChildren);
                    if(flag==true){
                          return true;
                    }
               }
          }
    }
    return false;
}
```

[back to top](#top)

<h3 id="JSON对象">4. Javascript操作JSON对象，增加 删除 修改</h3>

```javascript
//将两个JSON对象组装到一个里面
function addGroupJson(targetJson, packJson){    //targetJson 目标JSON，packJson 被组装JSON
    if(targetJson && packJson){
       for(var p in packJson){
           targetJson[p] = packJson[p];
       }
    }
}
//Javascript操作JSON对象，增加 删除 修改
var jsonObj2 = { teacher: [
        { name: "jordan", sex: "m", age: "40" },
        { name: "bryant", sex: "m", age: "28" },
        { name: "McGrady", sex: "m", age: "27" }
    ]};
    var jsonObj2New = {};
    $("#btn").click(function () {
        //invoke the update
        updateData("jordan");
        var persons = jsonObj2.teacher;
        for (var i = 0; i < persons.length; i++) {
            var cur_person = persons[i];
            alert(cur_person.sex);
        }
        //invoke the delete
        deleteData("jordan");
        var persons = jsonObj2.teacher;
        for (var i = 0; i < persons.length; i++) {
            var cur_person = persons[i];
            alert(cur_person.sex);
        }
        //push 
        var temp = { name: "kenny", sex: "m", age: "25" };
        jsonObj2.teacher.push(temp);
        var persons = jsonObj2.teacher;
        for (var i = 0; i < persons.length; i++) {
            var cur_person = persons[i];
            alert(cur_person.name);
        }
    });
    function updateData(name) {
        var persons = jsonObj2.teacher;
        //alert(name);
        for (var i = 0; i < persons.length; i++) {
            var cur_person = persons[i];
            if (cur_person.name == name) {
                persons[i].sex = "f";
            }
        }
    }
  function deleteData(name) {
        var persons = jsonObj2.teacher;
        //alert(name);
        for (var i = 0; i < persons.length; i++) {
            var cur_person = persons[i];
            if (cur_person.name == name) {
                jsonObj2.teacher.splice(i, 1);
            }
        }
    }
```

[back to top](#top)

<h3 id="JSON的输出美化">5. JSON.stringify()的详细用法-过滤结果、输出美化</h3>

- JSON.stringify的可选参数space，可以指定缩进用的空白字符串，用于美化输出（pretty-print）
- space参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数没有提供（或者为null）将没有空格

```javascript
//1．过滤结果: 如果过滤器参数是数组，那么JSON.stringify()的结果中将只包含数组中列出的属性
function init() {
  var student = { name: "Bill", age: 12, grade: 3, id: "0802020114" };
  var jsonText = JSON.stringify(student, ["name", "id"])
}
//1．过滤结果: 如果第二个参数是函数，行为会有一点不同。传入的函数接收两个参数，属性（键）名和属性值。根据属性（键）名可以知道应该如何处理要序列化的对象中的属性。属性名只能是字符串
function init() {
  var student = { name: "Bill", age: 12, grade: 3, id: "0802020114", subject: ["math", "Chinese", "English"]};
  var jsonText = JSON.stringify(student, jsonConvert);
}
function jsonConvert(key, value) {
   switch (key) {
        case "name":     return "Lily";
        case "grade":    return undefined;
        case "subject":  return value.join(",");
        default:         return value;
   }
}
//应用
<input type="button" onclick="init()" value="测试" />
/* 
如果键为name，就将其值设置为Lily；如果为grade就返回undefined来删除该属性；
如果为 subject，它是一个数组，就将它通过数组方法join()转化为以逗号连接的字符串。
default项不能缺少，使其他的值都能够正常出现在结果中，不然就会出错，没有结果。实际上，第一次调用这个函数过滤器，传入的键是一个空字符串，而值就是student对象
*/
//2. 输出美化, 缩进
JSON.stringify(value[, replacer [, space]])
//最大缩进空格数位10，所有大于10的值都会自定转换为10
var formatJsonStr=JSON.stringify(jsonObject,undefined, 2);
var formatJsonStr=JSON.stringify(jsonObject,null, 2); 
```

[back to top](#top)

<h3 id="JSON字符串的替换">6. JSON字符串的替换</h3>

```javascript
//{\"root\": {\"id\":\"sheygsd\",\"text\" ... }}
var jsonStr=jsonStr.replace(new RegExp('\\"',"gm"), '"' );  
//{"root": {"id":"sheygsd","text" ... }}   //将所有的\"替换成"
```

[back to top](#top)


- [3分钟掌握常用的JS操作JSON方法总结](http://blog.csdn.net/ltg263/article/details/72637911)
- [JS操作JSON总结toJSONString()和eval()方法](http://blog.csdn.net/h330531987/article/details/69750204)
