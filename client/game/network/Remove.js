/*global define:false*/
define(['game'], function (game) {
   'use strict';

   return function (id) {
      if (game.characters[id]) {
         game.characters[id].remove();
         delete game.characters[id];
      }
   };
});