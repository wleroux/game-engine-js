/*jslint vars:true*/
/*global define:false*/
define(['q', 'resource/textLoader', './Level', 'resource/image/Image'], function (q, textLoader, Level, Image) {
   'use strict';
   
   function LevelLoader() {
      this.cache = {};
   }
   
   LevelLoader.prototype.get = function get(url) {
      if (!this.cache[url]) {
         var level = new Level(url);
         textLoader.load(url).then(function (data) {
            var jsonLevel = JSON.parse(data);
            jsonLevel.layers.forEach(function (jsonLayer, layerIndex) {
               var layer = level.getLayer(layerIndex);

               layer.offset = jsonLayer.offset;
               layer.parallax = jsonLayer.parallax;
               layer.setTileDefinitions(jsonLayer.tile_definitions.map(function (tileset) {
                  return new Image(tileset);
               }));
               layer.setTiles(jsonLayer.tiles);
               layer.type = jsonLayer.type;
            });
         }).done();
         
         this.cache[url] = level;
      }
      
      return this.cache[url];
   };
   
   return new LevelLoader();
});