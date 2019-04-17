## 使用Node-API

```javascript
//webpack-node.js
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.html.js');
const cowsay = require('cowsay');
const compiler = webpack(webpackConfig);
//compiler.run启动了webpack的构建功能，run方法的回调函数中如果有运行错误，可以通过err来获取，与构建过程有关的信息都挂载在stats对象（例如stats。toJson().assets)。实现了以非命令行的方式启动webpack
compiler.run((err, stats)=>{
   if (!err) {
        console.log(stats.toJson().assets);
        console.log(cowsay.say({text:'Congratulations!'}));
   }
});
```

[back to top](#top)

## 使用gulp

```javascript
//gulpfile.js
var gulp = require('gulp');
var webpack = require('webpack-stream');
gulp.task('default',function(){
    return gulp.src('src/entry.js')
        .pipe(webpack({
        //...configs
    })).pipe(gulp.dest('dist/'));
})
```

[back to top](#top)
