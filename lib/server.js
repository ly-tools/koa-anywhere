var fs = require('fs');
var path = require('path');
var http = require('http');
var koa = require('koa');
var serve = require('koa-static');
var argv = require('optimist').argv;
var exec = require('child_process').exec;
var fileserver = require('./fileserver');
var colors = require('colors');
var port = argv.port;
var app = koa();

app.use(function * (next) {
	this.set('Access-Control-Allow-Origin', '*');
	yield next;
});

app.use(fileserver({
	slient: argv.slient,
	deep: argv.deep
}));

app.use(serve('.'));

app.listen(port || 3000, function() {
	open('http://127.0.0.1' + (port === 80 ? '' : (':' + port)));
});

console.log(('Server started at http://127.0.0.1:' + port).green);

function open(url) {
	switch (process.platform) {
		case "darwin":
			exec('open ' + url);
			break;
		case "win32":
			exec('start ' + url);
			break;
		default:
			spawn('xdg-open', [url]);
	}
};