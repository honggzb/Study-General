[PWA系列之Cache API](#top)

- [概述](#概述)
- [使用Cache API](#使用cache-api)

-----------------------------------------

## 概述

- PWA（Progressive web apps，渐进式 Web 应用）运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序
- PWA 主要用到了浏览器储存技术、Service Workers 技术、App Shell、Web Push API、以及一系列其他基础技术
- 在 PWA 应用中，**Cache缓存API**是关键技术之一，主要作用就是缓存相应和请求。只有在在线的情况下做好缓存，才能够在离线的情况下直接调用缓存而不必重新联网获取数据
- 使用Cache缓存的第一个步骤就是使用 `CacheStorage.open(cacheName)` 方法打开一个 Cache 对象，然后再是对具体的缓存内容执行 `match`, `add`, `put`, `delete`, `keys` 等操作, 操作 Cache 如下几个方法

|Cache方法|说明|
|---|---|
|`cache.match(request, options)` | 跟 Cache 对象匹配的第一个已经缓存的请求|
|`cache.matchall(request, options)` |跟Cache对象匹配的所有请求组成的数组|
|`cache.add(request)` |抓取这个URL, 检索并把返回的response对象添加到给定的Cache对象<br>这在功能上等同于调用 `fetch()`, <br>然后使用`cache.put()`将response添加到cache中|
|`cache.addall(requests)` |抓取一个URL数组，检索并把返回的response对象添加到给定的Cache对象|
|`cache.put(request, response)` |同时抓取一个请求及其响应，并将其添加到给定的cache。|
|`cache.delete(request, options)` |搜索key值为request的Cache 条目。如果找到，则删除该Cache 条目，<br>并且返回一个resolve为true的Promise对象；<br>如果未找到，则返回一个resolve为false的Promise对象|
|`cache.keys(request, options)` |返回一个Promise对象，resolve的结果是Cache对象key值组成的数组|

[⬆ back to top](#top)

## 使用Cache API

```js
//1. 先定义 cacheName, 相当于命名空间，你的缓存存储的地方
const CACHE_VERSION = 1;
const CACHE_NAME = 'DEMO' + CACHE_VERSION;
// 2. 调用 open 方法打开一个 Cache 对象
cache = await caches.open(CACHE_NAME);
// 3. 通过 Request 构造函数创建一个请求对象
let r = new Request('https://httpbin.org/image/png');
//4. 调用 match 方法，因为并没有缓存过这个请求因此返回 undefined
await cache.match(r);      // undefined
// 5. 调用fetch 方法和 put 方法或 add 方法，缓存这个请求和响应数据
await cache.add(r);
// 6. 尝试再次 match，就可以获得对应的 Response 对象
// Application 中的 Cache Storage，中间就有这么一条缓存数据了
const c = await cache.match(r)
console.log(c)
// 7. 尝试调用 keys 方法，输出open 的 Caches 对象
await caches.keys();
// 8. 想要删掉这个 caches 对象，只需调用 delete 方法，并传入 cacheName 即可，返回 true 即表示删除成功
await caches.delete(CACHE_NAME)
```

[⬆ back to top](#top)

> [PWA 系列（一）——Cache API](https://cloud.tencent.com/developer/article/1411753)
