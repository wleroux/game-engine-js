var Animation = require('./Animation');
var AnimationStep = require('./AnimationStep');
var Sprite = require('./Sprite');

function AnimationLoader() {
}

AnimationLoader.prototype.load = function load(json) {
  var animation = new Animation();
  animation.repeat = json.repeat;
   
  json.steps.forEach(function (jsonStep) {
    var step = new AnimationStep();
    step.duration = jsonStep.duration;
      
    var direction;
    jsonStep.sprites.forEach(function (jsonSprites, direction) {
      jsonSprites.forEach(function (jsonSprite) {
        step.addSprite(
          direction,
          new Sprite(jsonSprite[0], jsonSprite[1], jsonSprite[2], jsonSprite[3], jsonSprite[4]),
          jsonSprite[5],
          jsonSprite[6]
        );
      });
    });

    animation.addStep(step);
  });

  return animation;
};

module.exports = new AnimationLoader();

