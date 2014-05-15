#connect

`connect`是比较基础的base的框架，当前的最新版只保留了最核心的中间件注册和分发逻辑。

```js
var app = require('connect')();

// 注册中间件
app.use(require('compression')())
    .use(require('body-parser')());

    //...

app.listen(8080); // 启动
```

##`middleware`
中间件在connect里实质上就是个函数，接受`request`, `response`, `next`三个参数。
+ next : 实现尾调用，如果一个中间件内没有使用