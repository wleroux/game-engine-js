var game = require('../game');
var Character = require('../entity/Character');
var controller = require('../input/controller');

module.exports = function (id) {
  var character = new Character(id);
  controller.setCharacter(character);
  game.camera.hasFocus = function () {
    return character.position !== null;
  };
  game.camera.focus = function () {
    return {
      level: character.position[0],
      layer: character.position[1],
      x: character.position[2].get(),
      y: character.position[3].get()
    };
  };

  game.currentCharacter = character;
  game.entities[character.id] = character;
};
