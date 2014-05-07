/**
 * connect example 
 * testcase 
 * 	 127.0.0.1:3002/jl?superman
 * 	 127.0.0.1:3002/jl?batman
 * 	 127.0.0.1:3002/jl?captain
 */
var url = require('url');
var http = require('http');


var incomingMessageToWatchTower = function (req, res, next) {
	// request事件的监听方法；
	res.write('<h1>hello, this is justice league!</h1>');
	var name = url.parse(req.url).query;
	if (name) {
		console.log('query: ' + name);
	}

	if (['superman', 'batman', 'wonderwoman'].indexOf(name) !== -1) {
		res.end('<h2>oh, <b>' + name  + '</b> at your service~</h2>');
	} else {
		res.end('<h2>opps, maybe you mean Avengers?</h2>');
		
	}
	next();
};

var logger = function (req, res, next) {
	res.setHeader('Content-Type', 'text/html');

	if (req.url === '/favicon.ico') {
		next();
		return;
	}
	console.log('method: ' + req.method + ';/ url: ' + rq.url + ';/ time: ' + new Date());
	res.write('You are visiting ' + req.url); 
	next();
};

var app = require('connect')();

app.use(logger)
	.use(incomingMessageToWatchTower);

// app.listen(3002);
http.createServer(app).listen(3002);



console.log('start listening 3002 @localhost');