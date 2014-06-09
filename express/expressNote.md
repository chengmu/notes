#express notes

##enviroment-driven

```
NODE_ENV=development node index.js
```

Acturally it set a environ variable in the process;
[An object containing the user environment. See environ(7).](http://nodejs.org/api/process.html#process_process_env)

[Linux Programmer's Manual:environ(7)](http://man7.org/linux/man-pages/man7/environ.7.html)

[find an nice guide  on express's envrioment-driven development](http://www.hacksparrow.com/running-express-js-in-production-mode.html)

###apis based on enviroment
+ `app.configure()`

+ `app.set()`

+ `app.get()`

+ `app.enable()`

+ `app.disable()`

```javascript
app.configure('development', function(){
    app.use(express.errorHandler()); 
});

```

##TIPS:
__dirname
__dirname(note the two leading underscores) is a global directory in
Node  in  which  the  currently  running  file  .  Many  times  in exists
development  this  directory  will  be  the  same  as  your  current  working
directory (CWD), but in production the Node executable may run from
another  directory  (using   helps  keep  paths  consistent __dirname
across environments).