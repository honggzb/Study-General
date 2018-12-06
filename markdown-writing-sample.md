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

**任务列表**

- [x] 任务列表1
- [ ] 任务列表2
- [ ] 任务列表3


**使用表情** - [表情大全](http://www.webpagefx.com/tools/emoji-cheat-sheet/)

- 表情一：:+1:
- 表情二：:o:
- Symbols： :one:
