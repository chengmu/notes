##  example
```javascript
var http = require('http');
var url = require('url'); // 辅助处理url的方法

var reqHandler = function (req, res) {
    // request事件的监听方法；
    console.log('method: ' + req.method + ';/ url: ' + req.url + ';/ time: ' + new Date());
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>hello, this is justice league!</h1>');
    var name = url.parse(req.url).query;
    console.log('query: ' + name);
    if (['superman', 'batman', 'wonderwoman'].indexOf(name) !== -1) {
        res.end('<h2>oh, <b>' + name  + '</b> at your service~</h2>');
    } else {
        res.end('<h2>opps, maybe you mean Avengers?</h2>');
    }
};

// 创建server 对象， 绑好请求处理的逻辑
var server = http.createServer(reqHandler);
server.listen(3001, '127.0.0.12'); // 开始监听端口和域名
console.log('Watching Tower(127.0.0.12:3001) is waiting for your call! \n');
console.log('Start from ' + new Date());
```

note:
    /**
 * node js native http module uasage
 * testcase
 *   127.0.0.12:3001/jl?superman
 *   127.0.0.12:3001/jl?batman
 *   127.0.0.12:3001/jl?captain
 */