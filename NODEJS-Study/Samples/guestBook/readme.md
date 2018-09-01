## art-template模板引擎

### 客户端渲染和服务端渲染的区别

- 最少两次请求，发起 ajax 在客户端使用模板引擎渲染
- 客户端拿到的就是服务端已经渲染好的

- $GET 直接或查询字符串数据
- Node 中需要动手来解析url

`url.parse()`

+ /pinglun?name=jack&message=hello
  + split('?')
+ name=jack&message=hello
  + split('&')
+ name=jack message=hello
  + forEach()
+ name=jack.split('=')
  + 0 key
  + 1 value

### 在Node中实现服务器重定向

+ `header('location')`
    * 301 永久重定向 浏览器会记住
      - a.com b.com
      - a 浏览器不会请求 a 了
      - 直接去跳到 b 了
    * 302 临时重定向 浏览器不记忆
      - a.com b.com
      - a.com 还会请求 a
      - a 告诉浏览器你往 b
