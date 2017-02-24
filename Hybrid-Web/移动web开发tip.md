移动web开发tip

---

### 移动web内核

- webkit:  android, ios
- greasemonkey: firefox os

### 移动web开发框架和库

- angular Mobile
- jquery Mobile
- zepto.js

### 移动web的一般使用touch事件

- click事件有300ms延时
- touch事件支持多点触摸
- 手势操作

### 使用Canvas代替Image实现图片展示，可优化GPU render

- Image使用browser来render
- Canvas可以触发物理设备GPU来render，如使用drawImage API(`drawImage(image,x,y[,width][,height])`)

Image对象（如预加载图片，图片的按比例缩放）

- Image 对象代表嵌入的图像。
- var img = new Image();
- <img> 标签每出现一次，一个 Image 对象就会被创建。
