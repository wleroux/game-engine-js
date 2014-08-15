/*jslint vars:true*/
/*global define:false*/
define(['resource/image/Image'], function (Image) {
   "use strict";

   function Sprite(file, x, y, width, height) {
      this.file = file;
      this.image = new Image(file);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
   }

   Sprite.prototype.render = function render(ctx, actor) {
      var image;
      switch (this.file) {
      case "BODY":
         image = actor.body;
         break;
      default:
         image = this.image;
      }
      
      if (image !== null) {
         image.render(ctx, this.x, this.y, this.width, this.height);
      }
   };

   return Sprite;
});