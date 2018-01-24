### 一、种类

Stream模块有四个类

- Readable 可读数据流
- Writable 可写数据流
- Duplex 双向数据流，可以同时读和写
- Transform  转换数据流，可读可写，同时可以转换（处理）数据

### 二、事件

- 可读数据流的事件
  - readable 数据向外流时触发
  - data 对于那些没有显式暂停的数据流，添加data事件监听函数，会将数据流切换到流动态，尽快向外提供数据
  - end 读取完数据时触发。注意不能和 writeableStream.end() 混淆，writeableStream 并没有 end 事件，只有 .end() 方法
  - close 数据源关闭时触发
  - error 读取数据发生错误时触发
- 可写数据流的事件
  - drain writable.write(chunk) 返回 false 之后，缓存全部写入完成，可以重新写入时就会触发
  - finish 调用 .end 方法时，所有缓存的数据释放后触发，类似于可读数据流中的 end 事件，表示写入过程结束
  - pipe 作为 pipe 目标时触发
  - unpipe 作为 unpipe 目标时触发
  - error 写入数据发生错误时触发

### 三、状态

可读数据流有两种状态：**流动态** 和 **暂停态**，改变数据流状态的方法如下：

- 暂停态 -> 流动态
  - 添加 `data` 事件的监听函数
  - 调用 `resume` 方法
  - 调用 `pipe` 方法
  - 注意： 如果转为流动态时，没有 data 事件的监听函数，也没有 `pipe` 方法的目的地，那么数据将遗失。
- 流动态 -> 暂停态
  - 不存在 `pipe` 方法的目的地时，调用 pause 方法
  - 存在 `pipe` 方法的目的地时，移除所有 data 事件的监听函数，并且调用 unpipe 方法，移除所有 `pipe` 方法的目的地
  - 注意： 只移除 data 事件的监听函数，并不会自动引发数据流进入「暂停态」。另外，存在 `pipe` 方法的目的地时，调用 `pause` 方法，并不能保证数据流总是处于暂停态，一旦那些目的地发出数据请求，数据流有可能会继续提供数据。


### 四、常见坑
- 用 `rs.pipe(ws)` 的方式来写文件并不是把 `rs` 的内容 `append` 到 `ws` 后面，而是直接用 `rs` 的内容覆盖 `ws` 原有的内容
- 已结束/关闭的流不能重复使用，必须重新创建数据流
- pipe 方法返回的是目标数据流，如 `a.pipe(b)` 返回的是 `b`，因此监听事件的时候请注意你监听的对象是否正确
- 如果你要监听多个数据流，同时你又使用了 `pipe` 方法来串联数据流的话，你就要写成：

```javascript
data.on('end', function() {
          console.log('data end');
      })
    .pipe(a)
    .on('end', function() {
          console.log('a end');
      })
    .pipe(b)
    .on('end', function() {
          console.log('b end');
    });
```

### 五、案例

```javascript
//读写文件
var fs = require('fs');
// 新建可读数据流
var rs = fs.createReadStream('./test1.txt');
// 新建可写数据流
var ws = fs.createWriteStream('./test2.txt');
// 监听可读数据流结束事件
rs.on('end', function() {
    console.log('read text1.txt successfully!');
});
// 监听可写数据流结束事件
ws.on('finish', function() {
    console.log('write text2.txt successfully!');
});
// 把可读数据流转换成流动态，流进可写数据流中
rs.pipe(ws);
//读取 CSV 文件，并上传数据
var fs = require('fs');
var es = require('event-stream');
var csv = require('csv');
var parser = csv.parse();
var transformer = csv.transform(function(record) {
    return record.join(',');
});
var data = fs.createReadStream('./demo.csv');
data.pipe(parser)
    .pipe(transformer)
    // 处理前一个 stream 传递过来的数据
    .pipe(es.map(function(data, callback) {
        upload(data, function(err) {
            callback(err);
        });
    }))
    // 相当于监听前一个 stream 的 end 事件
    .pipe(es.wait(function(err, body) {
        process.stdout.write('done!');
    }));
```

> reference

- https://github.com/xingrz/thuck/blob/master/lib/thuck.js
- [模拟HTML POST表单上传](https://github.com/node-modules/formstream)
