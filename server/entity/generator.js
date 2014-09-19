var EntityGenerator = function () {
};

var Entity = require('../../common/entity/Entity');
EntityGenerator.prototype.generate = function (id) {
  var bodies = [
    "asset/images/sprites/soldier.png",
    "asset/images/sprites/soldier_altcolor.png",
    "asset/images/sprites/princess.png"
  ];
  var body = bodies[Math.floor(Math.random()*bodies.length)];
  var position = {
    level: "asset/level/default.level",
    layer: 2,
    x: 10 * 32,
    y: 10 * 32
  };

  return new Entity(id, body, position, 2);
}

module.exports = new EntityGenerator();

