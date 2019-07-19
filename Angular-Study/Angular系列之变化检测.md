[Angular系列之变化检测](#top)

- [1. What causes change?](#What)
- [2. Who notifies Angular?](#Who)
- [3. 组件和Change Detection](#Change)
  - [3.1 变化检测策略](#变化检测策略)
  - [3.2 变化检测对象引用 - ChangeDetectorRef](#变化检测对象引用)
  - [3.3 OnPush策略下手动发起变化检测](#OnPush策略下手动发起变化检测)

<h2 id="What">1. What causes change?</h2>

变化检测(Change Detection)就是Angular用来检测视图与模型之间绑定的值是否发生了改变，当检测到模型中绑定的值发生改变时，则同步到视图上，反之，当检测到视图上绑定的值发生改变时，则回调对应的绑定函数。有如下几种情况可能也改变数据

- **Events**： 用户输入操作, 比如click, submit
- **XHR**: 
- **Timers**:  定时事件，比如setTimeout, setInterval
- They are all asynchronous，这些事件源有一个共同的特性，即它们都是异步操作。那我们可以这样认为，所有的异步操作都有可能会引起模型的变化

[back to top](#top)

<h2 id="What">2. Who notifies Angular?</h2>

- [Zone](https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html): Zone 是下一个ECMAScript规范的建议之一。Zone 是一个全局的对象，用来配置有关如何拦截和跟踪异步回调的规则。Zone 有以下能力：
  - 拦截异步任务调度
  - 提供了将数据附加到 zones 的方法
  - 为异常处理函数提供正确的上下文
  - 拦截阻塞的方法，如 alert、confirm 方法
- 在 Angular 2 应用程序启动之前, Zone采用猴子补丁(Monkey-patched)的方式，将JavaScript中的异步任务都进行了包装，这使得这些异步任务都能运行在Zone的执行上下文中，每个异步任务在Zone中都是一个任务，除了提供了一些供开发者使用的钩子外，默认情况下Zone 重写了以下方法：
  - setInterval、clearInterval、setTimeout、clearTimeout
  - alert、prompt、confirm
  - requestAnimationFrame、cancelAnimationFrame
  - addEventListener、removeEventListener

**NgZone**: Angular团队实现了JavaScript版本zone.js， 用于拦截和跟踪异步工作的机制。NgZone is basically a forked zone that extends its API and adds some additional functionality to its execution context

- onTurnStart() - Notifies subscribers just before Angular’s event turn starts. Emits an event once per browser task that is handled by Angular
- onTurnDone() - Notifies subscribers immediately after Angular’s zone is done processing the current turn and any micro tasks scheduled from that turn
- onEventDone() - Notifies subscribers immediately after the final onTurnDone() callback before ending VM event. Useful for testing to validate application state

Angular源码的某个地方，有一个东西叫做ApplicationRef_类，它监听NgZones的onTurnDone事件。只要这个事件发生了，它就执行tick()函数，这个函数用来告诉Angular去执行变化检测

```javascript
//真实源码的非常简化版本。
class ApplicationRef {
  changeDetectorRefs:ChangeDetectorRef[] = [];
  constructor(private zone: NgZone) {
    this.zone.onTurnDone
      .subscribe(() => this.zone.run(() => this.tick());
  }
  tick() {
    this.changeDetectorRefs.forEach((ref) => ref.detectChanges());
  }
}
```

**总结一下**：Angular内部是通过NgZone来跟踪异步任务，然后执行变化检测任务
  
- 异步操作被安排为任务
- Zones跟踪任务的执行
- Angular处理由执行异步操作引起的事件
- Angular对所有组件执行变化检测，若发生变化则更新视图

[back to top](#top)

<h2 id="Change">3. 组件和Change Detection</h2>

- **Each component has it own change detection** in Angular, there is a change detector tree
  - Change Detection Graph is a directed tree
  - Way more predictable
  - gets stable after a single pass
  - generates VM friendly code for better performance
- 在Angular 2中，任何数据都是从顶部往底部流动，即单向数据流
  - Change detection is **always** performed from **top to bottom** for every single component
  - Change detection is **always** performed **in the same order** starting from root
- 当组件的任何输入属性发生变化的时候，可以通过组件生命周期提供的钩子ngOnChanges来捕获变化的内容

<h3 id="变化检测策略">3.1 变化检测策略</h3>

**变化检测策略** - Angular有两种变化检测策略

- defalut策略: Default是Angular默认的变化检测策略，也就是上述提到的脏检查,只要有值发生变化，就全部从父组件到所有子组件进行检查,
- OnPush策略:  就是只有当输入数据(即@Input)的引用发生变化或者有事件触发时，组件才进行变化检测, 当使用OnPush策略的时候，若输入属性没有发生变化，组件的变化检测将会被跳过, 可利用该策略来优化变化检测性能
  - `@Input` properties change
  - Event emits
  - a bound Observable emits

```javascript
@Component({
    selector: 'profile-card',
    template: `
       <div>
         <profile-name [name]='profile.name'></profile-name>
         <profile-age [age]='profile.age'></profile-age>
       </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush      //OnPush策略, ProfileCardComponent中的profile输入属性没有发生变化，是没有必要再执行变化检测
})
export class ProfileCardComponent {
    @Input() profile: { name: string; age: number };
}
```

[back to top](#top)

<h3 id="变化检测对象引用">3.2 变化检测对象引用 - ChangeDetectorRef</h3>

**变化检测对象引用 - ChangeDetectorRef**: 通过引用变化检测对象ChangeDetectorRef，可以手动去操作变化检测, 变化检测对象提供的方法有以下几种：

- markForCheck() - 在组件的metadat 中如果设置了changeDetection:ChangeDetectionStrategy.OnPush 条件，那么变化检测不会再次执行，除非手动调用该方法, 该方法的意思是在变化监测时必须检测该组件
detach() - 从变化检测树中分离变化检测器，该组件的变化检测器将不再执行变化检测，除非手动调用 reattach() 方法
- reattach() - 重新添加已分离的变化检测器，使得该组件及其子组件都能执行变化检测
- detectChanges() - 从该组件到各个子组件执行一次变化检测

[back to top](#top)

<h3 id="OnPush策略下手动发起变化检测">3.3 OnPush策略下手动发起变化检测</h3>

**OnPush策略下手动发起变化检测**, 有两种方法实现：

- 组件中添加事件改变输入属性， 当输入属性值变化时候会自动触发变化检测
- 使用变化检测对象中的markForCheck()方法

[back to top](#top)

<h2 id="What">4. Immutable Objects vs. Observables</h2>

**不可变对象(Immutable Objects)**

- 使用着不可变对象，同时试图改变这个对象，那我们总是会得到一个新的引用，因为原来那个对象是不可变的
- 在Angular App使用不可变对象，只需做的就是告诉Angular，如果输入没有发生改变，这个组件就可以跳过变更检测(OnPush策略)
- [How I optimized Minesweeper using Angular 2 and Immutable.js to make it insanely fast](https://www.jvandemo.com/how-i-optimized-minesweeper-using-angular-2-and-immutable-js-to-make-it-insanely-fast/) by Jurgen Van De Moere

**Observables**

- 当发生变化的时候，Observables不会创建新的模型，但可以通过订阅Observables对象，在变化发生之后，进行视图更新。使用Observables机制的时候，同样需要设置组件的变化检测策略为OnPush
- [Taking advantage of Observables in Angular](https://blog.thoughtram.io/angular/2016/01/06/taking-advantage-of-observables-in-angular2.html)

```javascript
//using Immutable Objects
@Component({
  template: `
    <h2>{{vData.name}}</h2>
    <span>{{vData.email}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush    //设置变更检测策略为OnPush, We can skip entire subtrees
})
class VCardCmp {
  @Input() vData;
}
//using Observable： 假设一个有购物车的网上商城。用户将商品放入购物车时，我们希望有一个小计时器出现在我们的页面上，这样一来用户可以知道购物车中的商品数目。
@Component({
  template: '{{counter}}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class CartBadgeCmp {
  @Input() addItemStream:Observable<any>;  //OnPush策略下手动发起变化检测之方法1
  counter = 0;
  notifier:Observable<any>;  //even more control
  constructor(private cd: ChangeDetectorRef) {}    //变化检测对象引用
  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++;      //当用户程序状态改变（购物车中的数目改变时候，某个商品被加入购物车时）被fired
      //OnPush策略下手动发起变化检测之方法2
      //探测(detect)自根组件到变更发生的那个组件的整条路径
      this.cd.markForCheck(); //marks path, 告诉Angular，标记整条路径，从这个组件到根组件都需要被checked, 一旦变更检测结束，它就会恢复为整棵树恢复OnPush状态
    })
    /*  另一个例子，如输入变化时候
    setInterval(() => {
      this.star.lastName = 'xjl';
      this.changeRef.markForCheck();
    }, 1000);
    */
    //even more control
    this.cd.detach();
    this.notifier.subscribe((attach) => {
      attach ? this.cd.reattach() : this.cd.detach();
    })
  }
}
```

> 小结：当使用输入属性为Observable，有两种方式让子组件MovieComponent进入检测

- 一种是使用变化检测对象中的 markForCheck()方法
- 另外一种是使用async pipe管道

```javascript
//父组件
@Component({
  selector: 'app-root',
  template: `
    <h1>变更检测策略</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeStar()">  改变明星属性
    </button>
    <button type="button" (click)="changeStarObject()">
       改变明星对象
    </button>
    <movie [title]="title" [star]="star" [addCount]="count"></movie>`,
})
export class AppComponent implements OnInit{
  slogan: string = 'change detection';
  title: string = 'OnPush 策略';
  star: Star = new Star('周', '杰伦');
  count:Observable<any>;
  ngOnInit(){
    this.count = Observable.timer(0, 1000)
  }
  changeStar() {
    this.star.firstName = '吴';
    this.star.lastName = '彦祖';
  }
  changeStarObject() {
    this.star = new Star('刘', '德华');
  }
}
//子组件
//方法一： 使用变化检测对象中的 markForCheck()方法
@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>
        <button (click)="changeStar()">点击切换名字</button>        
        <label>Star:</label>
        <span>{{star.firstName}} {{star.lastName}}</span>
      </p>
    </div>`,
changeDetection:ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  constructor(private changeRef:ChangeDetectorRef){}
  @Input() title: string;
  @Input() star;
  ngOnInit() {
      this.addCount.subscribe(() => {
        this.count++;
        this.changeRef.markForCheck();
  })
  changeStar(){
    this.star.lastName = 'xjl';
  }
}
//方法二： 使用async pipe管道
@Component({
  selector: 'movie',
  styles: ['div {border: 1px solid black}'],
  template: `
      <div>
        <h3>{{ title }}</h3>
        <p>
          <button (click)="changeStar()">点击切换名字</button>        
          <label>Star:</label>
          <span>{{star.firstName}} {{star.lastName}}</span>
        </p>
        <p>{{addCount | async}}</p>
      </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

> 总结:  Angular应用是一个响应系统，变化检测总是从根组件到子组件这样一个从上到下的顺序开始执行，它是一棵线性的有向树，默认情况下，变化检测系统将会走遍整棵树，但可以使用OnPush变化检测策略，在结合Observables对象，进而利用ChangeDetectorRef实例提供的方法，来实现局部的变化检测，最终提高系统的整体性能

> 补充： 变化检测器的状态的种类

```javascript
//ChangeDetectionStrategy 变化检测策略
export declare enum ChangeDetectionStrategy {
    OnPush = 0, // 变化检测器的状态值是 CheckOnce
    Default = 1, // 组件默认值 - 变化检测器的状态值是 CheckAlways，即始终执行变化检测
}
//变化检测器的状态的种类
export declare enum ChangeDetectorStatus {
    CheckOnce = 0, // 表示在执行detectChanges之后，变化检测器的状态将会变成Checked
    Checked = 1, // 表示变化检测将被跳过，直到变化检测器的状态恢复成CheckOnce
    CheckAlways = 2, // 表示在执行detectChanges之后，变化检测器的状态始终为CheckAlways
    Detached = 3, // 表示该变化检测器树已从根变化检测器树中移除，变化检测将会被跳过
    Errored = 4, // 表示在执行变化检测时出现异常
    Destroyed = 5, // 表示变化检测器已被销毁
}
```

[back to top](#top)

- [ANGULAR CHANGE DETECTION EXPLAINED](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
- [Demo](https://github.com/thoughtram/angular2-change-detection-demos)
- [[译] 深入分析 Angular 变更检测](https://juejin.im/post/59e56984518825098873760e)
- [ZONES IN ANGULAR](https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)
- [Angular系列之变化检测(Change Detection)](https://segmentfault.com/a/1190000010928087)
- [详解ANGULAR2组件中的变化检测机制（对比ANGULAR1的脏检测）](https://www.cnblogs.com/shitoupi/p/6731575.html)
- [Angular 2 Change Detection - 1](https://segmentfault.com/a/1190000008747225)
- [Angular 2 Change Detection - 2](https://segmentfault.com/a/1190000008754052)
