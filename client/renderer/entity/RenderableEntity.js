var animationRenderer = require('../animation');

var STATES = {
  IDLE: "asset/animation/idle.ani",
  WALK: "asset/animation/walk.ani",
  SLASH: "asset/animation/slash.ani",
  HURT: "asset/animation/hurt.ani"
}

var Entity = require('../../../common/entity/Entity');
function RenderableEntity() {
  Entity.apply(this, arguments);
  this.parameters = {
    speed: 0
  };
  this.lastPosition = {
    level: this.position.level,
    layer: this.position.layer,
    x: this.position.x.get(),
    y: this.position.y.get()
  };
  this.lastState = "IDLE";
  this.timer = 0;
}
RenderableEntity.prototype = Object.create(Entity.prototype);
RenderableEntity.prototype.constructor = RenderableEntity;

RenderableEntity.prototype.update = function (dt) {
  this.timer += dt;
  this.position.x.update(dt);
  this.position.y.update(dt);

  // update speedd
  var dx = this.lastPosition.x - this.position.x.get();
  var dy = this.lastPosition.y - this.position.y.get();
  this.parameters.speed = dx * dx + dy * dy;
  this.lastPosition = {
    level: this.position.level,
    layer: this.position.layer,
    x: this.position.x.get(),
    y: this.position.y.get()
  };
};

RenderableEntity.prototype.render = function (ctx) {
  // get current state
  var state = this.parameters.speed === 0 ? "IDLE" : "WALK";

  // reset timer if needed
  if (this.lastState !== state) {
    this.timer = 0;
  }
  this.lastState = state;

  // render
  animationRenderer.render(ctx, STATES[state], this.timer, this);
};

module.exports = RenderableEntity;

