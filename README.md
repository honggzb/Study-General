# Study-General

[front-end-handbook-2017](https://www.gitbook.com/book/frontendmasters/front-end-handbook-2017/details)

Framework| Benifits| Drawbacks
---------|----------|---------
Angular 5|<ol><li>New features like enhanced RXJS, faster compilation (in under 3 seconds), new HttpClient launch.</li><li>Detailed documentation that allows getting all necessary information for the individual developer without asking his colleagues. However, this requires more time for education.</li><li>Two-way data binding that enables singular behavior for the app which minimized risks of possible errors.</li><li>MVVM (Model-View-ViewModel) that allows developers to work separately on the same app section using the same set of data.</li><li>Dependency injection of the features related to the components with modules and modularity in general.</li></ol>|<ol><li>The complex syntax that comes from the first version of Angular. Nevertheless, Angular 5 uses TypeScript 2.4 which is the least difficult to learn in comparison.</li><li>Migration issues which can appear while moving from the older version to the latest ones.</li></ol>
React |<ol><li>Easy to learn. React is much easier to learn because of its simplicity in terms of syntax</li><li>High level of flexibility and maximum of responsiveness.</li><li>Virtual DOM (document object model) that allows arranging documents in HTML, XHTML, or XML formats into a tree from which is better acceptable by web browsers while parsing different elements of the web app</li><li>Downward data binding which means that with this kind of data flow the child elements cannot affect parent data.</li><li>Absolutely light-weighted because the data performing on the user side can be easily represented on the server side simultaneously.</li><li>Migrating between versions is generally very easy</li></ol>|<ol><li>Lack of official documentation</li><li>React is unopinionated — meaning that developers sometimes have too much choice;</li><li>Long time to master which means that React JS requires deep knowledge of how to integrate user interface into MVC framework</li></ol>
Vue| <ol><li>Empowered HTML. This means that Vue.js has many similar characteristics with Angular and this can help to optimize HTML blocks handling with a usage of different components</li><li>Detailed documentation</li><li>Adaptability. It provides a rapid switching period from other frameworks to Vue.js because of the similarity with Angular and React in terms of design and architecture</li><li>Awesome integration. Vue.js can be used for both building single-page applications and more difficult web interfaces of apps. The main thing is that smaller interactive parts can be easily integrated into the existing infrastructure with no negative effect on the entire system.</li><li>Large scaling. Vue.js can help to develop pretty large reusable templates that can be made with no extra time allocated for that according to its simple structure.</li><li>Tiny size. Vue.js can weight around 20KB keeping its speed and flexibility that allows reaching much better performance in comparison to other frameworks</li></ol>|<ol><li>Lack of resources</li><li>Risk of over flexibility. Sometimes, Vue.js might have issues while integrating into huge projects and there is still no experience with possible solutions, but they will definitely come soon</li><li>Lack of full english documation</li></ol>

```
├── Accessiblity
│   ├── Accessibility应用之focus篇.md
│   ├── 创建无障碍的对话框.md
│   ├── 响应式设计(responsive design)中的Assesibility.md
│   └── resources.md
│
├── Angular-Study
│   ├── Sample
│   │   ├── 案例之星级评价.md
│   │   └── 
│   ├── Mockup-server
│   │   ├── node+express创建服务器.md
│   │   └── Node+http_server创建服务器.md
│   │
│   ├── Angular 2,4 + google map      #Google map在angular>2中的应用
│   ├── Angular_CLI的使用.md           #useful
│   ├── Angular学习笔记之lazy loading-使用angular-cli.md     #useful
│   ├── Angular学习笔记之集成三方UI框架.md
│   ├── Angular打造股票管理网站.md      #useful
│   ├── Angular学习笔记之依赖注入.md
│   ├── Angular系列之变化检测.md
│   ├── Angular之Pipe.md
│   ├── Angular中Error汇总.md
│   ├── mocking-backend -API.md
│   ├── 
│   └── 
│ 
├── CSS+CSS3-Skill - css技巧
│   ├──  CSS-Pure
│   │     ├── 7个CSS单位.md
│   │     ├── CSS选择器中的正则表达式.md
│   │     ├── 自动聚焦输入框纯CSS实现SimulateInputFocus.md - focus输入框的时候，外面容器的灰色边框要高亮(不使用JavaScript,纯CSS实现)
│   │     ├── 中文或英文两端对齐.md
│   │     ├── 纯CSS实现垂直居中总结.md
│   │     ├── CSS3利用伪元素与伪类自定义滚动条样式.md
│   │     └── 常用css技巧
│   ├──  CSS3-New-Feature新功能
│   │     ├── CSS变量.md
│   │     ├── CSS3超高校级好用CSS变量-currentColor.md
│   │     ├── CSS3-Column分栏.md
│   │     ├── CSS3-Flex布局.md
│   │     ├── CSS3-Flex布局.docx
│   │     ├── CSS3-will-change的使用(提高页面滚动、动画等渲染性能).md
│   │     │   ├── 移动鼠标改变图片的旋转角度值.html
│   │     │   └── mustache.html
│   │     ├── 实现CSS3 3D全景.md
│   │     │   └── 全景.rar(CSS3 3D全景案例源码)
│   │     ├── CSS3-flex布局.docx
│   │     ├── grid-layout布局.md
│   │     ├── grid-layout.html
│   │     └── 你可能不知道的5个CSS属性.md
│   ├──  CSS-Grid 新布局
│   │     ├── CSS-Grid-layout.md
│   │     └──grid-layout***.html
│   ├──  Theory
│   │     ├── reflow-repaint.md
│   │     └──    
│   ├── BootstrapCarouselWithAnimation.html               #使用bootstrap和animation.css制作带动画的幻灯片
│   ├── CSS属性选择器驱动的过滤搜索技术(autocomplete).md
│   ├── js控制css伪元素内容（before，after）.md
│   ├── responsiveTable.md
│   ├── 中文或英文两端对齐.md
│   ├── 值得参考的 10 个 LESS CSS 实例.md
│   ├── 常用css代码.md
│   ├── css强制换行,超出隐藏和超出显示省略号.md
│   ├── css3技巧收集.md
│   ├── css-Hacks-For-IE.md
│   └── 现代CSS代码的建议.md
│
├── Configuration Study - Build tools 
│   ├──  Webpack
│   │    ├── samples
│   │    │   ├── webpack-multiple-bundles.rar
│   │    │   ├── webpack-production.rar
│   │    │   ├── webpack-seperate-css.rar
│   │    │   └── webpack-demos-master.rar
│   │    ├── webPack 2 Study.md
│   │    ├── webpack问题汇总.md
│   │    ├── webpack 2学习笔记-Code Splitting案例分析
│   │    └── webpack 3学习笔记-官方网站.md
│   ├──  Gulp
│   │    └── GulpStudy.md
│   └──  Grunt
│   │    ├── grunt.initConfig说明.md
│   │    └── gruntStudy.md
│   └──  Ant
│        └── ant学习.md
│
├── D3
│   ├── 00.prepare	Add files
│   │   └── mockServer代码和说明
│   ├── 2. basic-axis-scale
│   │   ├── d3-2.中文坐标轴.html
│   │   ├── d3-2.带网格的坐标轴1.html
│   │   ├── d3-2.带网格的坐标轴2.html
│   │   ├── d3-2.散点图.html
│   │   ├── d3-2.散点图之使用坐标轴.html
│   │   └── 
│   ├── 3.barGraph
│   │   ├── d3-1.条形图.html	Rename D3/barGraph/d3-1.条形图.html
│   │   ├── d3-3.dragEvents.html
│   │   ├── d3-3.events.html
│   │   ├── d3-3.柱状图1水平柱状图.html
│   │   ├── d3-3.柱状图2垂直柱状图.htm
│   │   ├── d3-3.柱状图2垂直柱状图1.html
│   │   ├── d3-3.柱状图3动画过渡.html
│   │   ├── d3-3.柱状图4Wrapping Long Labels.html
│   │   ├── d3-3.柱状图4sortable.html
│   │   ├── d3-3.柱状图4使用字母刻度.html
│   │   └── 
│   ├── 4.line-areaGraph
│   │   ├── 		
│   │   ├── d3-4.线性图表-curve interpolation comparison.html	Update d3-4.线性图表-curve interpolation comparison.html
│   │   ├── d3-4.线性图表.html
│   │   ├── d3-4.线性图表2-Segmented Lines.html
│   │   ├── d3-4.线性图表2-Thershold Lines.html
│   │   ├── d3-4.线性图表2-折线+图表.html	Create d3-4.线性图表2-折线+图表.html
│   │   ├── d3-4.线性图表2-时间轴.html	Add files
│   │   ├── d3-4.线性图表3-多行折线+线内标注.html
│   │   ├── d3-4.线性图表3-多行折线.htm
│   │   ├── d3-4.线性图表3-多行折线1-circle+tooltip.html	Update d3-4.线性图表3-多行折线1-circle+tooltip.htm
│   │   ├── d3-4.面积图表.html
│   │   ├── d3-4.面积图表之二元面积图.html
│   │   ├── d3-4.饼图圆环图1.html
│   │   ├── d3-4.饼图圆环图2.html
│   │   └── 
│   ├── 5.others
│   │   ├── d3-5.Stack.html
│   │   ├── d3-5.Tree+可收缩思维导图.html
│   │   ├── d3-5.Tree-collasible.html
│   │   ├── d3-5.Tree-horizontal-collasible-rect-node.html	Create d3-5.Tree-horizontal-collasible-rect-node.html
│   │   ├── d3-5.Tree-use-flat-data.html	Rename d3-5.Tree-use-fla-data.html to d3-5.Tree-use-flat-data.html
│   │   ├── d3-5.Tree-vertical tree.html	Create d3-5.Tree-vertical tree.html
│   │   ├── d3-5.Tree-with-different-nodes.html	Create d3-5.Tree-with-different-nodes.html
│   │   ├── d3-5.chord.html	Update d3-5.chord.html
│   │   ├── d3-5.horizontal stack bar chart.html
│   │   ├── d3-5.horizontal stack bar chart.html	
│   │   ├── d3-5.力矩散点图+图例.html
│   │   ├── d3-5.散点图+toggleButton.html
│   │   ├── d3-航线数据可视化.html
│   │   └── 
│   ├── 6.animation
│   │   ├── Transition Easing Comparison in v4.html	Create Transition Easing Comparison in v4.html
│   │   ├── d3-6.动画之条形图排序+删除增加bar-function.html	Update d3-6.动画之条形图排序+删除增加bar-function.html
│   │   ├── d3-6.动画之条形图排序+删除增加bar.html	Create d3-6.动画之条形图排序+删除增加bar.html
│   │   ├── d3-6.动画之条形图排序切换.html
│   │   └── 
│   ├── 7.D3-angular-2
│   │   ├── readme.md
│   │   └── 代码
│   ├── book
│   │   ├── 2017-VegaLite-InfoVis(斯坦福的数据可视化论文).pdf
│   │   ├── D3.js tips and tricks-v4.pdf
│   │   ├── D3.js+By+Example[ww.java1234.com].pdf
│   │   ├── D3.js_in_action.pdf	Add files
│   │   ├── Practical_D3.js-Apress_2016(Tarek_Amr_Rayna_Stamboliyska).pdf
│   │   ├── react+d3js[www.java1234.com].pdf
│   │   ├── readme.md	Create readme.md
│   │   ├── 《D3.js数据可视化实战手册 》迷你书.pdf
│   │   ├── 数据可视化实战(使用D3设计交互式图表).pdf
│   │   ├── 数据可视化实战-d3db.pdf
│   │   └── 
│   ├── readme.md
│   ├── todo-list.md
│   └── file-list.md
│
├── Database学习
│   ├──MySql的安装和设置.md
│   ├──Redis安装、配置和使用.md
│   ├──MongoDB的使用.md
│   └──
│
├── Debug-Skill调试技巧
│   ├── Chrome DevTools基础技巧.md
│   ├── Chrome中设置可以CROS.md
│   ├── Remote-Debugging-IOS.md
│   ├── Chrome DevTools技巧.md
│   ├── chrome developer tool调试技巧.md
│   ├── 性能调试之RAIL模式.md
│   ├── 性能调试之memory分析.md
│   └── 
│
├── Design Pattern
│   ├── 依赖注入模式.md
│   ├── 
│   └── 
│
├── Git Study
│   ├── gitCommand.md
│   ├──
│   └──
│
├── HTML5
│   ├── getUserMedia-使用HTML5技术控制电脑或手机上的摄像头.md
│   ├── Web Worker- JS多线程编程.md
│   │   ├── Web Worker- JS多线程编程源码
│   │   └── web-workers-demo-master.zip
│   ├── 让web app更快的HTML5最佳实践.md
│   ├── 应用缓存App Cache指南.md
│   ├── IntersectionObserver API: defer, lazy-load.md
│   └── Service Workers- HTML5 Web push notifications桌面通知.md
│
├── Hybrid Web
│   ├──HTML5 Input Types in Mobile.docx
│   ├──HTML5-各种Tag.md
│   ├──Media Queries for Standard Devices.md
│   ├──onscroll问题.md                                #onscroll event did not work on Hybrid Web App
│   ├──判断客户端是否是iOS或者Android手机移动端.md
│   ├──常见的移动端Web页面问题解决方案.md
│   ├──移动web平时开发问题小结.md
│   ├──移动web开发tip.md
│   ├──移动web资源整理.md
│   ├──iso虚拟键盘遮挡input输入框问题&fixed+input布局bug.md
│   ├──常见的移动端Web页面问题解决方案.md
│   ├──移动端Web开发调试之Weinre调试.md
│   ├──移动端触屏框架iscroll.js的使用.md
│   ├──移动端触屏框架的使用Hammer.md
│   ├──获取viewport高度when soft keyboard is on.md
│   ├──虚拟键盘遮挡input输入框问题&fixed+input布局bug.md
│   └── 远程调试工具.md
│ 
├── IDE
│   ├── Atom
│   │   ├── 
│   │   └──
│   ├── Eclipse
│   │   ├── 
│   │   └──
│   └── VSCode
│       ├── 
│       └──
│ 
├── JAVA-Study
│   ├── configuration-study
│   │   ├── ant学习.md
│   │   └──
│   ├── spring root+angular.md
│   └──
```

[Javascript](https://github.com/honggzb/Study-General/blob/master/Javascript/readme.md)   --javascript学习过程中的小tip

```
├── Javascript
│   ├── GoogleMapAPI
│   │   ├── 谷歌地图地理编码.md
│   │   └──
│   │ 
│   ├── javascript+css
│   │   ├── javascript关于页面坐标api.md
│   │   └──
│   │ 
│   ├── javascriptDesignPattern
│   │   ├── jsDesignPattern1.md
│   │   └──
│   │ 
│   ├── TableToExcel                  #将table tag转换为excel输出
│   │   ├── Javascript操作excel.md
│   │   ├── TableToCsv-jquery.html    #jquery
│   │   └── tableToExcel.html         #javascript
│   │ 
│   ├── javascript+PDF                 #javascript的PDF相关
│   │   ├── Javascript将html转成pdf并下载分页.md
│   │   ├── 
│   │   └── 
│   │
│   ├── tips                  #常见的技巧
│   │   ├── 19 个JavaScript 常用的简写技术.md
│   │   ├── javascript常用技巧.md
│   │   ├── javascript知识点积累汇总.md
│   │   ├── js和jq中常用追加元素方法+append()和appendChild区别.md
│   │   ├── 利用ES6新特性对数组实现的一些hack方法.md
│   │   └── 
│   │ 
│   ├── JavaScript专题之Call,apply,bind详解.md
│   ├── JavaScript专题之Lazy Loading Images and Video
│   ├── JavaScript专题之数组中删除某一项或几项.md
│   ├── JavaScript专题之判断数组中是否包含指定元素.md
│   ├── JavaScript专题之判断浏览器种类及版本+http协议.md
│   ├── JavaScript专题之前端复制功能总结-sample.html
│   ├── JavaScript专题之前端复制功能总结.md
│   ├── JavaScript专题之去掉数组中的重复项.md
│   ├── JavaScript专题之复制数组.md
│   ├── JavaScript专题之如何判断两个对象相等.md
│   ├── JavaScript专题之字符串的操作.md
│   ├── JavaScript专题之排序1-sort解析.md
│   ├── JavaScript专题之排序2-排序算法详解.md
│   ├── JavaScript专题之数据类型判断.md
│   ├── JavaScript专题之文件上传下载.md
│   ├── JavaScript中对象的深拷贝.md
│   ├── Javascript中bind()方法的使用与实现.md
│   ├── Javascript中forEach, reduce详解.md
│   ├── Javascript中的setTimeout和setInterval的一些注意事项.md
│   ├── XHR2-XMLHttpRequest Level 2.md               #新XHR2学习
│   ├── avoid-loop-by-using-userdefined.md      #自定义的reduce, filter, find功能，可以避免写很多的loop
│   ├── copy+cut+paste_event.md 
│   ├── javascript实现英文首字母大写
│   ├── javascript操作JSON常用方法
│   ├── 经典代码.md
│   ├── 深入理解javascript原型和闭包.md
│   ├── js标准对象之Date.md
│   └──  
│
├── JQuery
│   ├── Jquery判断checked 是否选中.md
│   ├── jQuery中的text()、html()和val()以及innerText、innerHTML和value.md
│   ├── jquery判断一个元素下面是否有内容或者有某个标签.md
│   └── jquery选择器总结.md
│
├── Miscellaneous杂项
│   ├── convert-octet-stream-to-image.md     - http的octex-stream类型（binary file)处理，转换为<img src="" />
│   ├── lodash学习笔记.md
│   └── 
│
├── NodeJS 学习
│   ├── 设置
│   │    ├──  nodeModule汇总.md
│   │    └──  npm常用命令.md
│   ├── 调试
│   │    ├── nodeJS调试.md
│   │    └──  
│   ├── basic
│   │    ├──  streamAPI.md
│   │    └──  express 获取url参数，post参数的三种方式.md 
│   ├── express
│   │    ├── node+express创建服务器.md
│   │    └──  
│   ├──  sample: node.js 学习代码
│   │    └── /
│   └──  resources.md
│
├── Performance 性能分析
│   ├── Front End performance案例分析.md
│   ├── MobileSite-performance.png
│   ├── browser-render-optimization.md
│   ├── optimizing-Rendering-Performance.md
│   ├── requestAnimationFrame优化动画.md
│   ├── resources.md
│   └──
│
├── Regular Expression - 正则表达式
│   ├── 常用正则表达式.md
│   ├── 
│   └──
│
├── Samples   --常用&经典样例
│   ├── InputSamples   --输入框样例集
│   ├── TableSamples   --表格样例集
│   ├── 
│   └── 
│
├── Security   --安全
│   ├── 腾讯大牛教你web前后端漏洞分析与防御note.md
│   ├── 腾讯大牛教你web前后端漏洞分析与防御-project.zip       #原始的工程代码
│   ├── 腾讯大牛教你web前后端漏洞分析与防御-project-me.zip    #修过的工程代码，无法运行
│   └──
│
├── Theory 理论和源码
│   ├── Progressive Web App设计.md
│   │     ├── your-first-offline-app.rar
│   │     ├── your-first-pwapp-master
│   │     └── you-first-push-notifications-master.rar
│   ├── 
│   ├── 
│   └── 
│
├── VirtualReality   #虚拟现实
│   ├── resource.md
│   ├── 
│   └── 
│
├── Vue
│   ├── Vue学习.md
│   ├── 
│   └── 
│
├── SVG
│   ├── SVG displacement filter.html
│   ├── 
│   └── 
│
├── study-tips.md    --学习过程中的小tip
├── 常用node模块.md
└── web前端学习资源.md
```

**BLOG**

- [大漠](https://www.w3cplus.com/blogs/airen)

**WEB**

- [Web前端开发](http://www.css88.com/)
- [W3C中文网](https://www.w3cplus.com/)
- [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/)
- http://kangax.github.io/
- [前端开发博客](http://caibaojian.com/)
