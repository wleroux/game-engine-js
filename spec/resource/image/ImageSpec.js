var imageLoader = require('../../../client/game/resource/image/loader');
var Image = require('../../../client/game/resource/image/Image');

describe("Image", function () {
  beforeEach(function () {
    spyOn(imageLoader, "load").andReturn();

    this.image = new Image("image.png");
  });
  
  var ctx;
  beforeEach(function () {
    ctx = jasmine.createSpyObj('context', ['drawImage']);
  });
  
  it("loads image", function () {
    spyOn(imageLoader, 'isLoaded').andReturn(false);
    this.image.render(ctx);
    expect(ctx.drawImage).not.toHaveBeenCalled();
  });

  it("renders when image is loaded", function () {
    spyOn(imageLoader, 'isLoaded').andReturn(true);
    spyOn(imageLoader, 'get').andReturn("abc");
    imageLoader.load.reset();

    this.image.render(ctx, 1, 2, 3, 4);
    
    expect(ctx.drawImage).toHaveBeenCalledWith("abc", 1, 2, 3, 4, 0, 0, 3, 4);
    expect(imageLoader.load).not.toHaveBeenCalled();
  });
});

