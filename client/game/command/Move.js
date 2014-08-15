/*jslint vars:true*/
/*global define:false*/
define(['./Command', 'math/Constant'], function (Command, Constant) {
   'use strict';
   
   function Move(character) {
      Command.apply(this);
      this.character = character;
      this.dx = null;
      this.dy = null;
      this.direction = undefined;
      this.animation = null;
   }
   Move.prototype = Object.create(Command.prototype);
   Move.prototype.constructor = Move;
   
   Move.prototype.isNoop = function isNoop() {
      return !this.dx && !this.dy && this.direction === undefined && !this.animation;
   };
   
   Move.prototype.send = function (socket) {
      socket.emit('move', {
         timestamp: this.timestamp,
         id: this.character.id,
         dx: this.dx,
         dy: this.dy,
         direction: this.direction,
         animation: this.animation
      });
   };
   
   Move.prototype.play = function () {
      if (this.character.position === null) {
         return;
      }

      if (this.direction !== undefined) {
         this.character.setDirection(this.direction);
      }
      
      if (this.dx || this.dy) {
         var level = this.character.position[0];
         var layer = this.character.position[1];
         var x = this.character.position[2].get();
         var y = this.character.position[3].get();
         
         var dx = this.dx, dy = this.dy;
         if (level.isBlocked(layer, x + this.dx, y + this.dy)) {
            dx = 0;
            dy = 0;
         }

         this.character.setPosition(
            this.character.position[0],
            this.character.position[1],
            new Constant(x + dx),
            new Constant(y + dy)
         );
      }
   };
   
   return Move;
});