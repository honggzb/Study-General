## [IntelliJ IDEA](#top)

- [高效率配置](#高效率配置)
- [日常使用 必备快捷键（★★）](#日常使用-必备快捷键)
   - [查找](#查找)
   - [跳转切换](#跳转切换)
   - [编码相关](#编码相关)
   - [代码阅读相关](#代码阅读相关)
   - [版本管理相关](#版本管理相关)
   - [编码效率相关（★★）](#编码效率相关)
   - [其他](#其他)
- [代码调试 源码阅读相关（★★★）](#代码调试-源码阅读相关)
   - [视图模式](#视图模式)
   - [代码调试](#代码调试)
- [插件推荐](#插件推荐)

### 高效率配置

|配置| 介绍 | 补充 |
|---|---|---|
|代码提示不区分大小写  | Settings -> Editor -> General -> Code Completion  | |
|自动导包功能及相关优化功能   | Settings -> Editor -> General -> Auto Import  |选择之后，就可以通过CTRL+滑动滚轮的方式，调整编辑器窗口的字体大小 |
|tab 多行显示   | Window -> Editor Tabs -> Tabs Placement，取消勾选 Show Tabs In Single Row选项 |   |
|代码编辑区显示行号| Settings -> Editor -> General -> Appearance 勾选 Show Line Numbers|   |

### 日常使用 必备快捷键（★★）

#### 查找

| 快捷键 | 介绍 |
|---|---|
|Ctrl + F|在当前文件进行文本查找|
|Ctrl + R|在当前文件进行文本替换|
|Shift + Ctrl + F|在项目进行文本查找|
|Shift + Ctrl + R|在项目进行文本替换|
|Shift + Shift|快速搜索|
|Ctrl + N|查找class|
|Ctrl + Shift + N|查找文件|
|Ctrl + Shift + Alt + N	|查找symbol（查找某个方法名）|

#### 跳转切换

| 快捷键 | 介绍 |
|---|---|
|Ctrl + E|最近文件|
|Ctrl + Tab	切换文件|
|Ctrl + Alt + ←/→|跳转历史光标所在处|
|Alt + ←/→ 方向键|切换子tab|
|Ctrl + G|go to（跳转指定行号）|

#### 编码相关

| 快捷键 | 介绍 |
|---|---|
|Ctrl + W|快速选中|
|(Shift + Ctrl) + Alt + J|快速选中同文本|
|Ctrl + C/Ctrl + X/Ctrl + D	|快速复制或剪切|
|多行选中 Tab / Shift + Tab	|tab|
|Ctrl + Y	|删除整行|
|滚轮点击变量/方法/类|	快速进入变量/方法/类的定义处|
|Shift + 点击Tab|	快速关闭tab|
|Ctrl + Z 、Ctrl + Shift + Z|	后悔药，撤销/取消撤销|
|Ctrl + Shift + enter|	自动收尾，代码自动补全|
|Alt + enter	|IntelliJ IDEA 根据光标所在问题，提供快速修复选择，光标放在的位置不同提示的结果也不同|
|Alt + ↑/↓	|方法快速跳转|
|F2|	跳转到下一个高亮错误 或 警告位置|
|Alt + Insert|	代码自动生成，如生成对象的 set / get 方法，构造函数，toString() 等|
|Ctrl + Shift + L	|格式化代码|
|Shift + F6|	快速修改方法名、变量名、文件名、类名等|
|Ctrl + F6	|快速修改方法签名|

#### 代码阅读相关

| 快捷键 | 介绍 |
|---|---|
|Ctrl + P|	方法参数提示显示|
|Ctrl + Shift + i|	就可以在当前类里再弹出一个窗口出来|
|Alt + F7|	可以列出变量在哪些地方被使用了|
|光标在子类接口名，Ctrl + u	|跳到父类接口|
|Alt + F1 + 1，esc	| |
|(Shift) + Ctrl + +/-	|代码块折叠|
|Ctrl + Shift + ←/→	|移动窗口分割线|
|Ctrl + (Alt) + B	|跳转方法定义/实现|
|Ctrl + H	|类的层级关系|
|Ctrl + F12	|Show Members 类成员快速显示|

#### 版本管理相关

| 快捷键 | 介绍 |
|---|---|
|Ctrl + D	|Show Diff|
(Shift) + F7	|（上）下一处修改|

> 更多快捷键请参考此文章 https://github.com/judasn/

[go to top](#top)

#### 编码效率相关（★★）

|配置| 介绍 | 补充 |
|---|---|---|
|文件代码模板 | Settings -> Editor -> File and Code Template| |
|实时代码模板| Settings -> Editor -> Live Templates| 如输入sout或者psvm，就会快速自动生成System.out.println();和public static void main(String[] args) {}的代码块|
|定制代码模板|1. 创建自己的模板库 2. 创建定制的代码模板| |

#### 其他

`CRTL+ALT+T`  - 提供的是代码块包裹功能 - Surround With。可以快速将选中的代码块，包裹到选择的语句块中

[go to top](#top)

### 代码调试 源码阅读相关（★★★）

#### 视图模式

IDEA提供两种特殊的视图模式，

- Presentation Mode - 演示模式，专门用于Code Review这种需要展示代码的场景
- Distraction Free Mode - 禅模式，专注于代码开发

#### 代码调试

1. 条件断点
2. 强制返回: IDEA 可以在打断点的方法栈处，强制返回你想要的方法返回值给调用方。非常灵活！
3. 模拟异常: IDEA 可以在打断点的方法栈处，强制抛出异常给调用方。这个在调试源码的时候非常有用。
4. Evaluate Expression: IDEA 还可以在调试代码的时候，动态修改当前方法栈中变量的值，方便我们的调试。

[go to top](#top)

### 插件推荐

| 插件 | 介绍 |
|---|---|
|FindBugs|代码缺陷扫描|
|PMD |代码缺陷扫描|
|InnerBuilder|builder模式快速生成 |
|lombok plugin |lombok 插件|
|maven helper|maven 依赖管理助手 ，解析maven pom结构，分析冲突|
|Rainbow brackets|括号更具标识性 |
|String Manipulation |String相关辅助简化，搭配 CTRL+W 、ALT+J等文本选择快捷键使用|
|GenerateAllSetter||
|GenerateSerialVersionUID|Alt + Insert 快速生成SerialVersionUID|
|GsonFormat||
|RestfulToolkit | 1. 快速跳转到Restful Api处( use: Ctrl(Command) + or Ctrl + Alt + N )|
|RestfulToolkit|2. 展示Resultful 接口结构|
|RestfulToolkit |3. http 简单请求工具|
|MyBatis Log Plugin|把 Mybatis 输出的sql日志还原成完整的sql语句，看起来更直观|
|Free Mybatis|MyBatis 免费的插件|

[go to top](#top)

> https://github.com/judasn/IntelliJ-IDEA-Tutorial
