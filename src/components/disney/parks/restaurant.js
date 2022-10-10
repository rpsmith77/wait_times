import Entity from './entity';
import Queue from "./queue";

class Restaurant extends Entity {
    constructor(options = {}) {
        super(options);
        this.queue = options.queue || new Queue();
    }
}

export default Restaurant;