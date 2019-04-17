[webpack之html部分](#top)

- [单页面应用打包](#%E5%8D%95%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%89%93%E5%8C%85)
- [多页面应用打包](#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%89%93%E5%8C%85)
- [组件模板html文件的处理-如Angular](#%E7%BB%84%E4%BB%B6%E6%A8%A1%E6%9D%BFhtml%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%84%E7%90%86-%E5%A6%82angular)

- 个性化内容填充（例如页面标题，描述，关键词）
- 多余空格删除（连续多个空白字符的合并）
- 代码压缩（多余空白字符的合并）
- 去除注释

## 单页面应用打包

- 入口html文件的处理直接使用html-webpack-plugin插件来设置
- 参考其github地址[html-webpack-plugin项目地址](https://github.com/jantimon/html-webpack-plugin)

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development',
  entry: __dirname + './index.js',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dev test',
      template: 'index.html',
      templateParameters: {
        'param1' : 'tony',
        'param2' : 'bruce'
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    })
  ]
};
```

[back to top](#top)

## 多页面应用打包

![](https://i.imgur.com/eZ23niT.png)

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development',
  entry:{  //entry参数需要配置多个依赖入口文件
    "main":__dirname + "/src/indexController.js",
    "about":__dirname + "/src/aboutController.js",
    "list":__dirname + "/src/listController.js"
  }
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  plugins: [
    //分别引用对应的入口文件并生成对应的访问入口
    //index.html
    new HtmlWebpackPlugin({
        title:'MainPage',
        template:'src/index.html',
        filename:'index.html',
        templateParameters:{
            param1:'tony stark',
            param2:'bruce banner'
        },
        chunks:['main'],
    }),
    //about.html
    new HtmlWebpackPlugin({
        title:'AboutPage',
        template:'src/about.html',
        filename:'about.html',
        templateParameters:{
            param1:'tony stark',
            param2:'bruce banner'
        },
        chunks:['about'],
    }),
    //list.html
    new HtmlWebpackPlugin({
        title:'ListPage',
        template:'src/list.html',
        filename:'list.html',
        templateParameters:{
            param1:'tony stark',
            param2:'bruce banner'
        },
        chunks:['list'],
    }),
  ],
  //公共模块提取
  optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {   // 抽离第三方插件, vendor
                test: /node_modules/,   // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'vendor',  // 打包后的文件名
                priority: 10   // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
            },
            utils: { // 抽离自己写的公共代码，utils
                chunks: 'initial',
                name: 'utils',  // 打包后的文件名
                minSize: 0    // 只要超出0字节就生成一个新包
            }
        }
    }
   },
};
```

[back to top](#top)

## 组件模板html文件的处理-如Angular

[Angular-webpack-starter](https://github.com/PatrickJS/angular-starter)

[back to top](#top)
