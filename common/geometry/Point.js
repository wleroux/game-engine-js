function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.distanceTo = function(point) {
  return Math.pow(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2), 0.5)
};

Point.prototype.translateByDirection = function (direction, distance) {
  if (direction === 0) {
    return new Point(this.x, this.y - distance);
  } else if (direction === 1) {
    return new Point(this.x - distance, this.y);
  } else if (direction === 2) {
    return new Point(this.x, this.y + distance);
  } else if (direction === 3) {
    return new Point(this.x + distance, this.y);
  } else {
    return undefined;
  }
};

module.exports = Point;
