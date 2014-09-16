function Sprite(file, x, y, width, height) {
   this.file = file;
   this.x = x;
   this.y = y;
   this.width = width;
   this.height = height;
}

Sprite.prototype.image = function (actor) {
  var image = null;
  switch (this.file) {
  case "BODY":
    return actor.body; 
  default:
    return this.file;
  }
};

module.exports = Sprite;

