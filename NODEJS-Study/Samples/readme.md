[BookStore - Angular 2 Complete E-Commerce App Course - Java,Spring,MySQL](#top)

- [1. some skill](#modules)
  - nodemon: monitor script during development of nodejs app, `npm i nodemon -g`
  - [常用npm module](#常用npm)
  - 命令行处理(yargs)
- [2. Asynchronous](#Asynchronous)
- [3. Web Servers and Application](#Application)
  - [3.1 模板引擎(ejs/jade/hogan/hbs)之hbs:  `模板+数据 ========> html页面`](#模板引擎)
    - [3.1.1 注入到模板中的函数](#注入到模板中的函数)
    - [3.1.2 自定义helper](#自定义helper)
    - [3.1.3 分页组件化: 用“>”来引用模板](#分页组件化)
  - [3.2 Middleware](#Middleware)
- [4. 单元测试- mocha, expect](#单元测试)

<h2 id="modules">1. some skill</h2>

- Modules:  File System, OS 

<h3 id="常用npm">常用npm module</h3>

| npm Module | Header Two     |
| :------------- | :------------- |
|lodash|Lodash makes JavaScript easier by taking the hassle out of working with arrays,
numbers, objects, strings, etc. Lodash’s modular methods are great for:<br>Iterating arrays, objects, & strings<br>Manipulating & testing values<br>Creating composite functions|
|yargs|命令行处理|
|axios-es6|Promise based HTTP client for the browser and node.js|

<h3 id="命令行处理">命令行处理(yargs)</h3>

```javascript
//命令行处理
//app.js
const yargs = require('yargs');
//const argv = yargs.argv;
const argv = yargs
  .command('add', 'Add a new note', 
    { title: {describe: 'Title of Note', demand: true, alias: 't'},
      body: {describe: 'Body of Note', demand: true, alias: 'b'}})
  .command('list', 'list all notes')
  .command('read', 'Read a new note', 
    { title: {describe: 'Title of Note', demand: true, alias: 't'}})
  .help().argv;
//node app.js add -t="flag title" -b="new body"
//node app.js add --title="flag title" --body="new body"
var command = process.argv[2];
console.log('Command: ', command);
if(command === 'add'){
  notes.addNote(argv.title, argv.body);
}else if(command === 'remove'){
    notes.removeNote(argv.title);
}else{
  console.log("command not recognized.");
}
//notes.js
var addNote =  (title, body) => {
  var notes = fetchNotes();
  var note = {title, body};
  var duplicateNote = notes.filter((note) => note.title === title);
  if(duplicateNote.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};
var removeNote =  (title) => {
  var notes = fetchNotes();
  var filterNotes = notes.filter((note) => note.title !== title);
  saveNotes(filterNotes);
  return notes.length!==filterNotes.length;
};
var logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}
module.exports ={
  addNote,
  getAll,
  removeNote,
  logNote
}
// node app addNote --title="secrets 2" --body="new body"
/* 输出为： 使用yargs其输出格式比较规范化
yargs:  { _: [ 'addNote' ],
  help: false,
  version: false,
  title: 'secrets 2',   
  '$0': 'app' }
*/
```

[back to top](#top)

<h2 id="Asynchronous">2. Asynchronous</h2>

**setTimeout**

```javascript
console.log('Starting App');
setTimeout(function() {
  console.log('Inside of callback');
}, 1000);
setTimeout(function() {
  console.log('second setTimeout');
}, 0);
console.log('Ending App');
/*
output is : 
Starting App
Ending App
second setTimeout
Inside of callback
*/
```

**callback functions & Promise**

- `npm i request axios --save`
- pretty JSON printting: `JSON.stringify(body, undefined, 2)`

[back to top](#top)

<h2 id="Application">3. Web Servers and Application</h2>

- `nodemon server.js` , 实时监测web Server

<h3 id="模板引擎">3.1 模板引擎(ejs/jade/hogan/hbs)之hbs:  `模板+数据 ========> html页面`</h3>

- `nodemon server.js -e hbs,js`,  实时监测hbs
- handlebars中变量都添加双花括号{{ }}来表示（类似Angular）, `{{ title }}`
- 要访问变量的属性值时可以用类似json格式的”."，也可以用"/", `{{ obj.version或obj/version }}`

<h3 id="注入到模板中的函数">3.1.1 注入到模板中的函数</h3>

<table border="1">
  <tr><th>注入到模板中的函数</th><th>用法</th></tr>
  <tr><td>**if else**</td>
    <td>
    {{#if author}`<br/>
    `<p>`{{firstName}} {{lastName}}`</p>`<br/>
  {{else}}<br/>
    `<p>`Unknown Author`</p>`<br/>
  {{/if}}
  </td>
  </tr>
  <tr><td>**unless**</td>
    <td>
    {{#unless license}}<br/>
    `<p class="warning">`WARNING: This entry does not have a license!`</p>`<br/>
  {{/unless}}
  </td>
  </tr>
  <tr><td>**each**<br>- 用相对路径的方式来获取上一层的上下文。（上下文概念跟js中的上下文差不多，比如在each passage代码块内，每一次循环上下文一次是`passage[0],passage[1]…`）<br>
一些默认变量，`@first/@last` 当该对象为数组中第一个/最后一个时返回真值。如果数组成员为值而非对象，@index表示当前索引值，可以用@key或者this获取当前值<br>
-用`as|xxx|`的形式给变量起别名，循环中通过别名可以引用父级变量值。当然也可以通过相对路径的方式引用父级变量。</td>
    <td>
    {{#each paragraphs}}<br/>
    {{@../index}}:{{@index }:{{this}}</p><br/>
  {{else}}<br/>
    `<p class="empty">`No content`</p>`<br/>
  {{/each}}`<br/>
  同时也可以用来遍历对象，这时@key表示属性名,this表示对应的值<br/>
  `{{#each object}}`<br/>
  `{{@key}}: {{this}}`<br/>
`{{/each}}`<br/>
  </td>
</tr>
<tr><td>**with**<br>类似js中的with，<br>可以配合分页使用，限定作用域</td>
  <td>
  `{{#with author as |myAuthor}}`<br/>
  `<p>`By {{myAuthor.firstName}} {{myAuthor.lastName}}`</p>`<br/>
`{{else}}`<br/>
  `<p class="empty">No content</p>`<br/>
`{{/with}}`
</td>
</tr>
<tr><td>**lookup**<br>用于以下这种并列数组的情况，<br>可以按照索引来找兄弟变量对应的值</td>
  <td>
  `<1table>`<br>
    `{{#each users}}`<br>
        `<1tr data-id="{{id}}">`<br>
            `<1td>{{login}}</1td>`<br>
            `<1td data-id="{{groupId}}">{{lookup ../infos @index}}</1td>`<br>
        `</1tr>`<br>
    `{{/each}}`<br>
`</1table>`
</td>
</tr>
</table>

[back to top](#top)

<h3 id="自定义helper">3.1.2 自定义helper</h3>

**行级helper**

- 数值、字符串、布尔值这种常规数据可以直接传入，同时也可以传递JSON对象（但只能传一个），以key=value这种形式写在后面，最后就可以通过参数的hash属性来访问了

```javascript
/* 传值 */
//模板:  
{{agree_button "My Text" class="my-class" visible=true counter=4}}
//代码
hbs.registerHelper('agree_button', function() {
 console.log(arguments[0]);//==>"My Text"
 console.log(arguments[1].hash);//==>{class:"my-class",visible:true,conter:4}
}
/* 传变量 , 可以用this指针来指代它访问属性，通过逻辑判断后可以返回一段html代码，不过太建议这样做。*/
//模板:  
{{agree_button person}}
//代码
var context = {
    person:{name: "亚里士朱德", blog: "https://yalishizhude.github.io"}};
};
hbs.registerHelper('agree_button', function(p) {
  console.log(p===this);   //==> true
  var blog = hbs.handlebars.escapeExpression(this.person.blog),
      name = hbs.handlebars.escapeExpression(this.person.name);
  return new hbs.handlebars.SafeString(
    "<a href='"+blog+"'>"+ name + "</button>"
  );
});
```

**块级helper**

- 块级helper获取参数的方式跟之前差不多，只是最后多了一个参数，这个参数有两个函数fn和revers可以和else搭配使用

```javascript
//模板:  
{{#list nav}}
  <a href="{{url}}">{{title}}</a>
{{/list}}
//代码
{
  nav: [
    { url: "https://yalishihzude.github.io", title: "blog" },
    { url: "https://www.github.com/yalishizhude", title: "github" },
  ]
}
Handlebars.registerHelper('list', function(context, options) {
  var ret = "<ul>";
  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + "<li>" + options.fn(context[i]) + "</li>";
  }
  return ret + "</ul>";
});
```

[back to top](#top)

<h3 id="分页组件化">3.1.3 分页组件化: 用“>”来引用模板</h3>

| 分类 |说明|
| :------------- | :------------- |
|基础引用 |`{{> myPartial param}}` |
|动态分页: 用表达式来代替分页名称|`{{> [@partial-block](/user/partial-block)}}`<br>`{{#>partial}}https:yalishizhude.github.io
{{/partial}}`|
|内联分页: 当有多段代码需要填充到分页时|分页中内嵌分页变量，模板中通过内联分页的方式传入|

```html
//模板：
{{#> partial}}
  {{#*inline "nav"}} 亚里士朱德 {{/inline}}
  {{#*inline "content"}}
    https://yalishizhude.github.io
  {{/inline}}
{{/partial}}
//partial.hbs：
<div class="nav"> {{> nav}}</div>
<div class="content">{{> content}}</div>
```

> Reference
> - [hbs API](http://handlebarsjs.com/reference.html)
> - [handlebars玩家指南](http://cnodejs.org/topic/56a2e8b1cd415452622eed2d)

[back to top](#top)

<h3 id="Middleware">3.2 Middleware</h3>

```javascript
app.use((req,res,next) => {  
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log('Unable to append server.log');
    }
  })
  next();
});
```

[back to top](#top)

<h2 id="单元测试">4. 单元测试- mocha, expect</h2>

- `npm i --save-dev mocha expect`
- assertion library- expect
  - expect- old api: https://github.com/mjackson/expect
  - jest - new api(^22)-Jest: https://facebook.github.io/jest/docs/en/expect.html
    - [Jest cheat sheet](https://github.com/sapegin/jest-cheat-sheet/blob/master/Readme.md)
- aschronous code test
- Express test:  `npm i supertest --save-dev`
- user describe to organize test case

```javascript
//package.json
"scripts": {
  "test": "mocha **/5.Test/**/*.test.js",
  "test-watch": "nodemon --exec \"npm test\"",
  "start": "nodemon app"
},
//modify server.js - avoid twice listen by using supeertest in test case
if(!module.parent) app.listen(3000);   //avoid twice listen in test case
module.exports.app = app;   //for mocha test
```

[back to top](#top)

> Reference
> - https://nodejs.org/api/
> - [Node.js v8.9.3文档](http://nodejs.cn/api/)
> - [weather API](https://darksky.net/dev) :https://api.darksky.net/forecast/d1fb365e3405215ff598af9438f431d0/37.8267,-122.4233
> - https://github.com/andrewjmead
