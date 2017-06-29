[javascript操作JSON常用方法](#top)

- [1. 定义一个JSON对象](#定义一个json对象)
- [2. JSON对象和JSON字符串的转换](#JSON对象和JSON字符串的转换)
- [3. 遍历JSON对象和JSON数组](#遍历JSON对象和JSON数组)
- [4. JSON的输出美化](#JSON的输出美化)
- [5. JSON字符串的替换](#JSON字符串的替换)

- JSON对象: `var jsonObj={id:{userId:'001',sex:'男'},id1:{userId:'002',sex:'女'}}`
- JSON数组: `var jsonArray=[{id:{userId:'001',sex:'男'},id1:{userId:'002',sex:'女'}}];`
- JSON字符串: `'{"name":"Liza", "password":"123"}'`

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

<h3 id="JSON对象和JSON字符串的转换">1. JSON对象和JSON字符串的转换</h3>

```javascript
//JSON对象
var jsonObject = {"name":"Liza", "password":"123"};
var jsonstr =JSON.stringify(jsonObject);
var jsonStr = jsonObject.toString();
//JSON字符串
var jsonStr ='{"name":"Liza", "password":"123"}';
var jsonObject= jQuery.parseJSON(jsonstr);  
var jsonObject= JSON.parse(jsonStr);
var jsonObject = eval('(' + jsonStr + ')');
```

除了eval()函数是js自带的之外，其他的多个都来自json.js包, 新版本的JSON修改了API，将JSON.stringify() 和JSON.parse() 两个要领都注入到了Javascript 的内建对象里面，前者变成了Object.toJSONString()，而后者变成了String.parseJSON()。如果提示找不到toJSONString()和parseJSON()要领，则说明您的json包版本太低

[back to top](#top)

<h3 id="遍历JSON对象和JSON数组">2. 遍历JSON对象和JSON数组</h3>

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

<h3 id="JSON的输出美化">3. JSON的输出美化</h3>

- JSON.stringify的可选参数space，可以指定缩进用的空白字符串，用于美化输出（pretty-print）
- space参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数没有提供（或者为null）将没有空格

```javascript
JSON.stringify(value[, replacer [, space]])
var formatJsonStr=JSON.stringify(jsonObject,undefined, 2);  
```

[back to top](#top)

<h3 id="JSON字符串的替换">4. JSON字符串的替换</h3>

```javascript
//{\"root\": {\"id\":\"sheygsd\",\"text\" ... }}
var jsonStr=jsonStr.replace(new RegExp('\\"',"gm"), '"' );  
//{"root": {"id":"sheygsd","text" ... }}   //将所有的\"替换成"
```

[back to top](#top)


- [3分钟掌握常用的JS操作JSON方法总结](http://blog.csdn.net/ltg263/article/details/72637911)
- [JS操作JSON总结toJSONString()和eval()方法](http://blog.csdn.net/h330531987/article/details/69750204)
