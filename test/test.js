'use strict';
require('should');
require('should-code-eql');
const fork = require('child_process').fork;
const path = require('path');
const request = require('request');
const fs = require('fs');
const CWD = process.cwd();

let ps = fork(path.join(CWD, 'bin', 'ka.js'), ['-p', '8848'], {
  env: process.env,
  cwd: path.join(CWD, 'test', 'src'),
  stdio: [
    process.stdin,
    process.stdout,
    process.stderr
  ]
});

describe('koa-anywhere', () => {
  after(() => {
    ps.send('CLOSE');
  });
  it('server start up', done => {
    ps.on('message', msg => {
      msg.should.eql('STARTUP');
      done();
    });
  });
  it('request file', done => {
    request('http://127.0.0.1:8848/index.js', function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body.should.codeEql(fs.readFileSync(path.join(__dirname, 'src', 'index.js'), 'utf-8'));
      }
      done(error);
    });
  });
  it('request directory', done => {
    request('http://127.0.0.1:8848/dir', function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body.trim().should.eql(fs.readFileSync(path.join(__dirname, 'expected', 'dir.html'), 'utf-8').trim());
      }
      done(error);
    });
  });
});
