function Command() {
   this.timestamp = Date.now();
}

Command.prototype.isNoop = function isNoop() {
   return false;
};

Command.prototype.send = function send(socket) {
};

Command.prototype.play = function play() {
};

module.exports = Command;

