const Entity = require('./entity');

class Show extends Entity {
    constructor(options = {}) {
        super(options);
        this.showtimes = options.showtimes || null;
    }
}

module.exports = Show;