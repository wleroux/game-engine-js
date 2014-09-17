
/*jslint node:true, vars:true*/
'use strict';

var fs = require('fs');
var levelLoader = require('../../../common/resource/level/levelLoader');
var cache = {};
module.exports = function loadLevel(file) {
  if (!cache[file]) {
    cache[file] = levelLoader.load(JSON.parse(fs.readFileSync(file, 'utf8')));
  }
   
  return cache[file];
};
