/*jslint vars:true*/
/*global define:false, describe:false, beforeEach:false, jasmine:false, it:false, spyOn:false, expect:false*/
define(['./imageLoader', './Image'], function (imageLoader, Image) {
   'use strict';

   describe("Image", function () {
      var image = new Image("image.png", 1, 2, 3, 4);
      
      var ctx;
      beforeEach(function () {
         ctx = jasmine.createSpyObj('context', ['drawImage']);
      });
      
      it("loads image", function () {
         spyOn(imageLoader, 'isLoaded').andReturn(false);
         spyOn(imageLoader, 'load').andReturn();

         image.render(ctx);
         
         expect(imageLoader.load).toHaveBeenCalled();
         expect(ctx.drawImage).not.toHaveBeenCalled();
      });

      it("renders when image is loaded", function () {
         spyOn(imageLoader, 'isLoaded').andReturn(true);
         spyOn(imageLoader, 'get').andReturn("abc");
         spyOn(imageLoader, 'load');

         image.render(ctx);
         
         expect(ctx.drawImage).toHaveBeenCalledWith("abc", 1, 2, 3, 4, 0, 0, 3, 4);
         expect(imageLoader.load).not.toHaveBeenCalled();
      });
   });
});