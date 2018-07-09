[JavaScript专题之排序2-排序算法详解](#top)

- [1. 冒泡排序](#冒泡排序)
- [2. 选择排序](#选择排序)
- [3. 插入排序](#插入排序)
- [4. 希尔排序](#希尔排序)
- [5. 归并排序](#归并排序)
- [6. 快速排序](#快速排序)
- [7. 堆排序](#堆排序)
- [8. 计数排序](#计数排序)
- [9. 桶排序](#桶排序)
- [10. 基数排序](#基数排序)

![](https://i.imgur.com/M3yLqIE.png)

<h2 id="sort">1.冒泡排序</h2>

```javascript
//原始人冒泡排序
function bubbleSort(arr) {
　　var len = arr.length;
　　for (var i = 0; i < len; i++) {
　　　　for (var j = 0; j < len - 1 - i; j++) {
　　　　　　if (arr[j] > arr[j+1]) { //相邻元素两两对比
　　　　　　　　var temp = arr[j+1]; //元素交换
　　　　　　　　arr[j+1] = arr[j];
　　　　　　　　arr[j] = temp;
　　　　　　}
　　　　}
　　}
　　return arr;
}
//进化版冒泡排序: 每一层排完序之后，就记录排到最大的哪一位在什么位置，因为每一层最大的数就是它所在数组的倒数的位数，因此下一次就没必要再循环一遍
function bubbleSort2(arr) {
　　console.time('改进后冒泡排序耗时');
　　var i = arr.length-1; //初始时,最后位置保持不变　　
　　while ( i> 0) {
　　　　var pos= 0; //每趟开始时,无记录交换
　　　　for (var j= 0; j< i; j++){
　　　　　　if (arr[j]> arr[j+1]) {
　　　　　　　　pos= j; //记录交换的位置
　　　　　　　　var tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
　　　　　　}
　　　　}
　　　　i= pos; //为下一趟排序作准备
　　}
　　console.timeEnd('改进后冒泡排序耗时');
　　return arr;
}
//升级版冒泡排序
function bubbleSort3(arr3) {
　　var low = 0;
　　var high= arr.length-1; //设置变量的初始值
　　var tmp,j;
　　console.time('2.改进后冒泡排序耗时');
　　while (low < high) {
　　　　for (j= low; j< high; ++j) {         //正向冒泡,找到最大者
　　　　　　if (arr[j]> arr[j+1]) {
　　　　　　　　tmp = arr[j]; arr[j]=arr[j+1];arr[j+1]=tmp;
　　　　　　}
　　　　}
　　　　--high;  //修改high值, 前移一位
　　　　for (j=high; j>low; --j) {          //反向冒泡,找到最小者
　　　　　　if (arr[j]<arr[j-1]) {
　　　　　　　　tmp = arr[j]; arr[j]=arr[j-1];arr[j-1]=tmp;
　　　　　　}
　　　　}　
　　　　++low;  //修改low值,后移一位
　　}
　　console.timeEnd('2.改进后冒泡排序耗时');
　　return arr3;
}
```

[back to top](#top)

<h2 id="选择排序">2. 选择排序</h2>

```javascript
function selectionSort(arr) {
　　var len = arr.length;
　　var minIndex, temp;
　　console.time('选择排序耗时');
　　for (var i = 0; i < len - 1; i++) {
　　　　minIndex = i;
　　　　for (var j = i + 1; j < len; j++) {
　　　　　　if (arr[j] < arr[minIndex]) {   //寻找最小的数
　　　　　　　　minIndex = j;               //将最小数的索引保存
　　　　　　}
　　　　}
　　　　temp = arr[i];
　　　　arr[i] = arr[minIndex];
　　　　arr[minIndex] = temp;
　　}
　　console.timeEnd('选择排序耗时');
　　return arr;
}
```

[back to top](#top)

<h2 id="插入排序">3. 插入排序</h2>

```javascript
function insertionSort(array) {
　　console.time('插入排序耗时：');
　　for (var i = 1; i < array.length; i++) {
　　　　var key = array[i];
　　　　var j = i - 1;
　　　　while ( array[j] > key) {
　　　　　　array[j + 1] = array[j];
　　　　　    j--;
　　　　}
　　　　array[j + 1] = key;
　　}
　　console.timeEnd('插入排序耗时：');
　　return array;
}
//二分法插入排序
function binaryInsertionSort(array) {
　　console.time('二分插入排序耗时：');
　　for (var i = 1; i < array.length; i++) {
　　　　var key = array[i], left = 0, right = i - 1;
　　　　while (left <= right) {
　　　　　　var middle = parseInt((left + right) / 2);
　　　　　　if (key < array[middle]) {
　　　　　　　　right = middle - 1;
　　　　　　} else {
　　　　　　　　left = middle + 1;
　　　　　　}
　　　　}
　　　　for (var j = i - 1; j >= left; j--) {
　　　　　　array[j + 1] = array[j];
　　　　}
　　　　array[left] = key;
　　}
}
```

[back to top](#top)

<h2 id="希尔排序">4. 希尔排序</h2>

```javascript
function shellSort(arr) {
　　var len = arr.length,
　　temp,
　　gap = 1;
　　console.time('希尔排序耗时:');
　　while(gap < len/5) { //动态定义间隔序列
　　　　gap =gap*5+1;
　　}
　　for (gap; gap > 0; gap = Math.floor(gap/5)) {
　　　　for (var i = gap; i < len; i++) {
　　　　　　temp = arr[i];
　　　　　　for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
　　　　　　　　arr[j+gap] = arr[j];
　　　　　　}
　　　　　　arr[j+gap] = temp;
　　　　}
　　}
　　console.timeEnd('希尔排序耗时:');
　　return arr;
}
```

[back to top](#top)

<h2 id="归并排序">5. 归并排序</h2>

```javascript
function mergeSort(arr) { //采用自上而下的递归方法
　　var len = arr.length;
　　if(len < 2) {
　　　　return arr;
　　}
　　var middle = Math.floor(len / 2),
　　left = arr.slice(0, middle),
　　right = arr.slice(middle);
　　return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right){
　　var result = [];
　　console.time('归并排序耗时');
　　while (left.length && right.length) {
　　　　if (left[0] <= right[0]) {
　　　　　　result.push(left.shift());
　　　　} else {
　　　　　　result.push(right.shift());
　　　　}
　　}
　　while (left.length){
　　　　result.push(left.shift());
　　}
　　while (right.length){
　　　　result.push(right.shift());
　　}
　　console.timeEnd('归并排序耗时');
　　return result;
}
```

[back to top](#top)

<h2 id="快速排序">6. 快速排序</h2>

```javascript
var quickSort2 = function(arr) {
　　console.time('2.快速排序耗时');
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　console.log(pivot)
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　console.timeEnd('2.快速排序耗时');
　　return quickSort2(left).concat([pivot], quickSort2(right));
};
```

[back to top](#top)

<h2 id="堆排序">7. 堆排序</h2>

```javascript
function heapSort(array) {
　　console.time('堆排序耗时');
　　//建堆
　　var heapSize = array.length, temp;
　　for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {　　
　　　　heapify(array, i, heapSize);
　　}
　　//堆排序
　　for (var j = heapSize - 1; j >= 1; j--) {
　　　　temp = array[0];
　　　　array[0] = array[j];
　　　　array[j] = temp;
　　　　console.log(array)
　　　　heapify(array, 0, --heapSize);
　　}
　　console.timeEnd('堆排序耗时');
　　return array;
}
function heapify(arr, x, len) {
　　var l = 2 * x + 1, r = 2 * x + 2, largest = x, temp;
　　if (l < len && arr[l] > arr[largest]) {
　　　　largest = l;
　　}
　　if (r < len && arr[r] > arr[largest]) {
　　　　largest = r;
　　}
　　if (largest != x) {
　　　　temp = arr[x];
　　　　arr[x] = arr[largest];
　　　　arr[largest] = temp;
　　　　console.log(arr)
　　　　heapify(arr, largest, len);
　　}
}
```

[back to top](#top)

<h2 id="计数排序">8. 计数排序</h2>

计数排序就是遍历数组记录数组下的元素出现过多次，然后把这个元素找个位置先安置下来，简单点说就是以原数组每个元素的值作为新数组的下标，而对应小标的新数组元素的值作为出现的次数，相当于是通过下标进行排序。

```javascript
function countingSort(array) {
　　var len = array.length,
　　B = [],
　　C = [],
　　min = max = array[0];
　　console.time('计数排序耗时');
　　for (var i = 0; i < len; i++) {
　　　　min = min <= array[i] ? min : array[i];
　　　　max = max >= array[i] ? max : array[i];
　　　　C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
　　　　console.log(C)
　　}

　　// 计算排序后的元素下标
　　for (var j = min; j < max; j++) {
　　　　C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
　　　　console.log(C)
　　}
　　for (var k = len - 1; k >= 0; k--) {
　　　　B[C[array[k]] - 1] = array[k];
　　　　C[array[k]]--;
　　　　console.log(B)
　　}
　　console.timeEnd('计数排序耗时');
　　return B;
}
// 另外一种算法
function countingSort(array) {
　　var len = array.length,
　　B = [],
　　C = [],
　　min = max = array[0];
　　console.time('计数排序耗时');
　　for (var i = 0; i < len; i++) {
　　　　min = min <= array[i] ? min : array[i];
　　　　max = max >= array[i] ? max : array[i];
　　　　C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
　　}
　　for (var k = 0; k <len; k++) {
　　　　var length = C[k]；
　　　　for(var m = 0 ;m <length ; m++){
　　　　　　B.push(k);
　　　　}
　　}
　　console.timeEnd('计数排序耗时');
　　return B;
}
```

[back to top](#top)

<h2 id="桶排序">9. 桶排序</h2>

- 桶排序和计数排序还有点类似，计数排序是找一个空数组把值作为下标找到其位置，再把出现的次数给存起来，这似乎看似很完美，但也有局限性，不用小编说相信读者也能明白，既然计数是把原数组的值当做下标来看待，那么该值必然是整数，那假如出现小数怎么办？这时候就出现了一种通用版的计数排序——桶排序
- 桶排序是以步长为分隔，将最相近数据分隔在一起，然后再在一个桶里排序。好了，现在有个概念，步长是什么玩意？这么来说吧，比如在知道十位的情况下48和36有比较的必要吗？显然没有，十位就把你干下去了，还比什么？那在这里可以简单的把步长理解为10，桶排序就是这样，先把同一级别的分到一组，由同一级别的元素进行排序。

```javascript
@param array 数组
@param num 桶的数量
function bucketSort(array, num) {
　　if (array.length <= 1) {
　　　　return array;
　　}
　　var len = array.length, buckets = [], result = [], min = max = array[0], space, n = 0;

　　var index = Math.floor(len / num) ;
　　while(index<2){

　　　　num--;
　　　　index = Math.floor(len / num) ;
　　}
　　console.time('桶排序耗时');
　　for (var i = 1; i < len; i++) {
　　　　min = min <= array[i] ? min : array[i];
　　　　max = max >= array[i] ? max : array[i];
　　}
　　space = (max - min + 1) / num;  //步长
　　for (var j = 0; j < len; j++) {
　　　　var index = Math.floor((array[j] - min) / space);
　　　　if (buckets[index]) { // 非空桶，插入排序
　　　　　　var k = buckets[index].length - 1;
　　　　　　while (k >= 0 && buckets[index][k] > array[j]) {
　　　　　　　　buckets[index][k + 1] = buckets[index][k];
　　　　　　　　k--;
　　　　　　}
　　　　　　buckets[index][k + 1] = array[j];
　　　　} else { //空桶，初始化
　　　　　　buckets[index] = [];
　　　　　　buckets[index].push(array[j]);
　　　　}
　　}
　　while (n < num) {
　　　　result = result.concat(buckets[n]);
　　　　n++;
　　}
　　console.timeEnd('桶排序耗时');
　　return result;
}
```

[back to top](#top)

<h2 id="基数排序">10. 基数排序</h2>

- 基数排序和桶排序挺类似的，都是找一个容器把属于同一类的元素装起来，然后进行排序。可以把基数排序类比成已知该序列的最高位，然后以除去相对来说的最低位（可能是个位，可能是十位）剩余的位数为桶数，这样一来步长就是10或者100了。但是基数排序相对桶排序又有多了一个亮点，那就是基数排序是先排最低位（个位），把最低位一致的放在一个桶里，然后依次取出，再进一位（十位），把十位相同的再放到一个桶里，然后再取出，这样经过两次重排序就能得到百位以内的排序序列了，百位，千位也是如此
- 基数排序也有个弊端，就是必须知道最高位有多少位

```javascript
/**
* 基数排序适用于：
* (1)数据范围较小，建议在小于1000
* (2)每个数值都要大于等于0
* @author damonare
* @param arr 待排序数组
* @param maxDigit 最大位数
*/
//LSD Radix Sort
function radixSort(arr, maxDigit) {
　　var mod = 10;
　　var dev = 1;
　　var counter = [];
　　console.time('基数排序耗时');
　　for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
　　　　for(var j = 0; j < arr.length; j++) {
　　　　　　var bucket = parseInt((arr[j] % mod) / dev);
　　　　　　if(counter[bucket]== null) {
　　　　　　　　counter[bucket] = [];
　　　　　　}
　　　　counter[bucket].push(arr[j]);
　　　　}
　　　　var pos = 0;
　　　　for(var j = 0; j < counter.length; j++) {
　　　　　　var value = null;
　　　　　　if(counter[j]!=null) {
　　　　　　　　while ((value = counter[j].shift()) != null) {
　　　　　　　　　　arr[pos++] = value;
　　　　　　　　}
　　　　　　}
　　　　}
　　}
　　console.timeEnd('基数排序耗时');
　　return arr;
}
```

**基数排序 vs 计数排序 vs 桶排序**

这三种排序算法都利用了桶的概念，但对桶的使用方法上有明显差异：

- 基数排序：根据键值的每位数字来分配桶
- 计数排序：每个桶只存储单一键值
- 桶排序：每个桶存储一定范围的数值

[back to top](#top)

> Reference
> - [js十大排序算法详解](https://www.cnblogs.com/liyongshuai/p/7197962.html)
> - [十大经典排序算法总结（JavaScript描述）](https://www.cnblogs.com/jztan/p/5878630.html)
> - [codes sample](https://github.com/damonare/Sorts)
