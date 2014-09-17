var game = require('../game');
var options = require('../config/options');
var queue = require('../command/queue');
var Character = require('../entity/Character');
var levelLoader = require('../resource/level/loader');
var math = require('../math');

function update(message) {
   // Update World State
   message.characters.forEach(function (characterMessage) {
      var character = game.characters[characterMessage.id];
      if (!character) {
         character = new Character(characterMessage.id);
         game.characters[characterMessage.id] = character;
      }

      character.setBody(characterMessage.body);
      character.setDirection(characterMessage.direction);
      if (character === game.currentCharacter) {
         character.setPosition(
            levelLoader.get(characterMessage.position.level),
            characterMessage.position.layer,
            new math.Constant(characterMessage.position.x),
            new math.Constant(characterMessage.position.y)
         );
      } else {
         var x = new math.Constant(characterMessage.position.x);
         var y  = new math.Constant(characterMessage.position.y);
         if (character.position !== null) {
            var interval = (message.time - character.lastUpdate) / 1000;
            var dx = (characterMessage.position.x - character.position[2].get()) / interval;
            var dy = (characterMessage.position.y - character.position[3].get()) / interval;
            character.animator.setParameter('speed', dx * dx + dy * dy);
            if (options.lag.interpolation) {
               x = new math.Lerp(character.position[2].get(), characterMessage.position.x, interval);
               y = new math.Lerp(character.position[3].get(), characterMessage.position.y, interval);
            }
         }

         character.setPosition(
            levelLoader.get(characterMessage.position.level),
            characterMessage.position.layer,
            x,
            y
         );
         
         characterMessage.triggers.forEach(function (trigger) {
            character.animator.setParameter(trigger, true);
         });
      }
      character.lastUpdate = message.time;
   });

   // Remove old characters
   var characterIds = message.characters.map(function (characterMessage) {
      return characterMessage.id;
   });
   Object.keys(game.characters).filter(function (characterId) {
      return characterIds.indexOf(characterId) === -1;
   }).forEach(function (characterId) {
      game.characters[characterId].remove();
      delete game.characters[characterId];
   });

   // Reconcile World State
   queue.invalidate(message.last_message);
   queue.replayAll();
}

module.exports = function (message) {
   if (options.lag.server_lag) {
      setTimeout(function () {
         update(message);
      }, options.lag.server_lag);
   } else {
      update(message);
   }
};

