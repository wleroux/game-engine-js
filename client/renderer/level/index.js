var textLoader = require('../textLoader');
var imageRenderer = require('../image');
var levelLoader = require('../../../common/resource/level/levelLoader');

function LevelRenderer() {
}

var _levelCache = {};
LevelRenderer.prototype.isLoaded = function (levelName) {
  return _levelCache.hasOwnProperty(levelName) || textLoader.isLoaded(levelName);
};

LevelRenderer.prototype.load = function (levelName) {
  textLoader.load(levelName);
};

LevelRenderer.prototype.get = function (levelName) {
  if (!_levelCache.hasOwnProperty(levelName)) {
    _levelCache[levelName] = levelLoader.load(JSON.parse(textLoader.get(levelName)));
  }

  return _levelCache[levelName];
};

var _layerCache = {};
LevelRenderer.prototype.render = function (ctx, focus, entities) {
  if (!this.isLoaded(focus.level)) {
    this.load(focus.level);
    return;
  }

  var level = this.get(focus.level);
  var focusLayer = level.layers[focus.layer];
  level.layers.forEach(function (layer, layerIndex) {
    var layerCacheIndex = focus.level + "-layer-" + layerIndex.toString();

    // Only render layer if all tile definitions are loaded (since we cache the results)
    var unloadedTileDefinitions = layer.tile_definitions.filter(function (tileDefinition) {
      return !imageRenderer.isLoaded(tileDefinition);
    });
    if (unloadedTileDefinitions.length > 0) {
      unloadedTileDefinitions.forEach(function (tileDefinition) {
        imageRenderer.load(tileDefinition);
      });
      return;
    }

    // Layers are very expensive to draw, so let's cache the results
    if (!_layerCache.hasOwnProperty(layerCacheIndex)) {
      var layerCanvas = document.createElement('canvas');
      layerCanvas.width = layer.tiles.reduce(function (layerWidth, row) {
        var rowWidth = row.length * 32;
        return layerWidth > rowWidth ? layerWidth : rowWidth;
      }, 0);
      layerCanvas.height = layer.tiles.length * 32;

      var layerCtx = layerCanvas.getContext('2d');
      layer.tiles.forEach(function (row, rowIndex) {
        layerCtx.save();
        layerCtx.translate(0, rowIndex * 32);
        row.forEach(function (column) {
          if (column !== null) {
            var tileDefinition = layer.tile_definitions[column[0]];
            imageRenderer.render(layerCtx, tileDefinition, column[1] * 32, column[2] * 32, 32, 32);
          }
          layerCtx.translate(32, 0);
        });
        layerCtx.restore();
      });
      _layerCache[layerCacheIndex] = layerCanvas;
    }

    ctx.save();
    // Apply Offset
    ctx.translate(
      Math.floor(ctx.canvas.width  / 2) + layer.offset[0] - focusLayer.offset[0],
      Math.floor(ctx.canvas.height / 2) + layer.offset[1] - focusLayer.offset[1]
    );

    // Apply Parallax
    ctx.translate(
      Math.floor(-(focus.x * (1 + layer.parallax[0] - focusLayer.parallax[0]))),
      Math.floor(-(focus.y * (1 + layer.parallax[1] - focusLayer.parallax[1])))
    );

    // Render layer
    var layerCanvas = _layerCache[layerCacheIndex];
    ctx.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);

    // Draw entities on layer
    entities.filter(function (entity) {
      return (entity.position[0] === focus.level && entity.position[1] === focus.layer);
    }).forEach(function (entity) {
      ctx.save();
      ctx.translate(
        Math.floor(entity.position[2].get()),
        Math.floor(entity.position[3].get())
      );
      entity.render(ctx);
      ctx.restore();
    });

    ctx.restore();
  });
};

module.exports = new LevelRenderer();

