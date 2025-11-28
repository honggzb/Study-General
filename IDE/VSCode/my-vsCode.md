[My VSCode settings](#top)

- [在vscode上直接运行TypeScript文件](#在vscode上直接运行typescript文件)
- [自定义代码片段snippets](自定义代码片段snippets)
- [Plugin](#plugin)
- [useful Tool plugin](#useful-tool-plugin)
- [功能性](#功能性)
- [代码片段插件](#代码片段插件)
  - [语法校验](#语法校验)
- [Open code Outline](#open-code-outline)
- [自定义设置参考](#自定义设置参考)
  - [Auto Close Tag设置- settings.json](#auto-close-tag设置--settingsjson)
- [Theme](#theme)

--------------------------------------------------------------------

- `header>img.logo+nav>ul.menu>(li>a)*3`

## 在vscode上直接运行TypeScript文件

1. install `Code Runner` extension
2. 点击右上角的'运行(三角箭头)'按钮直接运行TypeScript文件

## 自定义代码片段snippets

- snippets appear in IntelliSense ->  **Ctrl+Space**
- 左下角 “齿轮”图标  --> 选择“User Snippets”   -->  在顶部输入框， 输入vue， 打开vue.json

```
{
  "Print to console": {
		"prefix": "vue3",
		"body": [
			"<template>",
			"  <div></div>",
			"</template>",
			"",
			"<script lang='ts' setup name='A'>",
			"import { reactive, ref } from 'vue'",
			"",	
			"</script>",
			"",	
			"<style scoped>",
			"",
			"</style>",
		],
		"description": "Log output to console"
	}
}
```

[⬆ back to top](#top)

## Plugin

- **Million Lint**: 找出react性能优化

```
-----------------------------|-------------------------------------------------------------------------
*ES7 React/Redux/GraphQL     | 代码快捷键如rafce
</React-Native snippets      |
*beautify                    |良好的拓展性，可以格式化JSON|JS|HTML|CSS|SCSS,比内置格式化好用
*auto close tag              | 匹配标签，关闭对应的标签。很实用【HTML/XML】
*auto rename tag             | Auto Rename Tag : sublime和webstorm也有这个内置功能， 改变标签的时候同时改动开闭合标签；【HTML/XML】
*change-case                 | 各种字符格式化
*Paste JSON as Code          | converts a JSON to any language
json2ts                      | converts a JSON to TypeScript interfaces
*npm                         |
*npm intellisense            |   
*open in browser             |
*Path Autocomplete           | 路径智能补全
*any-rule                    | 正则大全
project-tree                 | 自动生成项目结构 generates a tree directory in README.md.
Code Runner                  | 在vscode上直接运行TypeScript文件
 bracket pair colorizer      |
 auto import                 |
 Color Picker                |
 Css peek                    |
 Document This               | JSDOC注解调用，值得易用, JSDoc(Ctrl+Alt+D and Ctrl+Alt+D again)
*Markdown All in One         |
 Markdown Preview Enhanced   |
*Markdown Extended           |
 node.js Modules Intellisense|
 Path Intellisense           | 路径智能提示
 SCSS IntelliSense Preview   | SCSS智能提醒，配置强大
 Highlight Matching Tag      |
*select highlight in minimap |
 View Node Package           |
 Git History                 | 不得不赞的插件，谁用谁知道，功能很赞
 Quokka.js                   | Quokka is a debugging tool that gives live feedback on the code
                             | you are writing for javascript
 Better Comments             | colorful comment
*Template String Converter   | convert Javascript/Typescript quotes to backticks when ${ has been entered within a string
                             | https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter
Docs View                    | displays hover documentation in the sidebar or panel(https://marketplace.visualstudio.com/items?itemName=bierner.docs-view)
*CodeSnap                    | 代码屏幕截图
Prettier                     | 代码格式化工具
*indent-rainbow              | 缩进层次以不同颜色高亮显示
*Power Mode                  | 键盘输入时候的宫廷效果
Draw.io                      | Diagram
'Cascadia Code'  font        | on Dracula theme
'Fira Code'  font            | on One Dark Pro theme
Gradient Theme               | Gradient Theme
vscode-icons                 |  
Lorem ipsum                  | Lorem sentences
Rainbow Fart                 | 🌈彩虹屁
超越鼓励师                     | 在 VS Code 中连续写代码一小时（时间可配置），会有杨超越提醒你该休息啦~
小霸王                        | vscode的nes游戏插件
前端每日一题                   |
Qwerty Learner               | 
Emoji                        | A simple plugin to insert emoji from the command palette
Incredibly In Your Face      |  shows you Incredible 'Ouch Faces' that correlate to the number of errors in your code!
project-tree                 | generate a tree structure of the project in the README.md file.
Error Lens                   | stand out error, highlighting the entire line
```

```js
//settings.json -- Power Mode  
"powermode.enabled": true,
"powermode.presets": "flames",
"powermode.combo.timerEnabled": "hide",
"powermode.combo.counterEnabled": "hide",
"powermode.shake.enabled": false,
//settings.json -- fontSize
"editor.fontSize": 16,
"window.zoomLevel": 1,
```

[⬆ back to top](#top)

## useful Tool plugin

- json2ts: converts a JSON to TypeScript interfaces
  - create a json file
  - press ctrl+Alt+V at end of json file

[⬆ back to top](#top)

## 功能性

- HTML CSS Support : 这个也是必备插件之一
- Syncing: 这个同步插件要比官方市场那个最高下载量的要好，支持删除同步！！！
- Version Lens : 可以及时看到package.json内部版本的变动，很实用
- Output Colorizer : 可以终端日志输出着色，实用

## 代码片段插件

- JavaScript (ES6) code snippets : ES6的代码片段，实用
- JavaScript Snippet Pack : ES5及以下的代码片段，实用
- Angular Language Service

## 语法校验

- stylelint : 比内置的要全，更智能

## Open code Outline

- View → Open View... → Outline
- 命令行： `Explorer: Focus on Outline view`

[⬆ back to top](#top)

## 自定义设置参考

```
 "files.autoGuessEncoding": true,        // 中文注释乱码
 "editor.renderWhitespace": "all",       // 控制编辑器是否应呈现空白字符
 "files.trimTrailingWhitespace": true,   // 启用后，将在保存文件时剪裁尾随空格
 "editor.wordWrap": "on"                 //word wrap自动换行, 打开setting -> 搜索editor.wordWrap
 "search.followSymlinks" ：false；       //CPU利用率100%的情况，两个rg.exe占用了全部的CPU    
//jsx中使用emmet自动补全代码
"emmet.triggerExpansionOnTab": true
"emmet.includeLanguages": {"javascript":"html"},
//自动分号:  若安装了prettier插件，粘贴代码，或格式化文件时，会自动添加分号，并由双引号变成单引号
"prettier.singleQuote": true
"prettier.semi": false
//文件末尾后还可以继续下拉为空
scrollBeyondLastLine
//to removed extra newlines at the end of a file on save
"files.trimTrailingWhitespace": true,
"files.insertFinalNewline": true,
"files.trimFinalNewlines": true,
```

## Auto Close Tag设置- settings.json

```
"auto-close-tag.activationOnLanguage": [
        "xml",
        "php",
        "blade",
        "ejs",
        "jinja",
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "plaintext",
        "markdown",
        "vue",
        "liquid",
        "erb",
        "lang-cfml",
        "cfml",
        "HTML (Eex)"
    ]
```

## Theme

- Panda
