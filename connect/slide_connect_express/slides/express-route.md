##### key conception : `rounte`

- functions that will be invoked when the request method and URL match one that has been defined.

```javascript
var routes = { 
	GET: {
		'/users': function(req, res){
		},
		// string tokens prefixed with ":" represent a path segment that accept
user-input,  matching  paths  like  "/user/12".
		'/user/:id': function(req, res, id){ 
			res.end('user ' + id);
		}
	},
	DELETE: {
		'/user/:id': function(req, res, id){
			res.end('deleted user ' + id);
		}
	}
};
app.use(router(routes));
```
- in express, `/routes`
note:
    Put your speaker notes here.
    You can see them pressing 's'.
