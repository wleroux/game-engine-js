/*jslint node:true, nomen:true*/
'use strict';

var express = require('express');
var app = express();
app.use('/asset', express['static'](__dirname + '/../asset'));
app.use('/', express['static'](__dirname + '/../dist'));
var http = require('http').Server(app);
var io = require('socket.io')(http);

// game dispatcher
var gameDispatcher = require('./gameDispatcher');
function dispatch(id, actionType) {
  return function (action) {
    gameDispatcher.dispatch({
      source: id,
      actionType: actionType,
      action: action
    });
  };
}

var UUID = require('node-uuid');
var entityGenerator = require('./entity/generator');
io.on('connection', function (socket) {
  socket.id = UUID();
  socket.dispatchToken = gameDispatcher.register(function (payload) {
    switch (payload.actionType) {
    case "connect":
      socket.emit('connected', socket.id);
      break;
    case "disconnect":
      gameDispatcher.unregister(socket.dispatchToken);
      break;
    default:
      if (payload.action.time) {
        socket.lastMessage = payload.action.time;
      }
      break;
    }
  });

  var entity = entityGenerator.generate(socket.id);
  dispatch(entity.id, 'connect')(entity);
  socket.on('move', dispatch(entity.id, 'move'));
  socket.on('disconnect', dispatch(entity.id, 'disconnect'));
});

// update loop
var EntityStore = require('./entity/EntityStore');
setInterval(function () {
  // Update client machines
  io.of('/').sockets.forEach(function (socket) {
    var update = {
      time: Date.now(),
      last_message: 0,
      entities: EntityStore.getRelevantEntitiesFor(socket.id)
    };

    update.last_message = socket.last_message;
    socket.emit('update', update);
  });
}, 1000 / 20);

var port = process.env.PORT | 3000;
http.listen(port, function () {
   console.log('listening on *:' + port);
});
