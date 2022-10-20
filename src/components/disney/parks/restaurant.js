import Entity from './entity';
import Queue from "./queue";

export default class Restaurant extends Entity {
    constructor(options = {}) {
        super(options);
        this.queue = options.queue || new Queue();
    }
}

