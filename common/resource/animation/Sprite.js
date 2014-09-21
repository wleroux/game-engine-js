function Sprite(format, x, y, width, height) {
   this.format = format;
   this.x = x;
   this.y = y;
   this.width = width;
   this.height = height;
}

Sprite.prototype.image = function (actor) {
  var image = this.format;
  if (image.indexOf("%") !== -1) {
    Object.keys(actor.parts).forEach(function (part) {
      image = image.replace("%" + part.toUpperCase() + "%", actor.parts[part]);
    });
  }

  if (image.indexOf("%") === -1) {
    return image;
  } else {
    return null;
  }
};

module.exports = Sprite;

