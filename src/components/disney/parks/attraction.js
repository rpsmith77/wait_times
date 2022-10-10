import Entity from './entity'
import Queue from './queue';

class Attraction extends Entity {
    constructor(options = {}) {
        super(options);
        this.queue = options.queue || new Queue();
        this.forecast = options.forecast || null;
    }
}

export default Attraction;