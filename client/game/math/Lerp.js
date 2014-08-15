/*global define:false*/
define([], function () {
   "use strict";
   
   function Lerp(from, to, duration) {
      this.from = from;
      this.to = to;
      this.duration = duration;
      this.elasped_time = 0;
   }
   
   Lerp.prototype.update = function update(dt) {
      this.elasped_time = Math.min(this.elasped_time + dt, this.duration);
   };
   
   Lerp.prototype.get = function get() {
      return this.from + ((this.to - this.from) / this.duration) * this.elasped_time;
   };

   return Lerp;
});