## 打造你的专属主页：用 JavaScript 创建简约 Chrome 扩展

### 组成部分

- 清单文件： 一个 '.json' 文件，包含运行扩展的指令，以及扩展所需的权限。
- 应用程序文件： 包括 'HTML' '文件、JavaScript' 文件、'CSS' 文件、图片、图标以及扩展功能所需的其他资源

```js
{
  "manifest_version": 3,
  "name": "Minimalistic homepage",
  "version": "1.0",
  "description": "A Minimalistic homepage for my Chrome browser",
  "chrome_url_overrides": {       // Chrome 默认提供了一个新的标签页；通过 chrome_url_overrides，我们告诉 Chrome 我们将用一个自定义的标签页覆盖默认的标签页
    "newtab": "home.html"
  }
}
```

- ipapi.co  是一个 API，可以根据用户的 IP 地址获取当前位置。
- api.openweathermap.org  是一个 API，允许开发者访问任何位置的当前天气数据、预报和历史天气数据

[⬆ back to top](#top)

## 上传 Chrome 扩展

1. 确保所有文件都在同一个文件夹中
2. 导航到 Chrome 的扩展程序页面。也可以直接转到 chrome://extensions/。在右上角，启用 开发者模式
3. 在左上角，点击 '加载解压的扩展程序' 按钮，选择包含所有文件的文件夹
