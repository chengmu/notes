##what does connect do?

1. attach middleware `app.use`
2. dispatch `app.handle`
    - invokes each attached _middleware_ one by one until one of them decides to _respond to the request_.
    - If it gets to the end of the list of middleware and none of them respond, then the application will respond with a 404.


note:
    Put your speaker notes here.
    You can see them pressing 's'.
