var Command = require('./Command');
var Constant = require('../math/Constant');

function Attack() {
   Command.apply(this);
}
Attack.prototype = Object.create(Command.prototype);
Attack.prototype.constructor = Attack;

Attack.prototype.send = function (socket) {
   socket.emit('attack', {
      timestamp: this.timestamp
   });
};

Attack.prototype.play = function () {
};

module.exports = Attack;

