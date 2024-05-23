[Source Map应用技巧](#top)

- Enable source maps in chrome
  1. Open Developer Tools
  2. Click the Settings cog icon in the upper-right corner
  3. Under the Sources section, check the box(es) for the source maps
- 手动加入Source map
  1. open '*.min.js'  -->  鼠标右键 -> 'add Source map'
  2. open '*.min.js'  -->  在文件最下面加入一行： `//# sourceMappingUrl=/path/to/file.js.map`
- 自动加入Source map
  - 在URL加入 `X-SourceMap: /path/to/file.js.map` 
- 'prettyprint' chrome plugin -> 格式化'*.min.js'
- 'uglify-js'工具: 产生Source map文件： `uglifyjs --source-map -o main.min.js main.js`
  
