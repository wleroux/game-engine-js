var Image = require('../image/Image');

function Sprite(file, x, y, width, height) {
   this.file = file;
   this.x = x;
   this.y = y;
   this.width = width;
   this.height = height;
}

Sprite.prototype.render = function render(ctx, actor) {
   var image = null;
   switch (this.file) {
   case "BODY":
      image = actor.body;
      break;
   default:
   }
   
   if (image !== null) {
      image.render(ctx, this.x, this.y, this.width, this.height);
   }
};

module.exports = Sprite;

