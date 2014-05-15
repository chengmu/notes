##  classes
+ relevent to our focus
    + __Server__ <= [(net.Server)](http://nodejs.org/api/net.html#net_class_net_server) <= [(EventEmitter)](http://nodejs.org/api/events.html#events_class_events_eventemitter)
    + __serverResponse__<= _[outgoingMessage]_ <= [(EventEmitter)](http://nodejs.org/api/events.html#events_class_events_eventemitter)
    + __incomingMessage__ <= [(Stream.Readable)](http://nodejs.org/api/stream.html#stream_class_stream_readable) <= [(EventEmitter)](http://nodejs.org/api/events.html#events_class_events_eventemitter)
    + __outgoingMessage__ <= [(stream.Writable)](http://nodejs.org/api/stream.html#stream_class_stream_writable) <= [(EventEmitter)](http://nodejs.org/api/events.html#events_class_events_eventemitter)
-------
+ irrelevent
    + __clientRequest__ <= _[outgoingMessage]_ <= [(EventEmitter)](http://nodejs.org/api/events.html#events_class_events_eventemitter)


note:

`nodejs`原生模块中和网络相关的模块有四个，`net`,`UDP`,`HTTP`,`HTTPS`, 分别处理`TCP`, `UDP`, `HTTP`, `HTTPS`。

