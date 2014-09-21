var game = require('../game');
var options = require('../config/options');

function CommandQueue() {
   this.commands = [];
}

CommandQueue.prototype.replayAll = function () {
   if (options.lag.reconcilation) {
      this.commands.forEach(function (command) {
         command.play();
      });
   }
};

CommandQueue.prototype.send = function (command) {
   if (command.isNoop()) {
      return;
   }

   this.commands.push(command);
   if (options.lag.client_lag) {
      setTimeout(function () {
         command.send(game.socket);
      }, options.lag.client_lag);
   } else {
      command.send(game.socket);
   }
   
   if (options.lag.prediction) {
      command.play();
   }
};

CommandQueue.prototype.invalidate = function (timestamp) {
   this.commands = this.commands.filter(function (command) {
      return command.timestamp > timestamp;
   });
};

module.exports = new CommandQueue();

