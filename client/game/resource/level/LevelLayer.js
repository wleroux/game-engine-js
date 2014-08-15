/*jslint vars:true*/
/*global define:false*/
define(['resource/image/Image', 'game'], function (Image, game) {
   'use strict';
   
   function LevelLayer() {
      this.offset = [0, 0];
      this.parallax = [0, 0];
      this.tile_definitions = [];
      this.tiles = [];
      this.type = [];
      this.entities = [];
   }
   
   LevelLayer.prototype.removeEntity = function removeEntity(entity) {
      this.entities.splice(this.entities.indexOf(entity), 1);
   };
   
   LevelLayer.prototype.addEntity = function addEntity(entity) {
      this.entities.push(entity);
   };
   
   LevelLayer.prototype.update = function update(dt) {
      this.entities.forEach(function (entity) {
         entity.update(dt);
      });
   };
   
   LevelLayer.prototype.isBlocked = function isBlocked(x, y) {
      var lx = Math.floor(x / 32);
      var ly = Math.floor(y / 32);
      if (0 <= ly && ly < this.type.length) {
         if (0 <= lx && lx < this.type[ly].length) {
            return this.type[ly][lx] === 1;
         }
      }
      
      return true;
   };
   
   LevelLayer.prototype.render = function render(ctx) {
      var focus = game.camera.focus();
      
      // Offset layer
      ctx.save();
      var effective_offset = [
         this.offset[0] - focus[0].layers[focus[1]].offset[0],
         this.offset[1] - focus[0].layers[focus[1]].offset[1]
      ];
      ctx.translate(effective_offset[0], effective_offset[1]);
      
      // Apply Effective Parallax
      var effective_parallax = [
         1 + this.parallax[0] - focus[0].layers[focus[1]].parallax[0],
         1 + this.parallax[1] - focus[0].layers[focus[1]].parallax[1]
      ];
      ctx.translate(
         ctx.canvas.width / 2 - Math.floor(focus[2].get() * effective_parallax[0]),
         ctx.canvas.height / 2 - Math.floor(focus[3].get() * effective_parallax[1])
      );

      // Render Tiles
      this.tiles.forEach(function (row, rowIndex) {
         ctx.save();
         ctx.translate(0, rowIndex * 32);
         row.forEach(function (tile, tileIndex) {
            if (tile !== null) {
               this.tile_definitions[tile[0]].render(ctx, tile[1] * 32, tile[2] * 32, 32, 32);
            }
            ctx.translate(32, 0);
         }.bind(this));
         ctx.restore();
      }.bind(this));
      
      // Render Entities
      this.entities.sort(function (a, b) {
         if (a.position[3].get() > b.position[3].get()) {
            return 1;
         }
         if (a.position[3].get() < b.position[3].get()) {
            return -1;
         }
         if (a.position[2].get() > b.position[2].get()) {
            return -1;
         }
         if (a.position[2].get() < b.position[2].get()) {
            return 1;
         }
         return 0;
      });

      this.entities.forEach(function (entity) {
         ctx.save();
         ctx.translate(Math.floor(entity.position[2].get()), Math.floor(entity.position[3].get()));
         entity.render(ctx);
         ctx.restore();
      });
      ctx.restore();
   };
   
   return LevelLayer;
});