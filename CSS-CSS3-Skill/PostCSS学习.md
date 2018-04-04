[PostCSS学习](#top)

- [PostCss安装及使用](#PostCss安装及使用)
- [PostCss语法](#PostCss语法)
  - 引入部分（partial imports）
  - 变量（variables）
  - 嵌套（nesting）
  - 混合宏（mixins）
  - 扩展（extend）
  - 占位符（placeholder classes）
  - 颜色函数（darken and rgba color functions）
  - 压缩（compression）

- PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more
- 写scss，less等其他预编译的css时，都是以该文件后缀来书写，postcss是以.css结尾

<h2 id="PostCss安装及使用">PostCss安装及使用</h2>

- PostCSS一般是结合自动化工具使用，如果要单独使用可以安装PostCSS CLI

```shell
#安装PostCSS和插件
npm i --save-dev postcss-cli
npm install --save-dev autoprefixer
```

### 单文件编译方法1

`postcss ../../src/style01.css -o ../../dist/output_style01.css -u autoprefixer`

### 单文件编译方法2 - 修改package.json中的scripts，增加一条postcss命令

```
"postcss:style01": "postcss ./src/style01.css -o ./dist/output_style01.css -u autoprefixer"
  #执行
npm run postcss:style01
```

### 单文件编译方法2 - 同样的采用Parser插件来编译样式文件, 创建一个postcss.config.js文件

```JavaScript
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('autoprefixer')
  ]
}
```

仅适用于全局安装了PostCSS-CLI和sugarss的情况下再该配置文件目录下执行`postcss ./src/style02.sss -o ./dist/test.css`命令就好了

### 结合自动化工作在项目中使用1 - 结合Webpack应用

- https://webpack.js.org/loaders/postcss-loader/
- 安装依赖包
  - `npm i -D postcss-loader style-loader css-loader webpack webpack-dev-server`
  - `npm i -D sugarss precss autoprefixer`
- 编辑webpack.config.js和postcss.config.js

```javascript
//webpack.config.js
var path = require('path');
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.sss$/,
      exclude: /node_modules/,
      use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader'
        }
      ]
    }]
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
//postcss.config.js
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}
```

### 结合自动化工作在项目中使用2 - 结合gulp应用

- https://webpack.js.org/loaders/postcss-loader/
- 安装依赖包
  - `npm run i -D gulp gulp-postcss gulp-sourcemaps`
- 编辑gulpfile.js和package.json
- 执行： `gulp css`

```javascript
var postcss = require('gulp-postcss');
var gulp = require('gulp');
gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  return gulp.src('src/style05.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('precss'), require('autoprefixer')]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});
```

[back to top](#top)

### 结合自动化工作在项目中使用3 - 结合grunt应用

- Grunt 中使用 grunt-postcss 来集成 PostCSS。Grunt 中需要使用 grunt.loadNpmTasks 方法来加载插件
- 安装依赖包  `npm run i -D grunt autoprefixer grunt-postcss`

```javascript
module.exports = function(grunt) {
 grunt.initConfig({
   postcss: {
     options: {
       processors: [
         require('autoprefixer')()
       ]
     },
     dist: {
       src: 'app/**/*.css',
       expand: true,
       dest: 'dist'
     }
   }
 });
  grunt.loadNpmTasks('grunt-postcss');
}
```

[back to top](#top)

<h2 id="PostCss语法">PostCss语法</h2>

<h3 id="引入部分">引入部分（partial imports）</h3> 

预编译都有一个@import引入，就可以编译。postscss需要安装一个插件postcss-import才能实现该功能

<h3 id="变量">变量（variables）</h3> 

```css
/*postcss变量需要定义:root里面*/
:root { 
  --white: #fff; 
  --grey: #1e1e1d; 
  --yellow: #ffad15; 
  --offwhite: #f8f8f8; 
}
/* 使用 */
a {  color: var(--yellow);}
```

<h3 id="嵌套">嵌套（nesting）</h3> 

```css
/*
1) 基本的嵌套需要一个前置的&。伪类和选择器在Sass和CSS中使用是相同的。
2) 媒体查询嵌套，不需要前置的&。
3) @nest。在文档中提到，复杂的嵌套需要@nest替代&
*/
.projects-list { 
    /* ... */
    & li { 
        & > div { /* ... */  } 
    } 
    & a { 
        /* ... */
        &:hover, &:focus { /* ... */ } 
        &::after {   /* ... */ } 
    } 
    @media (min-width: 640px) {
        /* ... */
    } 
}
```

<h3 id="混合宏">混合宏（mixins）</h3> 

```css
/* :matches选择器来模拟 */
.p-jribbble, .p-jribbble a:matches(:hover, :focus) { 
    background-color: var(--color-jrb); 
    & i { 
        color: var(--color-jrb); 
    } 
}
/*编译后结果*/
.p-jribbble, .p-jribbble a:hover, .p-jribbble a:focus { 
    background-color: #ff0066 
} 
.p-jribbble a, .p-jribbble a:hover i, .p-jribbble a:focus i { 
    color: #ff0066; 
}
```

<h3 id="占位符">占位符（placeholder classes）</h3> 

```css
/*@apply允许在选择器中引用一组已存储样式, 相当于Sass中的@extend规则*/
:root { 
    --franklin: { 
        font-family: 'futura-pt', helvetica, sans-serif; 
    }; 
    --franklin-heading: { 
        @apply --franklin;     /* 引用--franklin */
        font-weight: 700; 
        line-height: 1.1; 
        text-transform: uppercase; 
    }; 
}
.my-heading { 
    @apply --franklin-heading;  /* 引用--franklin-heading */
}
```

<h3 id="颜色函数">颜色函数（darken and rgba color functions）</h3> 

- [postcss-color-function](https://github.com/postcss/postcss-color-function#list-of-color-adjuster)

```css
ackground-color: color(#d32c3f shade(40%) alpha(80%));
/*编译后：*/
background-color: rgba(127, 26, 38, 0.8);
```

<h3 id="压缩">压缩（compression）</h3> 

```JavaScript
gulp.task('css', function () {  
    gulp.src(['./src/css/*.css'])  
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))  
        .pipe(postCss([  
            autoprefixer({  
                browsers: ['last 4 version','Android >= 4.0'],//添加浏览器最近的四个版本需要的前缀，兼容安卓4.0以上版本  
                cascade: false,//是否美化属性,默认true  
                remove: true//移除不必要的前缀  
            }), cssNext()]))  
        .pipe(concat('main.css'))  
        .pipe(cleanCSS())  
        .pipe(gulp.dest('dist/css'))  
        .pipe(browserSync.reload({stream:true}));  
}); 
//需要安装的有gulp、gulp-concat、gulp-postcss、autoprefixer、gulp-clean-css、gulp-changed、cssnext、browser-sync//2017.6.19更新：不建议使用cssnext，css文件不支持@、$等符号，less和scss本身对于这些符号有自己的定义。cssnext依赖于autoprefixer，css4的属性需要添加浏览器前缀，并且cssnext实现的功能以后浏览器会怎么具体实现还存疑，没有实用价值。为了项目稳定，建议大家了解一下就好。二-11已经被主流浏览器支持，实测ie和360不行
```

[back to top](#top)

> Reference
> - [PostCSS自学笔记](https://segmentfault.com/a/1190000010926812)
> - [PostCSS学习.md](https://github.com/jiayisheji/jianshu/blob/master/blog/PostCSS%E5%AD%A6%E4%B9%A0.md)
> - [深入PostCSS Web设计](https://www.w3cplus.com/preprocessor/postcss-book.html)
> - [PostCSS入门：Sass用户入门指南](https://www.w3cplus.com/preprocessor/getting-started-with-postcss-a-quick-guide-for-sass-users.html)
> - [Gulp编译、合并、压缩，以及Browsersync实时刷新教程](https://blog.csdn.net/beverley__/article/details/55213235)
> - [PostCSS及其常用插件介绍](http://www.css88.com/archives/7317)
