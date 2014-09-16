function ImageResource() {
   this.cache = {};
}

ImageResource.prototype.load = function load(url) {
   if (!this.isLoaded(url)) {
      var image = new Image();
      image.onload = function () {
         this.cache[url] = image;
      }.bind(this);
      image.src = url;
   }
};

ImageResource.prototype.isLoaded = function isLoaded(url) {
   return this.cache.hasOwnProperty(url);
};

ImageResource.prototype.get = function get(url) {
   if (this.isLoaded(url)) {
      return this.cache[url];
   } else {
      throw new Error("Image not loaded.");
   }
};

module.exports = new ImageResource();

