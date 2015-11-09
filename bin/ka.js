'use strict';
require('colors');
const program = require('commander');
const pkg = require('../package.json');

program.version(pkg.version)
	.option('-p, --port <n>', 'port the server use, default 3000', parseInt)
	.option('-d, --deep <n>', 'max showed deep of files, default 3', parseInt)
	.option('--debug', 'should or not to run with log')
	.parse(process.argv);

require('../lib/startup.js').exec({
	port: program.port || 3000,
	deep: program.deep || 3,
	silent: program.silent || false
});
