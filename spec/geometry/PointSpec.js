describe("Point", function () {
  var Point = require('../../common/geometry/Point');

  it("keeps position information", function () {
    var p = new Point(10, 20);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
  });

  describe("#distanceTo", function () {
    it("calculates the distance to another point", function () {
      var firstPoint = new Point(1, 1);
      var secondPoint = new Point(1+3, 1+4);
      expect(firstPoint.distanceTo(secondPoint)).toBe(5);
    });
  });

  describe("#translateByDirection", function () {
    var p = new Point(0, 0);
    it("translates directions", function () {
      expect(p.translateByDirection(0, 10)).toEqual(new Point(  0, -10));
      expect(p.translateByDirection(1, 10)).toEqual(new Point(-10,   0));
      expect(p.translateByDirection(2, 10)).toEqual(new Point(  0,  10));
      expect(p.translateByDirection(3, 10)).toEqual(new Point( 10,   0));
    });

    it("translates invalid directions to undefined", function () {
      expect(p.translateByDirection(undefined, 10)).toBe(undefined);
      expect(p.translateByDirection(4, 10)).toBe(undefined);
    });
  });
});
