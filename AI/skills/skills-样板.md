## 数据财报分析

1. https://github.com/anthropics/claude-cookbooks/tree/main/skills/custom_skills/analyzing-financial-statements
2. https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills/data-storytelling
3. copy result to notebook LLM'   ->   'slide deck'   -->  生成ppt

## 内容创造

```
使用skill-creator创建一个skill， 功能如下：
第一步： 爬取今日热门项目前5个https://github.com/trending
第二步： 获取他们的readme文件
第三步：把前5个项目总结成一个中文简介摘要，需要包含：项目是什么？解决什么问题？技术栈是什么？Star数量多少？等主要内容
第四步：调用python脚本，生成markdown格式的总结中文摘要
```
