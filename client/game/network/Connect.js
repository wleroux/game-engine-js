/*global define:false*/
define(['game', 'entity/Character', 'input/controller'], function (game, Character, controller) {
   'use strict';
   
   return function (id) {
      var character = new Character(id);
      controller.setCharacter(character);
      game.camera.focus = function () {
         return character.position;
      };

      game.currentCharacter = character;
      game.characters[id] = character;
   };
});