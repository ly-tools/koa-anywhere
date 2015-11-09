'use strict';
require('colors');
const fs = require('fs');
const path = require('path');
const jade = require('jade');
const CWD = process.cwd();
const debug = require('debug')('koa-anywhere:file');

function toHtml(list) {
  return list.map(item => item.children ?
    `
		<span>${item.name}</span>
		<a title="${item.name}" href="${item.path}" class="fa fa-fw fa-arrow-right"></a>
		<ul>
			${toHtml(item.children)}
		</ul>
		` : `
		<a title="${item.name}" href="${item.path}">${item.name}</a>
		`).join('');
}

function isDir(filePath) {
  let realPath = path.join(CWD, filePath);
  return fs.existsSync(realPath) && fs.statSync(realPath).isDirectory();
}

function walk(dirPath, deep) {
  if (deep === 0) return [];
  return fs.readdirSync(path.join(CWD, dirPath)).map(name => {
    let filePath = path.join(dirPath, name);
    return {
      name: name,
      children: isDir(filePath) ? walk(filePath, deep - 1) : null,
      path: filePath
    };
  });
}

module.exports = config => {
  return function*(next) {
    let res = this;
    let filePath = decodeURI(res.path);
    let realPath = path.join(CWD, filePath);
    if (!fs.existsSync(path.join(CWD, filePath))) {
      res.status = 404;
      debug(`Error: ${realPath} not exists.`.red);
      return;
    }
    if (!isDir(filePath)) {
      debug(`File: ${realPath}`.green);
      yield next;
      return;
    }
    let fullpath = '/';
    res.body = jade.renderFile(path.join(__dirname, 'list.jade'), {
      bread: filePath.split('/').filter(p => !!p).map(p => {
        fullpath += p + '/';
        return {
          name: p,
          path: fullpath
        };
      }),
      title: filePath,
      html: toHtml(walk(filePath, config.deep)),
      realPath: realPath
    });
    debug(`Directory: ${realPath}`.green);
    return;
  };
};
