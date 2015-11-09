'use strict';
require('colors');
const koa = require('koa');
const serve = require('koa-static');
const argv = require('optimist').argv;
const file = require('./file-middleware');
const open = require('open');
const debug = require('debug')('koa-anywhere:server');
const port = argv.port;
const app = koa();

app.use(function*(next) {
  this.set('Access-Control-Allow-Origin', '*');
  yield next;
});

app.use(file({
  slient: argv.slient,
  deep: argv.deep
}));

app.use(serve('.'));

app.listen(port || 3000, () => {
	let url = `http://127.0.0.1:${port}`;
	debug(`Server: started at ${url}`.green);
  open(url);
});
