/*global require:false*/
require.config({
   paths: {
      q: '../bower_components/q/q',
      io: '../socket.io/socket.io.js'
   }
});

require(['app'], function (game) {
   "use strict";
   game.init();
});