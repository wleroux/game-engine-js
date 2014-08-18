/*jslint vars:true*/
/*global define:false*/
define(['resource/animation/loader'], function (animationLoader) {
   "use strict";

   function AnimationController() {
      this.parameters = {};
      this.state = "idle";
      this.lastState = null;
      this.timer = 0;
      
      this.animations = {
         "idle": animationLoader.get("asset/animation/idle.ani"),
         "walk": animationLoader.get("asset/animation/walk.ani")
      };
   }
   
   AnimationController.prototype.setParameter = function setParameter(parameter, value) {
      this.parameters[parameter] = value;
   };
   
   AnimationController.prototype.update = function update(dt) {
      this.timer += dt;
   };
   
   AnimationController.prototype.render = function render(ctx, actor) {
      this.lastState = this.state;
      
      // Get new state
      if (this.state === "idle") {
         if (this.parameters.speed !== 0) {
            this.state = "walk";
         }
      } else if (this.state === "walk") {
         if (this.parameters.speed === 0) {
            this.state = "idle";
         }
      }

      // Reset Timer if needed
      if (this.lastState === null || this.lastState !== this.state) {
         this.timer = 0;
      }

      // Render
      this.animations[this.state].render(ctx, this.timer, actor);
   };
   
   return AnimationController;
});