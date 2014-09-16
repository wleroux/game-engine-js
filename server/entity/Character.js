function Character(id, position) {
   this.id = id;
   this.body = [
      "asset/images/sprites/soldier.png",
      "asset/images/sprites/soldier_altcolor.png",
      "asset/images/sprites/princess.png"
   ][Math.floor(Math.random() * 3)];
   this.position = {
      level: position.level,
      layer: position.layer,
      x: position.x,
      y: position.y
   };
   this.direction = 2;
   this.triggers = [];
}

Character.prototype.setDirection = function setDirection(direction) {
   this.direction = direction;
};

Character.prototype.setPosition = function setPosition(level, layer, x, y) {
   this.position.level = level;
   this.position.layer = layer;
   this.position.x = x;
   this.position.y = y;
};

module.exports = Character;
