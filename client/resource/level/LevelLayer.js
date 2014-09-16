var game = require('../../game');
var imageRenderer = require('../image');

function LevelLayer() {
   this.offset = [0, 0];
   this.parallax = [0, 0];
   this.tile_definitions = [];
   this.tiles = [];
   this.type = [];
   this.entities = [];
   this.tilesRender = null;
}

LevelLayer.prototype.setTileDefinitions = function setTileDefinitions(tile_definitions) {
   this.tile_definitions = tile_definitions;
   this.tilesRender = null;
};

LevelLayer.prototype.setTiles = function setTiles(tiles) {
   this.tiles = tiles;
   this.tilesRender = null;
};

LevelLayer.prototype.renderTiles = function renderTiles(ctx) {
   if (this.tilesRender === null) {
      var isLoaded = this.tile_definitions.every(function (tile_definition) {
        if (!imageRenderer.isLoaded(tile_definition)) {
          imageRenderer.load(tile_definition);
          return false;
        }
        return true;
      });

      if (isLoaded) {
         // Cache layer
         this.tilesRender = document.createElement('canvas');
         this.tilesRender.width = this.tiles.reduce(function (prev, curr) {
            return prev > curr.length ? prev : curr.length;
         }, 0) * 32;
         this.tilesRender.height = this.tiles.length * 32;

         var tilesCtx = this.tilesRender.getContext('2d');
         this.tiles.forEach(function (row, rowIndex) {
            tilesCtx.save();
            tilesCtx.translate(0, rowIndex * 32);
            row.forEach(function (tile, tileIndex) {
               if (tile !== null) {
                  imageRenderer.render(tilesCtx, this.tile_definitions[tile[0]], tile[1] * 32, tile[2] * 32, 32, 32);
               }
               tilesCtx.translate(32, 0);
            }.bind(this));
            tilesCtx.restore();
         }.bind(this));
      }
   }
   
   if (this.tilesRender !== null) {
      ctx.drawImage(this.tilesRender, 0, 0, this.tilesRender.width, this.tilesRender.height);
   }
};

LevelLayer.prototype.getTiles = function getTiles() {
   return this.tiles;
};

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
      Math.floor(ctx.canvas.width / 2) - Math.floor(focus[2].get() * effective_parallax[0]),
      Math.floor(ctx.canvas.height / 2) - Math.floor(focus[3].get() * effective_parallax[1])
   );

   // Render Tiles
   this.renderTiles(ctx);
   
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

module.exports = LevelLayer;

