<!-- ##  connect_code -->
##core 

+ `app.use` 
  - attach middlewares
  - implement __mount__

+ `app.handle`
  - walking through all the middlewares; 
  - pass err to errhandle (depending on the `NODE_ENV`)

+ `app.listen`
  - start listening to the connection

------

[connect/master/lib/proto.js](https://github.com/senchalabs/connect/blob/master/lib/proto.js#L231)


note:
    Put your speaker notes here.
    You can see them pressing 's'.
