[腾讯大牛教你web前后端漏洞分析与防御](#top)

- [一般概念](#一般概念)
- [XSS](#XSS)
  - 防御方法1： 转义、黑名单、白名单、第三方库
  - 防御方法2： CSP
  - 防御方法3： PHP中防御XSS
- [CSRF](#CSRF)

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

## XSS

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

## CSRF

- Cross Site Request Forgy跨站请求伪造


**防御方法1：禁止第三方网站带Cookie**

- 利用SameSite属性(https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/set-cookie), `ctx.cookies.set('userId', user.id, {httpOnly:false, sameSite: 'strict'});`(http://koajs.com/, https://github.com/pillarjs/cookies)
- 只有chrome和Opera支持

**防御方法2：不访问A网站的前端**

- 在前端页面加入验证信息
  - 验证码: 如[ccap](https://github.com/DoubleSpout/ccap)
  - token： 必须经过前端网页取得token才能通过

```javascript
//1） 验证码 -controllers/site.js
exports.addComment = async function(ctx, next){
	try{
  //...
  //图形二维码
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
//2） post.html
<input name="captcha" placeholder="验证码" />
<img src="/captcha" />
//3）tools/captcha.js
//4）routes/site.js
router.get('/captcha', captcha.captcha);
```

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

