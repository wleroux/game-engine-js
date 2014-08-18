/*jslint vars:true*/
/*global define:false*/
define(['resource/animation/loader'], function (animationLoader) {
   "use strict";

   var animations = {
      "idle": animationLoader.get("asset/animation/idle.ani"),
      "walk": animationLoader.get("asset/animation/walk.ani"),
      "attack": animationLoader.get("asset/animation/attack.ani")
   };
   var fallbackState = {
      "attack": "idle"
   };
   
   function AnimationController() {
      this.parameters = {};
      this.state = "idle";
      this.lastState = null;
      this.timer = 0;
   }
   
   AnimationController.prototype.setParameter = function setParameter(parameter, value) {
      this.parameters[parameter] = value;
   };
   
   AnimationController.prototype.update = function update(dt) {
      this.timer += dt;
   };
   
   AnimationController.prototype.render = function render(ctx, actor) {
      this.lastState = this.state;
      
      // When a state is done, return to fallback state
      if (animations[this.state].isDone(this.timer)) {
         this.state = fallbackState[this.state] || this.state;
      }
      
      // Get new state
      if (this.state === "idle" && this.parameters.speed !== 0) {
         this.state = "walk";
      } else if (this.state === "walk" && this.parameters.speed === 0) {
         this.state = "idle";
      }
      if ((this.state === "idle" || this.state === "walk") && this.parameters.attack === true) {
         this.setParameter("attack", false);
         this.state = "attack";
      }

      // Reset Timer if needed
      if (this.lastState === null || this.lastState !== this.state) {
         this.timer = 0;
      }

      // Render
      animations[this.state].render(ctx, this.timer, actor);
   };
   
   return AnimationController;
});