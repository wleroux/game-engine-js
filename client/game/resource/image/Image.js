/*global define:false*/
define(['./loader'], function (imageLoader) {
   'use strict';
   
   function Image(url) {
      this.url = url;
      imageLoader.load(this.url);
   }
   
   Image.prototype.isLoaded = function isLoaded() {
      return imageLoader.isLoaded(this.url);
   };
   
   Image.prototype.render = function (ctx, x, y, width, height) {
      if (this.isLoaded()) {
         ctx.drawImage(imageLoader.get(this.url), x, y, width, height, 0, 0, width, height);
      }
   };
   
   return Image;
});