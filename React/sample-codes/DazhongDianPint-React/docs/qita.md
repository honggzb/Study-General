[《React.js 小书》](http://huziketang.com/books/react/)


4、webpack和gulp的区别

- gulp是基于流的构建工具：all in one的打包模式，输出一个js文件和一个css文件，优点是减少http请求，万金油方案
- webpack是模块化管理工具，使用webpack可以对模块进行压缩、预处理、打包、按需加载等

6、java做后端，前端使用gulp搭建，怎么部署呢？

- maven有个叫frontend.maven.plugin的插件可以完成node和bower install，npm install，npm run等命令，可以在package同时打包前台代码，最终和后端java一起打成一个war包。
- 另外再补充一点，如不用maven插件打成一个war的话（前后端工程解耦），也可以设2个有关联关系的jenkins project先后打包部署前端和后端
- 
五、webpack+gulp构建

- [gulp+webpack构建配置](http://www.cnblogs.com/maskmtj/archive/2016/07/21/5597307.html)
项目源码：https://github.com/jokermask/gulp_webpack_demo
- https://github.com/bjtqti/font-end-boilerplate
  - 实现热替换
  - 自动补全css私有前缀
  - es6语法转换
- [Webpack+Gulp+React+ES6开发](http://www.cnblogs.com/xbcq/p/5422753.html)
- https://github.com/liady/react-webpack-gulp-starter


