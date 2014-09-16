var q = require('q');
var textLoader = require('../textLoader');
var Level = require('./Level');

function LevelLoader() {
   this.cache = {};
}

LevelLoader.prototype.get = function get(url) {
   if (!this.cache[url]) {
      var level = new Level(url);
      textLoader.load(url).then(function (data) {
         var jsonLevel = JSON.parse(data);
         jsonLevel.layers.forEach(function (jsonLayer, layerIndex) {
            var layer = level.getLayer(layerIndex);

            layer.offset = jsonLayer.offset;
            layer.parallax = jsonLayer.parallax;
            if (jsonLayer.tile_definitions) {
               layer.setTileDefinitions(jsonLayer.tile_definitions);
            }
            if (jsonLayer.tiles) {
               layer.setTiles(jsonLayer.tiles);
            }
            if (jsonLayer.type) {
               layer.type = jsonLayer.type;
            }
         });
      }).done();
      
      this.cache[url] = level;
   }
   
   return this.cache[url];
};

module.exports = new LevelLoader();

