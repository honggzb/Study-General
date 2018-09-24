- [Source Map概念](#Source-Map概念)
- [生成Source Map](#生成Source-Map)
  - 1. 使用UglifyJS2时指定source-map选项
  - 2. Grunt
  - 3. Gulp
  - 4. Webpack
- [使用Source Map](#使用Source-Map)
- [上传Source Map](#上传Source-Map)

## Source Map概念

Source Map是一个JSON文件，其中包含了**代码转换前后的位置信息**。给定一个转换之后的压缩代码的位置，就可以通过Source Map获取转换之前的代码位置，反过来也一样。

Source Map各个属性的含义如下:

- version：Source Map的版本号。
- sources：转换前的文件列表。
- names：转换前的所有变量名和属性名。
- mappings：记录位置信息的字符串，经过编码。
- file：(可选)转换后的文件名。
- sourceRoot：(可选)转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。
- sourcesContent:(可选)转换前的文件内容列表，与sources列表依次对应。

## 生成Source Map

### 1. 使用UglifyJS2时指定source-map选项

```bash
#压缩代码的同时生成Source Map
uglifyjs app.js -o app.min.js --source-map app.min.js.map
#指定source-map选项
uglifyjs hello.js \
         -m toplevel=true \
         -c unused=true,collapse_vars=true \
         --source-map hello.min.js.map \
         --source-map-include-sources \
         --source-map-root \
         -o hello.min.js
# 参数： 
--source-map                  Source Map的文件的路径和名称
--source-map-root             源文件的路径
--source-map-url              #sourceMappingURL的路径。 默认为--source-map指定的值。
--source-map-include-sources  是否将源代码的内容添加到sourcesContent数组
--source-map-inline           是否将Source Map写到压缩代码的最后一行
--in-source-map               输入Source Map，当源文件已经经过变换时使用
```

###  2. 使用Grunt

```javascript
// 1) grunt-contrib-uglify插件
// 配置grunt-contrib-uglify插件以生成Source Map
// 2) grunt-usemin会依次调用grunt-contrib-concat与grunt-contrib-uglify对源码进行打包和压缩
grunt.initConfig(
{
    concat:
    {
        options: { sourceMap: true }
    },
    uglify:
    {
        options:
        {
            sourceMap: true,
            sourceMapIn: function(uglifySource)
            {
                return uglifySource + '.map';
            },
        }
    }
});
```

### 3. 使用Gulp

```javascript
//使用gulp-sourcemaps生成Source Map
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');
gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'));
});
```

### 4. 使用Webpack

```javascript
//在其配置文件webpack.config.js中设置devtool即可生成Source Map文件
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map"
};
```

**devtool**有12种不同取值，分别生成不同类型的Source Map，可以根据需要进行配置。其中，支持上传的Source Map类型有**source-map**、**nosources-source-map**与**hidden-source-map**, **cheap-source-map**与**cheap-module-source-map**。它们的特点如下表：

| devtool                 | names | sourcesCentent | sourceMappingURL |
| ----------------------- | ----- | -------------- | ---------------- |
| source-map              | 有    | 有             | 有               |
| hidden-source-map       | 有    | 有             | 无               |
| nosources-source-map    | 有    | 无             | 有               |
| cheap-source-map        | 无    | 有             | 有               |
| cheap-module-source-map | 无    | 有             | 有               |

- Source Map文件无**names**属性时，出错位置还原之后的列信息丢失
- Source Map文件无**sourcesCentent**属性时，出错位置还原之后的源代码丢失
- 源代码中无**sourceMappingURL**时，Fundebug无法主动下载Source Map文件，则用户必须主动上传Source Map文件。

我们推荐用户选择**source-map**类型，如果生成的Source Map文件过大时(超过**10MB**)，则可以选择**nosources-source-map**类型。

**参考链接**

- [[webpack\] devtool配置对比](http://www.cnblogs.com/hhhyaaon/p/5657469.html)
- [webpack sourcemap 选项多种模式的一些解释](https://segmentfault.com/a/1190000004280859)
- [Devtool - Webpack Documentation](https://webpack.js.org/configuration/devtool/)

## 使用Source Map

**主流浏览器均支持Source Map功能设置**

- Chrome浏览器
  - setting -> Sources中，选中**Enable JavaScript source maps**

## 上传Source Map

默认情况下，会根据压缩代码中的sourceMappingURL下载Source Map文件，用户仅需要将Source Map文件放在服务器上即可。

如果用户不希望公开Source Map，则可以主动上传Source Map文件。3种不同的上传方式

另外，目前Source Map限制大小为**10MB**，如果您的Source Map过大，可以在生成Source Map的时候去除sourcesContent。

### 通过前端UI上传Source Map

1. 进入『控制台』
2. 选择『项目设置』
3. 点击『Source Map』
4. 选中需要上传的Source Map文件(支持上传多个Source Map文件)
5. 点击『上传』

### 通过API上传Source Map

```shell
# 1)上传Source Map
curl https://fundebug.com/javascript/sourcemap/upload \
     -X POST \
     -F apikey=API-KEY \
     -F sourceMap=@dist/app.js.map
# apikey: 项目的apikey，获取apikey需要免费注册帐号并且创建项目
# sourceMap: 需要上传的Source Map文件，dist/app.js.map是Source Map文件的路径，=符号之后的@符号是必不可少的
# 2) 设置应用版本
curl https://fundebug.com/javascript/sourcemap/upload \
     -X POST \
     -F apikey=API-KEY \
     -F appversion=1.0.0 \
     -F sourceMap=@dist/app.js.map
#appversion: 可选参数，用于配置应用版本
#若希望区分不同版本的Source Map，则在接入Fundebug时，必须配置对应的appversion属性，并在代码更新时及时更新。
# 3) 上传压缩代码:
curl https://fundebug.com/javascript/sourcemap/upload \
     -X POST \
     -F apikey=API-KEY \
     -F mapScript=@dist/app.js
mapScript: 压缩代码
# 4) 上传压缩之前的源代码:
curl https://fundebug.com/javascript/sourcemap/upload \
     -X POST \
     -F apikey=API-KEY \
     -F ./app/app.js=@src/app/app.js \
# 其中，"./app/app.js"为Source Map文件中sources数组中的值，用于区分不同的源代码文件
```

> References
>
> - [FunDebug文档之Source Map](https://docs.fundebug.com/notifier/javascript/sourcemap/)
> - [JavaScript Source Map 详解](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
> - [Source Map Revision 3 Proposal](https://link.zhihu.com/?target=https%3A//docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit)
> - [How to enable source maps](https://link.zhihu.com/?target=https%3A//gist.github.com/jakebellacera/336c4982194bcb02ef8a)
