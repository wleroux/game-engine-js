/*jslint node:true, vars:true, nomen:true*/
'use strict';

var levelLoader = require('../resource/level');

module.exports = function (character) {
   return function (message) {
      character.triggers.push("attack");
   };
};