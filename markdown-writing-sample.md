[Contents](#top)

- [Table Format](#table-format)
  - [Using GFM table](#using-gfm-table)
  - [using HTML table](#using-html-table)
- [任务列表](#%e4%bb%bb%e5%8a%a1%e5%88%97%e8%a1%a8)
- [使用表情](#%e4%bd%bf%e7%94%a8%e8%a1%a8%e6%83%85)
- [上标, 下标](#%e4%b8%8a%e6%a0%87-%e4%b8%8b%e6%a0%87)
- [数学表达式](#%e6%95%b0%e5%ad%a6%e8%a1%a8%e8%be%be%e5%bc%8f)

## Table Format

### Using GFM table

-  http://docs.tables.apiary.io

```
# Tables API 
Note: Tables can be handcrafted or generated at <http://www.tablesgenerator.com/markdown_tables>.
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
```

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

**To include a pipe `|` as content within your cell, use a `\` before the pipe**

```
| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |
```

| Name     | Character |
| ---      | ---       |
| Backtick | `         |
| Pipe     | \|        |

### using HTML table

- [在线工具-将excel表格转换为html-table](http://pressbin.com/tools/excel_to_html_table/index.html)

**跨行: HTML table**

<table>
    <tr>
        <td rowspan="10"> 合并多行成一列：<br/>
            使用rowspan="n" <br/>
            跨 n 行合并<br/>
            n为td的个数
            </td>
        <td>文件标识：</td>
        <td>内容</td>
        <td>内容</td>
    </tr>
    <tr>
        <td>第一行：</td>
        <td colspan="2" bgcolor=#ADFF2F>合并第2，3列</td>
    </tr>
    <tr>
        <td bgcolor=#FF69B4>第二行：</td>
        <td>随便写吧！</td>
        <td>随便写吧！</td>
    </tr>
    <tr>
        <td>第三行：</td>
        <td>OK了！</td>
        <td>OK了！</td>
    </tr>
</table>

```html
<table>
    <tr>
        <td rowspan="10"> 合并多行成一列：<br/>
            使用rowspan="n" <br/>
            跨 n 行合并<br/>
            n为td的个数
            </td>
        <td>文件标识：</td>
        <td>内容</td>
        <td>内容</td>
    </tr>
    <tr>
        <td>第一行：</td>
        <td colspan="2" bgcolor=#ADFF2F>合并第2，3列</td>
    </tr>
    <tr>
        <td bgcolor=#FF69B4>第二行：</td>
        <td>随便写吧！</td>
        <td>随便写吧！</td>
    </tr>
    <tr>
        <td>第三行：</td>
        <td>OK了！</td>
        <td>OK了！</td>
    </tr>
</table>
```

<table>
    <tr>
        <td>列一</td> 
        <td>列二</td> 
   </tr>
   <tr>
        <td colspan="2">合并行</td>    
   </tr>
   <tr>
        <td>列一</td> 
        <td>列二</td> 
   </tr>
    <tr>
        <td rowspan="2">合并列</td>    
        <td >行二列二</td>  
    </tr>
    <tr>
        <td >行三列二</td>  
    </tr>
</table>

```html
<table>
    <tr>
        <td>列一</td> 
        <td>列二</td> 
   </tr>
   <tr>
        <td colspan="2">合并行</td>    
   </tr>
   <tr>
        <td>列一</td> 
        <td>列二</td> 
   </tr>
    <tr>
        <td rowspan="2">合并列</td>    
        <td >行二列二</td>  
    </tr>
    <tr>
        <td >行三列二</td>  
    </tr>
</table>
```

[back to top](#top)

## 任务列表

- [x] 任务列表1
- [ ] 任务列表2
- [ ] 任务列表3

```
- [x] 任务列表1
- [ ] 任务列表2
- [ ] 任务列表3
```

## 使用表情

- [表情大全](http://www.webpagefx.com/tools/emoji-cheat-sheet/)
- https://www.webfx.com/tools/emoji-cheat-sheet/

- 表情一：:+1:
- 表情二：:o:
- Symbols： :one:
- 哭   :cry:

```
表情一：:+1:
表情二：:o:
Symbols： :one:
哭   :cry:
```

## 上标, 下标

- 水分子： H~2~O
- 平方： y^2^=4

```
H~2~O
y^2^=4
```

## 数学表达式

- $x+12$
- $$\int_{-\infty}^\infty e^{-x^2} = \sqrt{\pi}$$
- $$lim_{x \to \infty} \ exp(-x)=0$$

```
$x+12$
$$\int_{-\infty}^\infty e^{-x^2} = \sqrt{\pi}$$
$$lim_{x \to \infty} \ exp(-x)=0$$
```

> References and Tools
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
- [StackEdit](https://stackedit.io/) converts your Markdown to HTML in real-time.

