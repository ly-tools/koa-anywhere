var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var jade = require('jade');
var colors = require('colors');
var base = process.cwd();
var local = __dirname;

module.exports = function(config) {
	var dbg = config.silent ? function() {} : function(msg) {
		console.log(msg);
	};
	return function * (next) {
		var res = this;
		var filePath = decodeURI(res.path);
		if (!fs.existsSync(getRealPath(filePath))) {
			dbg('[ERROR File not exists]:'.red + getRealPath(filePath));
			res.status = 404;
			return;
		}
		if (!isDir(filePath)) {
			dbg('[Response File]:'.green + getRealPath(filePath));
			yield next;
			return;
		}
		res.body = jade.renderFile(path.join(local, 'list.jade'), {
			title: filePath,
			html: toHtml(walk(filePath, config.deep))
		});
		dbg('[Response Directory]:'.green + getRealPath(filePath));
		return;
	};
};

function toHtml(list) {
	var result = '';
	_.each(list, function(item) {
		result += '<li>';
		if (item.children) {
			result += '<span>' + item.name + '</span><a title="' + item.name + '" href="' + item.path + '" class="fa fa-fw fa-arrow-right"></a>';
			result += '<ul>' + toHtml(item.children) + '</ul>';
		} else {
			result += '<a title="' + item.name + '" href="' + item.path + '">' + item.name + '</a>';
		}
		result += '</li>'
	});
	return result;
}

function isDir(filePath) {
	var realPath = getRealPath(filePath);
	return fs.existsSync(realPath) && fs.statSync(realPath).isDirectory();
}

function getRealPath(filePath) {
	return path.join(base, filePath);
}

function walk(dirPath, deep) {
	var result = [];
	if (deep === 0) {
		return [];
	}
	var files = fs.readdirSync(getRealPath(dirPath));
	_.each(files, function(name) {
		var filePath = path.join(dirPath, name);
		if (isDir(filePath)) {
			result.push({
				name: name,
				children: walk(filePath, deep - 1),
				path: filePath
			});
		} else {
			result.push({
				name: name,
				path: filePath
			});
		}
	});
	return result;
}