
/*jslint node:true, vars:true*/
'use strict';

function LevelLayer(tiles) {
   this.tiles = tiles;
}

LevelLayer.prototype.isBlocked = function isBlocked(x, y) {
   var tx = Math.floor(x / 32);
   var ty = Math.floor(y / 32);
   if (0 <= ty && ty < this.tiles.length) {
      if (0 <= tx && tx < this.tiles[ty].length) {
         return this.tiles[ty][tx] === 1;
      }
   }
   return true;
};

module.exports = LevelLayer;
