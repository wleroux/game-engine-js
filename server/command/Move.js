/*jslint node:true*/
'use strict';

module.exports = function (character) {
   return function (message) {
      if (message.animation) {
         character.setAnimation(message.animation);
      }

      if (message.direction !== undefined) {
         character.setDirection(message.direction);
      }
      
      if (character.position.x + message.dx < 0) {
         message.dx = 0;
      }
      if (character.position.y + message.dy < 0) {
         message.dy = 0;
      }

      if (message.dx || message.dy) {
         character.setPosition(
            character.position.level,
            character.position.layer,
            character.position.x + message.dx,
            character.position.y + message.dy
         );
      }
   };
};