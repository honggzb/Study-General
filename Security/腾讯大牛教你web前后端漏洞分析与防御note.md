[腾讯大牛教你web前后端漏洞分析与防御](#top)

- [一般概念](#一般概念)
- [XSS攻击](#XSS攻击)
  - 防御方法1： 转义、黑名单、白名单、第三方库
  - 防御方法2： CSP
  - 防御方法3： PHP中防御XSS
- [CSRF攻击](#CSRF攻击)
  - 防御方法1：禁止第三方网站带Cookie
  - 防御方法2：不访问A网站的前端(二维验证码，token)
  - 防御方法3：验证referer，禁止来自第三方网站的请求
- [Cookie安全问题](#Cookie安全问题)
- [点击劫持（ClickJacking）](#点击劫持)
  - 解决方法1：javascript禁止内嵌（计算当前页面和父级页面的位置）
  - 解决方法2：`X-FRAME-OPTIONS`是目前最可靠的方法
- [传输安全](#传输安全)
  - 解决方法：SSL/TLS协议加密
- [密码安全](#密码安全)

## 一般概念

**安全含义**

- 私密性： 不被非法获取，只有被授权情况下才能被获取
- 可靠性： 不丢失不损坏不被篡改

**Web安全含义**

- 代码层面
- 架构层面
- 运维层面

**安全问题**

- 用户身份被盗用
- 用户密码泄露
- 用户资料被盗取
- 网站数据库泄露
- 其他

[back to top](#top)

<h2 id="XSS攻击">XSS攻击</h2>

**Crossing Site Scripting跨站脚本攻击类型**

- 反射型： url参数直接注入
- 存储型： 存储到DB后读取时注入

**防御方法1： 转义**

- 对HTML节点内容转义： &lt;和&gt;, 如使用escapeHtml函数
- 对HTML属性转义： &quto;, 如使用escapeHtml函数
- JavaScript: 将`\`转义为json, 如使用escapeForJS函数
- 富文本： 黑名单和白名单

```javascript
var escapeHtml = function(str){
	if(!str) return '';
  str = str.replace(/&/g, '&amp;');   //注意，必须放在最前面
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quto;');   //双引号
	str = str.replace(/'/g, '&#39;');    //单引号
	str = str.replace(/ /g, '&#32;');    //空格
	return str;
}
var escapeForJS = function(str){
	if(!str) return '';
	str = str.replace(/\\/g, '\\\\');   //斜杠的转义， 必须放在最前面
	str = str.replace(/"/g, '\\"');     //双引号的转义
	return str;
}
//富文本黑名单方式，过滤指定的标签和属性<javascript>, javascript:, onerror=
var xssFilter = function (html) {
	if(!html) return '';
	html = html.replace(/<\s*\/?script>\s*/g, '');
  html = html.replace(/javascript:[^'"]*/g, '');   //javascript:alert("he")
  html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g, '');   //onerror=alert("he")
	return html;
}
//富文本白名单方式，除了规定的标签和属性之外，其他的均过滤, 其原理是将html解析为一个json或树状结构
//为提高效率，最好是在输出之前进行过滤
// 1) cheerio, 其操作类似于jquery, https://www.npmjs.com/package/cheerio
var xssFilter = function (html) {
	if(!html) return '';
	const cheerio = require('cheerio');
	const $ = cheerio.load(html);
  //定义白名单
  var whiteList = {
    'img': ['src'],
    'font': ['color','size'],
    'a': ['href']
  }
	$('*').each(function(index, elem){
		if(whiteList[elem.name]){
      $(elem).remove();
      return;
    }
    //处理标签的属性
    for(var attr in elem.attribs){
      if(whiteList[elem.name].indexOf(attr) == -1){
        $(elem).attr(attr, null);    //移除属性
      }
    }
	});
	return $.html();
}
// 2) js-xss: https://github.com/leizongmin/js-xss/blob/master/README.zh.md
var xssFilter = function (html) {
	if(!html) return '';
  var xss = require('xss');
  var ret = xss(html, {
    whiteList: {
      'img': ['src'],
      'font': ['color','size'],
      'a': ['href']
    },
    onIgnoreTag: function(){
      return '';
    }
  });
  return ret;
}
```

**防御方法2： CSP（Content Security Policy内容安全策略）： 用于指定那些内容可执行**

```javascript
router.all('/*', async function(ctx, next){
	console.log('enter site.js');
	ctx.set('X-XSS-Protection', 0);   //浏览器自带XSS拦截， 0：关闭，1：打开，url: 将攻击发送到url
	ctx.set(`Content-Security-Policy`, `default-src 'self'`)
	await next();
});
```

**防御方法3： PHP中防御XSS**

```php
<?php 
//4)
header('X-XSS-Protection:0');
header("Content-Security-Policy:script-src 'self'");
 if(strtolower($_SERVER[REQUEST_METHOD])) == 'post'){
   $content = $_POST['content'];
   //1)使用php内置函数
   //$content = strip_tags($content);
   //$content = htmlspecialchars($content, ENT_QUOTES);
   //2)使用DOMDocument类
   //3)第三方库
   //$purifier = new HTMLPurifier();
   //$content = purifier->purifier($content);
?>
<div><?php } ?></div>
<form method="post">
  <textarea name="content">hello</textarea>
  <button type="submit">提交</button>
</form>
```

[back to top](#top)

<h2 id="CSRF攻击">CSRF攻击</h2>

- Cross Site Request Forgy跨站请求伪造

如<a>,<img>均可产生get请求，可以被CSRF利用

```javascript
//在服务器端添加get路由
router.get('/ajax/addComment', site.addComment);
//
exports.addComment = async function(ctx, next){
    //...
		if(ctx.request.method === 'post'){
			data = ctx.request.body;
		}else{
			data = ctx.request.query;    //csrf attack, 对应于router.get('/ajax/addComment', site.addComment);
		}
    //...
}
//在页面就可以利用<a>,<img>均产生get请求
<a href="http://localhost:1521/ajax/addComment?postId=12&content=..."></a>
```

**防御方法1：禁止第三方网站带Cookie**

- 利用SameSite属性(https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/set-cookie), `ctx.cookies.set('userId', user.id, {httpOnly:false, sameSite: 'strict'});`(http://koajs.com/, https://github.com/pillarjs/cookies)
- 只有chrome和Opera支持

**防御方法2：不访问A网站的前端**

- 在前端页面加入验证信息
  -图形验证码: 如[ccap](https://github.com/DoubleSpout/ccap)
  - token：   必须经过前端网页取得token才能通过，token是一个随机的字符串，利用cookie检查token

```javascript
/* 1） 图形验证码 -controllers/site.js*/
exports.addComment = async function(ctx, next){
	try{
  //...
  //11)图形二维码
  if(!data.captcha){    //防止验证码为空的错误
    throw new Error('验证码错误');
  }
  var captcha = require('../tools/captcha');
  var captchaResult = captcha.validCache(ctx.cookies.get('userId')， data.captcha);
  console.log(captchaResult);
  if(!captchaResult){
    throw new Error('验证码错误')；
  }
  //...
//12） post.html
<input name="captcha" placeholder="验证码" />
<img src="/captcha" />
//13）tools/captcha.js
//14）routes/site.js
router.get('/captcha', captcha.captcha);
/* 2） 图形验证码 -controllers/site.js*/
// 21) 生成token
exports.post = async function(ctx, next){
  //...
  var csrfToken = parseInt(Math.random()*9999999, 10);
  ctx.cookies.set('csrfToken', csrfToken);
  //..
  if(post){
    ctx.render('post', {post, comments, csrfToken});  //加入csrfToken
  }else{
    ctx.status = 404;
  }
  // ..
}
// 22) 页面中加入一个hidden input
<input type="hidden" name="csrfToken" value="csrfToken"> 
// 或在meta中加入，如果是ajax调用的情况
<meta name="csrf_Token" content="csrfToken">
// 23) 在后台处理
exports.addComment = async function(ctx, next){
  //...
  if(data.csrfToken){
    throw new Error('CSRF Toke为空');
  }
  if(data.csrfToken !== ctx.cookies.get('csrfToken')){
    throw new Error('CSRF Toke错误');
  }
  //...
};
```

[back to top](#top)

**防御方法3：验证referer，禁止来自第三方网站的请求**

```javascript
exports.addComment = async function(ctx, next){
  //...
  var referer = ctx.request.headers.referer;
  if(/^https?:\/\/localhost/.test(referer)){//如果referer不包含localhost字符
    throw new Error('非法请求！')
  }
  //...
};
```

[back to top](#top)

<h2 id="Cookie安全问题">Cookie安全问题</h2>

- 后端通过http头设置
- 请求时通过http头传给后端
- 前端可读取
- 遵守同源策略
- Cookies特性：域名、有效期、路径、http-only（只能在http协议中使用）、secure

```javascript
/* Cookies用法1： 用户id+签名*/
// https://nodejs.org/api/crypto.html
//tools/crypt.js
var crypt = {};
const KEY = '#da9%@!#(lfsa#$%)';
crypt.cryptUserId = function(userId){
  var crypto = require('crypto');
  var sign = crypto.createHmac('sha256',KEY);
  sign.update(userId+'');
  return sign.digest('hex');
};
module.exports = crypt;
//user.js
ctx.cookies.set('userId', user.id, {httpOnly:true, sameSite: 'strict'});
ctx.cookies.set('sign', crypt.cryptUserId(user.id), {httpOnly:true, sameSite: 'strict'}); //明文
//site.js
exports.addComment = async function(ctx, next){
  //... 
  var userId = ctx.cookies.get('userId');
  var sign = ctx.cookies.get('sign');
  var correctSign = crypt.cryptUserId(userId);
  if(correctSign !== sign){
    throw new Error("报告，有人入侵！")
  }
/* Cookies用法2： sessionId, 在cookie中不存放userId */
// tools/session.js
var session = {};
var cache = {};
sesssion.set = function(userId, obj){
  var sessionId = Math.random();
  if(!cache[sessionId]){
    cache[sessionId] = {};
  }
  cache[sessionId].content = obj;
  return sessionId;
}
session.get = function(sessionId){
  return cache[sessionId] && cache[sessionId].content;
}
module.exports = session;
//user.js
var sessionId = session.set(user.id, {
  userId: user.id
});
ctx.cookies.set('sessionId', sessionId, {httpOnly:true, sameSite: 'strict'})
//site.js
exports.addComment = async function(ctx, next){
  //...
    var sessionId = ctx.cookies.get('sessionId');   //这样，匿名用户就无法发布comment
    var sessionObj = session.get(sessionId);
    if(!sessionId || !sessionId.userId){
      throw new Error("session不存在");
    }
    var userId = sessionObj.userId;
    //...
    const result = await query(
      `insert into comment(userId,postId,content,createdAt) values("${userId}")}", "${data.postId}", "${data.content}",${connection.escape(new Date())})`
    );    // ${ctx.cookies.get('userId')} change to ${userId}, 不再是从cookies中读取userId
    //...
}
````

Cookies和XSS的关系

- XSS可能偷取Cookies
- http-only的cookies不会被偷

[back to top](#top)

<h2 id="点击劫持">点击劫持（ClickJacking）</h2>

- 一是攻击者使用一个透明的iframe，覆盖在一个网页上，然后诱使用户在该页面上进行操作，此时用户将在不知情的情况下点击透明的iframe页面
- 二是攻击者使用一张图片覆盖在网页，遮挡网页原有位置的含义

**解决方法1：javascript禁止内嵌（计算当前页面和父级页面的位置）**

`if(top.location != window.location)  { top.location=window.location; }`

> 缺点：html5的iframed的新属性sandbox会导致javascript禁止内嵌失败

`<iframe style="opacity:0" src="http://..." sandbox="allow-forms" width="800" height="600"></iframe>`

- allow-same-origin:    允许iframe内容被视为与包含文档有相同的来源。
- allow-top-navigation: 允许iframe内容从包含文档导航（加载）内容。
- allow-forms:          允许表单提交, 不允许脚本执行
- allow-script:         允许脚本执行

http://blog.csdn.net/jdk137/article/details/53141387

**解决方法2：`X-FRAME-OPTIONS`是目前最可靠的方法**

- `X-FRAME-OPTIONS`是微软提出的一个http头，专门用来防御利用iframe嵌套的点击劫持攻击。并且在IE8、Firefox3.6、Chrome4以上的版本均能很好的支持。`X-FRAME-OPTIONS`有三个值
  - DENY          // 拒绝任何域加载
  - SAMEORIGIN    // 允许同源域下加载
  - ALLOW-FROM    // 可以定义允许frame加载的页面地址

```javascript
//routes/site.js  - nodejs
router.all('/*', async function(ctx, next){
	console.log('enter site.js');
	ctx.set('X-XSS-Protection', 0);   //浏览器自带XSS拦截， 0：关闭，1：打开，url: 将攻击发送到url
	ctx.set('X-FRAME-OPTIONS', 'DENY');   //点击劫持
	ctx.set(`Content-Security-Policy: default-src 'self'`)
	await next();
});
// php中设置
header("X-FRAME-OPTIONS:DENY");
// Apache配置
Header always append X-Frame-Options SAMEORIGIN
// nginx配置
add_header X-Frame-Options SAMEORIGIN;
// IIS配置
<system.webServer>
    //...
    <httpProtocol>
        <customHeaders>
            <add name="X-Frame-Options" value="SAMEORIGIN" />
        </customHeaders>
    </httpProtocol>
    //...
</system.webServer>
```

**其他辅助方法: 如加验证码**

[back to top](#top)

<h2 id="传输安全">传输安全</h2>

**工具**

- 查看命令
- 代理软件AnyProxy

```shell
traceroute 11.1.0.1   #linux
tracert 11.1.0.1      #window
```

| 命令参数 | 说明|
| :------------- | :------------- |
|-d|Specifies to not resolve addresses to host names|
|-h maximum_hops|Specifies the maximum number of hops to search for the target|
|-j host-list|Specifies loose source route along the host-list|
|-w timeout|Waits the number of milliseconds specified by timeout for each reply|
|target_host|Specifies the name or IP address of the target host|

**解决方法：SSL/TLS协议加密**

- [SSL/TLS原理详解](https://segmentfault.com/a/1190000002554673)
- [SSL协议详解](http://www.cnblogs.com/zhuqil/archive/2012/10/06/ssl_detail.html)
- [HTTPS协议详解(一)：HTTPS基础知识](http://blog.csdn.net/hherima/article/details/52469267)
- [Let’s Encrypt](https://letsencrypt.org/) is a free, automated, and open Certificate Authority
- 管理工具： OS X Keychain, [CryptProtectData](https://msdn.microsoft.com/en-us/library/aa380261(v=VS.85).aspx) and CryptUnprotectData for windows

**部署https**

```javascript
//server.js
const https = require('https');
const fs = require('fs');
//...
https.createServer({
	key: fs.readFileSync('./cert/private.key'),
	cert: fs.readFileSync('./cert/fullchain.crt')
}, app.callback()).listen(1522, function(){
	console.log("App is listening on port 1522");
})
```

> SwitchHosts  -> 将任意网站定义为localhost（`127.0.0.1`）

[back to top](#top)

<h2 id="密码安全">密码安全</h2>



[back to top](#top)

