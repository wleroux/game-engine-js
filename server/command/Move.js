/*jslint node:true, vars:true, nomen:true*/
'use strict';

var levelLoader = require('../resource/level');

module.exports = function (character) {
   return function (message) {
      if (message.direction !== undefined) {
         character.setDirection(message.direction);
      }

      var level = levelLoader(process.cwd() + '/' + character.position.level);
      var nx = character.position.x + message.dx;
      var ny = character.position.y + message.dy;
      if (!level.isBlocked(character.position.layer, nx, ny)) {
         character.setPosition(
            character.position.level,
            character.position.layer,
            nx,
            ny
         );
      }
   };
};