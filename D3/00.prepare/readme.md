```shell
express d3MockServer
npm Install
npm start
# localhost:3000
#change to use HTML in Express instead of Jade
#// app.js
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
#// routes/index.js
router.get('/', function(req, res, next) {
  res.render('public/index', { title: 'Express mock server' });
});
#create your html view in /public directory
```
