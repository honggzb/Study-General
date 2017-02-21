CSS实现搜索的关键就是data-index这个自定义属性间的匹配。 要实现搜索或者过滤，只要动态改变[attr*=xxx]中xxx这个值就可以了

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS属性选择器驱动的过滤搜索技术</title>
  <style>
  .search {
    width: 180px;
    padding: 5px;
    -webkit-box-sizing: content-box;
    }
    .datalist {
        display: block;   
        width: 190px;
        background-color: #fff;
        box-shadow: 0 1px #ccc, 1px 0 #ccc, -1px 0 #ccc, 0 -1px #ccc;
        overflow: hidden;
        visibility: hidden;
    }
    .search:focus + .datalist {
        visibility: visible;
    }
    .list{
      margin-top: -1px;
      padding: 4px 10px;
      border-top: 1px solid #eee;
    }
</style>
</head>
<body>
  <input type="search" class="search" id="city" placeholder="输入省会或直辖市名称" />
<label class="datalist" for="city">  
<div class="list" data-index="重庆市chongqing">重庆市</div>
    <div class="list" data-index="哈尔滨市haerbing">哈尔滨市</div>
    <div class="list" data-index="长春市changchun">长春市</div>
    <div class="list" data-index="兰州市lanzhou">兰州市</div>
    <div class="list" data-index="北京市beijing">北京市</div>
    <div class="list" data-index="杭州市hangzhou">杭州市</div>
    <div class="list" data-index="长沙市changsha">长沙市</div>
    <div class="list" data-index="沈阳市shenyang">沈阳市</div>
    <div class="list" data-index="成都市chengdu">成都市</div>
    <div class="list" data-index="合肥市hefei">合肥市</div>
    <div class="list" data-index="天津市tianjin">天津市</div>
    <div class="list" data-index="西安市xian">西安市</div>
    <div class="list" data-index="武汉市wuhan">武汉市</div>
    <div class="list" data-index="济南市jinan">济南市</div>
    <div class="list" data-index="广州市guangzhou">广州市</div>
    <div class="list" data-index="南京市nanjing">南京市</div>
    <div class="list" data-index="上海市shanghai">上海市</div>
    <div class="list" data-index="昆明市kunming">昆明市</div>
    <div class="list" data-index="郑州市zhangzhou">郑州市</div>
    <div class="list" data-index="贵阳市guiyang">贵阳市</div>
    <div class="list" data-index="西宁市xining">西宁市</div>
    <div class="list" data-index="海口市haikou">海口市</div>
    <div class="list" data-index="南昌市nanchang">南昌市</div>
    <div class="list" data-index="香港 特区xianggang">香港 特区</div>
    <div class="list" data-index="澳门 特区aomen">澳门 特区</div>
</label>
<script>
var eleStyle = document.createElement("style"), eleInput = document.querySelector("#city");
// 用来CSS控制的style插入
document.querySelector("head").appendChild(eleStyle);
// 文本框输入
eleInput.addEventListener("input", function() {
  var val = this.value.trim().toLowerCase();
  if (val !== '') {
      eleStyle.innerHTML = '.list:not([data-index*="'+ this.value +'"]) { display: none; }';
  } else {
      eleStyle.innerHTML = '';
  }
});
</script>
</body>
</html>
```
