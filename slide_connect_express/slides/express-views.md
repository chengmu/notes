##  express_views

```js
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// usage
res.render(view, [locals], callback)
// or
app.render(view, [options], callback)
```
+ `/views` lays these template file
+ support `ejs`, `jade` etc
+ if under `NODE_ENV !== 'development'`, views template function would be cached, which is bad for local debug.
+ lookup template : `view` => views path => index
+ data look up:render params => `res.locals` => `app.locals` 

note:
    Put your speaker notes here.
    You can see them pressing 's'.

