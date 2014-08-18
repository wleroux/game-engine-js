/*jslint vars:true*/
/*global define:false*/
define(['./keyboard', 'game', 'command/queue', 'command/Move', 'command/Attack'], function (keyboard, game, queue, Move, Attack) {
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
      
      // Movement
      var state = this.character.animator.state;
      if (state === "idle" || state === "walk") {
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

         if (dx !== 0 || dy !== 0 || direction !== this.character.direction) {
            var move = new Move(this.character);
            if (dx !== 0 || dy !== 0) {
               move.dx = dx;
               move.dy = dy;
            }
            if (direction !== this.character.direction) {
               move.direction = direction;
            }

            queue.send(move);
         }
         this.character.animator.setParameter('speed', dx * dx + dy * dy);

         // Attack
         var attack = keyboard.isPressed('ATTACK');
         if (attack) {
            queue.send(new Attack());
            
            this.character.animator.setParameter('attack', true);
         }
      }
   };
   
   return new Controller();
});