
/*jslint node:true, vars:true*/
'use strict';

var fs = require('fs');
var levelLoader = require('../../common/resource/level/levelLoader');
var _cache = {};
module.exports = function (file) {
  if (!_cache[file]) {
    _cache[file] = levelLoader.load(JSON.parse(fs.readFileSync(file, 'utf8')));
  }
   
  return _cache[file];
};
