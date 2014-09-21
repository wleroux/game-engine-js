function Entity(id, parts, position, direction) {
   this.id = id;
   this.parts = parts;
   this.position = position;
   this.direction = direction;
   this.triggers = [];
}

Entity.prototype.hasTrigger = function (id) {
  return this.triggers.indexOf(id) > -1;
};

Entity.prototype.consumeTrigger = function (id) {
  if (this.hasTrigger(id)) {
    this.triggers.splice(this.triggers.indexOf(id), 1);
  }
};

Entity.prototype.trigger = function (id) {
  if (!this.hasTrigger(id)) {
    this.triggers.push(id);
  }
};

module.exports = Entity;
