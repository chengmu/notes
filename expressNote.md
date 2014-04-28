#connect

##core
When you fire up the server and send it an HTTP request (with or a web curl browser) you will see the text "Cannot GET /" indicating that this application is not configured to handle the requested url. This is the first example of how Connect'sdistpatcher works: it invokes each attached middleware one by one until one of them decides to respond to the request. If it gets to the end of the list of middleware and none of them respond, then the application will respond with a 404.


##middleware
+ a function that by convention accepts three arguments:
    - a request object,
    - a response object,
    - an argument commonly named `next`, which is a callback function indicating that the next middleware is done and the next middleware can be executed.

###Demos
+ loggers
+ sayHi

###Order is important
+ remaining middleware won't be invoked if `next` is ommited;

###Mounting
+ allows you to define a path prefix that is required in order for the middleware to be called

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



