[angular 9 升级 angular 10](#top)

## 问题

### 单例服务 Singleton services

```javascript
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule
    };
  }
}
//修改为
static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
        ngModule: ThemeModule
    };
}
```

### CommonJS or AMD dependencies can cause optimization bailouts warning

- 解决办法：配置 CommonJS 依赖项
- 修改 angular.json
  - projects > 项目名 > architect > build > options
  - 添加 `allowedCommonJsDependencies` 填入依赖名

```
"options": {
    "allowedCommonJsDependencies": [
        "lodash",
        "jsonapi-deserializer"
    ],
}
```

- [那些遇到过的问题:标签: angular12](https://qa.1r1g.com/sf/ask/tagged/angular12/1)
