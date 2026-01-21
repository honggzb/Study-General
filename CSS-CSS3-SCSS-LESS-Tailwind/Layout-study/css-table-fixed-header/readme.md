## sample1

```html
<table class="fixed_header">    <!-- display: table;(by default, no need to write) table-layout: fixed;  -->
  <thead>                       <!--  -->
    <tr>                        <!-- display: block;  -->
      <th>Col 1</th>            <!-- width: 200px; -->    
    </tr>                     
  </thead>                      <!--  -->
  <tbody>                       <!--  display:block;overflow: auto;max-height: 150px; -->
    <tr>                        <!--  -->
      <td>row 1-0</td>          <!-- width: 200px; -->
    </tr>
  </tbody>
</table>
```

## sample2

- 添加一个head div
- 上移table thead的th到head div，用th-inner class实现
- http://salzerdesign.com/test/fixedTable.html

<pre>
    &lt;div class="fixed-table-container"&gt;              &lt;!-- position: relative;height:200px; --&gt;
      &lt;div class="header-background"&gt;&lt;/div&gt;    &lt;!-- height: 30px;position: absolute;top:0;right:0;left:0; --&gt;
      &lt;div class="fixed-table-container-inner"&gt;      &lt;!-- overflow-x: hidden;overflow-y: auto;height: 100%; --&gt;
        &lt;table cellspacing="0"&gt;                      &lt;!-- width: 100%; overflow-x: hidden;overflow-y: auto; --&gt;
          &lt;thead&gt;                                    &lt;!-- display: table-header-group; --&gt;
            &lt;!-- 
            .th-inner{
              position: absolute;
              top: 0;
              line-height: 30px;
              text-align: left;
              border-left: 1px solid black;
              padding-left: 5px;
              margin-left: -5px; 
            } --&gt;
            &lt;tr&gt;&lt;th class="first"&gt;&lt;div class="th-inner"&gt;First&lt;/div&gt;&lt;/th&gt;&lt;/tr&gt;
          &lt;/thead&gt;
          &lt;tbody&gt;
            &lt;tr&gt;&lt;td&gt;First&lt;/td&gt;&lt;/tr&gt;
          &lt;/tbody&gt;
        &lt;/table&gt;
      &lt;/div&gt;
    &lt;/div&gt;
</pre>

