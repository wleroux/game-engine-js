/*jslint vars:true*/
/*global define:false*/
define(['game', 'config/options', 'command/queue', 'entity/Character', 'resource/level/loader', 'math/Lerp', 'math/Constant'], function (game, options, queue, Character, levelLoader, Lerp, Constant) {
   'use strict';

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
               new Constant(characterMessage.position.x),
               new Constant(characterMessage.position.y)
            );
         } else {
            var x = new Constant(characterMessage.position.x);
            var y  = new Constant(characterMessage.position.y);
            if (character.position !== null) {
               var interval = (message.time - character.lastUpdate) / 1000;
               var dx = (characterMessage.position.x - character.position[2].get()) / interval;
               var dy = (characterMessage.position.y - character.position[3].get()) / interval;
               character.animator.setParameter('speed', dx * dx + dy * dy);
               if (options.lag.interpolation) {
                  x = new Lerp(character.position[2].get(), characterMessage.position.x, interval);
                  y = new Lerp(character.position[3].get(), characterMessage.position.y, interval);
               }
            }

            character.setPosition(
               levelLoader.get(characterMessage.position.level),
               characterMessage.position.layer,
               x,
               y
            );
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
         game[characterId].remove();
         delete game[characterId];
      });

      // Reconcile World State
      queue.invalidate(message.last_message);
      queue.replayAll();
   }
   
   return function (message) {
      if (options.lag.server_lag) {
         setTimeout(function () {
            update(message);
         }, options.lag.server_lag);
      } else {
         update(message);
      }
   };
});