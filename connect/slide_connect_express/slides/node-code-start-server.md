##  start server

######nodejs http.js

```javascript
exports.createServer = function(requestListener) {
  return new Server(requestListener);
};
// ...
function Server(requestListener) {
  // ..
  if (requestListener) {
    this.addListener('request', requestListener);
  }
  //....
}

```

#####local app.js

```js
var http = require('http');
http.createServer(function(req, res) {
    // logic
}).listen(8000); // start

```

note:

    通过`http.createServer`方法创建一个`Server`对象，创建的同时传入绑定给`request`事件的__回调函数__。
    然后执行该Server对象的`listen`方法，指定端口号和主机名等，开启监听。这时候服务器才算启动。

    当接受到客户端请求时，nodejs内部`http_parser`处理完数据后，触发该对象的`request`事件；该对象创建一个`serverResponse`的实例，和`clientRequest`实例一起传递给该回调函数。
