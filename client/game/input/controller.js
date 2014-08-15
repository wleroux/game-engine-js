/*jslint vars:true*/
/*global define:false*/
define(['./keyboard', 'game', 'command/queue', 'command/Move'], function (keyboard, game, queue, Move) {
   'use strict';
   
   function Controller() {
      this.character = null;
   }
   
   Controller.prototype.setCharacter = function setCharacter(character) {
      this.character = character;
   };
   
   Controller.prototype.update = function update(dt) {
      if (!this.character) {
         return;
      }
      
      var move = new Move(this.character);
      
      var speed = 160;
      move.dx = (keyboard.isPressed('RIGHT') - keyboard.isPressed('LEFT')) * speed * dt;
      move.dy = (keyboard.isPressed('DOWN') - keyboard.isPressed('UP')) * speed * dt;

      var direction;
      if (move.dy < 0) {
         direction = 0;
      } else if (move.dx < 0) {
         direction = 1;
      } else if (move.dy > 0) {
         direction = 2;
      } else if (move.dx > 0) {
         direction = 3;
      }
      if (direction !== this.character.direction) {
         move.direction = direction;
      }

      this.character.animator.setParameter('speed', move.dx * move.dx + move.dy * move.dy);

      queue.send(move);
   };
   
   return new Controller();
});