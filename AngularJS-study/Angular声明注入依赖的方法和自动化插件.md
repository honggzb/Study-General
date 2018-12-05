[Angular声明注入依赖的方法和自动化插件](#top)

- [Angular中声明注入依赖的方法有三种](#angular%E4%B8%AD%E5%A3%B0%E6%98%8E%E6%B3%A8%E5%85%A5%E4%BE%9D%E8%B5%96%E7%9A%84%E6%96%B9%E6%B3%95%E6%9C%89%E4%B8%89%E7%A7%8D)
- [注入依赖自动化插件](#%E6%B3%A8%E5%85%A5%E4%BE%9D%E8%B5%96%E8%87%AA%E5%8A%A8%E5%8C%96%E6%8F%92%E4%BB%B6)
- [grunt-ng-annotate](#grunt-ng-annotate)
    - [Options选项](#options%E9%80%89%E9%A1%B9)
    - [Usage Examples](#usage-examples)
- [gulp-ng-annotate](#gulp-ng-annotate)

## Angular中声明注入依赖的方法有三种

- 数组注解
- $inject属性
- 隐式注释: 隐式注释虽然简单，但是在压缩代码的时候会出错，所以一般还是需要选用方法一或者方法二

```javascript
/* 数组注解 */
module.controller('controller', ['$scope', 'greeter', function($scope, greeter) {
  // ...
}]);
/* $inject属性 */
var controller = function($scope, greeter) {
  // ...
}
controller .$inject = ['$scope', 'greeter'];
module.controller('controller ', controller );
```

[back to top](#top)

## 注入依赖自动化插件

- minification safe
- 安装插件以后只需要加一个`@ngInject`就行了

```javascript
angular.module('app')
       .controller('Avengers', Avengers);
/* @ngInject */
function Avengers(storageService, avengerService) {
    var vm = this;
    vm.heroSearch = '';
    vm.storeHero = storeHero;
    function storeHero() {
        var hero = avengerService.find(vm.heroSearch);
        storageService.save(hero.name, hero);
    }
}
```

**using `@ngInject` in route resolver**

```javascript
function config($routeProvider) {
    $routeProvider
        .when('/avengers', {
            templateUrl: 'avengers.html',
            controller: 'Avengers',
            controllerAs: 'vm',
            resolve: { /* @ngInject */
                moviesPrepService: function(movieService) {
                    return movieService.getMovies();
                }
            }
        });
}
```

[back to top](#top)

## grunt-ng-annotate

- `npm i grunt-ng-annotate --save-dev`
- git地址: https://github.com/mzgol/grunt-ng-annotate

### Options选项

选项|功能|用法|说明
---|---|---|---
add 添加|告诉如果ngAnnotate应该添加注解|Type: boolean<br>Default: true|
remove|如果ngAnnotate应该删除注解，告诉之|Type: boolean<br>Default: false|注意,“add”和“remove”选项可以设置为true;在这种情况下“ngAnnotate”第一次删除<br>
注释,然后重新加载它们(它可以用来检查如果能够正确地提供注释)
regexp|如果提供,只解释为正则表达式字符串匹配的模块名称。可提供一个正则表达式和一个字符串表示|Type: regexp<br>Default: none|
singleQuotes|转换注解的引用类型字符串数组转换为单引号, 如'$scope'而不是"$scope"|Type: boolean<br>Default: false|
separator|将加入这个字符串连接文件|Type: string<br>Default: grunt.util.linefeed|如果后期处理连接用缩小版的JavaScript文件,<br>可需要使用分号“;”作为分隔符
sourceMap|允许源码映射生成Type: boolean or string<br>Default: false|如果设置为一个字符串,字符串指向一个文件,保存源映射。<br>如果设置为“true”,将使用内联源映射
ngAnnotateOptions|如果ngAnnotate支持不直接支持通过一个新选项这Grunt的任务,可通过这里。<br>这些选项被合并到特定于ngAnnotate上面。<br>这里选择通过优先级较低的直接上面描述的|Type: object<br>Default: {}|

### Usage Examples

```javascript
grunt.initConfig({
    ngAnnotate: {
        options: {
            singleQuotes: true,
        },
        app1: {
            files: {
                'a.js': ['a.js'],    //a.js annotated and saved under the same name
                'c.js': ['b.js'],    //b.js annotated and saved as c.js
                'f.js': ['d.js', 'e.js'],   //d.js and e.js concatenated, annotated and saved as f.js
            },
        },
        app2: {
            files: [
                {
                    expand: true,
                    src: ['f.js'],
                    ext: '.annotated.js', // Dest filepaths will have this extension.
                    extDot: 'last',       // Extensions in filenames begin after the last dot
                },
            ],
        },
        app3: {
            files: [
                {
                    expand: true,
                    src: ['g.js'],
                    rename: function (dest, src) { return src + '-annotated'; },
                },
            ],
        },
    },
});
grunt.loadNpmTasks('grunt-ng-annotate');
```

[back to top](#top)

## gulp-ng-annotate

```javascript
gulp.task('js', ['jshint'], function() {
    var source = pkg.paths.js;
    return gulp.src(source)
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js', {newLine: ';'}))
        // Annotate before uglify so the code get's min'd properly
        .pipe(ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true
        }))
        .pipe(bytediff.start())
        .pipe(uglify({mangle: true}))
        .pipe(bytediff.stop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(pkg.paths.dev));
});
```

> Reference
- [AngularJs Minification and Annotation](http://bguiz.github.io/js-standards/angularjs/minification-and-annotation/)
