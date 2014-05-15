##  when request coming in
###nodejs http.js

```javascript
  // _http_common.js
  parser.incoming = new IncomingMessage(parser.socket);
  //...
  skipBody = parser.onIncoming(parser.incoming, info.shouldKeepAlive);
  // _http_server.js
  function parserOnIncoming(req, shouldKeepAlive) {
    //...
    var res = new ServerResponse(req);
    //...
    self.emit('request', req, res);
    //...
  }

```



note:
    服务端这边，传递给request回调的参数：
    req是incommingMessage实例；res是serverRespons（outgoingMessage）实例