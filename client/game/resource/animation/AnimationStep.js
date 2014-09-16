function AnimationStep() {
   this.duration = 0;
   this.sprites = [
      [], [], [], []
   ];
}

AnimationStep.prototype.addSprite = function addSprite(direction, image, dx, dy) {
   this.sprites[direction].push({
      image: image,
      dx: dx,
      dy: dy
   });
};

AnimationStep.prototype.render = function render(ctx, actor) {
   this.sprites[actor.direction].forEach(function (sprite) {
      ctx.save();
      ctx.translate(sprite.dx, sprite.dy);
      sprite.image.render(ctx, actor);
      ctx.restore();
   });
};

module.exports = AnimationStep;
