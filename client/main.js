var game = require('./game');
var controller = require('./input/controller');

function update(dt) {
  controller.update(dt);
  Object.keys(game.entities).forEach(function (key) {
    game.entities[key].update(dt);
  });
}


var levelRenderer = require('./renderer/level');
function render(ctx) {
  // Reset to black
  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (game.camera.hasFocus()) {
    var focus = game.camera.focus();
    
    levelRenderer.render(ctx, focus, Object.keys(game.entities).map(function (key) {return game.entities[key];}));
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

var requestAnimationFrame = require('./shim/requestAnimationFrame');

var io = require('socket.io-client');
var network = require('./network');
(function () {
  game.socket = io();
  game.socket.on('connected', network.Connect);
  game.socket.on('update', network.Update);
  game.socket.on('remove', network.Remove);

  requestAnimationFrame(main);
})();

