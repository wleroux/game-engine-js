var EntityGenerator = function () {
};

var availableParts = {
  "body": ["male", "skeleton"],
  "legs": ["pants_greenish", "plate_armor_pants", "robe_skirt"],
  "belt": [null, "leather", "rope"],
  "feet": [null, "plate_armor_shoes", "shoes_brown"],
  "hands": [null, "plate_armor_gloves"],
  "head": [null, "chain_armor_helmet", "chain_armor_hood", "hair_blonde", "leather_armor_hat", "plate_armor_helmet", "robe_hood"],
  "torso": [null, "chain_armor_jacket_purple", "chain_armor_torso", "leather_armor_bracers", "leather_armor_shirt_white", "leather_armor_torso", "plate_armor_torso", "robe_shirt_brown"],
  "weapon": ["dagger"]
};

var Entity = require('../../common/entity/Entity');
EntityGenerator.prototype.generate = function (id) {
  var parts = {};
  Object.keys(availableParts).forEach(function (part) {
    var options = availableParts[part];
    var choice = options[Math.floor(Math.random() * options.length)];
    if (choice) {
      parts[part] = choice;
    }
  });

  var position = {
    level: "asset/level/default.level",
    layer: 2,
    x: 10 * 32,
    y: 10 * 32
  };

  return new Entity(id, parts, position, 2);
}

module.exports = new EntityGenerator();

