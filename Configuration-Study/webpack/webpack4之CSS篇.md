[webpack之CSS篇](#top)

- [常用插件及功能简述](#%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6%E5%8F%8A%E5%8A%9F%E8%83%BD%E7%AE%80%E8%BF%B0)
- [配置](#%E9%85%8D%E7%BD%AE)

-------------------------------------------------------------------

- 预编译语言转换
- 样式文件挂载方式选择
- 代码优化（合并及压缩）
- 去除或保留指定格式的注释
- 资源定位路径的转换
- 响应式布局单位转换【可选】
- 模块化【可选】
- 处理浏览器兼容【可选】

**预编译语言 + 构建工具 + BEM + ACSS全局样式 + CSSModule组件样式 + POSTCSS**

**Css-Process-Chain**

![](https://i.imgur.com/mdhkXn3.png)

## 常用插件及功能简述

- style-loader——将处理结束的CSS代码存储在js中，运行时嵌入<style>后挂载至html页面上
- css-loader——加载器，使webpack可以识别css模块
- postcss-loader——加载器，下一篇将详细描述
- sass-loader——加载器，使webpack可以识别scss/sass文件，默认使用node-sass进行编译
- mini-css-extract-plugin——插件，4.0版本启用的插件，替代原extract-text-webpack-plugin插件，将处理后的CSS代码提取为独立的CSS文件
- optimize-css-assets-webpack-plugin——插件，实现CSS代码压缩
- autoprefixer——自动化添加跨浏览器兼容前缀

[back to top](#top)

## 配置

```javascript
/*1) webpack.config.js*/
const HtmlWebpackPlugin = require('html-webpack-plugin');//用于自动生成html入口文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//将CSS代码提取为独立文件的插件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");//CSS模块资源优化插件
module.exports = {
  mode:'development',
  entry:'./main.js',
  output:{
    filename:'main.bundle.js',
    path:__dirname + '/build'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/, //排除node_modules文件夹
        use: [{
             loader: MiniCssExtractPlugin.loader//建议生产环境采用此方式解耦CSS文件与js文件
          },{
            loader: 'css-loader',//CSS加载器
            options: {importLoaders: 2}//指定css-loader处理前最多可以经过的loader个数     
          },{
            loader: 'postcss-loader',//承载autoprefixer功能
          },{
            loader: 'sass-loader'//SCSS加载器，webpack默认使用node-sass进行编译
          }
        ]
      }
    ]
  },
  plugins:[
      new HtmlWebpackPlugin(),//生成入口html文件
      new MiniCssExtractPlugin({
        filename: "[name].css"
      })//为抽取出的独立的CSS文件设置配置参数
  ],
  optimization:{
    //对生成的CSS文件进行代码压缩 mode='production'时生效
    minimizer:[
       new OptimizeCssAssetsPlugin()
    ]
  }
}
/*2) postcss.config.js*/
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
/*3) package.json中增加新的参数指定打包需要支持的浏览器类别*/
"browerslist": [
    "last 2 versions",
    "IE 8",
    "UCAndroid"
]
```

[back to top](#top)
