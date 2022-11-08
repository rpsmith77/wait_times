/* This class is a representation of the queue object returned from the API */
export default class Queue {
    constructor(options = {}) {
        if (options['queue']) {
            this.STANDBY = options.STANDBY || null;
            this.RETURN_TIME = options.RETURN_TIME || null;
            this.BOARDING_GROUP = options.BOARDING_GROUP || null;
            this.PAID_RETURN_TIME = options.PAID_RETURN_TIME || null;
        } else {
            return null;
        }

    }

    /* Getters */
    get _STANDBY() {
        return this.STANDBY;
    }

    get _RETURN_TIME() {
        return this.RETURN_TIME;
    }

    get _BOARDING_GROUP() {
        return this.BOARDING_GROUP;
    }

    get _PAID_RETURN_TIME() {
        return this.PAID_RETURN_TIME;
    }
}
