- **beautify**: 良好的拓展性，可以格式化JSON|JS|HTML|CSS|SCSS,比内置格式化好用
- **auto close tag**: 匹配标签，关闭对应的标签。很实用【HTML/XML】
- auto import
- **auto rename tag**: Auto Rename Tag : sublime和webstorm也有这个内置功能，改变标签的时候同时改动开闭合标签；【HTML/XML】
- bracket pair colorizer
- **change-case**
- Color Picker
- Css peek
- Document This - JSDOC注解调用，值得易用, JSDoc(Ctrl+Alt+D and Ctrl+Alt+D again)
- intellisense for CSS calss names in HTML
- **Markdown All in One**
- Markdown Preview Enhanced
- **Markdown Extended**
- Node.js Modules Intellisense
- npm 
- **npm intellisense**
- **open in browser**
- **Path Autocomplete**: 路径智能补全
- Path Intellisense: 路径智能提示
- SCSS IntelliSense Preview : SCSS智能提醒，配置强大
- Highlight Matching Tag
- **select highlight in minimap**
- View Node Package
- Git History : 不得不赞的插件，谁用谁知道，功能很赞
- Quokka.js:  Quokka is a debugging tool that gives live feedback on the code you are writing for javascript
- Better Comments: colorful comment

### 功能性

- HTML CSS Support : 这个也是必备插件之一
- Syncing: 这个同步插件要比官方市场那个最高下载量的要好，支持删除同步！！！
- Version Lens : 可以及时看到package.json内部版本的变动，很实用
- Output Colorizer : 可以终端日志输出着色，实用

### 代码片段插件

- JavaScript (ES6) code snippets : ES6的代码片段，实用
- JavaScript Snippet Pack : ES5及以下的代码片段，实用
- Angular Language Service

### 语法校验

- stylelint : 比内置的要全，更智能

### Open code Outline

- View → Open View... → Outline
- 命令行： `Explorer: Focus on Outline view`

### 自定义设置参考

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

### Auto Close Tag设置- settings.json

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

### Theme

- Panda
