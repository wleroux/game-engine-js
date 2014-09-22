describe("Entity", function () {
  var Entity = require('../../common/entity/Entity');
  describe("triggers", function () {
    beforeEach(function () {
      this.subject = new Entity();
    });

    it("can have triggers", function () {
      this.subject.trigger("testing");
      expect(this.subject.hasTrigger("testing")).toBe(true);
    });

    it("can consume triggers", function () {
      this.subject.trigger("testing");
      this.subject.consumeTrigger("testing");
      expect(this.subject.hasTrigger("testing")).toBe(false);
    });
  });
});

