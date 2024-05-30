[Service Worker Updating Resources-version篇](#top)

- [Service Worker更新机制](#service-worker更新机制)
- [强制更新方案Forced updating resources-version篇](#强制更新方案forced-updating-resources-version篇)
  - [实现逻辑](#实现逻辑)
  - [具体操作](#具体操作)
  - [方案1-文件变更](#方案1-文件变更)
  - [方案2-监听更新事件](#方案2-监听更新事件)
  - [方案3-自动刷页面](#方案3-自动刷页面)
  - [方案4-配置文件](#方案4-配置文件)
  - [方案5-URL标识](#方案5-url标识)

---------------------------------------------

## Service Worker更新机制

- ![sw更新机制](sw更新机制.png)
- 存在的问题： 用户需要进**2 次**网页才能看到最新的版本功能

[⬆ back to top](#top)

## 强制更新方案Forced updating resources-version篇

### 实现逻辑

- 网站核心入口是 html，资源类型为 document
- 客户端控制在跳对应网站的时候，url 上拼接 readerVersion=new1
- serviceWorker fetch 拦截 html，判断缓存的 readerVersion 值和 url 上的值是否一致：
- 一致，走本地缓存，同时更新 serviceWorker 的缓存
- 不一致，走网络请求，请求成功后更新 serviceWorker 的缓存
- 网络请求失败走 serviceWorker 的旧缓存兜底

### 具体操作

- 前端代码发布上线，此时 readerVersion => ''
- 配置平台修改 readerVersion => new1+
- 上线完毕，看数据大部分用户更新后，可恢复配置 readerVersion => ''，也可不恢复

### 方案1-文件变更

- 更新serviceWorker.js 里面的版本号引起文件的变更从而使 serviceWorker 重新安装激活
  - `const cache_version = 'v1'`
- 执行顺序：fetch 请求 html => serviceWorker.register() => 发现变更重新安装激活
- 结论：方案行不通，html 的请求是最早的，而 serviceWorker 的注册、安装、激活更滞后

### 方案2-监听更新事件

1. 当 ServiceWorker installing 属性获取新的服务工作线程时，会触发 updatefound 事件
2. 更新 serviceWorker.js 里面的版本号，引发重新安装激活，同时监听 updatefound 事件
3. 发现有更新就出提示弹框，用户点击后，强制刷新浏览器更新
- 结论：方案可行，但是用户体验不好，用户需要手动点击强制刷新

[⬆ back to top](#top)

### 方案3-自动刷页面

- 偷偷刷新页面：
  - 用户进入页面后，出 loading，自动去刷新 1 次页面
  - 可以前端自己强刷 1 次
  - 内嵌在客户端的可以让客户端容器强刷 1 次
- 结论：体验不好

### 方案4-配置文件

- 在 fetch 里做拦截，比较远程配置
  - fetch 拦截时机最早，拦截 html 请求的时候，先去请求1个远程配置文件
  - 然后比较配置文件里的版本号和缓存的版本号，一致走缓存，不一致走网络请求
  - 请求远程配置文件会有一定耗时，耗时过久会抵消缓存产生的效益
- 结论：方案可行，需要控制住配置文件请求耗时

```js
//获取cache标志
let cacheVersion = await caches.match('readerVersion', { cacheName: CACHE_STALE_NAME });
if(cacheVersion) {
  cacheVersion = await cacheVersion.text();
}
// 获取json文件里的version标志
const result = await fetch('xxx');
let reqVersion = ''
if(result) {
    reqVersion = await result.json();
    reqVersion = reqVersion && reqVersion.version;
}
// 无cache标志|| cache标志和url标志不一致， 走network请求，同时更新sw cache
if(!cacheVersion || cacheVersion !== reqVersion) {
    const networkRes = await fetch(event.request);
    const cache = await caches.open(CACHE_STALE_NAME);
    cache.put(CACHE_STALE_NAME, networkRes.clone());
    cache.put('readerVersion', new Response(reqVersion, { status: 200, statusText: 'ok'}));  //存入cache
    return networkRes;
}
```
[⬆ back to top](#top)

### 方案5-URL标识

- 在 fetch 里做拦截，比较 url：
- fetch 拦截时机最早
  - 需要强制刷新的时候，修改访问链接 url 携带的标识字段值
  - fetch 拦截 html 请求的时候，通过比较 url 标识和缓存标识，一致走缓存，不一致走网络请求
  - 需要具备变更 url 的条件（比如由内嵌容器控制入口和变更）
- 结论：方案可行，需要 url 具备可变更条件

[⬆ back to top](#top)

[ServiceWorker 更新方案](https://juejin.cn/post/7330388563790561317)
