/**
 * a simple connect core implementation
 */

var http = require('http');
var url = require('url');

/**
 * middleware examples
 */
var md1 = function (req, res, next) {
	console.log(req.method, req.url);
	console.log('I am middleware No.1!');
	next();
}
var md2 = function (req, res, next) {
	c();
	console.log(req.method, req.url);
	console.log('I am middleware No.2!');
	next();
}
var errHandle = function (err, req, res, next) {
	// console.log(err);
	if (err) {
		res.write(err);
		console.log('oops! something go wild');
		res.end('Inner Error');
	}
	console.log('nothing wrong!');
}

/**
 * core
 */

// middleware stack 
var stack = []; 

// register middleware
var use = function (route, middleware) {
	if ('function' === typeof route ) {
		middleware = route;
		route = '/';
	}
	stack.push({route : route, handle : middleware});
}

// run through middlewares
var handle = function (req, res, outer) {
	var index = 0;
	var next = function (err) {
		var layer;
		layer = stack[index++];

		if (err) {
			return res.end(JSON.stringify(err));
		}


		if (!layer) {
			res.end('over!');
		} else {
			try {
				res.write('Making through middleware ' + index + '\n');
				if (err) {
					var argumentsLength = layer.handle.length;
					if (argumentsLength === 4) {
						layer.handle(err, req, res, next);
					} else{
						next(err); // 没有错误处理的时候这里实现了一层捕捉
					}
				} else {
					layer.handle(req, res, next);
				}
			} catch (err) {
				return next(err);
			}
		}
	};
	next();

}

use(md1);
use(md2);
use(errHandle);

var createSever = function () {
	var server = http.createServer(function (req, res) {
		handle(req, res);
	});
	return server;
}
var app = createSever();
app.listen(2003);