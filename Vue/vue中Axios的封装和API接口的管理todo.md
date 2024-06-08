[vue中Axios的封装和API接口的管理](#top)

-------------------------------------

## 引入

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

[⬆ back to top](#top)

## 环境的切换

```js
// 环境的切换- 通过node的环境变量来匹配我们的默认的接口url前缀
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = 'https://www.baidu.com';} 
else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = 'https://www.production.com';
}
```

[⬆ back to top](#top)

> References
- [vue中Axios的封装和API接口的管理](https://juejin.cn/post/6844903652881072141)
- [在项目中用ts封装axios，一次封装整个团队受益](https://juejin.cn/post/7071518211392405541)
- [前端架构带你 封装axios，一次封装终身受益](https://juejin.cn/post/7124573626161954823)
