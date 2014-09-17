var io = require('socket.io-client');

var game = require('./game');
var requestAnimationFrame = require('./shim/requestAnimationFrame');
var network = require('./network');
var controller = require('./input/controller');

function update(dt) {
  controller.update(dt);

  var focus = game.camera.focus();
  if (focus) {
    focus[0].update(dt);
  }
}

function render(ctx) {
  // Reset to black
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  var focus = game.camera.focus();
  if (focus) {
     focus[0].render(ctx);
  }
}

var lastTime = Date.now();
function main() {
  var now = Date.now();
  var dt = (now - lastTime) / 1000;

  update(dt);
  render(game.context);

  requestAnimationFrame(main);
  lastTime = now;
}

(function () {
  game.socket = io();
  game.socket.on('connected', network.Connect);
  game.socket.on('update', network.Update);
  game.socket.on('remove', network.Remove);

  requestAnimationFrame(main);
})();

