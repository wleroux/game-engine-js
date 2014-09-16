var game = require('../game');

module.exports = function (id) {
   if (game.characters[id]) {
      game.characters[id].remove();
      delete game.characters[id];
   }
};

