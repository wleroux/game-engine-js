var AnimationController = require('../resource/animation/controller/AnimationController');

function Character(id) {
   this.id = id;

   this.body = null;
   this.position = null;
   this.animator = new AnimationController();
   this.direction = 0;
   this.lastUpdate = 0;
}

Character.prototype.setDirection = function setDirection(direction) {
   this.direction = direction;
};

Character.prototype.remove = function remove() {
   if (this.position !== null) {
      this.position[0].removeEntity(this, this.position[1]);
      this.position = null;
   }
};

Character.prototype.setBody = function setBody(body) {
   this.body = body;
};

Character.prototype.setPosition = function setPosition(level, layer, x, y) {
   if (this.position !== null) {
      if (this.position[0] !== level || this.position[1] !== layer) {
         this.position[0].removeEntity(this, this.position[1]);
         level.addEntity(this, layer);
      }
   } else {
      level.addEntity(this, layer);
   }
   
   this.position = [level, layer, x, y];
};

Character.prototype.update = function update(dt) {
   if (this.position !== null) {
      this.position[2].update(dt);
      this.position[3].update(dt);
   }
   
   this.animator.update(dt);
};

Character.prototype.render = function render(ctx) {
   this.animator.render(ctx, this);
};

module.exports = Character;

