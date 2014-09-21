var Animation = require('./Animation');
var AnimationStep = require('./AnimationStep');
var Sprite = require('./Sprite');

function AnimationLoader() {
}

function struct(json) {
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
}

function lpc(json) {
  var animation = new Animation();
  animation.repeat = json.repeat;
  json.sequence.forEach(function (seq) {
    var step = new AnimationStep();
    step.duration = json.duration;
    
    json.parts.forEach(function (part) {
      [0,1,2,3].forEach(function (direction) {
        var image = "asset/lpc/" + json.sprite + "/" + part + "_%" + part + "%.png";
        step.addSprite(
          direction, new Sprite(image, seq * 64, direction * 64, 64, 64), 0, 0
        );
      });
    }); 

    animation.addStep(step);
  });

  return animation;
}

AnimationLoader.prototype.load = function load(json) {
  var animation = new Animation();
  switch (json.format) {
  case "lpc":
    return lpc(json);
  case "struct":
  default:
    return struct(json);
  }
};

module.exports = new AnimationLoader();

