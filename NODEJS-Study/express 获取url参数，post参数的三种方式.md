## express 获取url参数，post参数的三种方式

- Checks route params (`req.params.id`), ex: `/user/:id`  
- Checks query string params (`req.query.id`), ex: `?id=12`  
- Checks urlencoded body params (`req.body.id`), `ex: id=`  

**post请求需要**

```javascript
var express        = require("express");  
var bodyParser     = require("body-parser");  
var app            = express();  
// need it...  
app.use(bodyParser.urlencoded({ extended: false }));  
app.post('/login',function(req,res){  
  var user_name=req.body.user;  
  var password=req.body.password;  
  console.log("User name = "+user_name+", password is "+password);  
  res.end("yes");  
});  
```

**案例**

```html
<form action="/index" method="get">  
       <input type="text" name="login_name"/>  
     <input type="submit" value="Sign In" />  
</form> 
```

```javascript
var app = require('express').createServer();  
app.get('/:key', function(req, res){  
  console.log(req.params.key);//输出index  
  console.log(req.query.login_name);//输出表单get提交的login_name  
  res.send('great you are right for get method!');//显示页面文字信息  
});  
app.post('/:key', function(req, res){  
<pre name="code" class="javascript">  console.log(req.params.key);//输出index  
  console.log(req.body.login_name);//输出表单post提交的login_name  
  res.send('great you are right for post method!');//显示页面文字信息</pre>});
app.listen(3000);
```

**一个完整的URL的各组成部分**

```
http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
-----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
```
