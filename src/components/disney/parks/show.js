import Entity from './entity';

class Show extends Entity {
    constructor(options = {}) {
        super(options);
        this.showtimes = options.showtimes || null;
    }
}

export default Show;