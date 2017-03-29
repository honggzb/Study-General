[Gulp Study](#top)

- [1. Gulp](#Gulp)
- [2. Gulp API](#Gulp-api)
  - [2.1 Stream](#Stream)
  - [2.2 gulp五个方法](#gulp五个方法)
- [3 Installing](#Installing)
- [4. Gulp plugins](#Gulp-plugins)
  - [4.1 JSHint - Code Quality](#JSHint)
  - [4.2 JSCS-CSS Style](#JSCS-CSS)
  - [4.3 gulp-browserify](#gulp-browserify)
  - [4.4 imagemin--压缩图片的工具(包括PNG、JPEG、GIF和SVG图片)](#imagemin)
  - [4.6 gulp-usemin](#gulp-usemin)
  - [4.7 gulp-uglify](#gulp-uglify)
  - [4.8 gulp-sourcemaps](#gulp-sourcemaps
  - [4.9 gulp-inject](#gulp-inject)
  - [4.10 gulp-concat -连接合并文件](#gulp-concat)
- [5. 项目git案例](#项目git案例)

<h3 id="Gulp">1. Gulp</h3>

Grunt bulid flow

![Grunt bulid flow](http://i.imgur.com/FDslcyq.png)
![Gulp build flow](http://i.imgur.com/V1DzqTk.png)

<h3 id="Gulp-api">2. Gulp API</h3>

gulp通过gulpfile.js文件来完成相关任务，因此项目根目录中必须包含gulpfile.js

[back to top](#top)

<h4 id="Stream">2.1 Stream</h4>

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

<h4 id="gulp五个方法">2.2 gulp五个方法：src、dest、task、run、watch</h4>

- src和dest：指定源文件和处理后文件的路径
- watch：用来监听文件的变化
- task：指定任务
- run：执行任务

简单的gulpfile.js
```javascript
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

- 根据globs提供的文件列表， 得到一个Vinyl文件的stream, 可以按照管道模式给其它插件处理。
- 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
```javascript
		gulp.src(['client/*.js', '!client/b*.js', 'client/c.js'])   
		# !是排除某些文件
			
		gulp.task('js',['jscs', 'jshint'],function(){
			 return gulp
			    .src('./src/**/*.js', {base:'./src/'})        
			    .pipe(uglify())
			    .pipe(gulp.dest('./build/'));
			             
		});
```
	> base 是指多少路径被保留，比如上面的 ./src/users/list.js 会被输出到 ./build/users/list.js

**gulp.dest(path[, options])**

将管道中的数据写入到文件夹

	gulp.dest(path[, options]) 处理完后文件生成路径

**gulp.task(name[, deps], fn)**

使用[orchestrator](https://github.com/robrich/orchestrator)定义任务。

	gulp.task(name[, deps], fn) 
	//定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数

**gulp.watch(glob [, opts], tasks), gulp.watch(glob [, opts, cb])**

监控文件。当监控的文件有所改变时执行特定的任务。
```javascript
	gulp.task('watch-js', function(){
	   gulp.watch('./src/**/*.js',['jshint','jscs']); 
	});
	
	gulp.task('watch-less', function(){
	 gulp.watch('./src/**/*.less',function(event){
	   console.log('less event'+event.type+' '+event.path)
	 }); 
	});
```

[back to top](#top)

<h3 id="Installing">3 Installing</h3>

安装nodejs -> 全局安装gulp -> 项目安装gulp以及gulp插件 -> 配置gulpfile.js -> 运行任务

###使用webstorm运行gulp任务

![](http://i.imgur.com/dYZiP68.png)

---

[back to top](#top)

<h3 id="Installing">4. Gulp plugins</h3>

通过[Gulp plugins](http://gulpjs.com/plugins/)，寻找对于的gulp组件

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

<h4 id="JSHint">4.1 JSHint - Code Quality</h4>

- Detects potential errors
- 是一个侦测javascript代码中错误和潜在问题的工具
```javascript
		gulp.task('lint', function() {
			return gulp.src('./lib/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter('YOUR_REPORTER_HERE'));
		});
// glup-sass --将sass语法的css处理成css格式
	gulp.task('sass', function () {
    	gulp.src('./scss/*.scss')
        	.pipe(sass())
        	.pipe(gulp.dest('./css'));
	});
```

[back to top](#top)

<h4 id="JSCS-CSS">4.2 JSCS-CSS Style</h4>

- Enforces coding conventions
- Easily Configurable

[back to top](#top)

<h4 id="gulp-browserify">4.3 gulp-browserify</h4>

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

<h4 id="imagemin">4.4 imagemin--压缩图片的工具(包括PNG、JPEG、GIF和SVG图片)</h4>

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

```
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

<h4 id="gulp-usemin">4.6 gulp-usemin</h4>

用来将HTML 文件中（或者templates/views）中没有优化的script 和stylesheets 替换为优化过的版本。

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

<h4 id="gulp-uglify">4.7 gulp-uglify</h4>

uglify是一款javascript代码优化工具，可以解析，压缩和美化javascript

```javascript
	gulp.task('compress', function() {
	  gulp.src('lib/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('dist'))
	});
```

- gulp.src(['src/js/index.js','src/js/detail.js']) //多个文件以数组形式传入
- 匹配符“!”，“*”，“**”，“{}”

```
		//压缩src/js目录下的所有js文件
		//除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
		//! 
		gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js'])
```

- gulp-uglify其他参数 [具体参看](https://github.com/terinjokes/gulp-uglify#user-content-options)

```
		pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true//类型：Boolean 默认：true 是否完全压缩
        }))
```

[back to top](#top)

<h4 id="gulp-sourcemaps">4.8 gulp-sourcemaps</h4>

在现代javascript开发中， JavaScript脚本正变得越来越复杂。大部分源码（尤其是各种函数库和框架）都要经过转换，才能投入生产环境。
常见的转换情况：

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

<h4 id="gulp-inject">4.9 gulp-inject</h4>

可以注入css,javascript和web组件，不需手工更新ndex.html

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

<h4 id="gulp-concat">4.10 gulp-concat -连接合并文件</h4>

使用gulp-concat合并javascript文件，减少网络请求

```javascript
	gulp.task('scripts', function() {
	  gulp.src('./lib/*.js')
	    .pipe(concat('all.js'))  //合并后的文件名
	    .pipe(gulp.dest('./dist/'))
	});
```

[back to top](#top)

<h3 id="项目git案例">5. 项目git案例</h3>

**项目git案例1**

配置好的项目已经放到github上。

- 下载地址：https://github.com/dbpoo/gulp
- git clone地址：git@github.com:dbpoo/gulp.git

**项目git案例2**

这个任务会让所有的文件匹配js/*.js（比如js目录下的所有JavaScript文件），并且执行JSHint，然后打印输出结果，取消文件缩进，最后把他们合并起来，保存为build/app.js
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
- [gulp教程之gulp-less](http://www.ydcss.com/archives/34)
- [gulp教程之gulp-uglify](http://www.ydcss.com/archives/54)
- [gulp教程之gulp-concat](http://www.ydcss.com/archives/83)
- [gulp教程之gulp-jshint](http://www.ydcss.com/archives/92)
- [gulp教程之gulp-htmlmin](http://www.ydcss.com/archives/20)
- [gulp教程之gulp-imagemin](http://www.ydcss.com/archives/26)
- [gulp教程之gulp-minify-css](http://www.ydcss.com/archives/41)
- [gulp教程之gulp-rev-append](http://www.ydcss.com/archives/49)
- [gulp教程之gulp-autoprefixer](http://www.ydcss.com/archives/94)
