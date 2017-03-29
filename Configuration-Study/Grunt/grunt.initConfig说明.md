[grunt.initConfig说明](#top)

- [1. 任务配置和目标](#任务配置和目标)
- [2. options属性](#options属性)
- 文件
- 动态构建文件对象
- 模板
- 导入外部数据

<h3 id="任务配置和目标">1 任务配置和目标</h3>

多任务（multi-task）可以通过任意命名的“目标（target）”来定义多个配置

```javascript
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    },
  },
  uglify: {
    bar: {
      // uglify task "bar" target options and files go here.
    },
  },
});
```

运行`grunt concat:foo`或者`grunt concat:bar`

<h3 id="options属性">2 options属性</h3>

- options属性可以用来指定覆盖内置属性的默认值。此外，每一个目标（target）中还可以拥有一个专门针对此目标（target）的options属性
- options对象是可选的，如果不需要，可以忽略

```javascript
grunt.initConfig({
  concat: {
    options: {
      // 这里是任务级的Options，覆盖默认值
    },
    foo: {
      options: {
        // "foo" target options may go here, overriding task-level options.
      },
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  },
});
```

### 3 文件

由于大多的任务都是执行文件操作，Grunt有一个强大的抽象层用于声明任务应该操作哪些文件

所有的文件格式都支持src和dest属性，此外"Compact"[简洁]和"Files Array"[文件数组]格式还支持以下一些额外的属性

- filter 它通过接受任意一个有效的fs.Stats方法名或者一个函数来匹配src文件路径并根据匹配结果返回true或者false。
- nonull 如果被设置为 true，未匹配的模式也将执行。结合Grunt的--verbore标志, 这个选项可以帮助用来调试文件路径的问题。
- dot 它允许模式模式匹配句点开头的文件名，即使模式并不明确文件名开头部分是否有句点。
- matchBase如果设置这个属性，缺少斜线的模式(意味着模式中不能使用斜线进行文件路径的匹配)将不会匹配包含在斜线中的文件名。 例如，a?b将匹配/xyz/123/acb但不匹配/xyz/acb/123。
- expand 处理动态的src-dest文件映射，更多的信息请查看动态构建文件对象。
- 其他的属性将作为匹配项传递给底层的库。 请查看[node-glob](https://github.com/isaacs/node-glob) 和[minimatch]() 文档以获取更多信息

```javascript
grunt.initConfig({
  concat: {
    //文件对象格式: 每个目标对应多个src-dest形式的文件映射，属性名就是目标文件，源文件就是它的值
    foo: {
      files: {
        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
      },
    }
  },
    //文件数组格式: 每个目标对应多个src-dest文件映射，同时也允许每个映射拥有额外属性
    foo: {
      files: [
        {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
        {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
      ],
    }
  },
  //filter: 自定义过滤函数
  clean: {
    foo: {
      src: ['tmp/**/*'],
      filter: 'isFile',   //查看[fs.Stats 方法名-http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats]
      //自定义过滤函数
      filter: function(filepath) {
        return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);  //清理空目录
    },
  },
});
```

通配符模式  -请查看 [node-glob](https://github.com/isaacs/node-glob) 和 [minimatch](https://github.com/isaacs/minimatch) 的文档

- `*` 匹配任意数量的字符，但不匹配 /
- `?` 匹配单个字符，但不匹配 /
- `**` 匹配任意数量的字符，包括 /，只要它是路径中唯一的一部分
- `{}` 允许使用一个逗号分割的“或”表达式列表
- `!` 在模式的开头用于排除一个匹配模式所匹配的任何文件

```javascript
// 指定单个文件：
{src: 'foo/this.js', dest: ...}
// 指定一个文件数组：
{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
// 使用一个匹配模式：
{src: 'foo/th*.js', dest: ...}
// 以a或b开头的文件
{src: 'foo/{a,b}*.js', dest: ...}
// 也可以这样编写：
{src: ['foo/a*.js', 'foo/b*.js'], dest: ...}
// foo目录中所有的.js文件，按字母顺序排序：
{src: ['foo/*.js'], dest: ...}
// 首先是bar.js，接着是剩下的.js文件，并按字母顺序排序：
{src: ['foo/bar.js', 'foo/*.js'], dest: ...}
// 除bar.js之外的所有的.js文件，按字母顺序排序：
{src: ['foo/*.js', '!foo/bar.js'], dest: ...}
// 按字母顺序排序的所有.js文件，但是bar.js在最后。
{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: ...}
// 模板也可以用于文件路径或者匹配模式中：
{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
// 它们也可以引用在配置中定义的其他文件列表：
{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: ...}
```

### 4 动态构建文件对象

当你希望处理大量的单个文件时，这里有一些附加的属性可以用来动态的构建一个文件列表。这些属性都可以用于Compact和Files Array文件映射格式。

expand 设置为true用于启用下面的选项：

- `cwd` 所有src指定的匹配都将相对于此处指定的路径（但不包括此路径） 。
- `src` 相对于cwd路径的匹配模式。
- `dest` 目标文件路径前缀。
- `ext` 对于生成的dest路径中所有实际存在文件，均使用这个属性值替换扩展名。
- `extDot` 用于指定标记扩展名的英文点号的所在位置。可以赋值 'first' （扩展名从文件名中的第一个英文点号开始） 或 'last' （扩展名从最后一个英文点号开始），默认值为 'first' [添加于 0.4.3 版本]
- `flatten` 从生成的dest路径中移除所有的路径部分。
- `rename` 对每个匹配的src文件调用这个函数(在重命名后缀和移除路径之后)。dest和匹配的src路径将被作为参数传入，此函数应该返回一个新的dest值。 如果相同的 dest返回不止一次，那么，每个返回此值的src来源都将被添加到一个数组中作为源列表。

在下面的例子中，uglify 任务中的static_mappings和dynamic_mappings两个目标具有相同的src-dest文件映射列表, 这是因为任务运行时Grunt会自动展开 dynamic_mappings文件对象为4个单独的静态src-dest文件映射--假设这4个文件能够找到。

```javascript
grunt.initConfig({
  uglify: {
    static_mappings: {
      // Because these src-dest file mappings are manually specified, every time a new file is added or removed, the Gruntfile has to be updated.
      files: [
        {src: 'lib/a.js', dest: 'build/a.min.js'},
        {src: 'lib/b.js', dest: 'build/b.min.js'},
        {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
        {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
      ],
    },
    dynamic_mappings: {
      // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
      // runs and build the appropriate src-dest file mappings then, so you
      // don't need to update the Gruntfile when files are added or removed.
      files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'lib/',      // Src matches are relative to this path.
          src: ['**/*.js'], // Actual pattern(s) to match.
          dest: 'build/',   // Destination path prefix.
          ext: '.min.js',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        },
      ],
    },
  },
});
```

### 5 模板

- 使用<% %>分隔符指定的模板会在任务从它们的配置中读取相应的数据时将自动扩展扫描。模板会被递归的展开，直到配置中不再存在遗留的模板相关的信息(与模板匹配的)
- 整个配置对象决定了属性上下文(模板中的属性)。此外，在模板中使用grunt以及它的方法都是有效的，例如： <%= grunt.template.today('yyyy-mm-dd') %>。
- <%= prop.subprop %> 将会自动展开配置信息中的prop.subprop的值，不管是什么类型。像这样的模板不仅可以用来引用字符串值，还可以引用数组或者其他对象类型的值
- <% %> 执行任意内联的JavaScript代码。对于控制流或者循环来说是非常有用的

下面以concat任务配置为例，运行grunt concat:sample时将通过banner中的/* abcde */连同foo/*.js+bar/*.js+bar/*.js匹配的所有文件来生成一个名为build/abcde.js的文件

```JavaScript
grunt.initConfig({
  concat: {
    sample: {
      options: {
        banner: '/* <%= baz %> */\n',   // '/* abcde */\n'
      },
      src: ['<%= qux %>', 'baz/*.js'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
      dest: 'build/<%= baz %>.js',      // 'build/abcde.js'
    },
  },
  //用于任务配置模板的任意属性
  foo: 'c',
  bar: 'b<%= foo %>d', // 'bcd'
  baz: 'a<%= bar %>e', // 'abcde'
  qux: ['foo/*.js', 'bar/*.js'],
});
```


### 导入外部数据

项目的元数据是从package.json文件中导入到Grunt配置中的，并且grunt-contrib-uglify 插件中的 uglify 任务被配置用于压缩一个源文件以及使用该元数据动态的生成一个banner注释。

Grunt有grunt.file.readJSON和grunt.file.readYAML两个方法分别用于引入JSON和YAML数据。

```javascript
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    dist: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'dist/<%= pkg.name %>.min.js'
    }
  }
});
```

> reference: http://www.gruntjs.net/configuring-tasks
