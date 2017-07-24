[javascript实现英文首字母大写](#top)

- [方法一](#方法一)
- [方法二](#方法二)
- [方法三](#方法三)
- [方法四](#方法四)

### 方法一

```javascript
function replaceStr(str){ // 正则法
 str = str.toLowerCase();
 var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
 return str.replace(reg,function(m){ 
  return m.toUpperCase()
 });
}
 
function replaceStr1(str){
 str = str.toLowerCase();
 var strTemp = ""; //新字符串
 for(var i=0;i<str.length;i++){
  if(i == 0){
   strTemp += str[i].toUpperCase(); //第一个
   continue;
  }
  if(str[i] == " " && i< str.length-1){ //空格后
   strTemp += " ";
   strTemp += str[i+1].toUpperCase();
   i++;
   continue;
  }
  strTemp += str[i];
 }
  return strTemp;
 }
var text = "abcd ABCD efGH";
console.log(replaceStr(text));//Abcd Abcd Efgh
console.log(replaceStr1(text));//Abcd Abcd Efgh
 ```
 
[back to top](#top)
 
### 方法二

```javascript
function ucfirst(str){
  var str = str.toLowerCase();
  var strarr = str.split(' ');
  var result = '';
  for(var i in strarr){
    result += strarr[i].substring(0,1).toUpperCase()+strarr[i].substring(1)+' ';
  }
  return result;
}
```
 
[back to top](#top)
 
### 方法三

```javascript
function ucfirst(str) {
 var str = str.toLowerCase();
 str = str.replace(/\b\w+\b/g, function(word){
   return word.substring(0,1).toUpperCase()+word.substring(1);
});
return str; 
```
 
[back to top](#top)
 
### 方法四

CSS来实现

```html
<html>
 <head>
 <style type="text/css"> 
  h1 {text-transform: uppercase} 
  p.uppercase {text-transform: uppercase}   
  p.lowercase {text-transform: lowercase}  
  p.capitalize {text-transform: capitalize } 
 </style>
 </head>
 <body>
  <h1>This Is An H1 Element</h1>
   <p class="uppercase">This is a test.</p><p class="lowercase">This is a test.</p><p class="capitalize">This is a test.</p>
 </body>
</html>
```
 
[back to top](#top)
 
http://www.jb51.net/article/64680.htm
 
