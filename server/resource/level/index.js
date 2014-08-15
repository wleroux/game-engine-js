
/*jslint node:true, vars:true*/
'use strict';

var LevelLayer = require('./LevelLayer');
var Level = require('./Level');

var cache = {};
module.exports = function loadLevel(file) {
   if (!cache[file]) {
      var json = require(file);
      var layers = json.layers.map(function (layer) {
         return new LevelLayer(layer.type);
      });
      cache[file] = new Level(layers);
   }
   
   return cache[file];
};
