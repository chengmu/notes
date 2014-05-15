##enviroment-driven

```shell
 $ NODE_ENV=development node index.js

```

```javascript
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
}
```

+ nodejs api docs : process.env
	- [An object containing the user environment. See environ(7).](http://nodejs.org/api/process.html#process_process_env)

+ environ(7) official doc:
	- [Linux Programmer's Manual:environ(7)](http://man7.org/linux/man-pages/man7/environ.7.html)

note:

此处演示下该设置
<!-- + [find an nice guide  on express's envrioment-driven development](http://www.hacksparrow.com/running-express-js-in-production-mode.html) -->
    Put your speaker notes here.
    You can see them pressing 's'.
