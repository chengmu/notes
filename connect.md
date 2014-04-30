#connect notes

clip from `Nodejs in action`.

##Core procedure
>When you fire up the server and send it an HTTP request (with or a web curl browser) you will see the text "Cannot GET /" indicating that this application is not configured to handle the requested url. This is the first example of how Connect'sdistpatcher works: it __invokes each attached middleware one by one until one of them decides to respond to the request__. If it gets to the end of the list of middleware and none of them respond, then the application will respond with a 404.


![](https://19cac01f-a-62cb3a1a-s-sites.googlegroups.com/site/chengmuaksherlock/figures/lifecycle%20in%20connect.png?attachauth=ANoY7crl7uvrCCuePNB5F6tuC4JeK-freIPUU6ois_ix69_NJ8-N5O7BQRw7B9gmo6NH-17fd0WK2ZT66qMjTcIy4f4qsdWzjdipRCmmb3B97jd5iMSMx-gouCdL1LwyFvUvYIf8bc_r4_yjVwVf_d2cvpNjdlizFCEAEmO1c0m5Kj9hL6P8yHlFGbBf9GlQ_Uh-xKj9SyAZPTX90Pqsveh38Cd7_v3wf9WtkfZ0Wk04iGgvW4iq-DJmEKzm9dsQ6WYqGDwadq28&attredirects=0)



###How to use connect
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

##Core Conception

###Middleware
+ a function
+ accepts three arguments:
    - a __request__ object,
    - a __response__ object,
    - an argument commonly named `next`, which is __a callback function__ indicating that the next middleware is done and the next middleware can be executed.
        + one way to deal with aysnc logic.
        + remaining middleware won't be invoked if `next` is ommited;
+ the order of middlewares is quite important

####example

```javascript
var logger = function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
};
```

####Mount

Allow you to define a __path prefix__ that is required in order for the middleware to be called

>For  example,  mounting  would  allow  a  "blog"  application  to  be  hosted  at
as well as  , without any http://foo.com/blog http://bar.com/posts
change  to  the  blog  app  code  accounting  for  the  change  in  url.  This  is  because
Connect alters the  by stripping off the prefix portion when mounted. req.url
The end result is that the blog app can be written with paths relative to "/", and
doesn't even need to know about "/blog", or "/posts". The requests will follow the
same middleware and share the same state. Consider the server setup used here,
which reuses the hypothetical "blog" application by mounting it at two different
mount points:

note:This can be very useful to divide complicate application into seperate modules which can function normally on their own.

```js
    //..
    app.use('/admin', admin)
    //..
```
####Configurable middleware


#####logger.js
```javascript
var setup = function (format) {
    var rg = /:(\w+)/g;

    return function (req, res, next) {
        var str = format.replace(rg, function (macth, property) {
            return req[property];
        });
        console.log(str);
        next();
    };
};
module.exports = setup;
```
####index.js

```javascript
    app.use(clog(':method :url')) // configurable middleware
```





###Routing
Routing is crucial web application concept; Put simply, it's a method of mapping incoiming request URLs to a function that employs business logic.
Using a simple router in your application might look something like listing 7.9,
where HTTP verbs and paths are represented by a simple object and some callback
functions, and string tokens prefixed with ":" represent a path segment that accept
user-input,  matching  paths  like  "/user/12".  The  result  is  an  application  with  a
collection of handler functions that will be invoked when the request method and
URL match one that has been defin
####exmaple
    connect()
     .use(logger)
     .use('/admin', restrict); // string will be identified as a path prefix to
                               // match `req.url`
     .use('/admin', admin)
     .use(hello)
     .listen(3000);

###Configurable Middleware

####Basic structure
    function setup(options) {
        // setup logic

        return function(req, res, next) {
            // middleware logic

        }
    }
####usage
    app.use(setup({some : 'options'}));

What these examples demonstrate
The  important  takeaway  from  these  examples  is  that  you  should
think  "small  and  configurable  pieces"  when  building  your
middleware.  That  is,  build  lots  of  tiny,  modular  and  reusable
middleware,  that  as  a  sum  make  up  your  entire  application.
Keeping  your  middleware  small  and  focused  really  helps  with
breaking down complicated application logic into smaller pieces.
Next up let's take a look at the final middleware concept that Conn

##key take away
+ useful node apis
    + url.parse
