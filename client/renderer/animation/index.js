var textLoader = require('../textLoader');
var animationLoader = require('../../../common/resource/animation');
var imageRenderer = require('../image');

var _cache = {};
function AnimationRenderer() {
}

AnimationRenderer.prototype.load = function (source) {
  textLoader.load(source);
};

AnimationRenderer.prototype.isLoaded = function (source) {
  return _cache.hasOwnProperty(source) || textLoader.isLoaded(source);
};

AnimationRenderer.prototype.get = function (source) {
  if (! _cache.hasOwnProperty(source) && textLoader.isLoaded(source)) {
    var sourceContent = textLoader.get(source);
    _cache[source] = animationLoader.load(JSON.parse(sourceContent));
  }

  return _cache[source];
};

AnimationRenderer.prototype.render = function render(ctx, source, timer, actor) {
  if (!this.isLoaded(source)) {
    this.load(source);
    return;
  }

  var animation = this.get(source);
  var step = animation.currentStep(timer);
  step.sprites[actor.direction].forEach(function (sprite) {
    ctx.save();
    ctx.translate(sprite.dx, sprite.dy);
    var image = sprite.image;
    imageRenderer.render(ctx, image.image(actor), image.x, image.y, image.width, image.height);
    ctx.restore();
  });
};

module.exports = new AnimationRenderer();

