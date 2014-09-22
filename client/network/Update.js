var game = require('../game');
var options = require('../config/options');
var queue = require('../command/queue');
var math = require('../math');
var Entity = require('../renderer/entity/RenderableEntity');

var lastUpdate = Date.now();
function update(message) {
  // Update entities
  message.entities.forEach(function (jsonEntity) {
    var id = jsonEntity.id;
    var localEntity = (id === game.avatar);
    var entity;
    if (game.entities.hasOwnProperty(id)) {
      entity = game.entities[id];
      entity.parts = jsonEntity.parts;
      entity.direction = jsonEntity.direction;

      var interpolationEnabled = options.lag.interpolation;
      var shouldInterpolate = !localEntity && entity.position.level === jsonEntity.position.level && entity.position.layer === jsonEntity.position.layer;
      if (interpolationEnabled && shouldInterpolate) {
        var interval = (message.time - lastUpdate) / 1000;
        var x = new math.Lerp(entity.position.x.get(), jsonEntity.position.x, interval);
        var y = new math.Lerp(entity.position.y.get(), jsonEntity.position.y, interval);
      } else {
        var x = new math.Constant(jsonEntity.position.x);
        var y = new math.Constant(jsonEntity.position.y);
      }
      entity.position = {
        level: jsonEntity.position.level,
        layer: jsonEntity.position.layer,
        x: x,
        y: y
      };
    } else {
      entity = new Entity(
        jsonEntity.id,
        jsonEntity.parts,
        {
          level: jsonEntity.position.level,
          layer: jsonEntity.position.layer,
          x: new math.Constant(jsonEntity.position.x),
          y: new math.Constant(jsonEntity.position.y)
        },
        jsonEntity.direction
      );
      game.entities[entity.id] = entity;
    }

    var localTriggers = ["slash"];
    jsonEntity.triggers.forEach(function (trigger) {
      if (localTriggers.indexOf(trigger) === -1 || !localEntity) {
        entity.trigger(trigger);
      }
    });
  });
  lastUpdate = message.time;

  // Remove old entities
  var existingEntityIds = message.entities.map(function (entity) {
    return entity.id;
  });
  Object.keys(game.entities).filter(function (id) {
    return existingEntityIds.indexOf(id) === -1;
  }).forEach(function (id) {
    delete game.entities[id];
  });

  // Reconcile World State
  queue.invalidate(message.lastMessage);
  queue.replayAll();
}

module.exports = function (message) {
  if (options.lag.server_lag) {
    setTimeout(function () {
      update(message);
    }, options.lag.server_lag);
  } else {
    update(message);
  }
};

