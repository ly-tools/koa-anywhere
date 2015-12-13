# koa-anywhere

[![Test coverage](https://img.shields.io/coveralls/LingyuCoder/koa-anywhere.svg?style=flat-square)](https://coveralls.io/r/LingyuCoder/koa-anywhere?branch=master)
[![Build Status](https://travis-ci.org/LingyuCoder/koa-anywhere.png)](https://travis-ci.org/LingyuCoder/koa-anywhere)
[![Dependency Status](https://david-dm.org/LingyuCoder/koa-anywhere.svg)](https://david-dm.org/LingyuCoder/koa-anywhere)
[![devDependency Status](https://david-dm.org/LingyuCoder/koa-anywhere/dev-status.svg)](https://david-dm.org/LingyuCoder/koa-anywhere#info=devDependencies)
[![NPM version](http://img.shields.io/npm/v/koa-anywhere.svg?style=flat-square)](http://npmjs.org/package/koa-anywhere)
[![node](https://img.shields.io/badge/node.js-%3E=_4.0-green.svg?style=flat-square)](http://nodejs.org/download/)
[![License](http://img.shields.io/npm/l/koa-anywhere.svg?style=flat-square)](LICENSE)
[![npm download](https://img.shields.io/npm/dm/koa-anywhere.svg?style=flat-square)](https://npmjs.org/package/koa-anywhere)

Startup a static file server in current directory

**Node.js >= 4.0.0**

## Install
```bash
$ npm install -g koa-anywhere
```

## Usage

```bash
$ ka
$ ka -p 8888 # startup at port 8888
$
```

## Configuration

| Name       | Description  | Type | Default Value |
| :-------- | :-- | :--:| :--: | :--: |
| portm, `-p or --port` | the port which server use | Number | `3000` |
| deep, `-d or --deep` | the depth of the directories | Number | `3` |
| slient, `-s or --slient` | do not auto open the index page | Boolean | false |

## License

The MIT License (MIT)

Copyright (c) 2015 Lingyu Wang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
