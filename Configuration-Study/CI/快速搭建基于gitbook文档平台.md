- [本机环境搭建](#本机环境搭建)
- [服务器、虚拟机环境配置](#服务器、虚拟机环境配置)

使用到的相关技术

- GitLab：一个开源的版本管理系统，实现一个自托管的Git项目仓库，可通过Web界面进行访问公开的或者私人项目
- GitBook：一个基于 Node.js 的命令行工具，可使用 Github/Git 和 Markdown 来制作精美的电子书
- Nodejs：一个基于 Chrome V8 引擎的 JavaScript 运行环境

## 本机环境搭建

```shell
$ npm install -g gitbook
# 项目搭建, 注册GitLab账号，新建一个GitLab仓 webx-docs并clone到本地
$ git clone https://gitlab.com/webx-docs
$ cd webx-docs
$ gitbook init src
# 预览项目
$ gitbook serve ./src --port=8899
# 发布项目
$ gitbook build ./src ./docs
```

也可以使用`npm script`来简化执行操作: 在 webx-docs 目录下使用npm init初始化一个package.json文件，并增加如下脚本：

```json
  "scripts": {
    "dev": "gitbook serve ./src --port=8899",
    "build": "gitbook build ./src ./docs"
  },
```

## 服务器、虚拟机环境配置

**自动化部署**

1. 配置GitLab Webhook, 进入GitLab>settings，增加一条Push Events规则如下图：
2. clone 项目

```shell
$ cd /usr/local/src
$ git clone https://gitlab.com/webx-docs
```

3. 配置shell脚本 deploy.sh

```shell
#!/bin/bash
WEB_PATH='/usr/local/src/webx-docs'
WEB_USER='root'
WEB_USERGROUP='root'

echo "Start deployment"
cd $WEB_PATH
echo "pulling source code..."
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "start building..."
npm run build
echo "changing permissions..."
chown -R $WEB_USER:$WEB_USERGROUP $WEB_PATH
chmod -R 777 $WEB_PATH
echo "Finished."
```

4. 配置自动化部署脚本 deploy.js

```JavaScript
/**
 * @author: zuojj(zuojj.com@gmail.com) 
 * @description: 自动化部署脚本
 * @Date: 2017-06-22 15:31:29 
 */
const express = require('express');
const BL = require('bl');
const spawn = require('child_process').spawn;
const EventEmitter = require('events').EventEmitter;
const app = express();
const emitter = new EventEmitter();
const path = require('path');
const OS = require('os');  

/**
 * running shell
 * @param {any} cmd 
 * @param {any} args 
 * @param {any} callback 
 */
function run_cmd(cmd, args, callback) {
    console.log('runing deploy.sh ...');
    let child = spawn(cmd, args),
        str = '';

    child.stdout.on('data', function (buffer) {
        str += buffer.toString();
    });
    child.stdout.on('end', function () {
        callback(str);
    });
}

/**
 * execute shell
 */
function execute() {
    run_cmd('sh', ['./deploy.sh'], function (text) {
        console.log(text);
    });
}

app.use(express.static(path.join(__dirname, './')));

app.get('/docs', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'), function(err, html) {
        res.send(html);
    });
});

app.post('/_deploy_', function (req, res) {
    let reqHeaders = req.headers,
        gitlabEvent = reqHeaders['x-gitlab-event'],
        protocol = req.protocol,
        url = req.url,
        host = reqHeaders['host'];

    if (!gitlabEvent) return console.log('No X-Gitlab-Event found on request');

    req.pipe(BL(function (err, data) {
        let result,
            repname,
            eventType,
            emitData;

        if (err) return console.log(err.message);

        try {
            result = JSON.parse(data.toString());
        } catch (e) {
            return console.log(e);
        }

        if (!result || !result.repository || !result.repository.name) {
            return console.log('received invalid data from ' + req.headers['host'] + ', returning 400');
        }

        eventType = result.object_kind;
        repname = result.repository.name;

        res.writeHead(200, {
            'content-type': 'application/json'
        });

        res.end('{"ok":true}');

        emitData = {
            type: eventType,
            payload: result || {},
            protocol: protocol,
            host: host,
            url: url
        }

        emitter.emit(eventType, emitData)
        emitter.emit('*', emitData)
    }))
});


emitter.on('error', function (err) {
    console.error('Error:', err.message)
})

emitter.on('push', function (event) {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    execute();
});

execute();

let hostname = OS.hostname() || '',
    ipv4;

(OS.networkInterfaces().eth0 || []).forEach((item, index) => {
    ipv4 = item.family.toLowerCase() === 'ipv4' ? item.address : null;
});

console.log(['Running At Host: ', hostname, ', IP: ', ipv4].join(''));
app.listen(8899);
```

- 执行脚本，开启node服务，`$ node deploy.js`, 现在就可以访问了
- 如果你想服务一直运行，可以 `npm install -g forever`, 然后执行 `forever start deploy.js`
- 每次增加文档的时候，只需要 `npm run build` 一下，然后 git 相关命令提交，就可以自动触发 GitLab Webhook, 然后服务端自动更新，从而实现了，自动化部署

> Reference
> [煦涵说如何快速搭建文档平台](http://www.zuojj.com/archives/2295.html)
> [CI持续集成系统环境--Gitlab+Gerrit+Jenkins完整对接](https://www.cnblogs.com/kevingrace/p/5651447.html)
