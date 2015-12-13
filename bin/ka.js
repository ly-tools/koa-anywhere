#!/usr/bin/env node

'use strict';
const program = require('commander');
const pkg = require('../package.json');

program.version(pkg.version)
  .option('-p, --port <n>', 'port the server use, default 3000', parseInt)
  .option('-d, --deep <n>', 'max showed deep of files, default 3', parseInt)
  .option('-s, --slient', 'do not open the page in browser')
  .parse(process.argv);

require('../lib/startup.js')({
  port: program.port || 3000,
  deep: program.deep || 3,
  slient: !!program.slient
});
