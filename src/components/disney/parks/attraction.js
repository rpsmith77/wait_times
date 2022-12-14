/* Attraction is an Entity that has a queue and a forecast. */
import Entity from './entity'
import Queue from './queue';

export default class Attraction extends Entity {
    constructor(options = {}) {
        super(options);
        this.queue = options.queue || new Queue();
        this.forecast = options.forecast || null;
    }
}
