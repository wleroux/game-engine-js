/*jslint node:true, nomen:true*/
'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var UUID = require('node-uuid');
var Character = require('./entity/Character');

app.use(express['static'](__dirname + '/../client'));
app.use('/asset', express['static'](__dirname + '/../asset'));

function timestamped(socket, callback) {
   return function (message) {
      socket.last_message = message.timestamp;
      callback(message);
   };
}

var server = require('./server');
var characters = {};
var move = require('./command/Move');
io.on('connection', function (socket) {
   var character = new Character(UUID(), server.startPosition);
   socket.emit("connected", character.id);
   socket.on('move', timestamped(socket, move(character)));
   socket.on('disconnect', function () {
      io.emit('remove', character.id);

      delete characters[character.id];
   });
   
   characters[character.id] = character;
});

function values(map) {
   return Object.keys(map).map(function (key) {
      return map[key];
   });
}

setInterval(function () {
   // Get all changes
   var update = {
      time: Date.now(),
      last_message: 0,
      characters: values(characters).map(function (character) {
         return {
            id: character.id,
            body: character.body,
            direction: character.direction,
            position: character.position
         };
      })
   };

   // Update client machines
   io.of('/').sockets.forEach(function (socket) {
      update.last_message = socket.last_message;
      socket.emit('update', update);
   });
}, 1000 / server.fps);

var port = 3000;
http.listen(port, function () {
   console.log('listening on *:' + port);
});
