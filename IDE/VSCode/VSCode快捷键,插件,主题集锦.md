- [常用快捷键推荐](#常用快捷键推荐)
- [前端开发常用插件列表](#前端开发常用插件列表)
- [Theme](#theme)
- [自定义设置参考](#自定义设置参考)
    - [改变theme的高亮highlight颜色](#改变theme的高亮highlight颜色)
    - [设置tab转空格并设置数量](#设置tab转空格并设置数量)
    - [自动保存](#自动保存)
    - [小结](#小结)

### 常用快捷键推荐

<table>
  <tr><th colspan="2">格式调整</th></tr>
  <tr><td>代码行缩进</td><td>Ctrl+[， Ctrl+]</td></tr>
  <tr><td>**代码格式化**</td><td>Shift+Alt+F，或Ctrl+Shift+P后输入format code(format selection)</td></tr>
  <tr><td>修剪空格</td><td>Ctrl+Shift+X</td></tr>
  <tr><td>自动换行</td><td>Alt+Z</td></tr>
  <tr><td>**括号匹配**</td><td>ctrl+shift+\</td></tr>
  <tr><td>**符号查找**</td><td>ctrl+shift+o</td></tr>
  <tr><td>修整行尾空格</td><td>ctrl+shift+x</td></tr>
  <tr><td>**代码折叠**</td><td>ctrl+shift+[ and ctrl+shift+]</td></tr>
  <tr><th colspan="2">重构代码</th></tr>
  <tr><td>**跳转到定义处**</td><td>F12</td></tr>
  <tr><td>**跳转行号**</td><td>ctrl+G</td></tr>
  <tr><td>转到实现 </td><td>ctrl+F12 </td></tr>
  <tr><td>列出所有的引用</td><td>shift+F12</td></tr>
  <tr><td>**同时修改本文件中所有匹配的**</td><td>ctrl+F12</td></tr>
  <tr><td>重命名所有方法名</td><td>选中后按F2，输入新的名字，回车，会发现所有的文件都修改</td></tr>
  <tr><td>跳转到下一个Error或Warning</td><td>F8</td></tr>
  <tr><td>比较文件</td><td>选择文件右键compare selected</td></tr>
  <tr><td>**拆分编辑器**</td><td>ctrl+\</td></tr>
  <tr><td>**添加函数注释**</td><td>在函数上方输入“/**”，然后点击enter</td></tr>
  <tr><th colspan="2">文件相关</th></tr>
  <tr><td>全部保存</td><td>ctrl+k, 然后只按s一个键</td></tr>
  <tr><td>关闭文件夹</td><td>ctrl+k, 然后单按一个f</td></tr>
  <tr><th colspan="2">显示相关</th></tr>
  <tr><td>侧边栏显/隐</td><td>ctrl+B</td></tr>
  <tr><td>预览markdown</td><td>Ctrl+Shift+V</td></tr>
  <tr><td>zoomIn/zoomOut</td><td>Ctrl + =/Ctrl + -</td></tr>
  <tr><td>全屏</td><td>F11</td></tr>
  <tr><th colspan="2">打开相关</th></tr>
  <tr><td>历史打开文件之间切换</td><td>Ctrl+Tab，Alt+Left，Alt+Right</td></tr>
  <tr><td>左中右3个编辑器的快捷键</td><td>Ctrl+1 Ctrl+2 Ctrl+3</td></tr>
  <tr><td>3个编辑器之间循环切换</td><td>Ctrl+`</td></tr>
  <tr><td>全屏</td><td>F11</td></tr>
</table>

**new for 1.28**

- Editor Tab completion: use tab -> intellisense
- Rename via import path
- jump to last edit -> Ctrl+K,Ctrl+Q
- Savee without formatting -> Ctrl+KS

<hr>

### 前端开发常用插件列表

VSCode 前端开发常用插件列表（字母升序），旨在方便日常使用

<h2>通用插件</h2>
<ul>
    <li><a href="" rel="nofollow">Beautify</a>: Beautify javascript, JSON, CSS, Sass, and HTML in Visual Studio Code</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag" rel="nofollow">Auto Close Tag</a>: 自动标签闭合, Auto Rename Tag</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer" rel="nofollow">Bracket Pair Colorizer</a>：括号颜色匹配</li>
    <li>JavaScript (ES6) code snippets: `imd --> import { } from 'somewhere'`</li>
    <li>AutoFileName: AutoFileName</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense" rel="nofollow">Path Intellisense</a>：路径智能提示</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=steoates.autoimport" rel="nofollow">Auto Import</a>：Typescript 、TSX 自动查找、导入</li>
    <li>HTML Boilerplate: HTML 模板</li>
    <li><a href="https://github.com/abusaidm/html-snippets">HTML Snippets</a>：HTML5 代码片段提示</li>
    <li><a href="http://madole.xyz/my-favourite-vscode-plugins/" rel="nofollow">Javascript ES6 Snippets</a>：Javascript ES6 Snippets</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost" rel="nofollow">Import Cost</a>：自动计算 Import 包大小</li>
    <li><a href="https://github.com/ChristianKohler/NpmIntellisense">Npm Intellisense</a>：Npm Module Import 智能补全</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser" rel="nofollow">Open in Browser</a>：在浏览器中打开- 将添加一个 [Open With Default Browser] 选项到右键菜单</li>
    <li><b>change-case: 命名格式插件</b>
        <ul>
            <li>camelCase骆驼拼命名</li>
            <li>PascalCase首字母大写</li>
            <li>kebab-case中划线命名</li>
            <li>underscore_delimited下划线命名</li>
            <li>CONSTANT大写命名，等</li>
        </ul>
    </li>
    <li>vscode-icons: 侧边栏图标插件</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer" rel="nofollow">SVG Viewer</a>：SVG 查看器</li>
    <li>select highlight in minimap: </li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=akamud.vscode-caniuse" rel="nofollow">Can I Use</a>：浏览器兼容性查询</li>
    <li>Quokka.js可以实时运行代码，在你敲键盘的同时就可以把结果显示在编辑器里面, 并能够预览变量的函数和计算值结果<br>类似的插件还有：
Code Runner，支持实时执行C, C++, Java, JavaScript, PHP, Python, Perl, Perl 6 等语言。<br>
Runner</li>
</ul>
<h2>CSS相关</h2>
<ul>
    <li>CSS Peek: 追踪至样式表中 CSS 类和 ids 定义的地方
        <ul>
            <li>在 HTML 文件中右键单击选择器时，选择“ Go to Definition 和 Peek definition ”选项，它便会给你发送样式设置的 CSS 代码</li>
            <li>Peek: load the css file inline and make quick edits right there(Ctrl+Shift+F12)</li>
            <li>Go To: jump directly to the css file or open it in a new editor (F12)</li>
            <li>Hover: show the definition in a hover over the symbol (Ctrl+hover)</li>
        </ul>
    </li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion" rel="nofollow">IntelliSense for CSS class names</a>：CSS 类名智能提示</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem" rel="nofollow">Cssrem</a>：px 自动转 rem</li>
    <li>Color Picker: 代码的颜色选择器</li>
    <li>Color Info: 颜色信息及转换</li>
    <li>Color-Highlight: 在编辑器中高亮显示颜色</li>
</ul>
<h2>Beauty美化相关</h2>
<ul>
    <li>Prettier: 格式化代码，快速格式化整个JS和CSS文档, CMD+Shift+P -> Format Document</li>
    <li>Align: 代码对齐插件, Ctrl+Alt+A</li>
    <li>Bracket Pair Colorizer 和 Indent Rainbow: 花括号着色和彩虹缩进</li>
</ul>
<h2>Git</h2>
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame" rel="nofollow">Git Blame</a>：查看当前选中行的 Git 提交信息</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory" rel="nofollow">Git History</a>：图形化显示提交历史等。 墙裂推荐。</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" rel="nofollow">Git Lens</a>：Git Blame 详细信息</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=ziyasal.vscode-open-in-github">Open in GitHub / Bitbucket / Gitlab / VisualStudio.com !</a> — It lets you open the repo in the browser with a single command.</li>
    <li>Git Indicators — It lets you see the affected files and how many lines have been added or deleted in the status bar.</li>
</ul>
<h2>其他</h2>
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=joelday.docthis" rel="nofollow">Document This</a>: 自动生成 JSDoc 注释, Ctrl+Alt+D</li>
    <li>Import Cost: 可以显示import的东西体积有多大</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">REST Client，</a>就不用再单独安装一个Postman了，直接在VSCode里面就能搞定</li>
    <li>Sync Settings: 设置同步插件, 你很有可能在多台电脑上进行编码工作。在电脑上移植你的插件和设置是轻而易举的事</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" rel="nofollow">ESLint</a>：Javascript 语法检测</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode" rel="nofollow">Flow Language Support</a>：Flow 语法支持</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus" rel="nofollow">Language-stylus</a>: Stylus 语法支持</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme" rel="nofollow">Material Icon Theme</a>：VS Code Material Design 主题 icon</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer" rel="nofollow">Output Colorizer</a>：VS Code 输出彩色日志</li>
    <li><a href="https://github.com/alefragnani/vscode-project-manager">Project Manager</a>：项目管理</li>
    <li>Regex Previewer: 正则表达式预览</li>
    <li><a href="">...</a></li>
</ul>
<h2>Vue 开发</h2>
<ul>
    <li><a href="https://vuejs.github.io/vetur/" rel="nofollow">Vetur</a>：Vue 开发生态必备插件（官方推荐），支持 Syntax Highlighting， Emmet 2.0，Snippet，Foramtting，IntelliSense，Linting 等</li>
    <li><a href="">...</a></li>
</ul>
<h2>React 开发</h2>
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets" rel="nofollow">Reactjs Code Snippets</a>：React 代码提示</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=timothymclane.react-redux-es6-snippets" rel="nofollow">React Redux ES6 Snippets</a>：Redux 代码提示</li>
    <li><a href="">...</a></li>
</ul>
<h2>文档编辑 Markdown</h2>
<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one" rel="nofollow">Markdown All In One</a>：Markdown 格式化</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint" rel="nofollow">Markdownlint</a>: Markdown 语法检测</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf" rel="nofollow">Markdown PDF</a>：Markdown 转 PDF</li>
    <li><a href="#" rel="nofollow">Markdown Shortcuts</a>: Markdown Shortcuts</li>
    <li><a href="">...</a></li>
</ul>

<hr>

### Theme

- One Monokai
- One Dark
- Material Icon:   icon

### 自定义设置参考

```javascript
 "files.autoGuessEncoding": true,        // 中文注释乱码
 "editor.renderWhitespace": "all",  // 控制编辑器是否应呈现空白字符
 "files.trimTrailingWhitespace": true,   // 启用后，将在保存文件时剪裁尾随空格
 "editor.wordWrap": "on"          //word wrap自动换行, 打开setting -> 搜索editor.wordWrap
```

#### 改变theme的高亮highlight颜色

```json
 "workbench.colorCustomizations": {
   "[Monokai]":{
        "editorSelection": "#ff0000", // for selection
        "editorSelectionHighlight": "#ffed00"  //for occurences
    }
 }
```

#### 设置tab转空格并设置数量

1. 在状态栏右下角点击  ---》空格：
2. 选择“使用空格缩进”
3. 选择 2
4. 然后就可以看到缩进变为2个空格了

#### 自动保存

打开settings.json： `"files.autoSave": "afterDelay"`

#### 小结

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
