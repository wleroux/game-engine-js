/*global define:false*/
define(['./loader'], function (imageLoader) {
   'use strict';
   
   function Image(url) {
      this.url = url;
   }
   
   Image.prototype.render = function (ctx, x, y, width, height) {
      if (imageLoader.isLoaded(this.url)) {
         ctx.drawImage(imageLoader.get(this.url), x, y, width, height, 0, 0, width, height);
      } else {
         imageLoader.load(this.url);
      }
   };
   
   return Image;
});