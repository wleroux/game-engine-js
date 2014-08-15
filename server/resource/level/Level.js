
/*jslint node:true*/
'use strict';

function Level(layers) {
   this.layers = layers;
}

Level.prototype.isBlocked = function isBlocked(layer, x, y) {
   if (0 < layer && layer < this.layers.length) {
      return true;
   } else {
      return this.layers[layer].isBlocked(x, y);
   }
};

module.exports = Level;
