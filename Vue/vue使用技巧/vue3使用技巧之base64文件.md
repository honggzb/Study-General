1. 将base64文件保持为 img.dataUrl
2. vue3: vite可以直接支持各种文件

```html
import dataurl from './img.dataUrl?raw'
<img :src="dataurl" alt="">
```

3. vue2: 配置webpack

```ts
//vue.config.js
module.exports = defineConfig({
  configureWebpack: {
    module: {
      rules: [
        { test: /\.dataurl$/, loader: 'raw-loader'}
      ]
    }
  }
})
```
