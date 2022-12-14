/* The Show class extends the Entity class and adds a showtimes property */
import Entity from './entity';

export default class Show extends Entity {
    constructor(options = {}) {
        super(options);
        this.showtimes = options.showtimes || null;
    }
}
