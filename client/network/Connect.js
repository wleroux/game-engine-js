var game = require('../game');
var controller = require('../input/controller');

module.exports = function (id) {
  game.avatar = id;
  game.camera.hasFocus = function () {
    return game.entities[game.avatar] && game.entities[game.avatar].position !== null;
  };
  game.camera.focus = function () {
    var entity = game.entities[game.avatar];
    return {
      level: entity.position.level,
      layer: entity.position.layer,
      x: entity.position.x.get(),
      y: entity.position.y.get()
    };
  };
};
