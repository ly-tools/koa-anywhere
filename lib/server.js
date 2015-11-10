'use strict';
require('colors');
const koa = require('koa');
const serve = require('koa-static');
const argv = require('optimist').argv;
const file = require('./file-middleware');
const open = require('open');
const logger = require('./logger')('koa-anywhere:server');
const port = argv.port;
const app = koa();

app.use(file({
  deep: argv.deep
}));

app.use(serve('.'));

app.listen(port || 3000, () => {
	let url = `http://127.0.0.1:${port}`;
	logger.info(`Server: started at ${url}`.green);
  open(url);
  process.send && process.send('STARTUP');
});
process.on('message', msg => msg === 'CLOSE' && process.exit());
