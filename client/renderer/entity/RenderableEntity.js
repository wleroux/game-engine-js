var animationRenderer = require('../animation');

var STATES = {
  IDLE: "asset/animation/idle.ani",
  WALK: "asset/animation/walk.ani",
  SLASH: "asset/animation/slash.ani",
  HURT: "asset/animation/hurt.ani"
};

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
  // Update loop
  this.timer += dt;
  this.position.x.update(dt);
  this.position.y.update(dt);

  // update speed
  var dx = this.lastPosition.x - this.position.x.get();
  var dy = this.lastPosition.y - this.position.y.get();
  this.setParameter("speed", dx * dx + dy * dy);
  this.lastPosition = {
    level: this.position.level,
    layer: this.position.layer,
    x: this.position.x.get(),
    y: this.position.y.get()
  };
};

RenderableEntity.prototype.setParameter = function (parameter, value) {
  this.parameters[parameter] = value;
};

function canTakeAction(state) {
  return state === "IDLE" || state === "WALK";
}

RenderableEntity.prototype.render = function (ctx) {
  var state = this.lastState;
  if (state === "SLASH" && animationRenderer.isDone(STATES[state], this.timer)) {
    this.timer = 0;
    state = "IDLE";
  }

  if (canTakeAction(state) && this.hasTrigger("slash")) {
    this.consumeTrigger("slash");
    state = "SLASH";
  }

  if (canTakeAction(state)) {
    state = this.parameters.speed === 0 ? "IDLE" : "WALK";
  }

  // reset timer if needed
  if (this.lastState !== state) {
    this.timer = 0;
  }
  this.lastState = state;

  // render
  animationRenderer.render(ctx, STATES[state], this.timer, this);
};

module.exports = RenderableEntity;

