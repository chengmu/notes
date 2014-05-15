##  what is middleware

a function that intercepts the `request` and `response ` objects provided by the HTTP server, executes logic, and when its finished either ends the response or passes  it  to  the  next  middleware

```javascript
var logger = function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
};
```

####key points
+ order is important
+ remaining middleware won't be invoked if `next` is ommited;


note:
    Put your speaker notes here.
    You can see them pressing 's'.
