var _entities = {};
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var levelLoader = require('../level');

var gameDispatcher = require('../gameDispatcher');
var EntityStore = merge(EventEmitter.prototype, {
  getRelevantEntitiesFor: function (id) {
    // Naive solution: Return all entities
    return Object.keys(_entities).map(function (key) {
      return _entities[key];
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
        entity.direction = action.direction;
        if ( ! level.isBlocked(entity.position.layer, entity.position.x + action.dx, entity.position.y + action.dy)) {
          entity.position.x += action.dx;
          entity.position.y += action.dy;
        }
        break;
    }
    return true;
  })
});

module.exports = EntityStore; 
