const Entity = require('./entity');
const Queue = require("./queue");

class Restaurant extends Entity {
    constructor(options = {}) {
        super(options);
        this.queue = options.queue || new Queue();
    }
}

module.exports = Restaurant;