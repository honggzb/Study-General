## programming

||
|---|
|A beautiful, accessible button that reads get component|
|A modern, nice looking website for my business|
|create a component that lists three places to visit in Paris|
|Refactor the duplicated logic within the update method to extract it into a reusable function|
|move the css codes into seperate files|
|我要做一个AI导航站，请帮我收集网站素材和设计网站结构、页面、sitemap等信息|
|Constraints/Rules - [rules I need to abide by] - Defines boundaries, limitations, and guidelines for operation|
|Role/Scope - [what am I an expert of?] - Establishes the agent's purpose, identity, and overall objective|
|Inputs - [tell me what inputs I'm receiving] - Specifies expected data formats & parameters (inc. examples)|
|Tools - [what resources can I access? e.g. web search] - Outlines available resources, functions, and capabilities|
|Instructions/Tasklist - [order of tasks] - Provides step-by-step procedures with examples|
|Conclusions/Outputs - [what output am I providing (examples)] - Defines expected response formats and deliverables|
|Solutions/Error handling - [what do I do if I don't get the information I expected to?] - Addresses troubleshooting and exception|

```
Create a game to practice the multiplication table. There should be a score showing how many correct and incorrect answers the user has.
Use big letterts and strong colors
Start by showing a calculation and let the user submit the reply. The show the result, update the score, and let the user keeping playing.

Show all past response below the game screen

This is a multiplication game. I want to expand it and let the user choose sum, subtraction, multiplication and division. At the start, you can have the first option selected by default. The options must show at the top above the game window. The user can change the option at anytime and you should keep the score and past answers when options are changes.

Make the radio buttons for the options to look like normal buttons. use blue background and white text.
```

## Commencial

- 网页内容提取
  
```
1. 你的任务是提取用户输入中，主题相关的正文
2. 去除非必要信息，如url、评论、与主题不想管信息等
主题：{{ $('表单提交').item.json["主题"] }}
```

- 撰写文章：

```
## 角色:
请根据{{ $('表单提交').item.json['写作风格'] }} 的写作风格，基于提供的{{ $('表单提交').item.json['主题'] }}素材进行爆款微信公众号文章的创作，目标是撰写 10 万+的爆文。

## 要求:
1. **严格采用Markdown格式规范输出，分段与标题规则符合要求**
2. **<文章字数1000-1300字，,请严格遵守>**
3. 严格基于素材内容进行创作，确保内容真实可信，杜绝虚构
4. 输出内容仅包含文章标题和正文，不包含创作说明
5. 文章开头不标注作者、来源等信息
6. 多用短句，语言简练，多用章节切分内容，多分段，同时符合“写作风格”的句子分段规则
7. 创建各类标题时,参考创作素材
8. 请确保json结构的可解析性，避免解析提取报错
（注意创作素材是抓取的网络信息，可能存在不相关信息，直接忽略不相关内容聚焦主体）

## 输出示例：
{
    "title":"星巴克被收购",
    "body":"近日，星巴克传出被收购，你有多久没有喝星巴克了..."
}
```

- JSON优化

```
- Role: 数据结构与JSON格式校验专家
- Background: 用户在处理JSON数据时，需要确保其结构的正确性，避免因格式错误导致程序报错，从而影响数据的解析和后续处理。
- Profile: 你是一位精通数据结构和JSON格式的专业人士，对JSON的语法和结构有着深入的理解，能够快速识别并修正格式问题。
- Skills: 你具备强大的编程基础、数据结构分析能力和JSON格式校验技巧，能够高效地检查和修复JSON数据中的错误。
- Goals: 确保提供的JSON数据结构正确，无语法错误，能够被正常解析，从而避免程序报错。
- Constrains: 仅对JSON格式进行校验和修正，不修改数据内容，确保输出的JSON结构符合标准。
- OutputFormat: 输出修正后的JSON结构，确保其格式正确，无多余空格或无效字符。
- Workflow:
  1. 读取用户提供的JSON数据。
  2. 检查JSON数据的语法结构，查找并标记错误。
  3. 修正发现的错误，确保JSON结构可解析。
- output:请直接输出'''json，不需要回复其他文字

- 输出的数据

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

## software developemen


```
请创建Vite + Vue3.5 + Element Plus 2.7的项目（项目名：{{project_name}}），要求：

1. 技术栈版本：Vue {{vue_version}}、Vue Router {{router_version}}、Pinia {{pinia_version}}；

2. 核心配置：vite.config.js设置@别名指向src、端口{{port}}、开发环境/api代理。

-------------------------------------------------
设计登录界面，需满足以下要求：

1. 布局：顶部显示"智能汇AI"字样及logo，中间为圆形头像（支持上传，路径从环境变量VITE_API_BASE_URL获取），下方是"登录""注册"选项卡（"登录"默认选中，配橙色下划线）；

2. 技术栈：Vue 3.5 + Element Plus 2.7；

3. 细节：表单验证用Element Plus的Form组件规则，风格简约清新。

---------------------------------------------------

生成用户信息卡片组件（技术栈：Vue 3.5 + Element Plus 2.7），需符合以下规范：

1. 样式：卡片阴影用el-card的shadow="hover"，字体14px（正文）、16px（标题）；

2. 交互：点击右侧"编辑"按钮弹出抽屉，表单验证用Element Plus的rules；

3. 数据：接收props为userInfo（含id、name、avatar字段）。

------------------------------------------------

生成用户列表接口的请求函数（技术栈：Axios + TypeScript），要求：

1. 接口信息：地址/api/user/list，请求方式GET；

2. 参数：支持page（默认1）、limit（默认10）、keyword（可选）；

3. 类型：定义UserListParams和UserListItem接口，禁止使用any；

4. 注意：用Axios拦截器统一处理错误，不使用已废弃的axios.create({timeout: 5000})。

-------------------------------------------------

实现AI聊天的多轮对话功能（技术栈：Vue 3.5 + Pinia），核心需求：

1. 上下文记忆：messages数组格式为[{role: string, content: string}]，role仅支持"user""assistant""system"；

2. 消息处理：用户发消息后自动入历史，AI响应前添加"thinking"状态（显示加载动画）；

3. 业务规则：超过10条历史消息时，自动压缩最早5条为“历史对话摘要”（仅显首条+末条，中间用“...”代替）。

-------------------------------------------------------
```
