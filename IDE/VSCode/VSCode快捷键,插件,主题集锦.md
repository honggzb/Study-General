[top](#top)

- [常用快捷键](#常用快捷键)
  - [基础编辑 Basic editing](#%E5%9F%BA%E7%A1%80%E7%BC%96%E8%BE%91-basic-editing)
  - [导航Navigation](#%E5%AF%BC%E8%88%AAnavigation)
  - [搜索和替换Search and replace](#%E6%90%9C%E7%B4%A2%E5%92%8C%E6%9B%BF%E6%8D%A2search-and-replace)
  - [多光标和选择 Multi-cursor and selection](#%E5%A4%9A%E5%85%89%E6%A0%87%E5%92%8C%E9%80%89%E6%8B%A9-multi-cursor-and-selection)
  - [丰富的语言编辑 Rich languages editing](#%E4%B8%B0%E5%AF%8C%E7%9A%84%E8%AF%AD%E8%A8%80%E7%BC%96%E8%BE%91-rich-languages-editing)
  - [调试 Debug](#%E8%B0%83%E8%AF%95-debug)
  - [Others](#Others)
- [前端开发常用插件列表](#前端开发常用插件列表)
- [Theme](#theme)
- [自定义设置参考](#自定义设置参考)
    - [改变theme的高亮highlight颜色](#改变theme的高亮highlight颜色)
    - [设置tab转空格并设置数量](#设置tab转空格并设置数量)
    - [自动保存](#自动保存)
    - [小结](#小结)

## 常用快捷键

[VS Code 快捷键（中英文对照版）](https://segmentfault.com/a/1190000007688656)

### 基础编辑 Basic editing

 快捷键|基础编辑|Basic editing
---|---|---
`ctrl+=`|zoom in|
`ctrl+-`|zoom out|
`Ctrl+X`|剪切行（空选定）| Cut line (empty selection)
`Ctrl+C`|复制行（空选定）|Copy line (empty selection)
`Alt+ ↑ / ↓`	|向上/向下移动行| Move line up/down
`Shift+Alt + ↓ / ↑`|	向上/向下复制行| Copy line up/down
`Ctrl+Shift+K`|	删除行 |Delete line
`Ctrl+Enter`|	在下面插入行 |Insert line below
`Ctrl+Shift+Enter`|	在上面插入行| Insert line above
`Ctrl+Shift+\`|	跳到匹配的括号 |Jump to matching bracket
`Ctrl+] / [`|	缩进/缩进行| Indent/outdent line
`Home`|	转到行首| Go to beginning of line
`End`|	转到行尾 |Go to end of line
`Ctrl+Home`|	转到文件开头 |Go to beginning of file
`Ctrl+End`|	转到文件末尾 |Go to end of file
`Ctrl+↑ / ↓`	|向上/向下滚动行| Scroll line up/down
`Alt+PgUp / PgDown`|	向上/向下滚动页面 |Scroll page up/down
`Ctrl+Shift+[`|	折叠（折叠）区域 |Fold (collapse) region
`Ctrl+Shift+]`|	展开（未折叠）区域| Unfold (uncollapse) region
`Ctrl+K Ctrl+[`|	折叠（未折叠）所有子区域 |Fold (collapse) all subregions
`Ctrl+K Ctrl+]`|	展开（未折叠）所有子区域 |Unfold (uncollapse) all subregions
`Ctrl+K Ctrl+0`	|折叠（折叠）所有区域 |Fold (collapse) all regions
`Ctrl+K Ctrl+J`|	展开（未折叠）所有区域| Unfold (uncollapse) all regions
`Ctrl+K Ctrl+C`	|添加行注释 |Add line comment
`Ctrl+K Ctrl+U`	|删除行注释 |Remove line comment
`Ctrl+/`|切换行注释| Toggle line comment
`Shift+Alt+A`|	切换块注释| Toggle block comment
`Alt+Z`	|切换换行| Toggle word wrap

[back to top](#top)

### 导航Navigation

快捷键|导航|Navigation
---|---|---
`Ctrl + T`|显示所有符号 |Show all Symbols
`Ctrl + G`|转到行... |Go to Line...
`Ctrl + P`|转到文件... |Go to File...
`Ctrl + Shift + O`|转到符号... |Go to Symbol...
`Ctrl + Shift + M`|显示问题面板| Show Problems panel
`F8`|	转到下一个错误或警告| Go to next error or warning
`Shift + F8`|	转到上一个错误或警告 |Go to previous error or warning
`Ctrl + Shift + Tab`|	导航编辑器组历史记录| Navigate editor group history
`Alt + ←/→`|返回/前进 |Go back / forward
`Ctrl + M`|切换选项卡移动焦点 |Toggle Tab moves focus

[back to top](#top)

### 搜索和替换Search and replace

快捷键|搜索和替换|Search and replace
---|---|---
`Ctrl + F`|查找 |Find
`Ctrl + H`|替换 |Replace
`F3 / Shift + F3`|查找下一个/上一个|Find next/previous
`Alt + Enter`|选择查找匹配的所有出现 |Select all occurences of Find match
`Ctrl + D`|将选择添加到下一个查找匹配 |Add selection to next Find match
`Ctrl + K Ctrl + D`|将最后一个选择移至下一个查找匹配项 |Move last selection to next Find match
`Alt + C / R / W`	|切换区分大小写/正则表达式/整个词 |Toggle case-sensitive / regex / whole word

[back to top](#top)

### 多光标和选择 Multi-cursor and selection

快捷键|多光标和选择|Multi-cursor and selection
---|---|---
`Alt +单击`|插入光标 Insert cursor
`Ctrl + Alt +↑/↓`	|在上/下插入光标 |Insert cursor above / below
`Ctrl + U`|撤消上一个光标操作 |Undo last cursor operation
`Shift + Alt + I`|在选定的每一行的末尾插入光标| Insert cursor at end of each line selected
`Ctrl + I`|选择当前行 |Select current line
`Ctrl + Shift + L`|选择当前选择的所有出现| Select all occurrences of current selection
`Ctrl + F2`|选择当前字的所有出现| Select all occurrences of current word
`Shift + Alt + →`	|展开选择 |Expand selection
`Shift + Alt + ←`	|缩小选择 |Shrink selection
`Shift + Alt + （拖动鼠标）`|	列（框）选择| Column (box) selection
`Ctrl + Shift + Alt +（箭头键）`|	列（框）选择 |Column (box) selection
`Ctrl + Shift + Alt + PgUp / PgDown`|列（框）选择页上/下 |Column (box) selection page up/down

[back to top](#top)

### 丰富的语言编辑 Rich languages editing

快捷键|丰富的语言编辑|Rich languages editing
---|---|---
`Ctrl + 空格`	|触发建议| Trigger suggestion
`Ctrl + Shift + Space`|触发器参数提示 |Trigger parameter hints
`Tab	Emmet`| 展开缩写| Emmet expand abbreviation
`Shift + Alt + F`	|格式化文档 |Format document
`Ctrl + K Ctrl + F`|格式选定区域 |Format selection
`F12`	|转到定义 |Go to Definition
`Alt + F12`|**鼠标定位到方法，可打开Peek定义,非常有用，可查看定义** |Peek Definition
`Ctrl + K F12`|打开定义到边 |Open Definition to the side
`Ctrl + .`|快速解决 |Quick Fix
`Shift + F12`	|显示引用| Show References
`F2`|	重命名符号| Rename Symbol
`Ctrl + K Ctrl + X`|修剪尾随空格 |Trim trailing whitespace
`Ctrl + K M`|更改文件语言| Change file language

[back to top](#top)

### 调试 Debug

快捷键|调试|Debug
---|---|---
`F9`|	切换断点 |Toggle breakpoint
`F5`|	开始/继续 |Start/Continue
`Shift+F5`|停止 Stop
`F11` / Shift+F11	|下一步/上一步 |Step into/out
`F10`	|跳过| Step over
`Ctrl+K Ctrl+I`|	显示悬停 |Show hover

[back to top](#top)

### Others

快捷键|others|others
---|---|---
`@`|TS相关'Ctrl+p' => '@'|将显示所有的Object，可以迅速定位到该Object
`Peek`|鼠标右键(Shift+F12) => Peek references|
`Ctrl+Shift+X`|修剪空格||
自动换行	Alt+Z
`ctrl+shift+\`|括号匹配	|
`ctrl+shift+o`|符号查找|	
`ctrl+shift+x`|修整行尾空格|
`F12`|跳转到定义处|	
`ctrl+G`|跳转行号|
`shift+F12`|列出所有的引用|
`ctrl+F12`|同时修改本文件中所有匹配的|	
`F2`|选中后按F2，输入新的名字，回车，会发现所有的文件都修改|重命名所有方法名
`F8`|跳转到下一个Error或Warning|
N/A|选择文件右键compare selected|比较文件
`/**`|在函数上方输入“/**”，然后点击enter|添加函数注释

[back to top](#top)

**new for 1.28**

- Editor Tab completion: use tab -> intellisense
- Rename via import path
- jump to last edit -> Ctrl+K,Ctrl+Q
- Savee without formatting -> Ctrl+KS

<hr>

[back to top](#top)

## 前端开发常用插件列表

VSCode 前端开发常用插件列表（字母升序），旨在方便日常使用

- **通用插件**
  - [Beautify](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag): Beautify javascript, JSON, CSS, Sass, and HTML in Visual Studio Code 
  - Prettier Code Formatter：利用Prettier的支持JavaScript、TypeScript和CSS的插件
  - JS Refactor：提供许多重构JavaScript代码的实用方法和操作，例如抽取变量和方法，把现有代码转为使用箭头函数和模板字符串的等价形式，导出函数等
  - JavaScript Booster：一款了不起的代码重构工具。拥有需要代码操作，比如把var转为const或者let，去除多余的else语句，合并声明和初始化。其灵感大量源于WebStorm的启发
  - **Auto Close Tag**: 自动标签闭合, Auto Rename Tag
  - [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)：括号颜色匹配
    JavaScript (ES6) code snippets: `imd --> import { } from 'somewhere'`
  - AutoFileName: AutoFileName
  - [**Path Intellisense**](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)：路径智能提示, 自动补全文件名
  - [**Auto Import**](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)：Typescript 、TSX 自动查找、导入
  - **Numbered Bookmarks**
  - Paste JSON as Code: Copy JSON, paste as Go, TypeScript, C#, C++ and more
- Node插件
  - npm：用package.json来校验安装的npm包，确保安装包的版本正确，对缺少package.json文件的包或者未安装的包给出高亮提示。
  - Node.js Modules IntelliSense：提供JavaScript和TypeScript导入声明时的自动补全
  - Node exec：允许你用Node执行当前文件或者选中的代码。
  - View Node Package：利用此插件可快速查看Node包源码，让你直接在VS Code中打开Node包的代码库或文档。
  - Search node_modules：通常node_modules文件夹不在默认的搜索范围内，这个插件允许你搜索它
  -  - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)：自动计算 Import 包大小
- **HTML Boilerplate: HTML 模板**
  - [HTML Snippets](https://github.com/abusaidm/html-snippets)：HTML5 代码片段提示
  - [Javascript ES6 Snippets](http://madole.xyz/my-favourite-vscode-plugins/)：Javascript ES6 Snippets
  - [Npm Intellisense](https://github.com/ChristianKohler/NpmIntellisense)：Npm Module Import 智能补全
  - [Open in Browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)：在浏览器中打开- 将添加一个 [Open With Default Browser] 选项到右键菜单
- **change-case**: 命名格式插件
    - camelCase骆驼拼命名
    - PascalCase首字母大写
    - kebab-case中划线命名
    - underscore_delimited下划线命名
    - CONSTANT大写命名，等
- vscode-icons: 侧边栏图标插件
  - [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer)：SVG 查看器
    select highlight in minimap: 
  - [Can I Use](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-caniuse)：浏览器兼容性查询
    Quokka.js可以实时运行代码，在你敲键盘的同时就可以把结果显示在编辑器里面, 并能够预览变量的函数和计算值结果, 类似的插件还有：Code Runner，支持实时执行C, C++, Java, JavaScript, PHP, Python, Perl, Perl 6 等语言

[back to top](#top)

**CSS相关**

- CSS Peek: 追踪至样式表中 CSS 类和 ids 定义的地方, 在 HTML 文件中右键单击选择器时，选择“ Go to Definition 和 Peek definition ”选项，它便会给你发送样式设置的 CSS 代码
  - Peek: load the css file inline and make quick edits right there(Ctrl+Shift+F12)
  - Go To: jump directly to the css file or open it in a new editor (F12)
  - Hover: show the definition in a hover over the symbol (Ctrl+hover)
- [IntelliSense for CSS class names](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)：CSS 类名智能提示
- [Cssrem](https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem)：px 自动转 rem
- Color Picker: 代码的颜色选择器
- Color Info: 颜色信息及转换
- Color-Highlight: 在编辑器中高亮显示颜色

[back to top](#top)

**Beauty美化+代码格式化相关**

- Prettier: 格式化代码，快速格式化整个JS和CSS文档, CMD+Shift+P -> Format Document
- Align: 代码对齐插件, Ctrl+Alt+A
- **Bracket Pair Colorizer** 和 **Indent Rainbow**: 花括号着色和彩虹缩进
- Beatufy：一个jsBeautifier的插件，支持JavaScript、JSON、CSS和HTML。可通过.jsbeautifyrc文件自定义
- Prettier Code Formatter：利用Prettier的支持JavaScript、TypeScript和CSS的插件，目前有超过150万的下载量
- JS Refactor：提供许多重构JavaScript代码的实用方法和操作，例如抽取变量和方法，把现有代码转为使用箭头函数和模板字符串的等价形式，导出函数等
- JavaScript Booster：一款了不起的代码重构工具。拥有需要代码操作，比如把var转为const或者let，去除多余的else语句，合并声明和初始化。其灵感大量源于WebStorm的启发

作者：开源中国
链接：https://www.jianshu.com/p/34fa629358f7
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)：VS Code Material Design 主题 icon
  
[back to top](#top)

**Git**

- [Git Blame](https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame)：查看当前选中行的 Git 提交信息
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)：图形化显示提交历史等。 墙裂推荐。
- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)：Git Blame 详细信息
-[ Open in GitHub / Bitbucket / Gitlab / VisualStudio.com](https://marketplace.visualstudio.com/items?itemName=ziyasal.vscode-open-in-github) ! — It lets you open the repo in the browser with a single command.
- Git Indicators — It lets you see the affected files and how many lines have been added or deleted in the status bar.
  
[back to top](#top)

**其他**

- [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis): 自动生成 JSDoc 注释, Ctrl+Alt+D
- Import Cost: 可以显示import的东西体积有多大
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)，就不用再单独安装一个Postman了，直接在VSCode里面就能搞定
- Sync Settings: 设置同步插件, 你很有可能在多台电脑上进行编码工作。在电脑上移植你的插件和设置是轻而易举的事
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)：Javascript语法检测
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)：Flow 语法支持
- [Language-stylus](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus): Stylus 语法支持
- [Output Colorizer](https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer)：VS Code 输出彩色日志
- [Project Manager](https://github.com/alefragnani/vscode-project-manager)：项目管理
- Regex Previewer: 正则表达式预览
- Paste as JSON：快速地将JSON数据转为JavaScript代码

[back to top](#top)

**Vue 开发**

- [Vetur](https://vuejs.github.io/vetur/)：Vue 开发生态必备插件（官方推荐），支持 Syntax Highlighting， Emmet 2.0，Snippet，Foramtting，IntelliSense，Linting 等
- ...

**React 开发**

- [Reactjs Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)：React 代码提示
- [React Redux ES6 Snippets](https://marketplace.visualstudio.com/items?itemName=timothymclane.react-redux-es6-snippets)：Redux 代码提示
- ...

**文档编辑 Markdown**

- Markdown All In One：Markdown 格式化
- Markdownlint: Markdown 语法检测
- Markdown PDF：Markdown 转 PDF
- Markdown Shortcuts: Markdown Shortcuts
- ...

**测试类插件测试**

- Mocha sidebar：利用Mocha库为项目提供单元测试。这个框架帮你直接在代码里跑测试，把错误信息以装饰器形式显示出来
- ES Mocha Snippets：提供ES6语法的Mocha代码片段。这个插件的重点在于利用箭头函数，尽可能减少花括号的使用，保持代码的紧凑。可通过设置允许使用分号
- Jasmine Code Snippets：针对Jasmine测试框架的代码片段
- Protractor Snippets：针对Protractor端到端测试框架的代码片段。支持JavaScript和TypeScript。Node TDD：为Node和JavaScript项目提供测试驱动开发的支持。能在源码的更新后，立即触发自动化测试的构建

<hr>

## Theme

- One Monokai
- One Dark
- Material Icon:   icon

## 自定义设置参考

```javascript
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

**自动补全括号/引号**

选项 -> 文本编辑器 -> "auto close ..."

### 改变theme的高亮highlight颜色

```json
 "workbench.colorCustomizations": {
   "[Monokai]":{
        "editorSelection": "#ff0000", // for selection
        "editorSelectionHighlight": "#ffed00"  //for occurences
    }
 }
```

### 设置tab转空格并设置数量

1. 在状态栏右下角点击  ---》空格：
2. 选择“使用空格缩进”
3. 选择 2
4. 然后就可以看到缩进变为2个空格了

### 自动保存

打开settings.json： `"files.autoSave": "afterDelay"`

### 小结

```json
{ // VScode主题配置
    "editor.tabSize": 2,
    "editor.lineHeight": 24,
    "editor.renderLineHighlight": "none",
    "editor.renderWhitespace": "none",
    "editor.fontFamily": "Consolas",
    "editor.fontSize": 15,
    "editor.cursorBlinking": "smooth",
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.formatOnPaste": true,
    // 是否允许自定义的snippet片段提示,比如自定义的vue片段开启后就可以智能提示
    "editor.snippetSuggestions": "top",
    "workbench.iconTheme": "vscode-great-icons",
    "workbench.colorTheme": "One Dark Pro Vivid",
    "workbench.startupEditor": "newUntitledFile",
    "html.suggest.angular1": false,
    "html.suggest.ionic": false,
    "files.trimTrailingWhitespace": true,
    // vetur插件格式化使用beautify内置规则
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // VScode 文件搜索区域配置
    "search.exclude": {
        "**/dist": true,
        "**/build": true,
        "**/elehukouben": true,
        "**/.git": true,
        "**/.gitignore": true,
        "**/.svn": true,
        "**/.DS_Store": true,
        "**/.idea": true,
        "**/.vscode": false,
        "**/yarn.lock": true,
        "**/tmp": true
    },
    // 排除文件搜索区域，比如node_modules(贴心的默认设置已经屏蔽了)
    "files.exclude": {
        "**/.idea": true,
        "**/yarn.lock": true,
        "**/tmp": true
    },
    // 配置文件关联，以便启用对应的智能提示，比如wxss使用css
    "files.associations": {
        "*.vue": "vue",
        "*.wxss": "css"
    },
    // 配置emmet是否启用tab展开缩写
    "emmet.triggerExpansionOnTab": true,
    // 配置emmet对文件类型的支持，比如vue后缀文件按照html文件来进行emmet扩写
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html",
        "javascript": "javascriptreact",
        // xml类型文件默认都是单引号，开启对非单引号的emmet识别
        "xml": {
            "attr_quotes": "single"
        }
    },
    // 在react的jsx中添加对emmet的支持
    "emmet.includeLanguages": {
        "jsx-sublime-babel-tags": "javascriptreact"
    },
    // 是否开启eslint检测
    "eslint.enable": false,
    // 文件保存时，是否自动根据eslint进行格式化
    "eslint.autoFixOnSave": false,
    // eslint配置文件
    "eslint.options": {
        "plugins": [
            "html",
            "javascript",
            {
                "language": "vue",
                "autoFix": true
            },
            "vue"
        ]
    },
    // eslint能够识别的文件后缀类型
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue",
        "typescript",
        "typescriptreact"
    ],
    // 快捷键方案,使用sublime的一套快捷键
    "sublimeTextKeymap.promptV3Features": true,
    // 格式化快捷键 shirt+alt+F
    // prettier进行格式化时是否安装eslint配置去执行，建议false
    "prettier.eslintIntegration": true,
    // 如果为true，将使用单引号而不是双引号
    "prettier.singleQuote": true,
    // 细节,配置gitlen中git提交历史记录的信息显示情况
    "gitlens.advanced.messages": {
        "suppressCommitHasNoPreviousCommitWarning": false,
        "suppressCommitNotFoundWarning": false,
        "suppressFileNotUnderSourceControlWarning": false,
        "suppressGitVersionWarning": false,
        "suppressLineUncommittedWarning": false,
        "suppressNoRepositoryWarning": false,
        "suppressResultsExplorerNotice": false,
        "suppressUpdateNotice": true,
        "suppressWelcomeNotice": false
    },
    // 开启apicloud在vscode中的wifi真机同步
    "apicloud.port": "23450",
    // 设置apicloud在vscode中的wifi真机同步根目录
    "apicloud.subdirectories": "/apiclouduser",
    // git是否启用自动拉取
    "git.autofetch": true,
}
```

https://github.com/zuojj/fedlab/issues/18
