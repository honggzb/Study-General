```
├── 📂NodeJS 学习
│   ├──  📂设置
│   │    ├──  📄nodeModule汇总.md
│   │    └──  📄npm常用命令.md
│   ├──  📂调试
│   │     ├── 📄nodeJS调试.md
│   │     └──    
│   ├──  📂express
│   │     ├── 📄node+express创建服务器.md
│   │     └──  
│   ├──  📂sample: node.js 学习代码
│   │     ├── 📄1.basicModule
│   │     ├── 📄2.async
│   │     ├── 📄3 WeatherAppCallback+promise
│   │     ├── 📄4.webServer
│   │     └── 
│   ├──  📄streamAPI.md
│   ├──  📄express 获取url参数，post参数的三种方式.md
│   ├──  📄node + swagger.md
│   └──  📄resources.md
------------------------------------------------------------------------------------------

一些tips和技巧 
├── 自定义命令行命令                -- sample\1.basicModule\app.js(using yargs）
├── 服务器端log，server side log    -- sample\4.webServer\server.js
└──
```

## Run multiple commands concurrently

- `npm i concurrently -D`
- `"dev": "concurrently \"npm:start:dev\" \"npm:gen-ty\" \"npm:prisma:generate\""`

## resources

- [Book - Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices/tree/master)
- [一篇文章构建你的 NodeJS 知识体系](https://juejin.cn/post/6844903767926636558)
  - https://github.com/ringcrl/node-point
