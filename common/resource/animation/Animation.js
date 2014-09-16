function Animation() {
   this.steps = [];
   this.repeat = false;
}

Animation.prototype.currentStep = function currentStep(timer) {
   var duration = this.duration();
   if (!this.repeat && timer >= duration) {
      return this.steps[this.steps.length - 1];
   } else {
      var leftover_timer = timer % duration;
      return this.steps.filter(function (step) {
         if (leftover_timer < 0) {
            return false;
         } else {
            leftover_timer -= step.duration;
            return leftover_timer < 0;
         }
      })[0];
   }
};

Animation.prototype.duration = function duration() {
   return this.steps.reduce(function (prev, curr) {
      return prev + curr.duration;
   }, 0);
};

Animation.prototype.addStep = function addStep(step, duration) {
   this.steps.push(step);
};

Animation.prototype.isDone = function isDone(timer) {
   return this.duration() < timer;
};

module.exports = Animation;

