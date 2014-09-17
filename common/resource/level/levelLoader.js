var Level = require('./Level');
var LevelLayer = require('./LevelLayer');

function LevelLoader() {
}

LevelLoader.prototype.load = function get(json) {
  var level = new Level();
  json.layers.forEach(function (jsonLayer) {
    var layer = new LevelLayer();
    layer.offset = jsonLayer.offset;
    layer.parallax = jsonLayer.parallax;
    layer.tile_definitions = jsonLayer.tile_definitions || [];
    layer.tiles = jsonLayer.tiles || [];
    layer.type = jsonLayer.type || [];
    level.layers.push(layer);
  });

  return level;
};

module.exports = new LevelLoader();
