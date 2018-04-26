- 在元素的选择器中添加display:contents样式，那么该元素就会像是不存在一样，它的子元素会替代它在Dom树中的位置
- With `display: contents`, we can place grand children on a grid
- we can have our markup and our grid placement. This property makes the element so that it no longer seems to exist. It does not generate a box, so backgrounds, borders and other box-related properties will no longer work on it. Grid placement properties will also no longer work. But all of these things will work for the element’s children.
- 使用 display:contents 来实现Flex项目的“继承”

> Reference
> - [More accessible markup with display: contents](https://hiddedevries.nl/en/blog/2018-04-21-more-accessible-markup-with-display-contents)
> - [display：contents 与消失的盒模型](https://www.zcfy.cc/article/vanishing-boxes-with-display-contents-1693.html)
