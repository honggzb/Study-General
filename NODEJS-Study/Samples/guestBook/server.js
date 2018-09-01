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
    }else if(pathname.indexOf('/public/') === 0) {    //处理静态文件
        fs.readFile('.'+pathname, (err, data)=>{
            if (err) {
              return res.end('404 Not Found.');
            }
            res.end(data);
        });
     }else if (pathname === '/pinglun') {
          //    1. 获取表单提交的数据 parseObj.query
          //    2. 将当前时间日期添加到数据对象中，然后存储到数组中
          //    3. 让用户重定向跳转到首页 /
          //       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
          var comment = parseObj.query;
          comment.dateTime = '2017-11-2 17:11:22';
          comments.unshift(comment);
          // 通过服务器让客户端重定向？
          //    1. 状态码设置为 302 临时重定向
          //        statusCode
          //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
          //        setHeader
          // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
          // 所以你就能看到客户端自动跳转了
          res.statusCode = 302;
          res.setHeader('Location', '/');
          res.end();
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
