var Camera = require('./Camera');

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

module.exports = {
   context: ctx,
   camera: new Camera(),
   avatar: null,
   entities: {}
};

