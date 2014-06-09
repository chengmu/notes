#####  key conceptions

+ __mount__
	- define a _path prefix_ that is required in order for the middleware to be called
	- `app.use('/admin', admin)`
+ __configurable__
```javascript
function setup(options) {
    return function(req, res, next) {
        // middleware logic
    }
}
app.use(setup({some : 'options'}));
```

note:
	- divide complicate application into seperate modules which can function normally on their own.
