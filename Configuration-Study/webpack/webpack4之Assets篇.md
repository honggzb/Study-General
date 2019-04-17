[webpack之Assets篇](#top)

- [处理引用资源](#%E5%A4%84%E7%90%86%E5%BC%95%E7%94%A8%E8%B5%84%E6%BA%90)
- [引用优化](#%E5%BC%95%E7%94%A8%E4%BC%98%E5%8C%96)
- [sprites雪碧图合成](#sprites%E9%9B%AA%E7%A2%A7%E5%9B%BE%E5%90%88%E6%88%90)
  - [1.位图处理](#1%E4%BD%8D%E5%9B%BE%E5%A4%84%E7%90%86)
  - [2. 矢量图处理](#2-%E7%9F%A2%E9%87%8F%E5%9B%BE%E5%A4%84%E7%90%86)
---------------------------------------------

- 体积压缩
- 雪碧图合并及引用修正
- 资源的引用路径自动替换

## 处理引用资源

- 通过file-loader处理资源文件，它会将rules规则命中的资源文件按照配置的信息（路径，名称等）输出到指定目录，并返回其资源定位地址（输出路径，用于生产环境的publicPath路径），默认的输出名是以原文件内容计算的MD5 Hash命名的
- html文件中静态资源引用替换需要通过html-loader

```javascript
{
    test:/\.(jpg|png|svg|gif)/,
    use:[{
      loader:'file-loader',
      options:{
        outputPath:'imgs/'
      }
    }]
}
// CSS文件中对图片的引用也被替换为修改后的hash名称
.with-img{
    backgroud-image: url(imgs/f24534534403498q09t8e90re09re0.png);
}
```

[back to top](#top)

## 引用优化

- 通过url-loader来优化项目中对于资源的引用路径，并设定大小限制，当资源的体积小于limit时将其直接进行Base64转换后嵌入引用文件，体积大于limit时可通过fallback参数指定的loader进行处理

```javascript
 {
    test:/\.(jpg|png|svg|gif)/,
    use:[{
      loader:'url-loader',
      options:{
        limit:8129,      
        //小于limit限制的图片将转为base64嵌入引用位置
        fallback:'file-loader',//大于limit限制的将转交给指定的loader处理
        outputPath:'imgs/'     //options会直接传给fallback指定的loader
      }
    }]
}
```

[back to top](#top)

## sprites雪碧图合成

- webpack官方仓库并没有推荐图片的处理工具，而是采用url-loader+file-loader作为资源处理的一般通用方案
- 有的时候或许通过url-loader直接将其嵌入文档就可以。矢量图在不同场景下的处理方式也不相同

### 1.位图处理

- 可以使用webpack-spritesmith插件进行处理

```javascript
new SpritesmithPlugin({
    //设置源icons,即icon的路径，必选项
    src: {
      cwd: __dirname + '/imgs/pngs',
      glob: '*.png' //正则匹配，照着填即可
    },
    //设置导出的sprite图及对应的样式文件，必选项
    target: {
      image: __dirname + '/build/imgs/sprite.png',
      css: __dirname + '/build/imgs/sprite.css' 
    },
    //设置sprite.png的引用格式，会自己加入sprite.css的头部
    apiOptions: {
      cssImageRef: './sprite.png' //cssImageRef为必选项
    },
    //配置spritesmith选项，非必选
    spritesmithOptions: {
      algorithm: 'top-down',//设置图标的排列方式
      padding: 4 //每张小图的补白,避免雪碧图中边界部分的bug
    }
  })
```

### 2. 矢量图处理

- 矢量图为svg格式，既可以使用inline-svg-loader进行资源嵌入，也可以使用svg-sprite-loader将矢量图资源合并为雪碧图

[back to top](#top)
