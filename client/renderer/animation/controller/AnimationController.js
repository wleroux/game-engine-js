var animationRenderer= require('../index');

var STATES = {
  IDLE: "asset/animation/idle.ani",
  WALK: "asset/animation/walk.ani"
}

function AnimationController() {
  this.parameters = {
    speed: 0
  };
  this.state = "IDLE";
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

  // Get new state
  if (this.state === "IDLE" && this.parameters.speed !== 0) {
     this.state = "WALK";
  } else if (this.state === "WALK" && this.parameters.speed === 0) {
     this.state = "IDLE";
  }

  // Reset Timer if needed
  if (this.lastState === null || this.lastState !== this.state) {
     this.timer = 0;
  }

  // Render
  animationRenderer.render(ctx, STATES[this.state], this.timer, actor);
};

module.exports = AnimationController;

