- [Angular核心概念](#angular%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)
- [UI libraries](#ui-libraries)
- [Sample](#sample)
- [tips](#tips)
    - [去除app前缀](#%E5%8E%BB%E9%99%A4app%E5%89%8D%E7%BC%80)
    - [angular-cli command](#angular-cli-command)
    - [shell command](#shell-command)
    
 [大漠的Angular Workshop](#top)

## Angular核心概念

**依赖注入**

- 每个html标签上面都会有一个注射器实例
- 注射是通过constructor进行的
- @component是@injectable的子类
- https://github.com/modern-javascript/angular2-data-flow
- 组件树生成工具Augury
- [Dependency Injection in Angular 1 and Angular 2.x](https://vsavkin.com/dependency-injection-in-angular-1-and-angular-2-d69589979c18)

**数据绑定**

- [ANGULAR CHANGE DETECTION EXPLAINED](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
- [Angular 2, 4 — Visualizing Change Detection (Default vs OnPush)](https://hackernoon.com/angular-2-4-visualizing-change-detection-default-vs-onpush-3d7ed1f69f8e)
- [Change And Its Detection In JavaScript Frameworks](http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)
- [Change Detection in Angular](https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c)

**Change dectection- default vs onPush**

- 默认情况下，Angular会刷新所有节点
    - 也就是说，无论哪个层级上的节点方式了变化，整个组件树都会被检查一次。简单地说：整个组件树里面所有组件的钩子全部都会被执行一次。
    - 如果组件结构比较简单，这样没有问题。但是对于组件结构极其复杂的应用来说，就会成为性能瓶颈。
    - 实例代码：https://embed.plnkr.co/mx3ZnfhfUtQECb4av3MP/
- 在OnPush策略下，只会检测发生了变化的节点
    - 实例代码：https://embed.plnkr.co/qvQIkHaoN51AdbzwGK81/

## UI libraries

- PrimeNG: 最完善的开源免费UI组件库
- NG-Zorro： 阿里云
- Jigsaw：   中兴
- Clarity：  VMware
- Angular-material
- Ionic

## Sample

- [JHipster](https://www.jhipster.tech/)-后端基于SpringMVC
- [NiceFish-系列教学项目](https://gitee.com/mumu-osc/NiceFish)
- [AngularDoc-查看angular工具](https://angulardoc.github.io/#/products)

第3小节：5.x和6.x新版本简述
第4小节：详解Angular组件-1
第5小节：组件间通讯
第6小节：动效
第7小节：动态组件
第8小节：ShadowDOM
第9小节：内容投影
第10小节：ViewChild与ContentChild
第11小节：指令
第12小节：模块
第13小节：路由的基本玩法
第14小节：路由的高级玩法
第15小节：表单与数据校验
第 16 小节：RxJS快速上手
第17小节：两个完整的案例（OpenWMS和基于Ionic的PWA）
第18小节：整体答疑环节

> References
- https://gitbook.cn/gitchat/column/59dae2081e6d652a5a9c3603
- http://www.ngfans.net/topic/242/post
- [大漠的代码仓库](https://gitee.com/mumu-osc)
- [AngularJS实战](http://www.imooc.com/learn/156)
- [Angular开发者论坛](http://www.ngfans.net/)

## tips

### 去除app前缀

在angular.json中去除`"prefix":""`

### angular-cli command

```shell
ng build --prod   #自动AOT
ng build --prod --source-map
```

### shell command

```shell
rmdir foldername /Q /S
```

