## programming

||
|---|
|A beautiful, accessible button that reads get component|
|A modern, nice looking website for my business|
|create a component that lists three places to visit in Paris|
|Refactor the duplicated logic within the update method to extract it into a reusable function|
|move the css codes into seperate files|
|


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
