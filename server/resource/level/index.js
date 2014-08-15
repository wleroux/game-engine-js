
/*jslint node:true, vars:true*/
'use strict';

var LevelLayer = require('./LevelLayer');
var Level = require('./Level');

var fs = require('fs');

var cache = {};
module.exports = function loadLevel(file) {
   if (!cache[file]) {
      var json = JSON.parse(fs.readFileSync(file, 'utf8'));
      var layers = json.layers.map(function (layer) {
         return new LevelLayer(layer.type);
      });
      cache[file] = new Level(layers);
   }
   
   return cache[file];
};
