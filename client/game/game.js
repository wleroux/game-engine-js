/*jslint vars:true*/
/*global define:false*/
define(['Camera'], function (Camera) {
   'use strict';

   // set up canvas
   var canvas = document.getElementById("game");
   var ctx = canvas.getContext("2d");
   canvas.width = 800;
   canvas.height = 640;

   return {
      context: ctx,
      camera: new Camera(),
      currentCharacter: null,
      characters: {}
   };
});