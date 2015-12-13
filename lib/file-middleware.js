'use strict';
require('colors');
const fs = require('fs');
const path = require('path');
const jade = require('jade');
const CWD = process.cwd();
const logger = require('./logger');

function toHtml(list) {
  return list.map(item => item.children ?
    `
    <li>
      <span>${item.name}</span>
      <a title="${item.name}" href="${item.path}" class="fa fa-fw fa-arrow-right"></a>
      <ul>
        ${toHtml(item.children)}
      </ul>
    </li>
		` : `
    <li>
      <a title="${item.name}" href="${item.path}">${item.name}</a>
    </li>
		`).join('');
}

function isDir(filePath) {
  let realPath = path.join(CWD, filePath);
  return fs.existsSync(realPath) && fs.statSync(realPath).isDirectory();
}

function walk(dirPath, deep) {
  if (deep === 0) return [];
  return fs.readdirSync(path.join(CWD, dirPath)).map(name => {
    if (name.indexOf('.') === 0) return null;
    let filePath = path.join(dirPath, name);
    return {
      name: name,
      children: isDir(filePath) ? walk(filePath, deep - 1) : null,
      path: filePath
    };
  }).filter(f => !!f);
}

module.exports = config => {
  return function*(next) {
    let res = this;
    let filePath = decodeURI(res.path);
    let realPath = path.join(CWD, filePath);
    if (!fs.existsSync(path.join(CWD, filePath))) {
      res.status = 404;
      logger.error(`${realPath} not exists.`.red);
      return;
    }
    if (!isDir(filePath)) {
      logger.info(`File: ${realPath}`.green);
      yield next;
      return;
    }
    let fullpath = '/';
    res.body = jade.renderFile(path.join(__dirname, 'list.jade'), {
      breads: filePath.split('/').filter(p => !!p).map(p => {
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
    res.set('Access-Control-Allow-Origin', '*');
    logger.info(`Directory: ${realPath}`.green);
    return;
  };
};
