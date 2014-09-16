var Animation = require('./Animation');
var AnimationStep = require('./AnimationStep');
var Sprite = require('./Sprite');
var textLoader = require('../textLoader');


function AnimationLoader() {
   this.cache = {};
}

AnimationLoader.prototype.get = function get(url) {
   if (!this.cache.hasOwnProperty(url)) {
      var animation = new Animation(url);

      textLoader.load(url).then(function (data) {
         var json = JSON.parse(data);
         
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
      }).done();
      this.cache[url] = animation;
   }

   return this.cache[url];
};

module.exports = new AnimationLoader();

