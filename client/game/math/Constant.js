/*global define:false*/
define([], function () {
   "use strict";
   
   function Constant(value) {
      this.value = value;
   }
   
   Constant.prototype.update = function update(dt) {
   };
   
   Constant.prototype.get = function get() {
      return this.value;
   };

   return Constant;
});