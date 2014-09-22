var _entities = {};
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var levelLoader = require('../level');
var Point = require('../../common/geometry/Point');

var gameDispatcher = require('../gameDispatcher');
var EntityStore = merge(EventEmitter.prototype, {
  getRelevantEntitiesFor: function (id) {
    // Naive solution: Return all entities
    return Object.keys(_entities).map(function (key) {
      return _entities[key];
    });
  },
  consumeTriggers: function () {
    Object.keys(_entities).forEach(function (key) {
      _entities[key].consumeAllTriggers();
    });
  },
  dispatcherToken: gameDispatcher.register(function (payload) {
    var action = payload.action;
    switch (payload.actionType) {
      case "connect":
        _entities[action.id] = action;
        break;
      case "disconnect":
        delete _entities[payload.source];
        break;
      case "move":
        var entity = _entities[payload.source];
        var level = levelLoader(entity.position.level);
        entity.direction = action.direction !== undefined ? action.direction : entity.direction;
        if (!level.isBlocked(entity.position.layer, entity.position.x + action.dx, entity.position.y + action.dy)) {
          entity.position.x += action.dx;
          entity.position.y += action.dy;
        }
        break;
      case "slash":
        var entity = _entities[payload.source];
        entity.trigger('slash');
        var attackPoint = new Point(entity.position.x, entity.position.y).translateByDirection(entity.direction, 32);
        Object.keys(_entities).filter(function (id) {
          if (id == payload.source) return false;
          var entityPoint = new Point(_entities[id].position.x, _entities[id].position.y);
          return (entityPoint.distanceTo(attackPoint) <= 16);
        }).forEach(function (id) {
          _entities[id].trigger("hurt");
        });
        break;
    }
    return true;
  })
});

module.exports = EntityStore; 
