/*jslint nomen:true*/
/*global require:false*/
var allTestFiles = [];
var TEST_REGEXP = /^\/base\/game\/.*(spec|test)\.js$/i;

var pathToModule = function (path) {
   'use strict';
   return path.replace(/^\/base\/game\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
   'use strict';
   if (TEST_REGEXP.test(file)) {
      // Normalize paths to RequireJS module names.
      allTestFiles.push(pathToModule(file));
   }
});

require.config({
   // Karma serves files under /base/game, which is the basePath from your config file
   baseUrl: '/base/game',
   paths: {
      q: '../bower_components/q/q'
   },
   
   // dynamically load all test files
   deps: allTestFiles,

   // we have to kickoff jasmine, as it is asynchronous
   callback: window.__karma__.start
});
