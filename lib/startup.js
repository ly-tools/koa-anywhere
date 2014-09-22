var spawn = require('child_process').spawn;
var _ = require('underscore');
var path = require('path');
var cwd = process.cwd();

module.exports = {
	exec: function(config) {
		var args = ['--harmony-generators', path.join(__dirname, 'server.js')];
		_.each(config, function(value, key) {
			if (typeof value === 'boolean') {
				if (value) {
					args.push('--' + key);
				}
			} else {
				args.push('--' + key);
				args.push(value);
			}
		});
		var ps = spawn('node', args, {
			env: process.env,
			cwd: cwd,
			stdio: [
				process.stdin,
				process.stdout,
				process.stderr,
			]
		});
		ps.on('exit', function(code, signal) {
			process.exit(code);
		});
		ps.on('error', function(err) {
			console.error(err.message);
		});
	}
};