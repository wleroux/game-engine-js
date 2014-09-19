var keyboard = require('./keyboard');
var command = require('../command');

function Controller() {
}

Controller.prototype.update = function update(dt) {
  var speed = 160;
  var dx = (keyboard.isPressed('RIGHT') - keyboard.isPressed('LEFT')) * speed * dt;
  var dy = (keyboard.isPressed('DOWN') - keyboard.isPressed('UP')) * speed * dt;
  var direction;
  if (dy < 0) {
     direction = 0;
  } else if (dx < 0) {
     direction = 1;
  } else if (dy > 0) {
     direction = 2;
  } else if (dx > 0) {
     direction = 3;
  }

  if (dx !== 0 || dy !== 0 || direction !== undefined) {
    command.queue.send(new command.Move(dx, dy, direction));
  }
};

module.exports = new Controller();

