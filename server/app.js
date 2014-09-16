/*jslint node:true, nomen:true*/
'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var UUID = require('node-uuid');
var Character = require('./entity/Character');


app.use(express['static'](__dirname + '/../client'));
app.use('/bower_components', express['static'](__dirname + '/../bower_components'));
app.use('/asset', express['static'](__dirname + '/../asset'));
app.use('/', express['static'](__dirname + '/../dist'));


function timestamped(socket, callback) {
   return function (message) {
      socket.last_message = message.timestamp;
      callback(message);
   };
}

var server = require('./server');
var characters = {};
var move = require('./command/Move');
var attack = require('./command/Attack');
io.on('connection', function (socket) {
   var character = new Character(UUID(), server.startPosition);
   socket.emit("connected", character.id);
   socket.on('move', timestamped(socket, move(character)));
   socket.on('attack', timestamped(socket, attack(character)));
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
         var triggers = character.triggers;
         character.triggers = [];
         
         return {
            id: character.id,
            body: character.body,
            direction: character.direction,
            position: character.position,
            triggers: triggers
         };
      })
   };

   // Update client machines
   io.of('/').sockets.forEach(function (socket) {
      update.last_message = socket.last_message;
      socket.emit('update', update);
   });
}, 1000 / server.fps);

var port = process.env.PORT | 3000;
http.listen(port, function () {
   console.log('listening on *:' + port);
});
