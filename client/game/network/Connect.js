var game = require('../game');
var Character = require('../entity/Character');
var controller = require('../input/controller');

module.exports = function (id) {
   var character = new Character(id);
   controller.setCharacter(character);
   game.camera.focus = function () {
      return character.position;
   };

   game.currentCharacter = character;
   game.characters[id] = character;
};
