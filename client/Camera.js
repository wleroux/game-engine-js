function Camera() {
  this.level = null;
  this.layer = null;
  this.x = null;
  this.y = null;
}

Camera.prototype.setFocus = function (level, layer, x, y) {
  this.level = level;
  this.layer = layer;
  this.x = x;
  this.y = y;
};

Camera.prototype.hasFocus = function () {
  return this.level !== null;
};

Camera.prototype.focus = function () {
  return {
    level: this.level,
    layer: this.layer,
    x: this.x,
    y: this.y
  };
};

module.exports = Camera;

