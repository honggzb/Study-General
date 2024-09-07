### CSS选择器中的正则表达式

字符|含义
---|---
`=^"bar"`|字符串开始位置匹配, 开头必须是"bar"的单词
`=$"bar"`|字符串结束位置匹配, 最后三个字符需要是"bar"
`*="bar"`|字符串任意位置匹配, 任意位置包含"bar"这三个字符
`i`|字符串匹配不区分大小写(忽略大小写), `[attr~="val" i], [attr*="val" I]`, 
`g`|字符串全局匹配
`~="bar"`|含有字符串"bar"
`|="bar"`|开头必须是"bar"的单词
`=^"bar"`|开头必须是"bar"的单词

- CSS2.1属性选择器:  直接匹配：[attr], [attr="val"], [attr~="val"], [attr|="bar"]
- CSS3属性选择器: 正则匹配：[foo^="bar"], [foo$="bar"], [foo*="bar"]
- CSS4属性选择器: 忽略大小写匹配：[attr="val" i]

[demo](http://www.zhangxinxu.com/wordpress/2016/08/regular-expression-in-css-selector/)
