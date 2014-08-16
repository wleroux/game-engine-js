/*jslint vars:true*/
/*global define:false*/
define(['Camera'], function (Camera) {
   'use strict';

   // Set up canvas
   var canvas = document.getElementById("game");
   var ctx = canvas.getContext("2d");

   // Use up entire viewport
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
   });

   return {
      context: ctx,
      camera: new Camera(),
      currentCharacter: null,
      characters: {}
   };
});