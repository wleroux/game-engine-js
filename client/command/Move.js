var game = require('../game');
var Command = require('./Command');
var math = require('../math');
var levelRenderer = require('../renderer/level');

function Move(dx, dy, direction) {
  Command.apply(this);
  this.dx = dx;
  this.dy = dy;
  this.direction = direction;
}
Move.prototype = Object.create(Command.prototype);
Move.prototype.constructor = Move;

Move.prototype.isNoop = function isNoop() {
  return !this.dx && !this.dy && this.direction === undefined;
};

Move.prototype.send = function (socket) {
  socket.emit('move', {
    timestamp: this.timestamp,
    dx: this.dx,
    dy: this.dy,
    direction: this.direction
  });
};

Move.prototype.play = function () {
  if (!(game.avatar && game.entities[game.avatar])) {
    return;
  }

  var entity = game.entities[game.avatar];
  entity.direction = this.direction || entity.direction;
  if (this.dx || this.dy) {
    var x = entity.position.x.get() + this.dx;
    var y = entity.position.y.get() + this.dy;
    if (levelRenderer.isLoaded(entity.position.level)) {
      var level = levelRenderer.get(entity.position.level);
      if (!level.isBlocked(entity.position.layer, x, y)) {
        entity.position.x = new math.Constant(x);
        entity.position.y = new math.Constant(y);
      }
    } else {
      entity.position.x = new math.Constant(x);
      entity.position.y = new math.Constant(y);
    }
  }
};

module.exports = Move;
