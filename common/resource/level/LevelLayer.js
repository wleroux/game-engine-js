function LevelLayer() {
  this.offset = [0, 0];
  this.parallax = [0, 0];
  this.tile_definitions = [];
  this.tiles = [];
  this.type = [];
}

LevelLayer.prototype.isBlocked = function isBlocked(x, y) {
  var pos_tile_x = Math.floor(x / 32);
  var pos_tile_y = Math.floor(y / 32);
  if (0 <= pos_tile_y && pos_tile_y < this.type.length) {
    if (0 <= pos_tile_x && pos_tile_x < this.type[pos_tile_y].length) {
      return this.type[pos_tile_y][pos_tile_x] === 1;
    }
  }

  return true;
};

module.exports = LevelLayer;

