## Progressive Web App

- [1. 什么是 Progressive Web App](#什么是Progressive-Web-App)
- [2. 基于应用外壳的结构](#基于应用外壳的结构)

- **模拟服务器**： 在Chrome中安装Web Server for Chrome

<h3 id="什么是Progressive-Web-App">1. 什么是 Progressive Web App</h3>

- **渐进增强** - 能够让每一位用户使用，无论用户使用什么浏览器，因为它是始终以渐进增强为原则。
- **响应式用户界面** - 适应任何环境：桌面电脑，智能手机，笔记本电脑，或者其他设备。
- **不依赖网络连接** - 通过 service workers 可以在离线或者网速极差的环境下工作。
- **类原生应用** - 有像原生应用般的交互和导航给用户原生应用般的体验，因为它是建立在 app shell model 上的。
- **持续更新** - 受益于 service worker 的更新进程，应用能够始终保持更新。
- **安全** - 通过 HTTPS 来提供服务来防止网络窥探，保证内容不被篡改。
- **可发现** - 得益于 W3C manifests 元数据和 service worker 的登记，让搜索引擎能够找到 web 应用。
- **再次访问** - 通过消息推送等特性让用户再次访问变得容易。
- **可安装** - 允许用户保留对他们有用的应用在主屏幕上，不需要通过应用商店。
- **可连接性** - 通过 URL 可以轻松分享应用，不用复杂的安装即可运行

<h3 id="基于应用外壳的结构">2. 基于应用外壳(App Shell)的结构</h3>

App Shell是应用的用户界面所需的最基本的 HTML、CSS 和 JavaScript，也是一个用来确保应用有好多性能的组件。它的首次加载将会非常快，加载后立刻被缓存下来。这意味着应用的外壳不需要每次使用时都被下载，而是只加载需要的数据。

应用外壳的结构分为应用的核心基础组件和承载数据的 UI。所有的 UI 和基础组件都使用一个service worker缓存在本地，因此在后续的加载中Progressive Web App仅需要加载需要的数据，而不是加载所有的内容。

换句话说，应用的壳相当于那些发布到应用商店的原生应用中打包的代码。它是让你的应用能够运行的核心组件，只是没有包含数据。

使用基于应用外壳的结构允许你专注于速度，给你的 Progressive Web App 和原生应用相似的属性：快速的加载和灵活的更新，所有这些都不需要用到应用商店。

<h3 id="使用Service-Workers来预缓存应用外壳">3. 使用Service Workers来预缓存应用外壳</h3>

- service workers 提供的是一种应该被理解为渐进增强的特性，这些特性仅仅作用于支持service workers 的浏览器。比如，使用 service workers 你可以缓存应用外壳和你的应用所需的数据，所以这些数据在离线的环境下依然可以获得。如果浏览器不支持 service workers ，支持离线的 代码没有工作，用户也能得到一个基本的用户体验。使用特性检测来渐渐增强有一些小的开销，它不会在老旧的不支持 service workers 的浏览器中产生破坏性影响。

- **1)注册service worker**: 检查浏览器是否支持service workers, 如支持，注册service worker， 在app.js中添加

```javascript
if ('serviceWorker' in navigator) {   //检查浏览器是否支持 service workers, 如支持，注册service worker
    navigator.serviceWorker.register('./service-worker.js')
                           .then(function() { console.log('Service Worker Registered'); });
  }
```

- **2)在根目录下创建一个空文件叫做service-worker.js**: 

```javascript
// 1)缓存站点的资源, 主要是缓存组成应用外壳(app shell)的文件，如html,css,js,images
var dataCacheName = 'weatherData-v1';
var cacheName = 'weatherPWA-final-1';   //缓存的名字
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

//首次访问保持缓存:  当用户首次访问页面的时候, 一个install事件会被触发。在这个事件的回调函数中，我们能够缓存所有的应用需要再次用到的资源
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);    //cache.addAll() 是原子操作，如果某个文件缓存失败了，那么整个缓存就会失败
    })
  );
});

//更新缓存
self.addEventListener('activate', function(e) {    //确保在每次修改了 service worker 后修改 cacheName
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

//从缓存中加载 app sheel
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     * caches.match() 从网络请求触发的 fetch 事件中得到请求内容，并判断请求的资源是 否存在于缓存中。然后以缓存中的内容作为响应，或者使用 fetch 函数来加载资源（如果缓存中没有该资源）。 response 最后通过 e.respondWith() 返回给 Web 页面
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

- [你的首个 Progressive Web App](http://www.w3cplus.com/pwa/your-first-pwapp.html)
- [Your First Progressive Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)
