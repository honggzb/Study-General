var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('art-template');

var comments = [
    {
      name: '张三',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三2',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三3',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三4',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三5',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    }
  ];

var server = http.createServer((req, res) => {
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if(pathname === '/'){
        fs.readFile('./views/index.html', (err, data)=>{
            if (err) {
              return res.end('404 Not Found.');
            }
            var htmlStr = template.render(data.toString(), {
              comments: comments
            });
            res.end(htmlStr);
        });
    }else if(pathname === '/post') {
        fs.readFile('./views/post.html', (err, data)=>{
            if (err) {
              return res.end('404 Not Found.');
            }
            res.end(data);
        });
    }else if(pathname.indexOf('/public/') === 0) {
        fs.readFile('.'+pathname, (err, data)=>{
            if (err) {
              return res.end('404 Not Found.');
            }
            res.end(data);
        });
    }else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
              return res.end('404 Not Found.');
            }
            res.end(data);
          })
    }

});

server.listen(3010, function(){
    console.log('Server start on listen 3010: running...')
})
