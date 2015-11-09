'use strict';
const spawn = require('child_process').spawn;
const _ = require('lodash');
const path = require('path');
const CWD = process.cwd();
const debug = require('debug')('koa-anywhere:startup');

module.exports = config => {
  let args = [path.join(__dirname, 'server.js')];
  _.forEach(config, (value, key) => {
    if (typeof value === 'boolean') {
      value && args.push(`--${key}`);
    } else {
      args.push(`--${key}`);
      args.push(value);
    }
  });
  let ps = spawn(config.debug ? 'DEBUG=* node' : 'node', args, {
    env: process.env,
    cwd: CWD,
    stdio: 'pipe'
  });
  ps.on('exit', () => {
		debug('Server: done'.green);
		process.exit();
	});
  ps.on('error', e => {
		debug(`Server Error: ${e.message}`.red);
		throw e;
	});
};
