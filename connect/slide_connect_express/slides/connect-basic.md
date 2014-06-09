##  what is connect

an extensible HTTP server framework for node using "plugins" known as middleware.


```javascript

var connect = require('connect');
var app = connect()
  .use(connect.favicon())  // load middlware
  .use(connect.logger('dev'))
  .use(function(req, res){
    res.end('Hello from Connect!\n');
  });

app.listen(3000);
```


note:

    + npm: Most Depended Upon (910); express core(2862);
    + __a dispatcher__: connect all the middlewares and distribute request