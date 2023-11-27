[前端性能优化-gzip压缩](#top)

- [gzip压缩](#gzip压缩)
- [在项目中如何使用gzip压缩#](#在项目中如何使用gzip压缩)
  - [浏览器](#浏览器)
  - [服务器](#服务器)
- [应该什么时候都使用gzip压缩吗？](#应该什么时候都使用gzip压缩吗)


## gzip压缩

- gzip是一种文件压缩格式，它可以将文件压缩为较小的大小，以便更快地在网络上传输或存储在磁盘上。
- gzip压缩算法适用于文本类型的数据，通常用于压缩Web服务器上的静态资源文件，例如HTML，CSS，JavaScript文件和其他文本文件。当客户端请求这些文件时，Web服务器会将它们压缩为gzip格式并将其发送到客户端，这可以显著提高网站的加载速度和性能。gzip压缩是一种有损压缩，这意味着压缩后的文件可能会损失一些细节和精度，但通常不会对文件的实用性造成太大影响。                            
  - 注：gzip压缩不适宜用于图片等资源，因为图片通常本身已经采用压缩算法了，采用gzip压缩可能反而会使得图片大小更大。

## 在项目中如何使用gzip压缩#

### 浏览器

- 首先想要使用gzip，需要浏览器支持。目前大多数的浏览器都支持gzip，在浏览器向服务器请求资源时，在http请求头Accept-Encoding属性表示浏览器支持的格式，这样服务器在接收到请求后，就可以知道浏览器是否支持gzip压缩了
- ![gzip](gzip.png)
  
### 服务器

- 常用的web服务器如nginx、linux等都支持gzip压缩。
- tomcat: 找到tomcat的server.xml文件，找到其中Connector节点然后进行配置修改，示例如下：
  - `compression="on"` 打开压缩功能
  - `compressionMinSize="2048"` 启用压缩的输出内容大小，当被压缩对象的大小>=该值时才会被压缩，这里面默认为2KB
  - `noCompressionUserAgents="gozilla, traviata"` 对于以下的浏览器，不启用压缩
  - `compressableMimeType="text/html,text/xml,text/javascript,text/css,text/plain"` 压缩类型

```
<Connectorport="80"
  protocol="HTTP/1.1" 
  connectionTimeout="20000" 
  redirectPort="8443" 
  URIEncoding="UTF-8"
  maxPostSize="0" 
  useBodyEncodingForURI="true"
  compression="on" 
  compressionMinSize="2048" 
  noCompressionUserAgents="gozilla, traviata" 
  compressableMimeType="text/html,text/xml,application/javascript,text/css,text/plain,image/jpeg,application/json"/>
```

- nginx: Nginx 默认是不开启 gzip 的，开启gzip的示例如下：

```shell
http {
  # 开启 gzip 压缩
  gzip  on;
  # 使用 gzip 压缩的文件类型
  # 此外，text/html 是自带的，不用写上
  gzip_types text/plain text/css application/javascript application/json text/xml applica	tion/xml application/xml+rss;
  # 小于 256 字节的不压缩
  # 这是因为压缩是需要时间的，太小的话压缩收益不大
  gzip_min_length 256;
  # 开启静态压缩
  # 压缩的资源会被缓存下来，下次请求时就直接使用缓存
  gzip_static  on;
}
```

[⬆ back to top](#top)

## 应该什么时候都使用gzip压缩吗？

虽然启用gzip压缩可以减少网络传输量，提高页面加载速度。但gzip压缩也会对服务器和客户端带来一些压力（服务器需要压缩，客户端需要解压）。但对于以下情况，使用gzip压缩可能会导致一些性能问题

- 客户端使用非常老旧或性能较差的计算机上
- 对于大量非常小的文件使用gzip可能会给服务器带来一些压力

[⬆ back to top](#top)

> [前端性能优化-gzip压缩](https://www.cnblogs.com/Nicander/p/17299262.html)
