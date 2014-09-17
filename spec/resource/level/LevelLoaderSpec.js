describe("levelLoader", function () {
  var levelLoader = require('../../../common/resource/level/levelLoader');

  describe("#load", function () {
    it("loads a level", function () {
      var level = levelLoader.load({
        layers: []
      });
      expect(level).toBeDefined();
      expect(level.layers.length).toBe(0);
    });
    it("loads level layers", function () {
      var level = levelLoader.load({
        layers: [{
          offset: [1, 2],
          parallax: [3, 4],
          tile_definitions: ["test"],
          tiles: [[[0, 1, 2]]],
          type: [[0, 1]]
        }]
      });

      expect(level).toBeDefined();
      expect(level.layers.length).toEqual(1);
      expect(level.layers[0].offset).toEqual([1, 2]);
      expect(level.layers[0].parallax).toEqual([3, 4]);
      expect(level.layers[0].tile_definitions).toEqual(["test"]);
      expect(level.layers[0].tiles).toEqual([[[0, 1, 2]]]);
      expect(level.layers[0].type).toEqual([[0, 1]]);
    });
    it("loads multiple layers in the right order", function () {
      var level = levelLoader.load({
        layers: [{
          offset: [1, 2]
        }, {
          offset: [3, 4]
        }]
      });

      expect(level).toBeDefined();
      expect(level.layers.length).toEqual(2);
      expect(level.layers[0].offset).toEqual([1, 2]);
      expect(level.layers[1].offset).toEqual([3, 4]);
    });
  });
});
