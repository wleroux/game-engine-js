var LevelLayer = require('./LevelLayer');

function Level(name) {
   this.name = name;
   this.layers = [];
}

Level.prototype.getLayer = function getLayer(layerIndex) {
   if (!this.layers[layerIndex]) {
      this.layers[layerIndex] = new LevelLayer();
   }
   
   return this.layers[layerIndex];
};

Level.prototype.isBlocked = function isBlocked(layerIndex, x, y) {
   return this.getLayer(layerIndex).isBlocked(x, y);
};

Level.prototype.removeEntity = function removeEntity(entity, layerIndex) {
   this.getLayer(layerIndex).removeEntity(entity);
};

Level.prototype.addEntity = function addEntity(entity, layerIndex) {
   this.getLayer(layerIndex).addEntity(entity);
};

Level.prototype.update = function update(dt) {
   this.layers.forEach(function (layer) {
      layer.update(dt);
   });
};

Level.prototype.render = function render(ctx) {
   this.layers.forEach(function (layer) {
      layer.render(ctx);
   });
};

module.exports = Level;

