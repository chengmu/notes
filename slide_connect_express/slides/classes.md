<!-- ##  classes -->


+ all inherit from [(EventEmitter)](http://nodejs.org/api/events.html#events_class_events_eventemitter)

----
#####relevent to server
+ __Server__ <= [(net.Server)](http://nodejs.org/api/net.html#net_class_net_server) 
+ __serverResponse__<= _[outgoingMessage]_ 
+ __incomingMessage__ <= [(Stream.Readable)](http://nodejs.org/api/stream.html#stream_class_stream_readable) 
+ __outgoingMessage__ <= [(stream.Writable)](http://nodejs.org/api/stream.html#stream_class_stream_writable) 
<!-- ------- -->

<!-- + __clientRequest__ <= _[outgoingMessage]_  -->


note:

`nodejs`原生模块中和网络相关的模块有四个，`net`,`UDP`,`HTTP`,`HTTPS`, 分别处理`TCP`, `UDP`, `HTTP`, `HTTPS`。

