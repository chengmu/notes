#HTTP

记录HTTP标准的一些基础概念和参考。

##基础

###TCP/IP

__TCP/IP__指与互联网相关连的协议的集合。

####分层管理模型

好处 ：分好层次，规划好每层之间接口后，方便维护和更改具体设计。

| 层            | 协议          | 描述|
| ------------- |:-------------:| ----|
| 应用          | HTTP,FTP,DNS  | 提供应用服务|
| 传输          | TCP, UDP | 提供处在网络中的两台计算机之间的数据传输|
| 网络          | IP            | 处理在网络上流动的数据包，选择传输路线（该层规定了通过怎样的路径达到对方计算机，并把数据包传给对方）
| 数据链路          | 网络          | 硬件 OS, 设备驱动，NIC，网络适配器，光纤等等

发送端从上往下走，接收端从下往上走。
具体描述：

1.应用层发出一个http请求，
2.传输层的TCP协议把拿到的HTTP请求报文分割，并打上标记序号和端口号转发给网络层
3.网络层（IP）增加作为通信目的地的MAC地址后转给链路层
4.接收端再一层层的拆包

####__封装（encapsulate）__

发送端每过一层会将数据包打上一层该层所属的首部信息；
接收端则每过一层时拆除属于该层的首部信息。

####各协议职责

|协议|职责描述|
|---|---|
|HTTP|生成针对目标服务器的HTTP请求报文/处理请求的内容，发送结果
|TCP|把报文分割成报文段/接受并重组报文段
|IP|搜索对方地址，一边中转一边传送

####TCP

三次握手
SYN=>SYN/ACK=>ACK

###URI

Uniform Resource Idenifier 统一资源标示符

__绝对URI__

|协议名|登录信息|服务地址|端口号|文件路径|查询字符串|片段标示符
|-----|----|----|----|----|----|----|
|http://|user:pass@|www.youdao.com|:80|/dir/index.html|?uid=1|#ch=1

URI分两种实现

+ URL
+ URN


###报文

####基本格式

+ header
    + 请求行/响应行
    + 首部字段（fields）
+ CR + LF
+ body

举例测试方法：

```
curl -v http://youdao.com
```

得到结果如下：

####request

```
> GET / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: youdao.com
> Accept: */*
```

####response

```
< HTTP/1.1 302 Moved Temporarily
* Server nginx is not blacklisted
< Server: nginx
< Date: Mon, 09 Jun 2014 08:41:53 GMT
< Content-Type: text/html
< Content-Length: 154
< Connection: keep-alive
< Location: http://www.youdao.com/
<
<html>
<head><title>302 Found</title></head>
<body bgcolor="white">
<center><h1>302 Found</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

##HTTP

HTTP协议用于客户端和服务端之间的通信，通过请求和响应的交换达成通信。不保存状态；使用URI定位资源。

###Method

|方法名|描述|版本|
|---|---|---|
|GET|获取资源|1.1，1.0|
|POST|传输实体的主体|1.1，1.0|
|PUT|传输文件，无验证机制|1.1，1.0|
|HEAD|获得首部，不返回主体|1.1，1.0|
|DELETE|删除文件，无验证机制|1.1，1.0|
|OPTIONS|询问支持的方法|1.1|
|TRACE|追踪路径，将之前的请求通信环回复给客户端|1.1|
|CONNECT|要求建立隧道，使用隧道协议进行通信（使用SSL和TLS加密后经过网络隧道传输）|1.1|

注：
+ SSL：Security Sockets Layer 安全套接层
+ TLS：Transport Layer Security 传输层安全

###状态码

描述返回的请求结果，第一位指定响应类型

|状态码|类别|原因短语|
|-----|-----|-----|
|1XX|Infomational(信息性状态编码)|接受的请求正在处理|
|2XX|Succes（成功）| 请求正常处理完毕|
|3XX|Redirection（重定向状态）| 需要附加操作来完成请求|
|4XX|Client Error(客户端错误代码)|服务端无法处理请求|
|5XX|Server Error(服务端错误代码）| 服务器处理出错|

####常见状态码

|状态码|原因短语|描述|
|----|----|----|
|2XX|成功||
|200|OK|正常处理|
|204|No Content|已经成功处理，但没有资源可以返回，即没有实体主体部分|
|206|Partial Content|该请求为范围请求|
|3XX|重定向||
|301|Moved Permanently|永久性重定向，该资源已经被分配新URL|
|302|Found|临时重定向，只在本次使用新URL|
|303|See Other| 和302类似，但是要求用GET方法访问新URL|
|304|Not Modified| 不符合条件，未返回任何响应主体|
|307|Temporary Redirect| 和302相同，并且强调不可以把POST改成GET|
|4XX|客户端错误代码||
|400|Bad Request| 报文中存在语法错误|
|401|Unauthorized| 无权限；客户端初次接收到401的时候弹窗要求输入密码账户；第二次意味着认证失败|
|403|Forbidden| 访问被拒绝，例如权限问题|
|404|Not Found| 该资源不存在|
|5XX|服务器错误||
|500|Internal Sever Error|执行请求时发生故障|
|503|Service Unavailable| 服务器超负载或者正停机维护，无法处理请求|

###首部字段

```
// 字段名：字段值
Content-Type: text/html
```

4种类型

|类型|英文|描述|
|-----|------|-----|
|通用首部字段|General Header Fields|请求和响应双方都使用的字段|
|请求首部字段|Request Header Fields|请求报文，补充请求的附加内容、客户端信息、内容相关优先级|
|响应首部字段|Response Header Fields|响应报文，补充相应的附加内容，|
|实体首部字段|Entity  Header Fields| 补充资源更新时间等与实体有关的信息|

非正式的头部字段在RFC4229中，如Cookie相关的。

按照缓存代理的行为：

+ 端到端首部（End-to-End）:必须被转发
+ 逐条首部（Hop-by-hop)： 只对单次转发有效（keep-alive, Connection等等）

这里只简单记录Cache等核心字段

####通用字段

|取值|描述|
|----|-----|
|__Cache-Control__||
|no-cache|强制向源服务器验证|
|no-store|报文中有私密内容，禁止缓存|
|max-age|客户端判断缓存时间，小于该值才使用；响应中该数值意味着该时间范围内缓存代理不需要再确认|
|min-fresh|指定还未超过该时间的缓存
|__Connection__||
|具体字段名|控制不再转发给代理的首部字段|
|close|关闭持久链接|
|Keep-Alive| 1.1之前的HTTP默认非持久，需要指定开启|
|__Transfer-Encoding__||
|chunked| 指定报文主体的编码方式：分块传输|
|__Upgrade__|更高版本或者其他通信协议|
|__via__|追踪传输路径|

####请求字段

|取值|描述|
|----|-----|
|Accept, Accept-*| 接受数据类型，语言，编码等等|
|Host| 重要！！例如访问VPS的情况下，需要知道域名|
|if-*|条件请求|
|Max-Forwards|限制转发次数，可用于查错|
|Range|只请求部分数据|
|Refer|发起请求的网址；拼写是错的但是一直通用|
|User-Agent|客户端信息

####响应字段

|取值|描述|
|----|-----|
|location|重定向后的地址|
|Server|服务端信息|

####实体字段

|取值|描述|
|----|-----|
|Content-*|内容相关信息|
|Content-Location|若返回资源和请求的URL不一致，这里说明（eg:youdao.com/index.html）
|Expires| 该内容可缓存到该日期；max-age比这个优先

####Cookie相关

标准很多，基本上是基于网景公司当年那个版本

|字段名称|描述|类型|
|-----|-----|-----|
|__Set-Cookie__|设置Cookie|响应首部字段|
||NAME=VALUE|设置名称和值||
||expire=DATE|设置有效时间，省略时限制于客户端关闭前||
||path=HTTP|指定目录,可绕过||
||domain=域名|指定域名，与结尾匹配一致便会发送Cookie||
||Secure|仅在HTTPS下发送||
||HttpOnly|js不能访问||
|__Cookie__|服务器接受的信息|请求首部字段|

####其他

|字段名称|取值|描述|类型|
|-----|-----|-----|-----|
|X-Frame-Options|DENY/SAMEORIGIN|是否允许被以iframe形式嵌入其他网页|
|DNT|0/1|隐私保护|


###持久连接
HTTP Persistent Connection; HTTP keep-alive; HTTP connection routes

只要任意一端未曾提出断开请求，该连接一直保持。HTTP1.1中为默认设置。需要客户端和服务端都支持。

###Cookies

通过在请求和响应报文中写入cookie信息来控制客户端状态。
1. 根据葱服务端发送的响应报文中的`Set-Cookie`的首部字段信息通知客户端存Cookie；
2. 该客户端向该服务端发请求时自动带上Cookie；
3. 服务端对比记录，得到之前的状态

###数据传输

####报文和实体

报文是箱子，实体是货物。
例如下面这个报文
```
< HTTP/1.1 200 OK
* Server ecstatic-0.4.12 is not blacklisted
< server: ecstatic-0.4.12
< Date: Mon, 09 Jun 2014 10:49:18 GMT
< Connection: keep-alive
//-------------------------
// 以下为实体首部（content相关的首部字段）
< content-length: 3
< content-type: text/html; charset=UTF-8
< etag: "38476631-3-Mon Jun 09 2014 18:48:38 GMT+0800 (CST)"
< last-modified: Mon, 09 Jun 2014 10:48:38 GMT
< cache-control: max-age=3600
<   // CR+LF
hi  // 实体主体
```
实体主体只是原始数据，实体头部用于告诉我们如何解释数据

####媒体类型和字符集

字符编码：`content-type`
多部分媒体 MIME

####压缩

相关的首部字段`Content-Encoding`和`Accept-Encoding`

|Content-Encoding值|含义|
|-------|-----|
|gzip|GNU zip|
|compress| Unix|
|deflate| zlib|
|identity| 未设置编码，Content-Encoding未设置的默认情况|

####分块传输编码
Chunked Transfer Coding



###通用数据转发程序

####代理

中间人
缓存代理：可以利用缓存技术减少流量
透明代理：转发请求或者响应时不更改加工

####网关

转发其他服务器通信数据，如同拥有自己的资源一样处理请求；

####隧道

在相隔甚远的客户端和服务器之间进行中转，保持双方通信的应用程序


##附录

####CR和LF

CR： Carriage Return； 回车符，十六进制 0x0d
LF： Line Feed: 十六进制 0x0a

####标准清单
|时间|RFC | 内容 |
|---|---|---|
|1996.5|RFC1945|HTTP1.0|
|1997.1|RFC2616|HTTP1.1|
||RFC3986|URI|
||RFC2046|mine|