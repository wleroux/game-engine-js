var game = require('../game');
var Command = require('./Command');

function Slash(dx, dy, direction) {
  Command.apply(this);
}
Slash.prototype = Object.create(Command.prototype);
Slash.prototype.constructor = Slash;

Slash.prototype.isNoop = function isNoop() {
  return false;
};

Slash.prototype.send = function (socket) {
  socket.emit('slash', {
    timestamp: this.timestamp
  });
};

module.exports = Slash;
