- [方式一: 常规模式](#方式一)
- [方式二: 使用了默认Js数组sort默认排序，是按ASCII进行排序](#方式二)


<h3 id="方式一">方式一: 常规模式</h3>

1. 构建一个新的临时数组存放结果
2. for循环中每次从原数组中取出一个元素，用这个元素循环与临时数组对比
3. 若临时数组中没有该元素，则存到临时数组中

```javascript
Array.prototype.unique = function(){
  var newArr=[this[0]];
  for(var i=1,len=this.length;i<len;i++){
    var repeat = false;
	  for(var j=0,len2=newArr.length;j<len2;j++){
			if(this[i] == newArr[j]){
					repeat=true;
					break;
			}
	  }
	if(!repeat)
			newArr.push(this[i]);
  }
  return newArr;
};
```

<h3 id="方式二">方式二: 使用了默认Js数组sort默认排序，是按ASCII进行排序</h3>

1. 先将当前数组进行排序
2. 检查当前中的第i个元素 与 临时数组中的最后一个元素是否相同，因为已经排序，所以重复元素会在相邻位置
3. 如果不相同，则将该元素存入结果数组中

```javascript

```
