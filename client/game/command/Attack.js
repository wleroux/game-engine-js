/*jslint vars:true*/
/*global define:false*/
define(['./Command', 'math/Constant'], function (Command, Constant) {
   'use strict';
   
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

   return Attack;
});