##  express-route-in-4.x


```js
app.param([name], callback)
app.VERB(path, [callback...], callback)
app.all(path, [callback...], callback)
app.all(path, [callback...], callback)
app.route(path)

```

```js
var app = express();

app.route('/events')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
})
.get(function(req, res, next) {
  res.json(...);
})
.post(function(req, res, next) {
  // maybe add a new event...
})

```
note:
    Put your speaker notes here.
    You can see them pressing 's'.
