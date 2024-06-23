[Edu App](#top)

- [项目搭建](#项目搭建)
- [项目结构](#项目结构)
- [异步组件和异步加载-vueuse](#异步组件和异步加载-vueuse)
- [判断课程等级，复用功能封装minxin](#判断课程等级复用功能封装minxin)
- [课程页Course-分类筛选条件逻辑](#课程页course-分类筛选条件逻辑)
- [筛选免费课程和会员课程](#筛选免费课程和会员课程)
- [Login - pinia persist + encrypt + token防止重复提交](#login---pinia-persist--encrypt--token防止重复提交)
- [课程播放页](#课程播放页)
- [课程页-视频播放](#课程页-视频播放)
  - [防盗链设置referer](#防盗链设置referer)
- [导航守卫- 购物车](#导航守卫--购物车)
- [支付(支付宝+微信)](#支付支付宝微信)
- [参考文章资料](#参考文章资料)

-------------------------------------------

## 项目搭建

- 设置代理： ‘vite.config.js’
- **Axios**
  - axios**二次封装**: 新建'utils/request.ts'
  - **API解耦合**: 新建'api/slider.ts'
- [Element-plus](https://element-plus.org/en-US/):
  - `npm install element-plus --save`
  - `main.ts`引入
    - `import ElementPlus from 'element-plus'`
    - `import 'element-plus/dist/index.css'`
    - `app.use(ElementPlus)`
- [reset.css](https://meyerweb.com/eric/tools/css/reset/)

## 项目结构

```
├── 📂src/
│   ├── 📂api/                   - Axios API解耦合
│   │     ├── 📄cart.ts
│   │     ├── 📄courseManage.ts
│   │     ├── 📄login.ts
│   │     └── 📄slider.ts
│   ├── 📂components/
│   │     ├── 📂common/
│   │     │     ├── 📄Foot.vue
│   │     │     └── 📄Header.vue
│   │     └── 📂home/
│   │           ├── 📄NavSwiper.vue
│   │           ├── 📄NewGoodCourse.vue
│   │           └── 📄test.vue       - 异步组件
│   ├── 📂mixins/                        - 复用功能封装minxin
│   │     ├── 📄courseType.ts               - 判断课程等级, 将1,2,3输出为'初级、中级、高级'
│   │     └── 📄priceMixin.ts               - 把10000以上改成w
│   ├── 📂router/
│   │     └── 📄index.ts
│   ├── 📂stores/
│   │     ├── 📄cart.ts
│   │     └── 📄user.ts
│   ├── 📂utils/
│   │     ├── 📄aes.ts                   - 加密解密（username, password）
│   │     └── 📄request.ts               - axios二次封装+interceptor
│   ├── 📂views/
│   │     ├── 📄Cart.vue
│   │     ├── 📄Course.vue
│   │     ├── 📄CourseInf.vue
│   │     ├── 📄CoursePlay.vue
│   │     ├── 📄HomeView.vue
│   │     ├── 📄Login.vue
│   │     ├── 📄
│   │     └──
│   ├── 📄App.vue
│   ├── 📄main.ts
│   └── 📄index.html
```

[⬆ back to top](#top)

## 异步组件和异步加载-vueuse

```ts
//src\views\HomeView.vue
<template>
  <main>
    <Header />
    <NavSwiper />
    <div ref="target">
      <NewGoodCourse v-if='targetIsVisible'></NewGoodCourse>
    </div>
    <Foot/>
  </main>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import Header from '../components/common/Header.vue'
import Foot from '../components/common/Foot.vue'
import NavSwiper from '../components/home/NavSwiper.vue'
const NewGoodCourse = defineAsyncComponent(() =>
  import('../components/home/NewGoodCourse.vue')
)
const target = ref(null);
const targetIsVisible = ref(false);
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
  	if( isIntersecting ) {
  		targetIsVisible.value = isIntersecting
  	}
  },
)
</script>
```

- [10 首页之异步组件](https://xuexiluxian.cn/blog/detail/b4099c83918345b4a3f108123cf5d1db)

[⬆ back to top](#top)

## 判断课程等级，复用功能封装minxin

- 判断课程等级，但是目前显示1，2，3数字, 定义minxin让课程显示'初级'、'中级'和'高级'

```ts
//src\mixins\courseType.ts
export default function() {
  let courseTypeFn = (type: number) => {
    let val = ''
    switch (type) {
      case 1: val = '初级'; break;
      case 2: val = '中级'; break;
      case 3: val = '高级'; break;
      default: val = '';
    }
    return val;
  }
  return { courseTypeFn }
}
// 在组件中使用mixins
 <div class="courseDegree">
  {{ courseTypeFn(item.courseLevel) }} · {{item.purchaseCounter + item.purchaseCnt}}人报名
 </div>
import courseType from '../../mixins/courseType.ts'
let { courseTypeFn } = courseType();
```

[⬆ back to top](#top)

## 课程页Course-分类筛选条件逻辑

课程筛选条件分为三种情况：一级分类、二级分类、课程难度，逻辑如下：

1. 直接进入课程页，展示所有一级、二级、课程难度
2. 如果点击了一级，展示对应一级下的二级并展示此一级下所有课程
3. 如果直接点击二级，那么一级不动，展示对应二级所有课程
4. 点击一级、二级、课程难度，当前的class类要对应添加

```ts
<el-tag v-for='item in firstCategorys' :key='item.id' effect="plain" type="info"
    :class="currentId['fcategory'].id==item.id ? 'category-poniter':'category-poniter-item'"
    @click='buildingCondition("fcategory",item.id)'>
      {{ item.categoryName }}
</el-tag>
let queryCoursePrams = reactive({
	pageNum:1,
	pageSize:8,
  entity:{
    firstCategory:'',
    secondCategory:'',
    courseLevel:''
  }
})
const buildingCondition = ( type , id )=>{
  if (type === 'fcategory') {
    currentId['scategory'].id = '';
    currentId['clevel'].id = '';
    currentId[type].id = id;
    queryCoursePrams.entity.courseLevel = '';
    queryCoursePrams.entity.secondCategory = '';
    queryCoursePrams.entity.firstCategory = id;
    category.categoryId = id;
    getSecondCategorysFn(category);
    querySearchCourse();  //查询所有课程
    return;
  }
  //...
}
```

[⬆ back to top](#top)

## 筛选免费课程和会员课程

```ts
<el-radio-group>
  <el-radio value="1">免费课程</el-radio>
  <el-radio value="2">会员课程</el-radio>
</el-radio-group>
// 2.1) watch方式
watch( radio , (newVal,oldVal)=>{
    if( newVal == 1 ){
      queryCoursePrams.entity.isMember = '';
      queryCoursePrams.entity.isFree = '1';
    }else if( newVal == 2 ){
      queryCoursePrams.entity.isFree = '';
      queryCoursePrams.entity.isMember = '1';
    }
    querySearchCourse();
})
//2.2) chang事件方式
const changeRadio = ( val )=>{
  if( val == '1' ){
    queryCoursePrams.entity.isMember = '';
    queryCoursePrams.entity.isFree = '1';
  }else if( val =='2' ){
    queryCoursePrams.entity.isFree = '';
    queryCoursePrams.entity.isMember = '1';
  }
  querySearchCourse();
}
//但是要多一个change事件哦
<el-radio-group v-model="radio" @change='changeRadio'>
    <el-radio value="1">免费课程</el-radio>
    <el-radio value="2">会员课程</el-radio>
</el-radio-group>
```

[⬆ back to top](#top)

## Login - pinia persist + encrypt + token防止重复提交

- 登录模式包含三种：
  - 第三方登录（微信、QQ之类的）
  - 账号密码登录、
  - 短信登录
    - 1 输入正确手机号：前端判断
    - 2 输入正确手机号后，出现滑块，滑块验证通过才可以倒计时发送短信
    - 3 手机号和验证码都正确后登录成功
- 登录后-显示用户信息, 加入购物车，删除，确定订单等操作都需要防止重复提交
  - **临时token**- 防止重复提交  --> Request Query
  - 用户加密后的token-用户登录后backend返回的token  --> Request Headers:  在'src\utils\request.ts'拦截器中设置
- plugin needed
  - `npm i pinia-plugin-persist`
  - `npm i crypto-js`
- files needed
  - 'store/index.js', 'store/user.js'
  - 'aes.ts' 加密解密

```ts
// 登录后-显示用户信息
// 1. 存储token: 本地存储和pinia中
// 2. 提示登录成功
ElMessage({
    showClose: true,
    message: '请输入正确格式',
    type: 'warning',
})
//3. 回到之前页
import { useRouter } from 'vue-router'
const router = useRouter();
router.go(-1);
//4. 获取用户信息 - src\components\common\Header.vue
// 调取getUserInfo接口，并且调取临时token（防止用户重复提交Token）
import { createToken } from '@/utils/api/createToken'
import { getUserInfo } from '@/utils/api/login'
onBeforeMount(()=>{
	createToken().then(res=>{
		getUserInfo({
			token:res.data.token
		}).then(res=>{
			console.log( res );
		})
	})
})
//5. 调整axios二次封装内容
//请求拦截器 -> src\utils\request.ts
import { useUserStore } from '@/store/user'
service.interceptors.request.use(config => {
	const userStore = useUserStore();
	let token = userStore.token;
	if( token ){
		config.headers['Authorization'] = token;
	}
  return config;
}, error => {
  Promise.reject(error);
});
```

[⬆ back to top](#top)

## 课程播放页

1. 点击开始学习
2. 查询是否登录状态，如果登录正常走下面流程，如果没有登录，跳转到登录页
3. 查询是否有权限学习，（比如是否购买了本课程）
4. 如果无权限提示“需要购买课程”，如果有权限直接进入课程播放页
5. 配置课程播放页路由和页面
6. 'src\views\CoursePlay.vue'

## 课程页-视频播放

- [vue3-video-play-适用于Vue3的hls.js播放器组件|并且支持MP4/WebM/Ogg格式](https://codelife.cc/vue3-video-play/)
  - [[commonjs--resolver] Failed to resolve entry for package "vue3-video-play"](https://github.com/xdlumia/vue3-video-play/issues/129)
  - 将packages.json中的`"module": "./dist/index.es.js"`改为`"module": "./dist/index.mjs"`后，可以正常使用
- 'src\views\CoursePlay.vue'
- [Vue3VideoPlay Events](https://codelife.cc/vue3-video-play/guide/install.html#events)
- 打开页面时候视频播放逻辑：
    1. 更新播放时间事件：实时记录用户对于视频播放的最后时间，比如视频总时长10s，在第6秒关闭了网页，下次进来应该还是第6秒开始播放
    2. 每次第一次进入网页：调取之前播放历史，如果没有就是从0开始
    3. timeupdate和loadstart事件

```ts
<vue3VideoPlay v-bind="options" @timeupdate="onTimeupdate" @loadstart='onLoadstart'/>
```

### 防盗链设置referer

- HTTP Referer头部是一种在 HTTP 请求中常见的头部字段，用于标识请求的来源页面。它提供了引荐信息，告诉服务器当前请求是从哪个页面链接过来的, Referer 头部通常包含了完整的 URL，包括协议、域名、路径(path)、查询参数(query)（注意：并没有包括URL的hash部分）等信息
- Referer防盗链是一种服务器端设置的访问控制机制，用于防止未经授权的网站盗用服务器资源。具体来说，当一个用户从某个网页点击链接访问另一个网页时，浏览器会自动在HTTP请求头中添加一个Referer字段，这个字段记录了用户是从哪个网页跳转过来的
- 配置referer做防盗链(backend):
  -
- 开发过程中可通过花生壳在后台配置白菜单突破防盗链方法
  - 内网穿透（[花生壳](https://hsk.oray.com/download/)）
  - 账号:18511773322,  密码:weblaozhang123
- nodejs express模块防盗链
  - [图片和视频防盗链简单介绍](https://cloud.tencent.com/developer/article/1083661)

```js
var express = require('express'),
  path = require('path'),
  app = express();
var AntiLeech = require('express-anti-leech');
// 允许引用的域名白名单
var hosts = ['localhost', 'localhost:8004'];
// 反盗链类型
var exts = ['.png', '.jpg', '.jpeg', '.gif', '.swf', '.flv'];
// 盗链默认指向图片
var pictrue = "/images/default.png";
app.use(AntiLeech({
  allow: hosts,
  exts: exts,
  log: console.log, // 你也可以使用自己的方法来记录
  default: pictrue
}));
// 请在调用静态资源之前先使用反盗链模块
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8004);

app.get('/', function(req, res) {
  res.redirect("/index.html");
});
app.listen(app.get('port'), function() {
  console.log("Express test server listening on http://localhost:" + app.get('port'));
});
```

[⬆ back to top](#top)

## 导航守卫- 购物车

```ts
//src\router\index.ts
{
    path: "/cart",
    name: "Cart",
    component: () =>
      import("../views/Cart.vue"),
      beforeEnter:(to, from, next) => {
        console.log( useUserStore().userInfo.id )
        if( useUserStore().userInfo.id ){
          next();
        }else{
          next('/login');
        }
      }
},
```

[⬆ back to top](#top)

## 支付(支付宝+微信)

- 短轮询查订单状态
- ![支付api](支付api.png)

```ts
// src\views\ConfirmOrder.vue
<span v-for='item in payModes' :key='item.code' @click='tabPayment(item)'>{{ item.description }}</span>
<button class="btn" @click='goPayemet'>确认订单</button>
//选择支付方式
const tabPayment = (item)=>{
    payment.description = item.description
    payment.code = item.code
    if(payment.code === 'alipayment') {
      alipayOrder({
        courses:cartStore.orderList,
        payModes:item.code
      }).then(res=>{
        payurl.value = res.data.payurl;
        console.log( res  );
        orderNumber.value = res.data.orderNumber;
      })
    } else {
      //...
    }
// }
//[支付宝]短轮询查订单状态
const interPaymentAli = ()=>{
	queryOrderWithAli({
			orderNumber: orderNumber.value
	}).then(res=>{
		console.log( res )
		if( res.meta.code=='200' ){
			clearInterval(timer.value);    //停止短轮
      ElMessage.success({
        message: '支付成功'
      })
      router.push({name: 'home'})
      batchDeleteShopCar({        //删除购物车数据
        ids: cartStore.select
      })
		}
	})
 }
const interPaymentWx = ()=>{    //[微信]短轮询查订单状态
    // ...
 }
//去支付
const goPayemet = () => {
  console.log('toPayment1');
  if(payment.code === 'alipayment') {
    timer.value = setInterval(interPaymentAli , 3500 );    //一直轮询查订单状态
  } else {
    timer.value = setInterval(interPaymentWx , 3500 );    //一直轮询查订单状态
  }
  dialogVisible.value = true;
}
```

[⬆ back to top](#top)

## 参考文章资料

- [Vite + Vue3设置代理和axios二次封装，api解耦](https://xuexiluxian.cn/blog/detail/01f62baa85b7431992586b4689a9b07a)
- [02 Vite + Vue项目安装router](https://xuexiluxian.cn/blog/detail/0a44da50c0b440d6b8f591867f8909f5)
- [03 先做首页头部吧，先做准备工作](https://xuexiluxian.cn/blog/detail/f6236ef0b71c4e7eb67d9796eb3ef17f)
- [04 开始布局头部](https://xuexiluxian.cn/blog/detail/305ba3822eed4babba07801d559ccd2e)
- [05 首页NavSwiper布局](https://xuexiluxian.cn/blog/detail/c460c18fe6d342d0b19d52e81d1da71c)
- [06 设置代理，axios封装，api解耦](https://xuexiluxian.cn/blog/detail/814307b5854748f3b47e9ed24775b6e6)
- [07 NavSwiper开始渲染数据](https://xuexiluxian.cn/blog/detail/a320939b9a414437aac402fa001302c9)
- [08 首页-新上好课组件](https://xuexiluxian.cn/blog/detail/bb104b93c01f45bd906b482cc15a7251)
- [09 首页-底部组件](https://xuexiluxian.cn/blog/detail/a4ae28350a41476eb6060eb0c3dffaed)
- [10 首页之异步组件](https://xuexiluxian.cn/blog/detail/b4099c83918345b4a3f108123cf5d1db)
- [11 首页之判断课程等级，复用功能封装](https://xuexiluxian.cn/blog/detail/d454aafb406d40a78f699546db3c6b38)
- [12 课程页-组件布局](https://xuexiluxian.cn/blog/detail/93dd86680c274b4ca0469f52c0c48fc4)
- [13 课程页-课程方向和课程分类数据渲染](https://xuexiluxian.cn/blog/detail/ddd0c4550ac440ff978201c4c959517c)
- [14 课程页-请求课程数据+分页](https://xuexiluxian.cn/blog/detail/cbeb396e6cdc4da58a89a8756d978f2c)
- [15 课程页-分类筛选条件逻辑](https://xuexiluxian.cn/blog/detail/40340e1ebc7e4115a74a2fa285c6271f)
- [16 课程页面-筛选免费课程和会员课程](https://xuexiluxian.cn/blog/detail/d9a9dc665c98426bb385ed4ac665d840)
- [17 课程页-课程条件筛选](https://xuexiluxian.cn/blog/detail/33a95b867c004c02891ab3c03ddb8df4)
- [18 课程详情页-布局](https://xuexiluxian.cn/blog/detail/fbc1891af8bb4da9b988ae8458cc9c43)
- [19 课程详情页-调整数据](https://xuexiluxian.cn/blog/detail/80148066c35a45158a8827a402085b7c)
- [20 课程详情页-渲染数据](https://xuexiluxian.cn/blog/detail/122aaca759e3435b81fa197e3cbdadb3)
- [21 登录页-账号密码登录](https://xuexiluxian.cn/blog/detail/b2479329043c43eba75893fae0e3c2bc)
- [22 登录页-短信登录](https://xuexiluxian.cn/blog/detail/f1ed06a2c25143d7bb86e2709f50fce6)
- [23 登录以后](https://xuexiluxian.cn/blog/detail/edf9874da8f245ad8cc73a08f4ce2e1e)
- [24 登录后-显示用户信息](https://xuexiluxian.cn/blog/detail/9a769c6e19ef4ba39872772f2d60d857)
- [25 退出登录](https://xuexiluxian.cn/blog/detail/26fc8e510f4b426a85c687eb61627978)
- [26 课程页-下载课程资料](https://xuexiluxian.cn/blog/detail/6ecbf959d6a34b74a715ca14d52a0e60)
- [27 课程页-课程播放页](https://xuexiluxian.cn/blog/detail/b172d876000e4c329aeed8f337ad1732)
- [28 课程页-渲染右侧课程数据](https://xuexiluxian.cn/blog/detail/74eea76605214b2cade4adbe73b91ad5)
- [29 课程页-视频播放](https://xuexiluxian.cn/blog/detail/5f879435c1f043edbef615e1f227d801)
- [30 课程页-播放视频记录](https://xuexiluxian.cn/blog/detail/9a8919c1996c490cb74948eec485408f)
- [31 购物车-导航守卫](https://xuexiluxian.cn/blog/detail/65f3866aa18e4ecbb14c731264a1aaeb)
- [32 购物车-数据渲染和单选、全选](https://xuexiluxian.cn/blog/detail/f9d84b5eba004b39bcbf26f0ef46d681)
- [33 删除购物车数据](https://xuexiluxian.cn/blog/detail/3b3eb44645a7418589b7e00a8d452fd1)
- [34 加入购物车](https://xuexiluxian.cn/blog/detail/f379da1bd8e94a8c8cbfe7c432c9f5ca)
- [35 确认订单页](https://xuexiluxian.cn/blog/detail/e52f2cae041f46d68117e9d66379810c)
- [36 确认订单页-数据渲染](https://xuexiluxian.cn/blog/detail/5f34eeaefe6c402b8ea353911c5c0ea2)
- [37 支付宝支付](https://xuexiluxian.cn/blog/detail/5ba598952ba34ef1a2f300915a54b438)

[⬆ back to top](#top)
