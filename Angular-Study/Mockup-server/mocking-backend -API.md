[mocking backend api](#top)

- [General part-反向代理的配置](#general-part-%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E7%9A%84%E9%85%8D%E7%BD%AE)
- [json-server -基于data.json的文件数据库](#json-server--%E5%9F%BA%E4%BA%8Edatajson%E7%9A%84%E6%96%87%E4%BB%B6%E6%95%B0%E6%8D%AE%E5%BA%93)
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
