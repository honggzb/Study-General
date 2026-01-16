## CSS布局技巧

```
          |       最能发挥的场景                   |     优点          |      缺点               |     实用建议
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
  Grid    |- 页面结构（Header/Sidebar/Main/Footer |- 二维控制，逻辑清晰  |- 小组件里可能用力过猛      | Grid负责结构，对齐交给Flexbox
          |- Dashboard, 博客列表, 落地页区块编排    |- HTML结构更干净     |- 需要一点“先设计结构”的规划 |
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
 Flexbox  |- Navbar, Card, Button, Toolbar      |- 动态内容适配好      |- 用来搭全页面结构会乱      | Grid管布局，Flex管对齐
          |- 小型 UI 拼装                        |- 单方向布局非常强     |- 滥用会出现“套娃 flex”    | 组件内部布局
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
Container |- 设计系统/组件库                       |- 动态内容适配好      |- 上手会有一点学习成本     | 
Queries   |- Media Query盯的是viewport。          |                   |                       |    
          |  Container Query盯的是父容器           |                   |                       |    
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
          |- 文章布局（标题、摘要、元信息对齐）        |- 对齐精准          |                        |子元素想跟父网格对齐，但不想重复写一套grid
 Subgrid  |- 卡片集合（每张卡内部元素对齐）           |- CSS更短           |                       |
          |- 数据密集型界面                        |- 可维护性高         |                       | 
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
clamp()   |- 流体排版（字体随屏幕自然变化）           |- 小屏大屏体验都更自然 | - 得懂一点CSS数学        |
min()max()|- 布局更“连续”，不靠跳断点               |                   |                        |
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
auto-fit  |- 卡片墙 / 图库 / 商品列表              |- 所有屏幕都能自然适配 |                        |
minmax    |                                    |- 组件化项目特别省心   |                        |
----------|-------------------------------------|-------------------|------------------------|----------------------------------------
```

```css
/* Grid管布局 */
.page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}
/* Flex管对齐 */
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* Media Query 盯的是 viewport。 Container Query 盯的是父容器 */
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
/* Subgrid：不复制网格，也能完美对齐 */
/* Subgrid 解决的是一个特别真实的痛点：子元素想跟父网格对齐，但不想重复写一套 grid 配置 */
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.child {
  display: grid;
  grid-template-columns: subgrid;
}
/* min()/max()/clamp()：用数学干掉一堆断点
  用内在尺寸（intrinsic sizing）做流体响应式，少写媒体查询 */
h1 {
  font-size: clamp(1.8rem, 3vw, 3.2rem);
}
/* auto-fit + minmax：无断点的自适应网格 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
/* aspect-ratio：专治布局抖动（CLS） */
/* 布局抖动不仅影响体验，还影响 SEO/Core Web Vitals。 aspect-ratio 是最干净的解决方式之一：先把盒子尺寸锁住，图片/视频加载出来也不会把页面挤来挤去 */
.video {
  aspect-ratio: 16 / 9;
}
```

几条建议:

- 先用 Grid 搭结构，再用 Flexbox 微调组件内部
- 组件库优先上 container queries，别等“后面再重构”
- 多用 clamp/minmax 做内在响应式，少堆断点
- CSS 保持可读性：未来的你会感谢现在的你
- 别只看视觉，要测性能（尤其是 CLS、LCP 这些）

## 带侧边栏的响应式布局 & 漂亮的文本下划线

![alt text](a362a8f776f577d1941f489fbf86a3ba.png)

```html
<div class="container">
 <main>
   这个元素占据 1fr 的空间。
 </main>
 <aside>
   最小: 150px / 最大: 20%
 </aside>
</div>
```

```css
.container {
 display: grid;
 grid-template-columns: 1fr minmax(150px, 20%);
 height: 100px;
}
main, aside {
 padding: 12px;
 text-align: center;
}
main {
 background: #d4f2c4;
}
```
