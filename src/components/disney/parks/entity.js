export default class Entity {
    constructor(options = {}) {
        this.id = options.id || null;
        this.name = options.name || null;
        this.entityType = options.entityType || null;
        this.parkId = options.parkId || null;
        this.status = options.status || null;
        this.lastUpdated = options.lastUpdated || null;
    }
}
