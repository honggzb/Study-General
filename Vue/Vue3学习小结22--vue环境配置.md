[Vue3学习小结22--vue环境变量配置](#top)

- [配置步骤](#配置步骤)
- [Vite环境变量](#vite环境变量)
- [vite多环境配置](#vite多环境配置)
  - [1. 添加配置文件](#1-添加配置文件)
  - [2. 配置package.json](#2-配置packagejson)
  - [3. 在项目中使用](#3-在项目中使用)

-------------------------------------

## 配置步骤

1. 在项目根目录下(与package.json同级)新建三个".env"文件
   - ![alt text](image.png)
2. 配置package.json文件

```
"scripts": {
    "dev": "vite --mode development",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
```

## Vite环境变量

- 在项目文件中使用使用环境变量
  - Vite在一个特殊的`import.meta.env`对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量
- 在`vite.config.ts` 使用环境变量
  - vite使用nodejs，所以环境变量是：`process.env`, 通过`loadEnv()`去读取`process.env`的值
  - `vite.config.ts`文件中改成输出一个函数

```ts
// import.meta.env 对象
{
  "BASE_URL":"/",       //部署时的URL前缀
  "MODE":"development", //运行模式
  "DEV":true,           //是否在dev环境
  "PROD":false,         //是否是build 环境
  "SSR":false           //是否是SSR 服务端渲染模式
}
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default ({mode}:any) => {
  console.log(loadEnv(mode,process.cwd()))
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
} 
```

- 配置智能提示: create 'env.d.ts' in root directory
- 然后'App.vue' 输出 `JSON.stringify(import.meta.env)`

```
interface ImportMetaEnv {
  VITE_MODE_NAME: string,
  VITE_APP_ID: string,
  VITE_AGENT_ID: string,
  VITE_LOGIN_TEST: string,
  VITE_RES_URL: string,
  VITE_APP_TITLE: string
}
```

[⬆ back to top](#top)

## vite多环境配置

### 1. 添加配置文件

- 在项目根目录下(与package.json同级)新建三个".env"文件: '.env.user', '.env.admin',  '.env.admin'

```shell
# .env.user
# 接口请求地址前缀
VITE_APP_API_PREFIX = /api

# 删除 console 代码
VITE_DROP_CONSOLE = true

# 生产环境配置文件名称
VITE_GLOB_CONFIG_FILE_NAME = app.config.js

# 打包生成目录
VITE_OUTPUT_DIR = user

# 平台
VITE_PLATFORM = user

# 重定向路径
VITE_REDIRECT_INDEX = "/index"
```

```shell
# .env.admin
# 接口请求地址前缀
VITE_APP_API_PREFIX = /admin-api

# 删除 console 代码
VITE_DROP_CONSOLE = true

# 生产环境配置文件名称
VITE_GLOB_CONFIG_FILE_NAME = app.config.js

# 打包生成目录
VITE_OUTPUT_DIR = admin

# 平台
VITE_PLATFORM = expert

# 重定向路径
VITE_REDIRECT_INDEX = "/home"
```


```shell
# .env.admin
# 接口请求地址前缀
VITE_APP_API_PREFIX = /expert-api

# 删除 console 代码
VITE_DROP_CONSOLE = true

# 生产环境配置文件名称
VITE_GLOB_CONFIG_FILE_NAME = app.config.js

# 打包生成目录
VITE_OUTPUT_DIR = expert

# 平台
VITE_PLATFORM = expert

# 重定向路径
VITE_REDIRECT_INDEX = "/home"
```

### 2. 配置package.json

```
"scripts": {
    "dev": "vite",
    "build:admin": "vue-tsc --noEmit && vite build",
    "build:user": "vue-tsc --noEmit && vite build --mode user",
    "build:expert": "vue-tsc --noEmit && vite build --mode expert",
    "build": "npm run build:admin && npm run build:user && npm run build:expert",
},
```

### 3. 在项目中使用

`const baseUrl = import.meta.env.VITE_APP_API_PREFIX;`

```js
import axios from 'axios'
// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL as any,
    timeout: 6000,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
// http request 请求拦截器，在发送请求前会进行拦截，执行1部分的代码
service.interceptors.request.use(
    (config: any) => {
        // 1
        // 如果token存在，就将token赋值到header的Authorization，先知道逻辑即可，代码后面补充
        // if (getToken()) {
        // 	config.headers.Authorization = getToken()
        // }
        // 追加时间戳，防止GET请求缓存
        // if (config.method?.toUpperCase() === 'GET') {
        // 	config.params = { ...config.params, t: new Date().getTime() }
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
//  http response 响应拦截器，请求成功后，对返回的数据进行统一处理
service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            // 对接接口出错
            return Promise.reject(new Error(response.statusText || 'Error'))
        }
        const res = response.data
        // 响应成功，这里设置了0为响应成功的返回值，可根据实际后端返回的修改
        if (res.code === 0) {
            return res
        }
        // 没有权限，如：未登录、登录过期等，需要跳转到登录页
        // 这里401表示登录过期，403表示登录用户没有接口权限
        if (res.code === 401) {
            // 弹框提示登录过期，用户点击后跳转登录页，同时清空token，代码后面补充
        }
        if (res.code === 401) {
            // 弹框提示没有权限，用户点击重新登录跳转到登录页，点击关闭则只关闭弹框，代码后面补充
        }
        // 除了code=0、code=401、code=403的错误提示，代码后面补充
        return null
    },
    error => {
        return Promise.reject(error)
    }
)
// 导出 axios 实例
export default service
```

[⬆ back to top](#top)

> References
- [小满zs-csdn博客](https://blog.csdn.net/qq1195566313/category_11618172.html)
- [小满Vue3第四十二章（环境变量）](https://xiaoman.blog.csdn.net/article/details/126375974)
- [vite多环境配置](https://juejin.cn/post/7184349482102816825)
- [vue3 + vite 项目搭建 - 配置环境变量env](https://juejin.cn/post/6992495028425719815)
