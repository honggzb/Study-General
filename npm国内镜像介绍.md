npm国内镜像介绍

1. 通过config命令

```shell
npm config set registry https://registry.npm.taobao.org 
npm info underscore      #（如果上面配置正确这个命令会有字符串response）
```

2. 命令行指定

`npm --registry https://registry.npm.taobao.org info underscore `
`npm install mysql2 --register=http://register.npm.taobao.org`

3. 编辑 ~/.npmrc 加入下面内容(推荐)

`registry = https://registry.npm.taobao.org`

- 搜索镜像: https://npm.taobao.org
- [快速搭建 Node.js 开发环境以及加速 npm](http://cnodejs.org/topic/5338c5db7cbade005b023c98)
- [npm install 无响应解决方案](http://www.uedbox.com/npm-install-slow-solution/)

