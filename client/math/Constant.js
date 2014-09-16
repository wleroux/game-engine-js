function Constant(value) {
   this.value = value;
}

Constant.prototype.update = function update(dt) {
};

Constant.prototype.get = function get() {
   return this.value;
};

module.exports = Constant;

