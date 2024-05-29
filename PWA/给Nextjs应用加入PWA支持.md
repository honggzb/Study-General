[给Nextjs应用加入PWA支持](#top)

- [General](#general)
- [using next-pwa](#using-next-pwa)

---------------------------------------------------

## General

- 四步让next.js具备pwa
- `/public`目录中新增`manifest.json`
- `/public`目录中新增`service-worker.js`, service-worker.js必须在访问域名的根域名下，所以必须放在public目录下
- `/pages/_document.js`文件中的Head中插入`<link rel="manifest" href="/manifest.json" />`
- `/pages/_app.js`文件中注册`service-worker.js`

```js
// _app.js
import React, {useEffect} from 'react';
import '../styles/globals.css'
import '../styles/antd.less';
import sw from '../utils/sw.js';
function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      // register service worker
      navigator.serviceWorker.register('../service-worker.js');
    }
  }, [])
  return <Component {...pageProps} />
}
export default MyApp
// manifest.json
{
  "name"              : "会员",
  "short_name"        : "会员",
  "description"       : "会员",
  "start_url"         : "/",
  "display"           : "standalone",
  "orientation"       : "any",
  "background_color"  : "#ACE",
  "theme_color"       : "#ACE",
  "icons": [
    {
      "src"           : "/logo.jpeg",
      "sizes"         : "72x72",
      "type"          : "image/png"
    },
    {
      "src"           : "/logo.jpeg",
      "sizes"         : "152x152",
      "type"          : "image/png"
    },
    {
      "src"           : "/logo.jpeg",
      "sizes"         : "192x192",
      "type"          : "image/png"
    },
    {
      "src"           : "/logo.jpeg",
      "sizes"         : "256x256",
      "type"          : "image/png"
    },
    {
      "src"           : "/logo.jpeg",
      "sizes"         : "512x512",
      "type"          : "image/png"
    }
  ]
}
// service-worker.js
const
  version = '1.0.2',
  CACHE = version + '::ZiyiMember',
  installFilesEssential = [
    '/',
    '/manifest.json',
    '/favicon.ico',
    '/logo.jpeg',
  ];
// install static assets
function installStaticFiles() {
  return caches.open(CACHE)
    .then(cache => {
      return cache.addAll(installFilesEssential);
    });
}
function clearOldCaches() {
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    });
}
self.addEventListener('install', event => {
  event.waitUntil(
    installStaticFiles()
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    clearOldCaches()
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  let url = event.request.url;
  event.respondWith(
    caches.open(CACHE)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request)
              .then(newreq => {
                console.log('network fetch: ' + url);
                if (newreq.ok) cache.put(event.request, newreq.clone());
                return newreq;

              })
              .catch(()=>null);
          });

      })
  );
});
```

[⬆ back to top](#top)

## using next-pwa

1. install next-pwa

- `npm i next-pwa`

2. 配置next.config.js

```js
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const nextConfig = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development'
  },
})
module.exports = nextConfig
```

3. public目录下新增manifest.json和一个icon目录

```json
{
  "name": "valnext",
  "short_name": "valnext",
  "theme_color": "#ffffff",
  "background_color": "#6768ab",
  "display": "fullscreen",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "splash_pages": null
}
```

4. 修改_app.tsx中Head部分的代码

```ts
<Head>
  <title>valcosmos</title>
  <link rel="shortcut icon" href="webicon.ico"/>
  <meta name="description" content="description"/>
  <meta name="keywords" content="HTML5, CSS3, JavaScript, TypeScript, Vue, React, 前端, 个人博客"/>
  <meta name="author" content="author"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
  <meta name="theme-color" content="#6768ab" />
  <link rel="manifest" href="/manifest.json" />
  <link
    href="/icons/icon-16x16.png"
    rel="icon"
    type="image/png"
    sizes="16x16"
  />
  <link
    href="/icons/icon-32x32.png"
    rel="icon"
    type="image/png"
    sizes="32x32"
  />
  <link rel="apple-touch-icon" href="/webicon.ico"></link>
</Head>
```

[⬆ back to top](#top)

> references
- [给Nextjs应用加入PWA支持](https://juejin.cn/post/7123575080977711117)
  - https://github.com/valcosmos/blogi
- [给nextjs项目插上pwa的翅膀](https://juejin.cn/post/6887759780128292871)
