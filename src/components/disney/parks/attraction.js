const Entity = require('./entity');
const Queue = require('./queue');

class Attraction extends Entity {
    constructor(options = {}) {
        super(options);
        this.queue = options.queue || new Queue();
        this.forecast = options.forecast || null;
    }
}

module.exports = Attraction;