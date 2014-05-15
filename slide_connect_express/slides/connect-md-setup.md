##  connect_md_setup

Allow you to define a __path prefix__ that is required in order for the middleware to be called


```javascript
function setup(options) {
    // setup logic

    return function(req, res, next) {
        // middleware logic

    }
}

app.use(setup({some : 'options'}));

```



