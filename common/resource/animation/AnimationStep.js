function AnimationStep() {
   this.duration = 0;
   this.sprites = [
      [], [], [], []
   ];
}

AnimationStep.prototype.addSprite = function (direction, sprite, dx, dy) {
   this.sprites[direction].push({
      sprite: sprite,
      dx: dx,
      dy: dy
   });
};

module.exports = AnimationStep;
