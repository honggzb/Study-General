[Axios请求与浏览器缓存控制](#top)

- [浏览器缓存类型](#浏览器缓存类型)
- [Axios与缓存](#axios与缓存)
  - [禁用缓存](#禁用缓存)
  - [设置缓存](#设置缓存)
  - [协商缓存](#协商缓存)
  - [现有的请求库](#现有的请求库)
 ---------------------------------------------------------------
 ## 浏览器缓存类型

- <mark>强制缓存</mark>由HTTP响应头中的`Cache-Control`和`Expires`控制，当这些头存在且有效时，浏览器将直接从缓存中读取数据而无需向服务器发送请求
- <mark>协商缓存</mark>则依赖于`If-None-Match`和`If-Modified-Since`这样的请求头，服务器会根据这些头判断资源是否已更改，从而决定是否发送完整的响应

## Axios与缓存

- Axios是一个基于Promise的HTTP客户端，用于浏览器和node.js
- 默认情况下，Axios不会自动设置缓存控制头，这意味着它遵循服务器的缓存策略

### 禁用缓存

```js
import axios from 'axios';
axios.get('/api/data', {
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache'
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
//另一种方式是通过改变请求的URL或请求体来绕过缓存，比如添加一个随机数作为查询参数
axios.get('/api/data?_=' + Date.now()).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
```

[⬆ back to top](#top)

### 设置缓存

```js
// 利用缓存可以显著提升应用性能。例如，对于不常变化的数据，可以设置较长的缓存时间
import axios from 'axios';
axios.get('/api/static-data', {
  headers: {
    'Cache-Control': 'max-age=3600' // 缓存1小时
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
```

[⬆ back to top](#top)

### 协商缓存

- 协商缓存允许服务器验证资源是否已被修改，从而避免不必要的数据传输。在Axios中，可以利用`If-None-Match`或`If-Modified-Since`头来实现

```js
// 利用缓存可以显著提升应用性能。例如，对于不常变化的数据，可以设置较长的缓存时间
import axios from 'axios';
axios.get('/api/data', {
  headers: {
    'If-None-Match': 'some-etag-value' // 从之前的响应中获取的ETag值
  }
}).then(response => {
  if (response.status === 304) {
    console.log('Resource not modified');
  } else {
    console.log(response.data);
  }
}).catch(error => {
  console.error(error);
});
```

### 现有的请求库

- [umi-request](https://github.com/umijs/umi-request/): 基于 fetch 封装，自带缓存，错误检查等功能。
- [axios-cache-interceptor](https://axios-cache-interceptor.js.org/guide): 基于axios封装，不同版本axios使用差异较大。支持Memory，Local Storag，Session Storage等多种方式保存数据，且支持自定义方式接入

[⬆ back to top](#top)

> References
- [Axios 请求与浏览器缓存控制](https://juejin.cn/post/7390414281668821046)

