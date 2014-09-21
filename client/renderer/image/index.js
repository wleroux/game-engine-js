function ImageRenderer() {
}

ImageRenderer.prototype.isLoaded = function (image) {
  return _cache[image] !== undefined;
}

var _cache = {};
var _loading = {};
ImageRenderer.prototype.load = function (image) {
  // Without this guard, a missing resource would spam the server
  if (_loading[image] !== undefined) return;

  _loading[image] = true;
  var img = new Image();
  img.onload = function () {
    _cache[image] = img;
    delete _loading[image];
  }.bind(this);
  img.src = image;
};

ImageRenderer.prototype.getImage = function (image) {
  return _cache[image];
};

ImageRenderer.prototype.render = function (ctx, image, x, y, width, height) {
  if (image === null) return;

  if (this.isLoaded(image)) {
    ctx.drawImage(this.getImage(image), x, y, width, height, 0, 0, width, height);
  } else {
    this.load(image);
  }
};

module.exports = new ImageRenderer(); 

