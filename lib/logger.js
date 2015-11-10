'use strict';

const _ = require('lodash');

let logger = _.curry((output, template) => {
  return function() {
    let tpl = template;
    let args = _.toArray(arguments);
    args.forEach(() => {
      tpl += ' %s';
    });
    console[output].apply(console, [tpl].concat(args));
  };
});

let log = logger('log');
let error = logger('error');

module.exports = name => {
  return {
    info: log(`[${name}] [info]`),
    error: error(`[${name}] [error]`)
  };
};
