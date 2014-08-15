/*jslint vars:true*/
/*global define:false*/
define(['q'], function (q) {
   'use strict';

   function TextResource() {
      this.cache = {};
      this.requests = {};
   }
   
   TextResource.prototype.load = function load(url) {
      var deferred;
      if (this.isLoaded(url)) {
         deferred = q.defer();
         deferred.resolve(this.cache[url]);
         return deferred.promise;
      } else if (this.requests[url]) {
         return this.requests[url].promise;
      } else {
         deferred = q.defer();
         
         var request = new XMLHttpRequest();
         request.promise = deferred.promise;
         request.open('GET', url);
         request.onreadystatechange = function () {
            if (request.readyState === 4) {
               if (request.status === 200) {
                  this.cache[url] = request.responseText;

                  deferred.resolve(this.cache[url]);
                  delete this.requests[url];
               } else {
                  deferred.reject(request.responseText);
               }
            }
         }.bind(this);
         this.requests[url] = request;
         request.send();
         return request.promise;
      }
   };
   
   TextResource.prototype.isLoaded = function isLoaded(url) {
      return this.cache.hasOwnProperty(url);
   };
   
   TextResource.prototype.get = function get(url) {
      if (this.isLoaded(url)) {
         return this.cache[url];
      } else {
         throw new Error("File not loaded.");
      }
   };

   return new TextResource();
});