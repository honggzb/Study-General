var express = require('express');
var router = require('./router.js');
var bodyParser = require('body-parser');

var app = express();
app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

app.engine('html', require('express-art-template'));

//必须在router之前
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//挂载路由
app.use(router);

app.listen(3010, () => {
    console.log("running 3010");
});

module.exports = app;
