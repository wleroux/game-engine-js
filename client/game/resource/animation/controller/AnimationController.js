/*jslint vars:true*/
/*global define:false*/
define(['resource/animation/loader'], function (animationLoader) {
   "use strict";

   function AnimationController() {
      this.parameters = {};
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
      // Determine Animation To Play
      var state = animationLoader.get('asset/animation/idle.ani');
      
      // Walking?
      if (this.parameters.speed && this.parameters.speed !== 0) {
         state = animationLoader.get('asset/animation/walk.ani');
      }
      
      // Reset Timer if needed
      if (this.lastState === null || this.lastState !== state) {
         this.timer = 0;
      }

      // Render
      state.render(ctx, this.timer, actor);
      this.lastState = state;
   };
   
   return AnimationController;
});