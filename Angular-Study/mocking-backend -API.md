[mocking backend api](#top)

- [json-server](#json-server)
- [Koa-Router](#Koa-Router)
- [express](#express)

### json-server

```shell
# 1) installing
npm install json-server -g
npm install json-server --save
# 2) configuring
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

[back to top](#top)

### Koa-Router

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

### express

参见： https://github.com/honggzb/Study-General/blob/master/Angular-Study/node%2Bexpress%E5%88%9B%E5%BB%BA%E6%9C%8D%E5%8A%A1%E5%99%A8.md
