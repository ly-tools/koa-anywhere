'use strict';
const fork = require('child_process').fork;
const _ = require('lodash');
const path = require('path');
const CWD = process.cwd();
const logger = require('./logger');

module.exports = config => {
  let args = [];
  _.forEach(config, (value, key) => {
    if (typeof value === 'boolean') {
      value && args.push(`--${key}`);
    } else {
      args.push(`--${key}`);
      args.push(value);
    }
  });
  let ps = fork(path.join(__dirname, 'server.js'), args, {
    env: process.env,
    cwd: CWD,
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr
    ]
  });
  ps.on('exit', () => {
    logger.info('done'.green);
    process.exit();
  });
  ps.on('error', e => {
    logger.error(`Error: ${e.message}`.red);
    throw e;
  });
  ps.on('message', msg => process.send && process.send(msg));
  process.on('message', msg => ps.send && ps.send(msg));
};
