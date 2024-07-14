[vue中Axios的封装和API接口的管理](#top)

-------------------------------------

- [请求流程](#请求流程)
  - [拦截器](#拦截器)
- [Axios几个常用类型](#axios几个常用类型)
  - [AxiosInstance- axios实例的类型](#axiosinstance--axios实例的类型)
  - [AxiosStatic](#axiosstatic)
  - [AxiosResponse- 响应的数据类型](#axiosresponse--响应的数据类型)
  - [AxiosError](#axioserror)
- [TS封装](#ts封装)
- [sample 1- vue中Axios的封装和API接口的管理](#sample-1--vue中axios的封装和api接口的管理)
  - [环境的切换](#环境的切换)
  - [封装, 请求拦截、响应拦截、错误统一处理](#封装-请求拦截响应拦截错误统一处理)
  - [引入](#引入)
- [Sample 2](#sample-2)
  - [使用](#使用)

------------------------------------------------------------------------

## 请求流程

![请求流程](请求流程.png)

### 拦截器

- 一类是 请求接口前的统一处理（请求拦截）
  - 请求调整
  - 用户标识
- 一类是 请求接口后的统一处理（响应拦截）
  - 网络错误处理
  - 授权错误处理
  - 普通错误处理
  - 代码异常处理

## Axios几个常用类型

###　AxiosRequestConfig- 传入配置config的类型/请求的数据类型

- `axios(config: AxiosRequestConfig)`
- 使用axios发送请求传递参数的类型。当然它也是请求拦截器里面的参数类型
- 常用的有url、method、params、data、headers、baseURL、timeout

```js
export interface AxiosRequestConfig {
  // `url` 是用于请求的服务器 URL
  url?: string;
  // `method` 是创建请求时使用的方法
  method?: Method;
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL?: string;
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  // `headers` 是即将被发送的自定义请求头
  headers?: any;
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params?: any;
  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  paramsSerializer?: (params: any) => string;
  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data?: any;
  // `timeout` 指定请求超时的毫秒数。默认值是 `0` (永不超时)
  // 如果请求超过 `timeout` 的时间，请求将被中断
  timeout?: number;
  // 超时提示消息
  timeoutErrorMessage?: string;
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials?: boolean;
  // `adapter` 允许自定义处理请求，以使测试更轻松
  adapter?: AxiosAdapter;
  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  auth?: AxiosBasicCredentials;
  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType?: ResponseType;
  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName?: string;
  // `xsrfHeaderName` 是携带 xsrf 令牌值的 http 标头的名称
  xsrfHeaderName?: string;
  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress?: (progressEvent: any) => void;
  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress?: (progressEvent: any) => void;
  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength?: number;
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus?: ((status: number) => boolean) | null;
  // 请求体最大尺寸
  maxBodyLength?: number;
  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects?: number;
  // `socketPath` 定义了一个在 node.js 中使用的 UNIX Socket。
  // 只能指定 `socketPath` 或 `proxy`。
  // 如果两者都指定，则使用 `socketPath`。
  socketPath?: string | null;
  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
  httpAgent?: any;
  httpsAgent?: any;
  // 'proxy' 定义代理服务器的主机名称和端口
  proxy?: AxiosProxyConfig | false;
  // `cancelToken` 指定用于取消请求的 cancel token
  cancelToken?: CancelToken;
  // 将其设置为`false`，它将不会解压缩您的响应，而是保留原始的Content-Encoding头。
  // 默认是true
  decompress?: boolean;
  // 控制响应数据是否转换
  transitional?: TransitionalOptions
}
```

[⬆ back to top](#top)

### AxiosInstance- axios实例的类型

- 使用`axios.create(config?: AxiosRequestConfig)`创建出来的对象都是AxiosInstance类型

```js
export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;

  // 拥有如下便捷方法
  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}
```

### AxiosStatic

- axios其实是AxiosStatic类型，并且继承了AxiosInstance类型。所以是两者的结合。相较axios.create(config?: AxiosRequestConfig)创建出来的实例对象，axios功能是更强大的

```js
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel(value: any): boolean;
  
  // 并发请求
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  // 切分并发结果
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  isAxiosError(payload: any): payload is AxiosError;
}
declare const axios: AxiosStatic;
```

[⬆ back to top](#top)

### AxiosResponse- 响应的数据类型

- axios请求返回值类型都是AxiosResponse类型
- 并且AxiosResponse是一个接口泛型，这个泛型会应用到后端返回的data上。所以可以根据后端接口返回定义不同的类型传递进去

```js
export interface AxiosResponse<T = any>  {
  // 后端接口数据
  data: T;
  // http状态码
  status: number;
  // 来自服务器响应的 HTTP 状态信息
  statusText: string;
  // 响应头
  headers: any;
  // 请求配置信息
  config: AxiosRequestConfig;
  // 请求
  request?: any;
}
```

### AxiosError

```js
export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}
```

[⬆ back to top](#top)

## TS封装

- 基础封装: 封装了一个request通用方法
- 拦截器封装: 对`axios.create()`创建的实例调用`interceptors`下的两个拦截器即可
- 常用方法封装: 更具体的封装get、post、put、delete方法

```ts
// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Result<T> = {
  code: number;
  message: string;
  result: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: "/api", timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem("token") as string
        if(token) {
          config.headers!.Authorization = token;
        }
        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然也可以只返回res.data
        // 系统如果有自定义code也可以在这里处理
        return res;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = "";
        switch (err.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";  // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 408:
            message = "请求超时(408)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          case 501:
            message = "服务未实现(501)";
            break;
          case 502:
            message = "网络错误(502)";
            break;
          case 503:
            message = "服务不可用(503)";
            break;
          case 504:
            message = "网络超时(504)";
            break;
          case 505:
            message = "HTTP版本不受支持(505)";
            break;
          default:
            message = `连接出错(${err.response.status})!`;
        }
        // 这里错误消息可以使用全局弹框展示出来
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response);
      }
    );
  }
  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }
   //常用方法封装
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }
  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}
// 默认导出Request实例
export default new Request({})
```

[⬆ back to top](#top)

## sample 1- vue中Axios的封装和API接口的管理

### 环境的切换

```js
// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'xxx';
} else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'xxx';
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'xxx';
}
```

### 封装, 请求拦截、响应拦截、错误统一处理

```js
/**
 * axios封装  请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Toast } from 'vant';
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {    
    Toast({        
        message: msg,        
        duration: 1000,        
        forbidClick: true    
    });
}
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}
/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        case 401:     // 401: 未登录状态，跳转登录页
            toLogin();
            break;
        case 403:     // 403 token过期 - 清除token并跳转登录页
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        case 404:      
            tip('请求的资源不存在'); 
            break;
        default:
            console.log(other);   
        }}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 12});      // 超过了10s，就会告知用户当前请求超时，请刷新等
// 设置post请求头, 默认设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/** 
 * 请求拦截器 - 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    config => {        
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => Promise.error(error))
// 响应拦截器
instance.interceptors.response.use(    
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
               store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    });
export default instance;
```

### 引入

- 项目的src目录中，新建一个request文件夹，然后在里面新建一个http.js和一个api.js文件
  - http.js文件用来封装我们的axios，
  - api.js用来统一管理接口

```js
// 在http.js中引入axios
import axios from 'axios'; // 引入axios
import QS from 'qs';       // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant'; 
```

```
├── 📂api
│     ├── 📄index.js     - api的出口
│     ├── 📄base.js      - 管理接口域名
│     ├── 📄article.js   - 管理各个模块的接口
```

[⬆ back to top](#top)

## Sample 2

1. 正常请求该有的（跨域携带cookie，token，超时设置）
2. 请求响应拦截器
   - 请求成功，业务状态码200，解析result给我，我不想一层一层的去判断拿数据
   - http请求200， 业务状态码非200，说明逻辑判断这是不成功的，那就全局message提示服务端的报错
   - http请求非200， 说明http请求都有问题，也全局message提示报错
   - http请求或者业务状态码401都做注销操作
3. 全局的loading配置, 默认开启，可配置关闭
4. 统一文件下载处理 

```js
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Message } from "element-ui";
import { jumpLogin } from "@/utils";
import { Loading } from "element-ui";
import { ElLoadingComponent } from "element-ui/types/loading";
// import vm from "@/main";

// 统一文件下载处理
let loadingInstance: ElLoadingComponent | null = null;
let requestNum = 0;
const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++;
  if (requestNum == 1) {
    loadingInstance = Loading.service({
      text: "正在努力加载中....",
      background: "rgba(0, 0, 0, 0)",
    });
  }
};
const cancelLoading = () => {
  // 取消loading 如果pending请求数量等于0，关闭loading
  requestNum--;
  if (requestNum === 0) loadingInstance?.close();
};
// 
export const createAxiosByinterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 1000,          //超时配置
    withCredentials: true,  //跨域携带cookie
    ...config,              // 自定义配置覆盖基本配置
  });
  // 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      console.log("config:", config);
      // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
      console.log("response:", response);
      const { code, data, message } = response.data;
      if (code === 200) return data;
      else if (code === 401) {
         jumpLogin();
      } else {
         Message.error(message);
         return Promise.reject(response.data);
      }
    },
    function (error) {
      // 对响应错误做点什么
      console.log("error-response:", error.response);
      console.log("error-config:", error.config);
      console.log("error-request:", error.request);
      if (error.response) {
        if (error.response.status === 401) {
          jumpLogin();
        }
      }
      Message.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error);
    }
  );
  return instance;
};
```

```js
// src/utils/index.ts
import { Message } from "element-ui";
import { AxiosResponse } from "axios";
import vm from "@/main";
/**
 *   跳转登录
 */
export const jumpLogin = () => {
  vm.$Cookies.remove("vue_admin_token");
  vm.$router.push(`/login?redirect=${encodeURIComponent(vm.$route.fullPath)}`);
};
/**
 * 下载文件
 * @param response
 * @returns
 */
export const downloadFile = (response: AxiosResponse) => {
  console.log("response.data.type:", response.data.type);
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      try {
        console.log("result:", this.result);
        const jsonData = JSON.parse((this as any).result); // 成功 说明是普通对象数据
        if (jsonData?.code !== 200) {
          Message.error(jsonData?.message ?? "请求失败");
          reject(jsonData);
        }
      } catch (err) {
        // 解析成对象失败，说明是正常的文件流
        const blob = new Blob([response.data]);
        // 本地保存文件
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename = response?.headers?.["content-disposition"]
          ?.split("filename*=")?.[1]
          ?.substr(7);
        link.setAttribute("download", decodeURI(filename));
        document.body.appendChild(link);
        link.click();
        resolve(response.data);
      }
    };
    fileReader.readAsText(response.data);
  });
};
```

[⬆ back to top](#top)

### 使用

```js
import { createAxiosByinterceptors } from "@/api/request";
const request = createAxiosByinterceptors({
  baseURL: localhost:7007,
});

//lodaing配置
export const appList = (params: any): Promise<any> =>
  request.get("/app", { params, loading: true }); // 不需要默认的全局loading效果可配置loading为false关闭 loading默认为true

// 文件下载
export const exportGoods = (data: any) =>
  request.post("/export", data, {
    responseType: "blob",
  });
```

[⬆ back to top](#top)

> References
- [axios 中文文档](http://www.axios-js.com/zh-cn/docs/)
- [TypeScript实战之用TS封装Axios](https://juejin.cn/post/7113475007598034951)
- [Vue3.0+TS 简单封装axios](https://juejin.cn/post/6920525716656226311)
- [ts 封装 axios 技巧：充分利用类型检查与提示](https://juejin.cn/post/6969070102868131853)
- [vue中Axios的封装和API接口的管理](https://juejin.cn/post/6844903652881072141)
- [vue中Axios的封装和API接口的管理](https://juejin.cn/post/6844903652881072141)
- [在项目中用ts封装axios，一次封装整个团队受益](https://juejin.cn/post/7071518211392405541)
- [前端架构带你 封装axios，一次封装终身受益](https://juejin.cn/post/7124573626161954823)
------------------------------------------------------------

