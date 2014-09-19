var game = require('../game');

module.exports = function (id) {
  if (game.characters[id]) {
    delete game.characters[id];
  }
};

