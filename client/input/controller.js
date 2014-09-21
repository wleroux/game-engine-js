var game = require('../game');
var keyboard = require('./keyboard');
var command = require('../command');

function Controller() {
}

function slash(entity) {
  if (keyboard.isPressed('SLASH')) {
    entity.trigger("slash");
    command.queue.send(new command.Slash());
  }
}

function move(dt) {
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
}

Controller.prototype.update = function update(dt) {
  if (game.avatar === null || !game.entities[game.avatar]) return;
  var entity = game.entities[game.avatar];

  if (entity.lastState === "IDLE" || entity.lastState === "WALK") {
    move(dt);
  }
  if (entity.lastState === "IDLE" || entity.lastState === "WALK") {
    slash(entity);
  }
}

module.exports = new Controller();

