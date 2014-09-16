var Animation = require('../../../common/resource/animation/Animation');
var AnimationStep = require('../../../common/resource/animation/AnimationStep');

describe("Animation", function () {
   var ani;
   beforeEach(function () {
      ani = new Animation();
   });
   
   var steps = [
      new AnimationStep(),
      new AnimationStep()
   ];
   steps[0].duration = 4;
   steps[1].duration = 5;
   
   describe("#duration", function () {
      it("should start at 0", function () {
         expect(ani.duration()).toBe(0);
      });

      it("increase with one step", function () {
         ani.addStep(steps[0]);
         expect(ani.duration()).toBe(4);
      });

      it("increase with multiple steps", function () {
         ani.addStep(steps[0]);
         ani.addStep(steps[1]);
         expect(ani.duration()).toBe(9);
      });
   });
   
   describe("#currentStep", function () {
      beforeEach(function () {
         ani.addStep(steps[0]);
         ani.addStep(steps[1]);
      });
      
      it("should start with first step", function () {
         expect(ani.currentStep(0)).toBe(steps[0]);
      });

      it("should change after step duration", function () {
         expect(ani.currentStep(5)).toBe(steps[1]);
      });
      
      it("should loop back after the duration when repeat", function () {
         ani.repeat = true;
         expect(ani.currentStep(10)).toBe(steps[0]);
      });

      it("should stay at last step when not repeat", function () {
         ani.repeat = false;
         expect(ani.currentStep(10)).toBe(steps[1]);
      });
   });
});

