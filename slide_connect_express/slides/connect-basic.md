##  what is connect

an extensible HTTP server framework for node using "plugins" known as middleware.


```javascript

var connect = require('connect')
  , http = require('http');

var app = connect()
  .use(connect.favicon())  // load middlware
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(connect.directory('public'))
  .use(connect.cookieParser())
  .use(connect.session({ secret: 'my secret here' }))
  .use(function(req, res){
    res.end('Hello from Connect!\n');
  });

http.createServer(app).listen(3000);
```


note:

    + npm: Most Depended Upon (910); express core(2862);
    + __a dispatcher__: connect all the middlewares and distribute request