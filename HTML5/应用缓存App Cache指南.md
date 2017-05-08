[应用缓存App Cache指南](#top)

- [1. 缓存清单文件manifest](#缓存清单文件)
  - [1.1 引用清单文件](#引用清单文件)
  - [1.2 清单文件结构](#清单文件结构)
- [2. 更新缓存](#更新缓存)
  - [2.1 缓存状态 ](#缓存状态)
  - [2.2 更新缓存](#更新缓存)
  - [2.3 监听缓存](#监听缓存)
  - [2.4 AppCache 事件](#AppCache事件)

使用缓存接口HTML5 ApplicationCache可为应用带来以下三个优势：

- 离线浏览 - 用户可在离线时浏览您的完整网站
- 速度 - 缓存资源为本地资源，因此加载速度较快。
- 服务器负载更少 - 浏览器只会从发生了更改的服务器下载资源。

应用缓存（又称 AppCache）可让开发人员指定浏览器应缓存哪些文件以供离线用户访问。即使用户在离线状态下按了刷新按钮，您的应用也会正常加载和运行。

<h3 id="缓存清单文件">1. 缓存清单文件manifest</h3>

<h4 id="缓存清单文件">1.1 引用清单文件</h4>

```html
<html manifest="example.appcache">
```

- manifest 属性可指向绝对网址或相对路径，但绝对网址必须与相应的网络应用同源
- 清单文件可使用任何文件扩展名，但必须以正确的MIME类型提供, 清单文件必须以`text/cache-manifest MIME`类型提供。可能需要向网络服务器或.htaccess 配置添加自定义文件类型, 
  - 在Apache中提供此MIME类型，在配置文件中添加一行内容：`AddType text/cache-manifest .appcache`
  - 在 Google App Engine的app.yaml文件中提供MIME类型，添加以下内容：

  ```
  - url: /mystaticdir/(.*\.appcache)
  static_files: mystaticdir/\1
  mime_type: text/cache-manifest
  upload: mystaticdir/(.*\.appcache)
  ```

[back to top](#top)

<h4 id="清单文件结构">1.2 清单文件结构</h4>

```shell 
CACHE MANIFEST    #在第一行，且必不可少
index.html
stylesheet.css
images/logo.png
scripts/main.js
```

清单可包括以下三个不同部分：CACHE、NETWORK 和 FALLBACK(这些部分可按任意顺序排列，且每个部分均可在同一清单中重复出现)

- CACHE：这是条目的默认部分。系统会在首次下载此标头下列出的文件（或紧跟在 CACHE MANIFEST 后的文件）后显式缓存这些文件
- NETWORK：此部分下列出的文件是需要连接到服务器的白名单资源。无论用户是否处于离线状态，对这些资源的所有请求都会绕过缓存。可使用通配符
- FALLBACK：此部分是可选的，用于指定无法访问资源时的后备网页。其中第一个 URI 代表资源，第二个代表后备网页。两个 URI 必须相关，并且必须与清单文件同源。可使用通配符

```shell
# 案例1： 定义了用户尝试离线访问网站的根时显示的“综合性”网页 (offline.html)，也表明了其他所有资源（例如远程网站上的资源）均需要互联网连接
CACHE MANIFEST   #在第一行，且必不可少
# 2010-06-18:v3
# Explicitly cached entries
index.html
css/style.css
# offline.html will be displayed if the user is offline
FALLBACK:
/ /offline.html
# All other resources (e.g. sites) require the user to be online. 
NETWORK:
*
# Additional resources to cache
CACHE:
images/logo1.png
images/logo2.png
images/logo3.png

# 案例2
CACHE MANIFEST   #在第一行，且必不可少
# 2010-06-18:v2
# Explicitly cached 'master entries'.
CACHE:
/favicon.ico
index.html
stylesheet.css
images/logo.png
scripts/main.js
# Resources that require the user to be online.
NETWORK:
login.php
/myapi
http://api.twitter.com
# static.html will be served if main.py is inaccessible
# offline.jpg will be served in place of all images in images/large/
# offline.html will be served in place of all other .html files
FALLBACK:
/main.py /static.html
images/large/ images/offline.jpg
*.html /offline.html
```

说明: 

- 网站的缓存数据量不得超过 5 MB。不过，如果您要编写的是针对 [Chrome 网上应用店](http://code.google.com/chrome/apps/docs/developers_guide.html)的应用，可使用 unlimitedStorage 取消该限制。
- 如果清单文件或其中指定的资源无法下载，就无法进行整个缓存更新进程。在这种情况下，浏览器将继续使用原应用缓存。
- 系统会自动缓存引用清单文件的 HTML 文件。因此无需将其添加到清单中，但建议您这样做。
- HTTP 缓存标头以及对通过SSL提供的网页设置的缓存限制将被替换为缓存清单。因此，通过 https 提供的网页可实现离线运行

[back to top](#top)

<h3 id="更新缓存">2. 更新缓存</h3>

应用在离线后将保持缓存状态（应用缓存只在其清单文件发生更改时才会更新），除非发生以下某种情况：

- 用户清除了浏览器对网站的数据存储： 例如，如果修改了图片资源或更改了JavaScript函数，这些更改不会重新缓存，必须修改清单文件本身才能让浏览器刷新缓存文件
- 清单文件经过修改。请注意：更新清单中列出的某个文件并不意味着浏览器会重新缓存该资源。清单文件本身必须进行更改
- 应用缓存通过编程方式进行更新： 如使用生成的版本号、文件哈希值或时间戳创建注释行，可确保用户获得您的软件的最新版。还可以在出现新版本后，以编程方式更新缓存

<h4 id="缓存状态">2.1 缓存状态</h4>

`window.applicationCache`对象是对浏览器的应用缓存的编程访问方式。其`status`属性可用于查看缓存的当前状态：

```JavaScript
var appCache = window.applicationCache;
switch (appCache.status) {
  case appCache.UNCACHED: // UNCACHED == 0
    return 'UNCACHED';
    break;
  case appCache.IDLE: // IDLE == 1
    return 'IDLE';
    break;
  case appCache.CHECKING: // CHECKING == 2
    return 'CHECKING';
    break;
  case appCache.DOWNLOADING: // DOWNLOADING == 3
    return 'DOWNLOADING';
    break;
  case appCache.UPDATEREADY:  // UPDATEREADY == 4
    return 'UPDATEREADY';
    break;
  case appCache.OBSOLETE: // OBSOLETE == 5
    return 'OBSOLETE';
    break;
  default:
    return 'UKNOWN CACHE STATUS';
    break;
};
```

[back to top](#top)

<h4 id="更新缓存">2.2 更新缓存</h4>

```JavaScript
appCache.update();       // 1) Attempt to update the user's cache. 先调用 applicationCache.update()。此操作将尝试更新用户的缓存（前提是已更改清单文件）
//...
if (appCache.status == window.applicationCache.UPDATEREADY) {
  appCache.swapCache();  // 2) The fetch was successful, swap in the new cache.  applicationCache.status处于UPDATEREADY状态时，调用 applicationCache.swapCache()即可将原缓存换成新缓存
}
```

以这种方式使用 update() 和 swapCache() 不会向用户提供更新的资源。此流程只是让浏览器检查是否有新的清单、下载指定的更新内容以及重新填充应用缓存。因此，还需要对网页进行两次重新加载才能向用户提供新的内容，其中第一次是获得新的应用缓存，第二次是刷新网页内容

[back to top](#top)

<h4 id="监听缓存">2.3 监听缓存</h4>

可设置监听器，以监听网页加载时的 updateready 事件

```JavaScript
// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);
}, false);
```

[back to top](#top)

<h4 id="AppCache事件">2.4 AppCache 事件</h4>

```JavaScript
function handleCacheEvent(e) {
  //...
}
function handleCacheError(e) {
  alert('Error: Cache failed to update!');
};
// Fired after the first cache of the manifest.
appCache.addEventListener('cached', handleCacheEvent, false);
// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener('checking', handleCacheEvent, false);
// An update was found. The browser is fetching resources.
appCache.addEventListener('downloading', handleCacheEvent, false);
// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener('error', handleCacheError, false);
// Fired after the first download of the manifest.
appCache.addEventListener('noupdate', handleCacheEvent, false);
// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);
// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener('progress', handleCacheEvent, false);
// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener('updateready', handleCacheEvent, false);
```

[back to top](#top)

> Reference

- [应用缓存初级使用指南](https://www.html5rocks.com/zh/tutorials/appcache/beginner/)
- [ApplicationCache API 规范](http://www.whatwg.org/specs/web-apps/current-work/#applicationcache)
