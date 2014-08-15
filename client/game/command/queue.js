/*global define:false*/
define(['game', 'config/options'], function (game, options) {
   'use strict';
   function CommandQueue() {
      this.commands = [];
   }
   
   CommandQueue.prototype.replayAll = function replayAll() {
      if (options.lag.reconcilation) {
         this.commands.forEach(function (command) {
            command.play();
         });
      }
   };
   
   CommandQueue.prototype.send = function send(command) {
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
   
   CommandQueue.prototype.invalidate = function invalidate(timestamp) {
      this.commands = this.commands.filter(function (command) {
         return command.timestamp > timestamp;
      });
   };
   
   return new CommandQueue();
});