[mocking backend api](#top)

- [General part-反向代理的配置](#general-part-%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E7%9A%84%E9%85%8D%E7%BD%AE)
- [json-server -基于data.json的文件数据库](#json-server--%E5%9F%BA%E4%BA%8Edatajson%E7%9A%84%E6%96%87%E4%BB%B6%E6%95%B0%E6%8D%AE%E5%BA%93)
- [Http-Server](#http-server)
- [Koa-Router](#koa-router)
- [express](#express)

## General part-反向代理的配置

1. create `proxy.config.json` in root directory
2. modify package.json, `"start": "ng serve --proxy-config proxy.config.json",`

```json
{
  "/api":{
    "target": "http://localhost: 8808",
    "secure": false
  }
}
```

[back to top](#top)

## json-server -基于data.json的文件数据库

```shell
# 1) installing
npm install json-server -g
npm install json-server --save
# 2) configuring 1
# create db.json in root directory
{
  "todos": [
    {
      "id": 1,
      "title": "Read SitePoint article",
      "complete": false
    },
    {
      "id": 2,
      "title": "Clean inbox",
      "complete": false
    }
  ]
}
# in package.json
#"scripts:" {
#  "json-server": "json-server -p 4000 --watch db.json"
#}
# 3) running
npm run json-server
# 4) 运行http://localhost:4000/todos就得到数据啦
```

Options|function|default
---|---|---
--config, -c|               Path to config file |   [default: "json-server.json"]
  --port, -p|                  Set port      |                       [default: 3000]
  --host, -H |                 Set host    |                   [default: "0.0.0.0"]
  --watch, -w|                 Watch file(s)  |                            [boolean]
  --routes, -r |               Path to routes file| 
  --middlewares, -m |          Paths to middleware files  |                 [array]
  --static, -s|                Set static files directory| 
  --read-only, --ro  |         Allow only GET requests     |               [boolean]
  --no-cors, --nc |            Disable Cross-Origin Resource Sharing |     [boolean]
  --no-gzip, --ng  |           Disable GZIP Content-Encoding  |            [boolean]
  --snapshots, -S  |           Set snapshots directory    |           [default: "."]
  --delay, -d  |               Add delay to responses (ms)| 
  --id, -i |                   Set database id property (e.g. _id)|  [default: "id"]
  --foreignKeySuffix, --fks|   Set foreign key suffix (e.g. _id as in post_id)| [default: "Id"]
  --quiet, -q   |              Suppress log messages from output   |       [boolean]
  --help, -h        |          Show help          |                        [boolean]
  --version, -v    |           Show version number  |                      [boolean]

- http://example.com/db.json
- https://github.com/typicode/json-server
- [一分钟学会用json-server搭建RESTful API](http://www.ngfans.net/topic/129/post)

[back to top](#top)

## Http-Server

```shell
npm install http-server
http-server
#或package.json
"scripts": {
     "start": "http-server -a 0.0.0.0 -p 8000",
 }
http-server -p 3000 -P https://condejs.org
# -p 本地运行端口  -P 代理地址（就是要访问的接口下的域名）
# [path] defaults to ./public if the folder exists, and ./ otherwise
```

**参数**

```
-p 端口号 (默认 8080)
-a IP 地址 (默认 0.0.0.0)
-d 显示目录列表 (默认 'True')
-i 显示 autoIndex (默认 'True')
-e or --ext 如果没有提供默认的文件扩展名(默认 'html')
-s or --silent 禁止日志信息输出
--cors 启用 CORS via the Access-Control-Allow-Origin header
-o 在开始服务后打开浏览器
-c 为 cache-control max-age header 设置Cache time(秒) , e.g. -c10 for 10 seconds (defaults to '3600'). 禁用 caching, 则使用 -c-1.
-U 或 --utc 使用UTC time 格式化log消息
-P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com
-S or --ssl 启用 https
-C or --cert ssl cert 文件路径 (default: cert.pem)
-K or --key Path to ssl key file (default: key.pem).
-r or --robots Provide a /robots.txt (whose content defaults to 'User-agent: *\nDisallow: /')
-h or --help 打印以上列表并退出
```

> https://www.npmjs.com/package/http-server

[back to top](#top)

## Koa-Router

`npm install koa-router[@next](/user/next)`

```javascript
const Koa = require('koa');
const koaRouter = require('koa-router');
const app = new Koa();
const router = koaRouter();
app.use(router['routes']());
router.get('/index', function (ctx, next) {
	ctx.body = 'Hello Koa2.0!';
});
app.listen(3000, ()=>console.log('Koa start at 3000...'));
```

[back to top](#top)

## express

https://github.com/honggzb/Study-General/blob/master/Angular-Study/node%2Bexpress%E5%88%9B%E5%BB%BA%E6%9C%8D%E5%8A%A1%E5%99%A8.md
