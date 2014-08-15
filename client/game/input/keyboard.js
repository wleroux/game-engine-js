/*jslint vars:true*/
/*global define: false*/
define(['./options'], function (options) {
   'use strict';

   function Keyboard() {
      this.keys = {};
   }

   Keyboard.prototype.keydown = function keydown(code) {
      var command = options.commandFor(code);
      if (command !== undefined) {
         this.keys[command] = true;
      }
   };

   Keyboard.prototype.keyup = function keyup(code) {
      var command = options.commandFor(code);
      if (command !== undefined) {
         this.keys[command] = false;
      }
   };

   Keyboard.prototype.isPressed = function isPressed(command) {
      return this.keys[command] || false;
   };

   Keyboard.prototype.clearkeys = function () {
      this.keys = {};
   };

   var keyboard = new Keyboard();

   // Register keyboard events
   document.addEventListener('keydown', function (e) {
      keyboard.keydown(e.keyCode);
   });

   document.addEventListener('keyup', function (e) {
      keyboard.keyup(e.keyCode);
   });

   window.addEventListener('blur', function () {
      keyboard.clearkeys();
   });

   return keyboard;
});