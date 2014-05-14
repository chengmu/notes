#nodejs中网络相关的模块

`nodejs`原生模块中和网络相关的模块有四个，`net`,`UDP`,`HTTP`,`HTTPS`, 分别处理`TCP`, `UDP`, `HTTP`, `HTTPS`。

这里主要记录`HTTP`模块中创建服务端的部分。`HTTP`模块继承自`TCP`，以`request`为单位提供服务，实际上是封装了建立TCP连接的过程。

####创建http服务的过程（简要版）
通过`http.createServer`方法创建一个`Server`对象，创建的同时传入绑定给`request`事件的__回调函数__。
然后执行该Server对象的`listen`方法，指定端口号和主机名等，开启监听。这时候服务器才算启动。

当接受到客户端请求时，nodejs内部`http_parser`处理完数据后，触发该对象的`request`事件；该对象创建一个`serverResponse`的实例，和`clientRequest`实例一起传递给该回调函数。

```js
var server = http.createServer(function (request, response) {
    // 处理请求
    // 写返回
});

server.listen(8080); // 启动服务

```


##方法

###creatServer([requestListener]))
创建一个`Server`对象，传入的方法绑定给request事件。

###request
用于发请求。

[http.request(options, [callback])](http://nodejs.org/api/http.html#http_http_request_options_callback)

```js
var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});
```
###get
和前者唯一的区别在于这里指定了HTTP method为`GET`。

##核心类

###Server
继承自`EventEmitter`，监听以下事件：

+ request:

###incomingMessage
继承自`Readable Stream`[(Stream.Readable)](http://nodejs.org/api/stream.html#stream_class_stream_readable)；
由`Server`或者`clientRequest`创建，作为第一个参数分别传递给`request`或者`response`事件。

####事件

+ close

####属性

+ httpVersion
+ headers
+ trailers

####方法

###ClientRequest
由`http.request()`内部创建，用于表示进行中的request请求。
实质是一个可写流[(stream.Writable)](http://nodejs.org/api/stream.html#stream_class_stream_writable), 也是`EventEmitter`实例。
在执行`write`方法发送首个数据块或者连接直接关闭之前，头部可以被修改。

###ServerResponse
由`http.Server`的实例在内部创建，作为第二个参数传递给`request`事件回调。
实质是一个可写流[(stream.Writable)](http://nodejs.org/api/stream.html#stream_class_stream_writable), 也是`EventEmitter`实例。
继承自`outGoingMessage`;

```js
// nodejs _http_server.js
util.inherits(ServerResponse, OutgoingMessage);

```
####事件
+ close: 连接在`res.end`执行之前便被关闭
+ finish：表明全部数据已经发出；在这之后不会再触发任何事件。
+ writeContinue: 发送_HTTP/1.1 100 continue_消息到客户端
+ writeHead(statusCode, [reasonPhrase], [headers])： 发送头部；必须在`end`执行前
+