function Level() {
   this.layers = [];
}

Level.prototype.isBlocked = function isBlocked(layer, x, y) {
   return this.layers[layer].isBlocked(x, y);
};

module.exports = Level;
