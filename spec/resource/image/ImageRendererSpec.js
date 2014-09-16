describe("ImageRenderer", function () {
  beforeEach(function () {
    this.imageRenderer = require('../../../client/resource/image');
  });
  
  var ctx;
  beforeEach(function () {
    ctx = jasmine.createSpyObj('context', ['drawImage']);
  });
  
  it("images initially unloaded", function () {
    expect(this.imageRenderer.isLoaded("test")).toBe(false);
  });

  it("renders image when loaded", function () {
    spyOn(this.imageRenderer, "isLoaded").andReturn(true);
    spyOn(this.imageRenderer, "getImage").andReturn("image_content");

    this.imageRenderer.render(ctx, "image_url", 1, 2, 3, 4);

    expect(ctx.drawImage).toHaveBeenCalledWith("image_content", 1, 2, 3, 4, 0, 0, 3, 4);
  });

  it("loads image if attempting to render an unloaded image", function () {
    spyOn(this.imageRenderer, 'isLoaded').andReturn(false);
    spyOn(this.imageRenderer, 'load');

    this.imageRenderer.render(ctx, "image_url", 1, 2, 3, 4);

    expect(this.imageRenderer.load).toHaveBeenCalledWith("image_url");
  });
});

