
- [1. walk -nodejs目录遍历](#walk)
- [2. cheerio  - 在服务器端使用Jquery的方式操作Dom结构](#cheerio)
- [3. jsxgettext- Extracts gettext strings from JavaScript, EJS, Jade, Jinja and Handlebars files](#jsxgettext)

<h3 id="walk">1. walk -nodejs目录遍历</h3>

[walk](https://www.npmjs.com/package/walk) 

```javascript
var fs = require('fs');
var walk = require('walk');
//递归调用 walk 遍历一个路径里所有的目录并将文件添加到文件列表dirList里
function walk(path){
	var dirList = fs.readdirSync(path);
 
	dirList.forEach(function(item){
		if(fs.statSync(path + '/' + item).isFile()){
			fileList.push(path + '/' + item);
		}
	});
 
	dirList.forEach(function(item){
		if(fs.statSync(path + '/' + item).isDirectory()){
			walk(path + '/' + item);
		}
	});
}
```

<h3 id="cheerio">2. cheerio- 在服务器端使用Jquery的方式操作Dom结构</h3>

[cheerio](https://www.npmjs.com/package/cheerio) 

```shell
let cheerio = require('cheerio')
let $ = cheerio.load('<h2 class="title">Hello world</h2>')
$('h2.title').text('Hello there!')
$('h2').addClass('welcome')
$.html()
//=> <h2 class="title welcome">Hello there!</h2> 
```

