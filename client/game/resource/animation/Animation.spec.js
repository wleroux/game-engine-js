/*jslint vars:true*/
/*global define:false, describe:false, it:false, beforeEach:false, expect: false*/
define(['./Animation', './AnimationStep'], function (Animation, AnimationStep) {
   'use strict';

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
      
      describe("duration", function () {
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
      
      describe("step", function () {
         beforeEach(function () {
            ani.addStep(steps[0]);
            ani.addStep(steps[1]);
         });
         
         it("should start with first step", function () {
            expect(ani.currentStep()).toBe(steps[0]);
         });

         it("should change after step duration", function () {
            ani.update(5);
            expect(ani.currentStep()).toBe(steps[1]);
         });
         
         it("should loop back after the duration when repeat", function () {
            ani.repeat = true;
            ani.update(10);
            expect(ani.currentStep()).toBe(steps[0]);
         });

         it("should stay at last step when not repeat", function () {
            ani.repeat = false;
            ani.update(10);
            expect(ani.currentStep()).toBe(steps[1]);
         });
      });
   });
});