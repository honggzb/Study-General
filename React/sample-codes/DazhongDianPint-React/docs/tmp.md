[Gulp Study](#top)

- [1. Gulp](#Gulp)
- [2. Gulp API](#Gulp-api)
  - [2.1 Stream](#Stream)
  - [2.2 gulp五个方法](#gulp五个方法)
- [3 Installing](#Installing)
- [4. Gulp常用plugins](#Gulp-plugins)
  - [4.1 JSHint -js代码检查Code Quality](#JSHint)
  - [4.2 gulp-load-plugins -自动加载插件](#自动加载插件)
  - [4.3 gulp-rename -重命名插件](#重命名插件)
  - [4.4 压缩插件](#压缩插件)
    - 4.4.1 gulp-uglify -js文件压缩
    - 4.4.2 gulp-minify-css -css文件压缩
    - 4.4.3 gulp-minify-html -html文件压缩
    - [4.4.4 imagemin--压缩图片的工具(包括PNG、JPEG、GIF和SVG图片)](#imagemin)
  - [4.5 gulp-sourcemaps](#gulp-sourcemaps)
  - [4.6 gulp-concat -文件合并](#gulp-concat)
  - [4.7 PostCSS](#PostCSS)
    - [4.7.1 less和sass的编译](#less和sass的编译)
    - [4.7.2 gulp-autoprefixer自动处理各浏览器兼容css前缀](#gulp-autoprefixer)
  - [4.8 gulp与webpack,browserify](#gulp与webpack)
    - [4.8.1 gulp-webpack](#gulp-webpack)
    - [4.8.2 gulp-browserify](#gulp-browserify)
  - [4.9 gulp-usemin-优化](#gulp-usemin)
  - [4.10 gulp-inject](#gulp-inject)
- [5. 项目git案例](#项目git案例)

<h3 id="Gulp">1. Gulp</h3>

`读取文件 ->  代码检查 -> 合并 -> 压缩 -> 输出到目标`

![](https://i.imgur.com/QPfhNaD.png)

<h3 id="Gulp-api">2. Gulp API</h3>

gulp通过gulpfile.js文件来完成相关任务，因此项目根目录中必须包含gulpfile.js

[back to top](#top)

<h3 id="Stream">2.1 Stream</h3>

流(Stream)能够通过一系列的小函数来传递数据，这些函数会对数据进行修改，然后把修改后的数据传递给下一个函数。
看一个简单例子：

```javascript
	var gulp = require('gulp'), uglify = require('gulp-uglify');
	gulp.task('minify', function () {
   		gulp.src('js/app.js')
      		.pipe(uglify())
     	 	  .pipe(gulp.dest('build'))
	});
```

[back to top](#top)

<h3 id="gulp五个方法">2.2 gulp五个方法：src、dest、task、run、watch</h3>

- src和dest：指定源文件和处理后文件的路径
- watch：用来监听文件的变化
- task：指定任务
- run：执行任务

```javascript
//简单的gulpfile.js
	require('node_modules里对应模块')   //导入工具包
	var gulp = require('gulp'), //本地安装gulp所用到的地方
	    less = require('gulp-less');
	//定义一个testLess任务（自定义任务名称）
	gulp.task('testLess', function () {
	    gulp.src('src/less/index.less') //该任务针对的文件
	        .pipe(less()) //该任务调用的模块
	        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
	});
	gulp.task('default',['testLess', 'elseTask']); //定义默认任务
```

**gulp.src(globs[, options])**

- globs参数: 文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组
  - 使用数组的方式来匹配多种文件:  `gulp.src(['js/*.js','css/*.css','*.html'])`
  - `gulp.src([*.js,'!b*.js'])` :匹配所有js文件，但排除掉以b开头的js文件
  - `gulp.src(['!b*.js',*.js])` :不会排除任何文件，因为排除模式不能出现在数组的第一个元素中
- options为可选参数。通常情况下我们不需要用到

<table border="1">
  <tr align="center">
    <th>globs参数</th><th>说明</th>
  </tr>
  <tr align="center"><td>`*`</td> <td>匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾</td></tr>
  <tr align="center"><td>`**`</td> <td>匹配路径中的0个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件</td>
  <tr align="center"><td>`?`</td> <td>匹配文件路径中的一个字符(不会匹配路径分隔符)</td></tr>
  <tr align="center"><td>`[...]`</td> <td>匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则表达式中的用法</td></tr>
  <tr align="center"><td>`!(pattern|pattern|pattern)`</td> <td>匹配任何与括号中给定的任一模式都不匹配的</td></tr>
  <tr align="center"><td>`?(pattern|pattern|pattern)`</td> <td>匹配括号中给定的任一模式0次或1次，类似于js正则中的`(pattern|pattern|pattern)?`</td></tr>
  <tr align="center"><td>`+(pattern|pattern|pattern)`</td> <td>匹配括号中给定的任一模式至少1次，类似于js正则中的`(pattern|pattern|pattern)+`</td></tr>
  <tr align="center"><td>`*(pattern|pattern|pattern)`</td> <td>匹配括号中给定的任一模式0次或多次，类似于js正则中的`(pattern|pattern|pattern)*`</td></tr>
  <tr align="center"><td>`@(pattern|pattern|pattern)`</td> <td>匹配括号中给定的任一模式1次，类似于js正则中的`(pattern|pattern|pattern)`</td></tr>
</table>

```javascript
gulp.src(['client/*.js', '!client/b*.js', 'client/c.js'])    //!是排除某些文件
gulp.task('js',['jscs', 'jshint'],function(){
	return gulp
			    .src('./src/**/*.js', {base:'./src/'})        
			    .pipe(uglify())
			    .pipe(gulp.dest('./build/'));
});
```

> base 是指多少路径被保留，比如上面的 ./src/users/list.js 会被输出到 ./build/users/list.js

**gulp.dest(path[, options])**

将管道中的数据写入到文件夹:   `gulp.dest(path[, options])`

**`gulp.task(name[, deps], fn)`**

使用[orchestrator](https://github.com/robrich/orchestrator)定义任务。

- name：任务名称 
- deps：依赖任务名称 
- fn：回调函数

```javascript
gulp.task('one',function(){
  //one是一个异步执行的任务
  setTimeout(function(){
    console.log('one is done')
  },5000);
});
//two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
gulp.task('two',['one'],function(){
  console.log('two is done');
});
```

1. 如果任务相互之间没有依赖，任务会按你书写的顺序来执行，如果有依赖的话则会先执行依赖的任务。
2. 但是如果某个任务所依赖的任务是**异步**的，就要注意了，gulp并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务
3. 如果想等待异步任务中的异步操作完成后再执行后续的任务，有三种方法可以实现：
  - 在异步操作完成后执行一个回调函数来通知gulp这个异步任务已经完成,这个回调函数就是任务函数的第一个参数
  - 定义任务时返回一个流对象。适用于任务就是操作gulp.src获取到的流的情况
  - 返回一个promise对象

```javascript
//1) 在异步操作完成后执行一个回调函数来通知gulp这个异步任务已经完成,这个回调函数就是任务函数的第一个参数
gulp.task('one',function(cb){    //cb为任务函数提供的回调，用来通知任务已经完成
  //one是一个异步执行的任务
  setTimeout(function(){
    console.log('one is done');
    cb();  //执行回调，表示这个异步任务已经完成
  },5000);
});
//2) 定义任务时返回一个流对象
gulp.task('one',function(cb){
  var stream = gulp.src('client/**/*.js')
                   .pipe(dosomething())      //dosomething()中有某些异步操作
                   .pipe(gulp.dest('build'));
    return stream;
});
//3) 返回一个promise对象
var Q = require('q');         //一个著名的异步处理的库 https://github.com/kriskowal/q
gulp.task('one',function(cb){
  var deferred = Q.defer();
  // 做一些异步操作
  setTimeout(function() {
     deferred.resolve();
  }, 5000);
  return deferred.promise;
});
```

**gulp.watch(glob [, opts], tasks), gulp.watch(glob [, opts, cb])**

- 监控文件。当监控的文件有所改变时执行特定的任务, 例如文件压缩等
- cb参数为一个函数。每当监视的文件发生变化时，就会调用这个函数,并且会给它传入一个对象，该对象包含了文件变化的一些信息，type属性为变化的类型，可以是added,changed,deleted；path属性为发生变化的文件的路径

```javascript
	gulp.task('watch-js', function(){
	   gulp.watch('./src/**/*.js',['jshint','jscs']); 
	});
	gulp.task('watch-less', function(){
	 gulp.watch('./src/**/*.less',function(event){
	   console.log('less event'+ event.type +' ' + event.path)
     //type: 变化类型 added为新增, deleted为删除，changed为改变 
     //path: 变化的文件的路径
	 }); 
	});
```

[back to top](#top)

<h3 id="Installing">3 Installing</h3>

安装nodejs -> 全局安装gulp -> 项目安装gulp以及gulp插件 -> 配置gulpfile.js -> 运行任务

### 使用webstorm运行gulp任务

![](http://i.imgur.com/dYZiP68.png)

[back to top](#top)

<h3 id="Installing">4. Gulp常用plugins</h3>

通过[Gulp plugins](http://gulpjs.com/plugins/)，寻找对于的gulp组件

- gulp-load-plugins： 自动加载插件
- gulp-imagemin: 压缩图片
- gulp-ruby-sass: 支持sass
- gulp-minify-css: 压缩css
- gulp-jshint: 检查js
- gulp-uglify: 压缩js
- gulp-concat: 合并文件
- gulp-rename: 重命名文件
- gulp-htmlmin: 压缩html
- gulp-clean: 清空文件夹
- gulp-livereload: 服务器控制客户端同步刷新（需配合chrome插件LiveReload及tiny-lr）
- gulp-nodemon: 
- gulp-notify: 更动通知 

[back to top](#top)

<h3 id="JSHint">4.1 JSHint -js代码检查Code Quality</h3>

```javascript
var gulp = require('gulp'), jshint = require("gulp-jshint");
gulp.task('jsLint', function(){
		gulp.src('./lib/*.js')
			  .pipe(jshint())
				.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});
```

[back to top](#top)

<h3 id="自动加载插件">4.2 gulp-load-plugins -自动加载插件</h3>

gulp-load-plugins这个插件能自动加载package.json文件里的gulp插件

```javascript
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();  //加载gulp-load-plugins插件，并马上运行它
```

如要使用`gulp-rename`和`gulp-ruby-sass`这两个插件的时候，就可以使用`plugins.rename`和`plugins.rubySass`来代替了,也就是原始插件名去掉gulp-前缀，之后再转换为驼峰命名

[back to top](#top)

<h3 id="重命名插件">4.3 gulp-rename -重命名插件</h3>

gulp-load-plugins这个插件能自动加载package.json文件里的gulp插件

```javascript
var gulp = require('gulp'), rename = require('gulp-rename'), uglify = require("gulp-uglify");
 
gulp.task('rename', function () {
    gulp.src('js/jquery.js')
        .pipe(uglify())  //压缩
        .pipe(rename('jquery.min.js')) //会将jquery.js重命名为jquery.min.js
        .pipe(gulp.dest('js'));
});
```

[back to top](#top)

<h3 id="重命名插件">4.4 压缩插件</h3>

```javascript
var gulp = require('gulp'), uglify = require("gulp-uglify"), minifyCss = require("gulp-minify-css"),minifyHtml = require("gulp-minify-html");
gulp.task('minify-js', function () {
    gulp.src('js/*.js') // 要压缩的js文件
    .pipe(uglify())  //使用uglify进行压缩,更多配置请参考：
    .pipe(gulp.dest('dist/js')); //压缩后的路径
});
gulp.task('minify-css', function () {
    gulp.src('css/*.css') // 要压缩的css文件
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('dist/css'));
});
gulp.task('minify-html', function () {
    gulp.src('html/*.html') // 要压缩的html文件
        .pipe(minifyHtml()) //压缩
       .pipe(gulp.dest('dist/html'));
});
```

- `gulp.src(['src/js/index.js','src/js/detail.js']) //多个文件以数组形式传入`
- gulp-uglify其他参数 [具体参看](https://github.com/terinjokes/gulp-uglify#user-content-options)

```javascript
pipe(uglify({
    mangle: true,   //类型：Boolean 默认：true 是否修改变量名
    compress: true  //类型：Boolean 默认：true 是否完全压缩
}))
```

[back to top](#top)

<h4 id="imagemin">4.4.4 imagemin--压缩图片的工具(包括PNG、JPEG、GIF和SVG图片)</h4>

```javascript
gulp.task('default', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist'));
});
```

gulp-imagemin其他参数 [具体参看](https://github.com/sindresorhus/gulp-imagemin#user-content-options)

```javascript
	gulp.task('testImagemin', function () {
	    gulp.src('src/img/*.{png,jpg,gif,ico}')
	        .pipe(imagemin({
	            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
	            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
	            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
	            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	        }))
	        .pipe(gulp.dest('dist/img'));
	});
```

深度压缩图片

```javascript
	var gulp = require('gulp'),
	    imagemin = require('gulp-imagemin'),
	    //确保本地已安装imagemin-pngquant
	    pngquant = require('imagemin-pngquant');
	 
	gulp.task('testImagemin', function () {
	    gulp.src('src/img/*.{png,jpg,gif,ico}')
	        .pipe(imagemin({
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
	            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
	        }))
	        .pipe(gulp.dest('dist/img'));
	});
```

只压缩修改的图片。压缩图片时比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片，使用”gulp-cache”只压缩修改的图片，没有修改的图片直接从缓存文件读取（C:UsersAdministratorAppDataLocalTempgulp-cache）。

```javascript
	var gulp = require('gulp'),
	    imagemin = require('gulp-imagemin'),
	    pngquant = require('imagemin-pngquant'),
	    //确保本地已安装gulp-cache
	    cache = require('gulp-cache');
	    
	gulp.task('testImagemin', function () {
	    gulp.src('src/img/*.{png,jpg,gif,ico}')
	        .pipe(cache(imagemin({
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	        })))
	        .pipe(gulp.dest('dist/img'));
	});
```

[back to top](#top)

<h3 id="gulp-sourcemaps">4.5 gulp-sourcemaps</h3>

在现代javascript开发中， JavaScript脚本正变得越来越复杂。大部分源码（尤其是各种函数库和框架）都要经过转换，才能投入生产环境。 常见的转换情况：

- 压缩，减小体积。
- 多个文件合并，减少HTTP请求数。
- 其他语言编译成JavaScript。最常见的例子就是CoffeeScript。

这三种情况，都使得实际运行的代码不同于开发代码，除错（debug）变得困难重重。

Source map就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码

```javascript
	var gulp = require('gulp');
	var plugin1 = require('gulp-plugin1');
	var plugin2 = require('gulp-plugin2');
	var sourcemaps = require('gulp-sourcemaps');
	gulp.task('javascript', function() {
	  gulp.src('src/**/*.js')
	      .pipe(sourcemaps.init())
	      .pipe(plugin1())
	      .pipe(plugin2())
	      .pipe(sourcemaps.write())
	      .pipe(gulp.dest('dist'));
	});
```

[back to top](#top)

<h3 id="gulp-concat">4.6 gulp-concat -连接合并文件</h3>

使用gulp-concat合并javascript文件，减少网络请求

```javascript
	gulp.task('scripts', function() {
	  gulp.src('./lib/*.js')
	      .pipe(concat('all.js'))  //合并后的文件名
	      .pipe(gulp.dest('./dist/'))
	});
```

[back to top](#top)

<h3 id="JSCS-CSS">4.7 PostCSS</h3>

- PostCSS是使用JS插件来转换CSS的工具，支持变量，混入，未来CSS语法, 使用与Sass和Less这些预编译器相同的原则，PostCSS把扩展的语法和特性转换成现代的浏览器友好的CSS。使用Gulp工具，我们可以通过构建过程转换样式，就像Sass和Less的编译。如用SASS来写代码，需要自己做浏览器兼容, 而利用PostCSS，按照最简洁最惯用的写法就可以了
- PostCSS插件： Autoprefixer(处理浏览器私有前缀)，cssnext(使用CSS未来的语法),precss(像Sass的函数)
- https://github.com/postcss/gulp-postcss

<h4 id="less和sass的编译">4.7.1 less和sass的编译</h4>

```javascript
var gulp = require('gulp'), less = require("gulp-less");
gulp.task('compile-less', function () {
  gulp.src('less/*.less')
      .pipe(less())
      .pipe(gulp.dest('dist/css'));
});
```

[back to top](#top)

<h4 id="gulp-autoprefixer">4.7.2 gulp-autoprefixer自动处理各浏览器兼容css前缀</h4>

```javascript
var gulp = require('gulp'), autoprefixer = require('gulp-autoprefixer');
gulp.task('testAutoFx', function () {
    gulp.src('src/css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'));
});
//1) use source map
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
gulp.task('default', () =>
	gulp.src('src/**/*.css')
		  .pipe(sourcemaps.init())
		  .pipe(autoprefixer())
		  .pipe(concat('all.css'))
		  .pipe(sourcemaps.write('.'))
		  .pipe(gulp.dest('dist'))
);
//2) use PostCSS
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
gulp.task('css', function () {
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('./src/*.css')
               .pipe(postcss(plugins))
               .pipe(gulp.dest('./dest'));
});
```

- If you use other PostCSS based tools, like cssnano, you may want to run them together using gulp-postcss instead of gulp-autoprefixer. It will be faster, as the CSS is parsed only once for all PostCSS based tools, including Autoprefixer
- https://github.com/sindresorhus/gulp-autoprefixer
- [gulp-postcss中browsers参数详解](https://github.com/ai/browserslist#queries)

[back to top](#top)

<h3 id="gulp与webpack">4.8 gulp与webpack,browserify</h3>

<h4 id="gulp-webpack">4.8.1 gulp-webpack</h4>

```javascript
const webpack = require('gulp-webpack'),
gulp.task('scripts', function(callback) {
  return gulp.src('src/entry.js')
             .pipe(webpack( require('./webpack.config.js') ))
             .pipe(gulp.dest('dist/js'));
});
```

[back to top](#top)

<h4 id="gulp-browserify">4.8.2 gulp-browserify</h4>

browserify可以为浏览器编译node风格的遵循`commonjs`的模块。 它搜索文件中的`require()`调用， 递归的建立模块依赖图。
```javascript
	gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
	});
```

[back to top](#top)

<h3 id="gulp-usemin">4.9 gulp-usemin-优化</h3>

用来将HTML文件中（或者templates/views）中没有优化的script 和stylesheets 替换为优化过的版本。

usemin 暴露两个内置的任务，分别为：

- useminPrepare 为将指定文件中的 usemin block 转换为单独的一行（优化版本）准备配置。这通过为每个优化步骤生成名为 generated 的子任务来完成。
- usemin 使用优化版本替换 usemin 块，如果在磁盘上可以找到 revisioned 版本，则替换为 revisioned 版本。

usemin块如下定义：

```html
	<!-- build:css style.css -->
	<!-- endbuild -->
	<!-- build:js js/lib.js -->
	<!-- endbuild -->
	<!-- build:js1 js/app.js -->
	<!-- endbuild -->
	<!-- build:remove -->
	<!-- endbuild -->
```

gulp-usemin用法如下：

```javascript
	var usemin = require('gulp-usemin');
	var uglify = require('gulp-uglify');
	var minifyHtml = require('gulp-minify-html');
	var minifyCss = require('gulp-minify-css');
	var rev = require('gulp-rev');
	gulp.task('usemin', function() {
	  gulp.src('./*.html')
	    .pipe(usemin({
	      css: [minifyCss(), 'concat'],
	      html: [minifyHtml({empty: true})],
	      js: [uglify(), rev()]
	    }))
	    .pipe(gulp.dest('build/'));
	})
```

[back to top](#top)

<h3 id="gulp-inject">4.10 gulp-inject</h3>

可以注入css,javascript和web组件，不需手工更新index.html

index.html

```html
	<!DOCTYPE html>
	<html>
	<head>
	  <title>My index</title>
	  <!-- inject:css -->
	  <!-- endinject -->
	</head>
	<body>
	  <!-- inject:js -->
	  <!-- endinject -->
	</body>
	</html>
```

gulpfile.js

```javascript
	var gulp = require('gulp');
	var inject = require("gulp-inject");
	gulp.task('index', function () {
	  var target = gulp.src('./src/index.html');
	  // It's not necessary to read the files (will speed up things), we're only after their paths:
	  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
	  return target.pipe(inject(sources))
	    .pipe(gulp.dest('./src'));
	});
```

[back to top](#top)

<h3 id="项目git案例">5. 项目git案例</h3>

**项目git案例1**

配置好的项目已经放到github上。

- 下载地址：https://github.com/dbpoo/gulp
- git clone地址：git@github.com:dbpoo/gulp.git

**项目git案例2**

这个任务会让所有的文件匹配`js/*.js`（比如js目录下的所有JavaScript文件），并且执行JSHint，然后打印输出结果，取消文件缩进，最后把他们合并起来，保存为build/app.js

```javascript
	gulp.task('js', function () {
		return gulp.src('js/*.js')
		      .pipe(jshint())
		      .pipe(jshint.reporter('default'))
		      .pipe(uglify())
		      .pipe(concat('app.js'))
		      .pipe(gulp.dest('build'));
	});
```

> References

- [Gulp 中文网](http://www.gulpjs.com.cn/)
- [Recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes#recipes)
- [cheatsheet](https://github.com/osscafe/gulp-cheatsheet)
- [9个优秀的gulp插件](http://blog.nodejitsu.com/npmawesome-9-gulp-plugins/)
- [gulp插件开发指导](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md)
- [前端构建工具gulpjs的使用介绍及技巧](http://www.cnblogs.com/2050/p/4198792.html)
- [使用 PostCSS 进行 CSS 处理](#https://www.ibm.com/developerworks/cn/web/1604-postcss-css/)
- [gulp教程之gulp-less](http://www.ydcss.com/archives/34)
- [gulp教程之gulp-uglify](http://www.ydcss.com/archives/54)
- [gulp教程之gulp-concat](http://www.ydcss.com/archives/83)
- [gulp教程之gulp-jshint](http://www.ydcss.com/archives/92)
- [gulp教程之gulp-htmlmin](http://www.ydcss.com/archives/20)
- [gulp教程之gulp-imagemin](http://www.ydcss.com/archives/26)
- [gulp教程之gulp-minify-css](http://www.ydcss.com/archives/41)
- [gulp教程之gulp-rev-append](http://www.ydcss.com/archives/49)
- [gulp教程之gulp-autoprefixer](http://www.ydcss.com/archives/94)
- [Combine Webpack with Gulp 4-css-tricks](https://css-tricks.com/combine-webpack-gulp-4/)


- [移动端拖拽（模块化开发，触摸事件，webpack）](http://www.cnblogs.com/QxQstar/p/6008376.html)
