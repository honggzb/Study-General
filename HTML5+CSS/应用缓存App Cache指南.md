[应用缓存App Cache指南](#top)

- [WebView的缓存](#WebView的缓存)
- [1. 缓存清单文件manifest](#缓存清单文件)
  - [1.1 引用清单文件](#引用清单文件)
  - [1.2 清单文件结构](#清单文件结构)
- [2. 更新缓存](#更新缓存)
  - [2.1 缓存状态 ](#缓存状态)
  - [2.2 更新缓存](#更新缓存)
  - [2.3 监听缓存](#监听缓存)
  - [2.4 AppCache 事件](#AppCache事件)
  
在Web应用领域，Web缓存大致可以分为以下几种类型

- **数据库数据缓存**: Web应用，特别是SNS类型的应用，往往关系比较复杂，数据库表繁多，如果频繁进行数据库查询，很容易导致数据库不堪重荷。为了提供查询的性能，会将查询后的数据放到内存中进行缓存，下次查询时，直接从内存缓存直接返回，提供响应效率。比如常用的缓存方案有memcached等。
- **浏览器端缓存**: 浏览器缓存根据一套与服务器约定的规则进行工作，在同一个会话过程中会检查一次并确定缓存的副本足够新。如果你浏览过程中，比如前进或后退，访问到同一个图片，这些图片可以从浏览器缓存中调出而即时显现。
- **服务器端缓存**: 代理服务器缓存:代理服务器是浏览器和源服务器之间的中间服务器，浏览器先向这个中间服务器发起Web请求，经过处理后（比如权限验证，缓存匹配等），再将请求转发到源服务器。代理服务器缓存的运作原理跟浏览器的运作原理差不多，只是规模更大。可以把它理解为一个共享缓存，不只为一个用户服务，一般为大量用户提供服务，因此在减少相应时间和带宽使用方面很有效，同一个副本会被重用多次。常见代理服务器缓存解决方案有Squid等，这里不再详述。
- **CDN缓存**: CDN（Content delivery networks）缓存，也叫网关缓存、反向代理缓存。CDN缓存一般是由网站管理员自己部署，为了让他们的网站更容易扩展并获得更好的性能。浏览器先向CDN网关发起Web请求，网关服务器后面对应着一台或多台负载均衡源服务器，会根据它们的负载请求，动态将请求转发到合适的源服务器上。虽然这种架构负载均衡源服务器之间的缓存没法共享，但却拥有更好的处扩展性。从浏览器角度来看，整个CDN就是一个源服务器，从这个层面来说，本文讨论浏览器和服务器之间的缓存机制，在这种架构下同样适用。
- **Web应用层缓存**: 应用层缓存指的是从代码层面上，通过代码逻辑和缓存策略，实现对数据，页面，图片等资源的缓存，可以根据实际情况选择将数据存在文件系统或者内存中，减少数据库查询或者读写瓶颈，提高响应效率。

<h3 id="WebView的缓存">WebView的缓存</h3>

- **页面缓存**: 指加载一个网页时的html、JS、CSS等页面或者资源数据。这些缓存资源是由于浏览器的行为而产生，开发者只能通过配置HTTP响应头影响浏览器的行为才能间接地影响到这些缓存数据。
  - 索引存放在/data/data/package_name/databases下
  - 文件存放在/data/data/package_name/cache/xxxwebviewcachexxx下。文件夹的名字在2.x和4.x上有所不同，但都文件夹名字中都包含webviewcache
- **数据缓存**: 数据缓存分为两种：AppCache和DOM Storage（Web Storage）。他们是因为页面开发者的直接行为而产生。所有的缓存数据都由开发者直接完全地掌控
  - **AppCache**: AppCache使我们能够有选择的缓冲web浏览器中所有的东西，从页面、图片到脚本、css等等。尤其在涉及到应用于网站的多个页面上的CSS和JavaScript文件的时候非常有用。其大小目前通常是5M。
    - 在Android上需要手动开启（setAppCacheEnabled），并设置路径（setAppCachePath）和容量（setAppCacheMaxSize）
    - Android中Webkit使用一个db文件来保存AppCache数据（my_path/ApplicationCache.db）
   - **DOM Storage（Web Storage）**: 根据作用范围的不同，有Session Storage和Local Storage两种，分别用于会话级别的存储（页面关闭即消失）和本地化存储（除非主动删除，否则数据永远不会过期）
     - 在Android中可以手动开启DOM Storage（setDomStorageEnabled），设置存储路径（setDatabasePath）
     - Android中Webkit会为DOM Storage产生两个文件（my_path/localstorage/http_h5.m.taobao.com_0.localstorage和my_path/localstorage/Databases.db）
     - 另外，在Android中清除缓存时，如果需要清除Local Storage的话，仅仅删除Local Storage的本地存储文件是不够的，内存里面有缓存数据。如果再次进入页面，Local Storage中的缓存数据同样存在。需要杀死程序运行的当前进程再重新启动才可以

[back to top](#top)

AppCache（又称 HTML5应用缓存）可让开发人员指定浏览器应缓存哪些文件以供离线用户访问。即使用户在离线状态下按了刷新按钮，应用也会正常加载和运行。

AppCache主要用于存储静态资源，在没有网络的情况下使用，通过创建cache manifest文件，可以轻松的创建离线应用, AppCache可为应用带来以下三个优势：

- 离线浏览 - 用户可在离线时浏览您的完整网站
- 速度 - 缓存资源为本地资源，因此加载速度较快
- 降低服务器压力(服务器负载更少) - 浏览器只会从发生了更改的服务器下载资源

<h3 id="缓存清单文件">1. 缓存清单文件manifest</h3>

<h4 id="引用清单文件">1.1 引用清单文件</h4>

Application Cache的使用要做两方面的工作：

- 服务器端需要维护一个manifest清单
- 浏览器上只需要一个简单的设置即可

```html
<html manifest="example.appcache">
```

- manifest 属性可指向绝对网址或相对路径，但绝对网址必须与相应的网络应用同源
- 清单文件可使用任何文件扩展名，但必须以正确的MIME类型提供, 清单文件必须以`text/cache-manifest MIME`类型提供, 否则报错`Application Cache Error event: Manifest fetch failed (404)`。必须在web服务器上进行配置，不同的服务器不一样, 需要向网络服务器或.htaccess 配置添加自定义文件类型
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

- CACHE：这是条目的默认部分。系统会在首次缓存此标头下列出的文件（或紧跟在 CACHE MANIFEST 后的文件）
- NETWORK：此部分下列出的文件是需要连接到服务器的白名单资源（在此标题下列出的文件需要与服务器的链接，且不会被缓存）。无论用户是否处于离线状态，对这些资源的所有请求都会绕过缓存。可使用通配符
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

# All other resources (e.g. sites) require the user to be online. 不需要缓存的
NETWORK:
*

# Additional resources to cache, 需要缓存的列表
CACHE:  
images/logo1.png
images/logo2.png
images/logo3.png

# 案例2
CACHE MANIFEST   #在第一行，且必不可少
# 2010-06-18:v2  #version表示当前manifest的版本，当version发生变化的时候，此时当用户再次加载的时候，会将CACHE标签下列出的所有文件重新下载一次
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

FALLBACK:  #访问缓存失败后，备用访问的资源, 第一个是访问源，第二个是替换文件
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
if(appCache.status == window.applicationCache.UPDATEREADY) {
  appCache.swapCache();  // 2) The fetch was successful, swap in the new cache.  applicationCache.status处于UPDATEREADY状态时，调用 applicationCache.swapCache()即可将原缓存换成新缓存
}else{
   console.log("manifest 没有改变");   //manifest文件没有变化
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
        window.location.reload();   //重新加载当前页面
      }
    } else {
      console.log("manifest 没有改变");   // Manifest didn't changed. Nothing new to server.
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

**另外我们还可以通过navaigator对象的onLine属性来判断当前浏览器是否在线，该属性属于只读属性，会返回boolean类型的值**

```javascript
if(window.navigator.onLine) {
    //在线
} else {
    //离线
}
```

> Reference

- [应用缓存初级使用指南](https://www.html5rocks.com/zh/tutorials/appcache/beginner/)
- [HTML5应用程序缓存Application Cache](http://www.cnblogs.com/yexiaochai/p/4271834.html)
- [ApplicationCache API 规范](http://www.whatwg.org/specs/web-apps/current-work/#applicationcache)
- [HTML 5 Web 存储 与 应用缓存](http://blog.csdn.net/bamboolsu/article/details/49885955)
