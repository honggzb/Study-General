[TypeScript学习笔记---tsconfig.json配置文件](#top)

- [快速生成tsconfig.json](#快速生成tsconfigjson)
- [tsconfig.json重要字段](#tsconfigjson重要字段)
- [compilerOptions编译选项](#compileroptions编译选项)
- [include字段](#include字段)
- [案例](#案例)
- [在vscode上直接运行typescript](#在vscode上直接运行typescript)

---------------------------------------------------------------------

## 快速生成tsconfig.json

1. `npm install typescript -g`
2. 在项目目录下执行 `tsc --init`

## tsconfig.json重要字段

```javascript
{
	"include": [ "./src/**/*" ],
	"exclude": [ "./src/hello/**/*" ],
	"files": [ "roee.ts", "asfe.ts" ],
  "compilerOptions": {
    "outDir": "./dist",
		"outFile": "./dist.app.js",   // outFile 将代码合并为一个文件
    "src": [ "./src" ],  // 指定后可以在文件之直接 import * from 'src';
    //...
  }
}
```

- files - 指定被编译的文件，只有文件少时才会用
- include - 设置需要进行编译的文件，支持路径模式匹配
  - `**` 表示任意目录，
  - `*`表示任意文件
  - 默认值：`["src"]`
- exclude - 设置无需进行编译的文件，支持路径模式匹配
  - 默认值：`["node_modules", "bower_components", jspm_packages]`
- compilerOptions - 设置与编译流程相关的选项

[⬆ back to top](#top)

## compilerOptions编译选项

```javascript
{ 
  "compilerOptions": {      
    /* 基本选项 */   
    "target": "es5",                    // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'  
    "module": "commonjs",               // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'  
    "lib": [],                          // 指定要包含在编译中的库文件  
    "allowJs": true,                    // 允许编译 javascript 文件  
    "checkJs": true,                    // 报告 javascript 文件中的错误  
    "jsx": "preserve",                  // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react' 
    "declaration": true,                // 生成相应的 '.d.ts' 文件   
    "sourceMap": true,                  // 生成相应的 '.map' 文件   
    "outFile": "./",                    // 将输出文件合并为一个文件  
    "outDir": "./",                     // 指定输出目录   
    "rootDir": "./",                    // 用来控制输出目录结构 --outDir.  
    "removeComments": true,             // 删除编译后的所有的注释  
    "noEmit": true,                     // 不生成输出文件   
    "importHelpers": true,              // 从 tslib 导入辅助工具函数  
    "isolatedModules": true,            // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.   
    /* 严格的类型检查选项 */  
    "strict": true,                     // 启用所有严格类型检查选项   
    "noImplicitAny": true,              // 在表达式和声明上有隐含的 any类型时报错  
    "strictNullChecks": true,           // 启用严格的 null 检查   
    "noImplicitThis": true,             // 当 this 表达式值为 any 类型的时候，生成一个错误   
    "alwaysStrict": true,               // 以严格模式检查每个模块，并在每个文件里加入 'use strict'   
    /* 额外的检查 */  
    "noUnusedLocals": true,             // 有未使用的变量时，抛出错误   
    "noUnusedParameters": true,         // 有未使用的参数时，抛出错误   
    "noImplicitReturns": true,          // 并不是所有函数里的代码都有返回值时，抛出错误  
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿） 
    /* 模块解析选项 */   
    "moduleResolution": "node",         // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6) 
    "baseUrl": "./",                    // 用于解析非相对模块名称的基目录   
    "paths": {},                        // 模块名到基于 baseUrl 的路径映射的列表 
    "rootDirs": [],                     // 根文件夹列表，其组合内容表示项目运行时的结构内容  
    "typeRoots": [],                    // 包含类型声明的文件列表   
    "types": [],                        // 需要包含的类型声明文件名列表  
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。   
    /* Source Map Options */   
    "sourceRoot": "./",                 // 指定调试器应该找到 TypeScript 文件而不是源文件的位置   
    "mapRoot": "./",                    // 指定调试器应该找到映射文件而不是生成文件的位置  
    "inlineSourceMap": true,            // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件  
    "inlineSources": true,              // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性   
    /* 其他选项 */  
    "experimentalDecorators": true,     // 启用装饰器  
    "emitDecoratorMetadata": true       // 为装饰器提供元数据的支持 
  }
}
```

[⬆ back to top](#top)

## include字段

- include and exclude support wildcard characters to make glob patterns:
  - `*` matches zero or more characters (excluding directory separators)
  - `?` matches any one character (excluding directory separators)
  - `**`/ matches any directory nested to any level
- If the last path segment in a pattern does not contain a file extension or wildcard character, then it is treated as a directory, and files with supported extensions inside that directory are included (e.g. .ts, .tsx, and .d.ts by default, with .js and .jsx if allowJs is set to true)

```javascript
 "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
```

- tsconfig.json默认查询 .ts, .tsx, and .d.ts
- 所以 要写Vue的时候，tsconfig.json文件的include属性必须要写`src/**/*.vue`， 不然的话不会检查 `.vue`文件

[⬆ back to top](#top)


## 案例

```javascript
{
  "compileOnSave": false,
  "buildOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "build",
    "module": "esnext",
    "target": "es6",
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "lib": [
      "es6",
      "dom"
    ],
    "sourceMap": true,
    "allowJs": true,
    "rootDir": "./",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "importHelpers": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "ice": [
        ".ice"
      ]
    },
    "resolveJsonModule": true
  },
  "include": [
    "src",
    ".ice",
    "src/typings.d.ts"
  ],
  "exclude": [
    "node_modules",
    "build",
    "public"
  ]
}
```

[⬆ back to top](#top)

## 在vscode上直接运行typescript

1. 全局上安装ts-node包 `npm install typescript ts-node @types/node@* -g`
	- [ts-node官网](https://www.npmjs.com/package/ts-node#installation) 
3. 在vscode上安装Code Runner插件
4. 点击右上角的运行按钮即可在输出面板看到运行结果

[⬆ back to top](#top)

> references(
- [TypeScript官网](https://www.typescriptlang.org/zh/tsconfig)
- [TypeScript 学习笔记（五）--- tsconfig.json 配置文件](https://blog.csdn.net/weixin_45092437/article/details/124022158)
- [如何在vscode上直接运行typescript?](https://www.cnblogs.com/jesse131/p/13234182.html)
