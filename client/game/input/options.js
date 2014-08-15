/*global define:false*/
define([], function () {
   'use strict';
   
   function Options() {
      this.code = {
         32: 'FIRE',
         37: 'LEFT',
         38: 'UP',
         39: 'RIGHT',
         40: 'DOWN'
      };

      this.char = {
         'a': 'LEFT',
         'w': 'UP',
         's': 'DOWN',
         'd': 'RIGHT'
      };
   }
   
   Options.prototype.commandFor = function (code) {
      if (this.code.hasOwnProperty(code)) {
         return this.code[code];
      } else if (this.char.hasOwnProperty(String.fromCharCode(code))) {
         return this.char[String.fromCharCode(code)];
      } else {
         return undefined;
      }
   };

   return new Options();
});