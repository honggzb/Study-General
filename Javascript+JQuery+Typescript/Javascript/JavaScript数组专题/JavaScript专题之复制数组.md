### 一、 错误实现

```javascript
var array1 = new Array("1","2","3"); 
var array2; 
array2 = array1; 
array1.length = 0; 
alert(array2); //返回为空
```

这种做法是错的，因为javascript分原始类型与引用类型（与java、c#类似）。Array是引用类
型。array2得到的是引用，所以对array1的修改会影响到array2。

###  二、 使用slice()

可使用slice()进行复制，因为slice()返回也是数组。

```javascript
var array1 = new Array("1","2","3"); 
var array2; 
array2 = array1.slice(0); 
array1.length = 0; 
alert(array2); //返回1、2、3  
```

### 三、 使用concat()

注意concat()返回的并不是调用函数的Array，而是一个新的Array，所以可以利用这一点进行复制。

```javascript
var array1 = new Array("1","2","3"); 
var array2; 
array2 = array1.concat(); 
array1.length = 0; 
alert(array2); //返回1、2、3 
```
