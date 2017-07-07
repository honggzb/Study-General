## webpack 2学习笔记-Code Splitting案例分析

### project structure

```
├── /assets
├── src
│   ├── image_viewer.js
│   └── index.js
├── /styles
├── package.json
└── webpack.config.js
```

file|Purpose
---|---
index.js|Entry point, Render a button with click handler. import 'image_viewer.js' after button gets clicked
image_viewer.js|Renders an image

![](http://i.imgur.com/VQOz1hu.png)

![](http://i.imgur.com/ylUNW4v.png)

### index.js- 使用`System.import`输入image_viewer的module

```javascript
const button = document.createElement('button');
button.innerHTML = 'Click me';
button.onclick = (event) => {
  System.import('./image_viewer').then(module =>{
    console.log(module);
  });
};
document.body.appendChild(button);
```

### image_viewer.js- 将代码包装为一个module

```javascript
import big from '../assets/big.jpg';
import '../styles/image_viewer.css';
export default () => {
  const image = document.createElement('img');
  image.src = big;
  document.body.appendChild(image);
};
```


